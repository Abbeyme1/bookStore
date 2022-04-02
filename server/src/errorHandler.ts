import {Request,Response ,NextFunction } from "express";

export const errorHandler = (err:Error,req:Request,res:Response,next:NextFunction) => {

    if(err?.message) return res.status(500).send({"message":err.message});
    res.status(500).send({message: "Something went wrong"})


}