import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    regNo:String,
    name:String,
    class:String
}, {
    timestamps:true
})

export const Student = new mongoose.model("Student", studentSchema);