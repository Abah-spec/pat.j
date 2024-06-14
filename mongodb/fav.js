const express = require ("express");
const mongoose =  require ("mongoose");
const PORT = 3040;

app.use(express());
mongoose.connect("mongodb+srv://patienceehizy:Vtiml7kWjW9TZwbJ@cluster0.beqnazb.mongodb.net/")
.then(()=>{
    console.log("connection successfully engaged")
}).catch(()=>{
    console.log("error trying to connct")
})