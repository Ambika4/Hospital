const Doctor=require('../../../models/doctor');
const jwt = require('jsonwebtoken');
module.exports.create=async function(req,res){

    try{
        console.log(req.body)
        let doctor=await Doctor.findOne({email:req.body.email});
        if(doctor)
        res.status(200).json({message:"Doctor is already registered"});

        if(!doctor)
        {
            let newDoctor= await Doctor.create({
                email:req.body.email,
                name:req.body.name,
                password:req.body.password
            })
            console.log(newDoctor);
            res.status(200).json({message:"Doctor registered successfully"});
        }
        
        
    }
    catch(err)
    {
        res.status(500).json({message:err});
    }
}

module.exports.createSession = async function(req, res){
    //console.log(req.cookies);
     let doctor=await Doctor.findOne({email:req.body.email});

     if(req.body.password==doctor.password){
     const token = jwt.sign(req.body, 'hospital');
     return res.json({ token});}
 }

