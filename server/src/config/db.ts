import mongoose from "mongoose";

const connectDB = async () => {
    try {
        let url : string = process.env.MONGO_URI!;
        const conn = await mongoose.connect(url);
        console.log("connected to mongodb");
    } 
    catch (err) {
        console.log(`ERR: ${err}`);
        process.exit(1);
    }

}

export default connectDB;