const mongoose = require('mongoose');

//schema for the doctor
const reportSchema= new mongoose.Schema({
    status:{
        type:String,
        required:true
    },
    doctor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Doctor',
        required:true
    }
    
},{
    timestamps:true
});

//the is a collection i.e is a model
const Report=mongoose.model('Report',reportSchema);
module.exports=Report;