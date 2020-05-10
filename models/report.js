const mongoose = require('mongoose');

//schema for the doctor
const reportSchema= new mongoose.Schema({
    status:{
        type:String,
        enum:['Negative','Travelled-Quarantine','Symptoms-Quarantine','Positive-Admit'],
        required:true
    },
    doctor:{
        type:String,
        required:true
    },
    patient:{

        type:mongoose.Schema.Types.ObjectId,
        ref:'Patient',
        required:true
    }
    
},{
    timestamps:true
});

//the is a collection i.e is a model
const Report=mongoose.model('Report',reportSchema);
module.exports=Report;