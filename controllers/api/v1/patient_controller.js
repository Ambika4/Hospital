const Patient=require('../../../models/patient');
const Doctor=require('../../../models/doctor');
const Report=require('../../../models/report');
const jwt = require('jsonwebtoken');
module.exports.createReport=async function(req,res){
    try{
        let authData= jwt.verify(req.token,'hospital');
       
        if(authData){
            try{
       
               let doctor=await Doctor.findOne({email:authData.email});
               let patient=await Patient.findById(req.params.id);
              
                if(patient)
                {
                    let report=await Report.create({
                        status:req.body.status,
                        doctor:doctor.name
                    })
                    patient.reports.push(report);
                    patient.save();
                    res.status(200).json({report,message:"Report created succeesfully"})
                }  
                
            }
            catch(err)
            {
                res.status(500).json({message:err});
            }
       
        }

    }catch(err)
    {
        res.json(403,{message:"Forbidden"})
    }
  
}

module.exports.create=async function(req,res){
    try{
        let authData= jwt.verify(req.token,'hospital');
        if(authData){
            try{
                console.log(authData);
       
                let patient=await Patient.findOne({mobileNo:req.body.mobileNo});
                
                if(patient)
                {
                    res.json(200,{
                    patient:patient,
                    message:"Patient already exist"});
                }
            
                if(!patient)
                {
                    let newPatient= await Patient.create({
                        mobileNo:req.body.mobileNo,
                        name:req.body.name,
                        gender:req.body.gender
                    })
                    // console.log(newPatient);
                    res.status(200).json({message:"Patient registered successfully"});
                }
                
                
            }
            catch(err)
            {
                res.status(500).json({message:"Unable to search in db"});
            }
       
        }

    }catch(err)
    {
        res.json(403,{message:"Forbidden"})
    }
}

module.exports.allReports=async function(req,res){
    try{
        let authData= jwt.verify(req.token,'hospital');
       
        if(authData){
            try{
                let patient=await Patient.findById(req.params.id)
                .populate('reports')
                .sort('-createdAt');

                res.status(200).json({
                    All_reports:patient.reports
                })


            }catch(err){
                res.status(500).json({message:err});
            }

        }

    }catch(err){
        res.json(403,{message:"Forbidden"})
    }
}