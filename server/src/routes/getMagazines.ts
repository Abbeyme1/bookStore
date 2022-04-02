import {Request,Response,NextFunction,Router} from "express";
import { Magazine } from "../models/magazine";

const router = Router();

router.get("/api/magazines",async (req:Request,res:Response,next:NextFunction) => {

    try {
        const magazines = await Magazine.find();
        res.send(magazines);
    }
    catch(err)
    {
        next(new Error("Magazines not found"));
    }
    

})


export {router as getMagazines}