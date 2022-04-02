import dotenv from "dotenv";
import connectDB from "./config/db";
import { Author } from "./models/author"
import { Book } from "./models/book";
import { Magazine } from "./models/magazine";
import fs from "fs";

dotenv.config({path: __dirname+"/../../.env"})
connectDB();

const importData = async () => {

    try {

        await Author.deleteMany();
        fs.readFile("src/Data/authors.json",async (err:any,data: Buffer) => {
    
            if(err) throw err;
        
            const authors = JSON.parse(data.toString())
        
            const allAuthors = await Author.insertMany(authors);
            console.log("inserted authors")
        })

        await Book.deleteMany();
        fs.readFile("src/Data/books.json",async (err:any,data: Buffer) => {
    
            if(err) throw err;
        
            const books = JSON.parse(data.toString())

            const allBooks = await Book.insertMany(books)
            console.log("inserted books")
        })

        await Magazine.deleteMany();
        fs.readFile("src/Data/magazines.json",async (err:any,data: Buffer) => {
    
            if(err) throw err;
        
            const magazines = JSON.parse(data.toString())
        
            const allMagazines = await Magazine.insertMany(magazines);
            console.log("inserted magazines")

            process.exit()
        })

        
    }
    catch(err)
    {
        console.log("ERROR" , err);
        process.exit(1);
    }
}

const destroyData = async () => {
    try {
        await Author.deleteMany();
        await Book.deleteMany();
        await Magazine.deleteMany();

        console.log("Data destroyed");
        process.exit();
    }
    catch(err)
    {
        console.log("ERROR" , err);
        process.exit(1);
    }
}

if (process.argv[2] === "-d") {
    destroyData();
  } else {
    importData();
  }
  