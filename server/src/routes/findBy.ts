import {Request,Response,NextFunction,Router} from "express";
import { Book } from "../models/book";
import { Magazine } from "../models/magazine";

const router = Router();

router.get("/api/find/",async (req:Request,res:Response,next:NextFunction) => {

    if(req.query.isbn)
    {
        const isbn = req.query.isbn;
        try {
            const magazine = await Magazine.findOne({isbn});

            if(magazine) return res.send(magazine);

            const book = await Book.findOne({isbn});

            if(book) return res.send(book);

            return res.status(400).send({"message": `ISBN number ${isbn} not found`})
        }
        catch(err)
        {
            return res.status(400).send({"error": err})
        }
    }
    else if(req.query.email)
    {
        const email = req.query.email;

        try {
            const result = [];
            const magazines = await Magazine.find({authors: {$eq: email }});

            if(magazines.length > 0) result.push(magazines);

            const books = await Book.find({authors: {$eq: email }});

            if(books.length > 0) result.push(books);

            if(result.length > 0) return res.send(result);

            return res.status(400).send({"message": `Email ${email} not found`})
        }
        catch(err)
        {
            return res.status(400).send({"error": err})
        }
    }

    return res.status(400).send("Not found");

})


export {router as findBy}