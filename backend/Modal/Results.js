import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({
    regNo:String,
    name:String,
    DS:String,
    CN:String,
    OS:String,
    sgpa:String,
    pass:String
},{
    timestamps:true
});

export const Results = new mongoose.model("Results", resultSchema);