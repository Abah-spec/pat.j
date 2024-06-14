const express = require("express");
const mongoose = require('mongoose');
const app=express();
const PORT=9876;


// Vtiml7kWjW9TZwbJ
app.use(express.json());

// connect to db

mongoose.connect("mongodb+srv://patienceehizy:Vtiml7kWjW9TZwbJ@cluster0.beqnazb.mongodb.net/secondmongobd")
.then(()=>{
    console.log(`connect to database is established`)
}).catch((err)=>{
    console.log(`unable to connect to the db because ${err}`)
});

// create a schema
const date=new Date
// console.log(date.getFullYear())

const userModel= new mongoose.Schema({
    name: {type:String, required:[true, "kindly provide your name"]},
    email: {type: String,unique:[true,"kindly provide your email"]},
    stack:{type:String},
    dateOfBirth:{type:Number, required:true},
    sex:{type:String,required:true, enum: ["male" ,"female"]},
    age:{type:Number}

},{timestamps:true})    
      
    
const mymodel=mongoose.model("secondMongoDB", userModel)
app.get("/",(req,res)=>{
    res.status(200).json(`welcome to mongodb`)

});

// create first user
app.post("/createuser",async(req,res)=>{
    try {
        const{name,email,stack,sex,dateOfBirth,}=req.body
// change first later name to upper and lower case
console.log(name)
// console.log(name.length)
        let  fullName = name.split(" ")
         console.log(fullName)
         console.log(fullName.length)
        let removedSpace = fullName.filter((space)=> space !== "")
        console.log(removedSpace)
       let firstLetter = removedSpace[0].slice(0,1).toUpperCase()
       console.log(firstLetter)
        let remaining = removedSpace[0].slice(1).toLowerCase()
        console.log(remaining)
        let totalName = firstLetter+remaining
        console.log(totalName)
        

        // let lastName=fullNamez
         let firstLetter2 = removedSpace[1].slice(0,1).toUpperCase()
         let remaining2 = removedSpace[1].slice(1).toLowerCase()
         let total2 = firstLetter2+remaining2
        //  console.log(fullName)
    
        // let Upper = sex.toUppererCase()
 
        
        const data={name:totalName+" "+ email, stack, sex:sex.toupperCase, dateOfBirth, age:date. getFullYear()-dateOfBirth}

        const createUser=await mymodel.create(data)

        res.status(201).json({

            "message":`new user created`,
            data:createUser

        })

        
    } catch (error) {
        res.status(400).json(error.message)
    }
});

// get all student
app.get("/getallstudents", async(req,res)=>{
    try{
const allstudents=await mymodel.find()

res.status(200).json({message:`kindly find below ${allstudents.length}students`,data:allstudents})

    }catch{

       res.status(400) .json(error.message)
    }
});
// get one student

app.get("/getone/:id",async(req,res)=>{
    let christian = req.params.id

  let foundUser = await mymodel.findById(christian)
  if(!foundUser){
    return res.status(404).json("user not found")
  }

    res.status(200).json ({info:`kindly find below the requested user`, foundUser})
});


// update
app.put("/updateuser/:id",async(req,res)=>{
    try{
        let id =req.params.id
        const updateClient =await mymodel.findByIdAndUpdate(id,req.body,{new:true})
        res.status(200).json({
            message:`student updated sucessfully`,updateClient
        });
    }catch(error){
        res.status(500).json(error.message)
    }
});

//delete
app.delete("/deleteuser/:id",async(req,res)=>{
    try{
        let id =req.params.id
        const deleteClient =await mymodel.findByIdAndDelete(id)
        res.status(200).json({
            message:`student deleted sucessfully`,deleteClient
        });
    }catch(error){
        res.status(400).json(error.message)
    }
});


app.listen( PORT,()=>{
console.log(`my app is running on PORT ${PORT}`)
});