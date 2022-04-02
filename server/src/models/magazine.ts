import mongoose from "mongoose";

interface magazineAttr {
    title: string,
    isbn: string,
    authors: string[],
    publishedAt: string,
}

interface magazineModel extends mongoose.Model<magazineDoc> {
    build(attr: magazineAttr): magazineDoc;
}


interface magazineDoc extends mongoose.Document {
    title: string,
    isbn: string,
    authors: string[],
    publishedAt: string,
}

const magazineSchema = new mongoose.Schema({
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
    publishedAt: {
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


magazineSchema.statics.build = (attr: magazineAttr) => {
    return new Magazine(attr)
}

const Magazine =  mongoose.model<magazineDoc,magazineModel>('magazine',magazineSchema);

export {Magazine};