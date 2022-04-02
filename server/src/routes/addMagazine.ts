import {Router,Request,Response, NextFunction} from "express";
import { body, validationResult,ValidationError,Result } from 'express-validator';
import { Magazine } from "../models/magazine";
import fs from "fs";
import path from 'path'

const router = Router();


router.post("/api/magazines",
body("title").trim().isLength({min: 3}).withMessage("Enter Valid Title"),
body("isbn").trim().not().isEmpty().withMessage("Enter Valid ISBN"),
body("authors").trim().not().isEmpty().withMessage("Enter Valid authors"),
body("publishedAt").trim().isLength({min: 10,max: 10}).withMessage("Enter Valid description"),
async (req:Request,res:Response,next:NextFunction) => {

    const errors:Result<ValidationError> = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).send({errors: errors.array()})
    
    let {title,isbn,authors,publishedAt} = req.body;

    authors = authors.split(",");

    try {
    
        const magazine = Magazine.build({title,isbn,authors,publishedAt})
        await magazine.save();


        // creating csv file before sending response
        const items:any = await Magazine.find()
        const replacer:any = (key:number, value:number) => value === null ? '' : value // specify how you want to handle null values here
        const header:string[] = Object.keys(items[0].toJSON())
        const csv = [
        header.join(';'), // header row first
        ...items.map((row:any) => header.map((fieldName:string) => 
            {
                if(fieldName === "authors") 
                {
                    row[fieldName] = fix(row[fieldName]);
                }
            return row[fieldName]
        }).join(';'))
        ].join('\r\n')
        
        fs.writeFileSync(path.join(__dirname, '../csv/Magazine.json'), csv);
        

        return res.status(201).send(magazine);
    }   
    catch(err)
    {
        next(new Error("something went wrong"))
    }

})


const fix = (authors: string[]) => {
    return authors.map((author:string) => author).join(',');
}

export {router as addMagazine};

