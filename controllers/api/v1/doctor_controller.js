const Doctor=require('../../../models/doctor');
const jwt = require('jsonwebtoken');
//register doctor
module.exports.create=async function(req,res){
   
    try{
        
        let doctor=await Doctor.findOne({email:req.body.email});
        //first check doctor is exist in database
        if(doctor)
        res.status(200).json({message:"Doctor is already registered"});

        //create doctor
        if(!doctor)
        {
            let newDoctor= await Doctor.create({
                email:req.body.email,
                name:req.body.name,
                password:req.body.password
            })
           
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
    //create token for further use
     const token = jwt.sign(req.body, 'hospital');
     return res.json({ token});}
 }

