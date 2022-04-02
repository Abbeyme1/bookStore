import {Request,Response,NextFunction,Router} from "express";
import { Book } from "../models/book";
import { Magazine } from "../models/magazine";

const router = Router();

router.get("/api/get-magazines-and-books",async (req:Request,res:Response,next:NextFunction) => {

    try {
        const result:any[] = [];
            const magazines = await Magazine.find();

            if(magazines.length > 0) result.push(...magazines)

            const books = await Book.find();

            if(books.length > 0) result.push(...books)

            if(result.length > 0)
            {
                result.sort(compare);
                return res.send(result);
            }

            return res.status(404).send({"message": `Not found`})
    }
    catch(err)
    {
        next(err)
    }
    
})

const compare = ( a:any, b:any ):number => {
    return a?.title.localeCompare(b?.title);
}

export {router as findAll}