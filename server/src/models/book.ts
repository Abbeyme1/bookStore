import mongoose from "mongoose";

interface bookAttr {
    title: string,
    isbn: string,
    authors: string[],
    description: string,
}

interface bookModel extends mongoose.Model<bookDoc> {
    build(attr: bookAttr): bookDoc;
}


interface bookDoc extends mongoose.Document {
    title: string,
    isbn: string,
    authors: string[],
    description: string,
}

const bookSchema = new mongoose.Schema({
    title: {
        type:String,
        required: true
    },
    isbn: {
        type:String,
        required: true
    },
    authors: [{
        type:String,
        required: true
    }],
    description: {
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


bookSchema.statics.build = (attr: bookAttr) => {
    return new Book(attr)
}

const Book =  mongoose.model<bookDoc,bookModel>('Book',bookSchema);

export {Book};