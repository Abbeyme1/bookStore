import express,{Request,Response} from "express";
import {json} from "body-parser";
import { getBooks } from "./routes/getBooks";
import { getMagazines } from "./routes/getMagazines";
import { findBy } from "./routes/findBy";
import { findAll } from "./routes/findAll";
import { errorHandler } from "./errorHandler";
import { addBook } from "./routes/addBook";
import { addMagazine } from "./routes/addMagazine";
const app = express();

app.use(json())

app.use(getBooks)
app.use(addBook)
app.use(getMagazines)
app.use(addMagazine)
app.use(findBy)
app.use(findAll)


app.all("*",(req:Request,res:Response) => {
    res.status(404).send({"message": "Page doesn't exists"})
})

app.use(errorHandler)

export {app}
