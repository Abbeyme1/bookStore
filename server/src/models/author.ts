import mongoose from "mongoose";

interface authorAttr {
    email: string,
    firstname: string,
    lastname: string
}

interface authorModel extends mongoose.Model<authorDoc> {
    build(attr: authorAttr): authorDoc;
}


interface authorDoc extends mongoose.Document {
    email: string,
    firstname: string,
    lastname: string
}

const authorSchema = new mongoose.Schema({
    email: {
        type:String,
        required: true
    },
    firstname: {
        type:String,
        required: true
    },
    lastname: {
        type:String,
        required: true
    }
},{
    toJSON: {
        transform: (doc,ret,options) => {
            delete ret.__v;
            delete ret._id;
        }
    }
})


authorSchema.statics.build = (attr: authorAttr) => {
    return new Author(attr)
}

const Author =  mongoose.model<authorDoc,authorModel>('Author',authorSchema);

export {Author};