const mongoose = require('mongoose');

//schema for the doctor
const doctorSchema= new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true 
    },
    password:{
        type:String,
        required:true
    }
});

//the is a collection i.e is a model
const Doctor=mongoose.model('Doctor',doctorSchema);
module.exports=Doctor;