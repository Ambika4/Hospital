const mongoose = require('mongoose');

//schema for the doctor
const patientSchema= new mongoose.Schema({
    mobileNo:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
       
    },
    gender:{
        type:String,
        
    },
    reports:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Report'
        }
    ]
});

//the is a collection i.e is a model
const Patient=mongoose.model('Patient',patientSchema);
module.exports=Patient;