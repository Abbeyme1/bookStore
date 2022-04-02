import mongoose from "mongoose";
import {MongoMemoryServer} from "mongodb-memory-server"
import {csvToJSON} from "../convertToJSON"

let mongoServer: MongoMemoryServer


const connect = async () => {
    await csvToJSON()
    mongoServer = await MongoMemoryServer.create();
    const uri = await mongoServer.getUri();
    await mongoose.connect(uri);
    
    
}

const close = async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
}

const clear = async () => {
    const collections = await mongoose.connection.db.collections();

    for(let collection of collections)
        await collection.deleteMany({})
}


beforeAll(async () => await connect())

beforeEach(async () => await clear())

afterAll(async() => await close())

