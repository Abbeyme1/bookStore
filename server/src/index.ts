import dotenv from "dotenv";
import {app} from "./app"
import connectDB from "./config/db";

dotenv.config({path: __dirname+"/../../.env"})

const connect = async () => {
    
    if(!process.env.MONGO_URI) throw new Error('"MONGO_URL" is not defined');

    await connectDB();

    app.listen(5000,() => {
        console.log("listening at 5000");
    })
  };
  
  connect();
