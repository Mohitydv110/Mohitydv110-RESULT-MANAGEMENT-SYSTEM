import mongoose, { Model, Schema } from "mongoose";

const empSchema = new mongoose.Schema(
    {
        name:String,
        email:String,
        password:String
    },
    {
        timestamps:true
    });

export const Employee = new mongoose.model("Employee", empSchema);