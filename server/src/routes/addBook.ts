import {Router,Request,Response, NextFunction} from "express";
import { body, validationResult,ValidationError,Result } from 'express-validator';
import { Book } from "../models/book";
import fs from "fs";
import path from 'path'

const router = Router();


router.post("/api/books",
body("title").trim().isLength({min: 3}).withMessage("Enter Valid Title"),
body("isbn").trim().not().isEmpty().withMessage("Enter Valid ISBN"),
body("authors").trim().not().isEmpty().withMessage("Enter Valid authors"),
body("description").isLength({min: 5}).withMessage("Enter Valid description"),
async (req:Request,res:Response,next:NextFunction) => {

    const errors:Result<ValidationError> = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).send({errors: errors.array()})
    
    let {title,isbn,authors,description} = req.body;

    authors = authors.split(",");

    try {
    
        const book = Book.build({title,isbn,authors,description})
        await book.save();


        // creating csv file before sending response
        const items:any[] = await Book.find()
        const replacer:any = (key:number, value:number) => value === null ? '' : value // specify how you want to handle null values here
        const header = Object.keys(items[0].toJSON())
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
        
        fs.writeFileSync(path.join(__dirname, '../csv/Book.json'), csv);


        return res.status(201).send(book);
    }
    catch(err)
    {
        next(new Error("Something went wrong"))
    }

})

const fix = (authors: string[]) => {
    return authors.map((author:string) => author).join(',');
}

export {router as addBook};

