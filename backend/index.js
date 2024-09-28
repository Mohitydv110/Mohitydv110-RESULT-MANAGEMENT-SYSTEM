import  express from "express";
import {PORT, mongoURL} from './config.js';
import mongoose from "mongoose";
import { Employee } from "./models/Employee.js";
import cors from 'cors';
import { Results } from "./models/Results.js";
import { Student } from "./models/Student.js";

const app = express();
app.use(cors());
app.use(express.json())

mongoose.connect(mongoURL).then(()=>{
    console.log("MongoDB Connection Successful");
    app.listen(PORT, ()=>{
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error)=>{
    console.log("failed to connect mongodb : ", error);
}); // Connection to Database

app.get('/', async (req, res)=>{
    res.status(200).send("Student Result Management System");
})

app.post('/addEmployee', async (req, res)=>{
    try {
        if(!req.body.name || !req.body.email || !req.body.password){
            return res.status(401).send({message:"Failed"});
        }
        else {
            const newEmp = {
                name:req.body.name,
                email:req.body.email,
                password:req.body.password
            }
            const emp = await Employee.create(newEmp);
            return res.status(200).send([{message:"Added Successfully"}, emp]);
        }
    } catch(error){
        console.log('Error: ', error);
    }
}) // Adding Employee Details in Database

app.post("/verify", async (req, res)=>{
    try{
        const user = await Employee.findOne({email:req.body.name, password:req.body.password});
        console.log(user);
        return res.status(200).send(user);
    } catch(error){
        console.log("Error  :", error);
        return res.send(error)
    }
}) // Verify User Login

app.get("/getResults/:regNo", async (req, res)=>{
    try {
        const regNo = req.params['regNo'];
        if(!regNo){
            return res.status(401).send({message:"Enter Valid RegNo"});
        }
        const result = await Results.findOne({regNo:regNo});
        console.log(result);
        return res.status(200).send((result)?result:{message:"Enter Valid HT"});
    } catch(error){
        console.log("Error:", error);
    }
}); // retrieves results from Database by using Hall Ticket Number

app.post("/addResults", async (req, res)=>{
    try {
        const body = req.body;
        if(!body.regNo || !body.name || !body.DS || !body.CN || !body.OS || !body.sgpa || !body.pass){
            return res.status(401).send([{message:"Unsuccessful"}]);
        }
        const newResult = {
            regNo:body.regNo,
            name:body.name,
            DS:body.DS,
            CN:body.CN,
            OS:body.OS,
            sgpa:body.sgpa,
            pass:body.pass
        }
        const exists = await Results.findOne({regNo:newResult.regNo});
        if(exists){
            await Results.updateOne({regNo:newResult.regNo}, {$set:newResult});
            return res.status(200).send([{message:"Updated " + newResult.regNo + " Successfully"}, newResult]);
        }
        const result = await Results.create(newResult);
        return res.status(200).send([{message:"Posted SUCCESSFULLY"}, result]);
    } catch(error){
        console.log("Error:", error);
    }
}) //Add Results to your database

app.post("/addStudent", async(req, res)=> {
    try {
        const body = req.body;
        if(!body.regNo || !body.name || !body.class){
            return res.status(401).send({message:"Enter Valid Details"});
        }
        const newStudent = {
            regNo:body.regNo,
            name:body.name,
            class:body.class
        }
        const student = await Student.create(newStudent);
        return res.status(200).send({message:"Created Successfully"});
    }catch(error){
        console.log(error);
    }
})

app.get("/getStudent/:regNo", async (req, res)=>{
    try {
        const regNo = req.params['regNo'];
        const student = await Student.findOne({regNo:regNo});
        if(!student){
            return res.send({name:"Not a valid student"});
        }
        return res.status(200).send(student);
    } catch(error){
        console.log(error);
    }
});