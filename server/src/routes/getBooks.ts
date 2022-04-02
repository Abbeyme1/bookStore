import {Request,Response,NextFunction,Router} from "express";
import { Book } from "../models/book";

const router = Router();

router.get("/api/books",async (req:Request,res:Response,next:NextFunction) => {

    try {
        const books = await Book.find();
        res.send(books);
    }
    catch(err)
    {
        next(new Error("Books not found"));
    }
})


export {router as getBooks}