const express = require("express");
const app = express();
const mongoose =require("mongoose");
const PORT = 2020;


app.use(express.json());
mongoose.connect("mongodb+srv://patienceehizy:Vtiml7kWjW9TZwbJ@student.beqnazb.mongodb.net/")
.then(()=>{
    console.log(`successfully established db`)

}).catch((err)=>{
    res.status(400).json(`unable to connect to db ${err}`)
})



















