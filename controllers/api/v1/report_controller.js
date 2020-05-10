const Report=require('../../../models/report');
const jwt = require('jsonwebtoken');
module.exports.status=async function(req,res){
    console.log(jwt.verify(req.token,'hospital'))
    try{
        let authData= jwt.verify(req.token,'hospital');
       
        if(authData){
            try{
               let report=await Report.find({status:req.params.status}).populate('patient','name');
                if(report){
                    res.status(200).json({report});
                }
                if(!report){
                    res.status(200).json({message:"Patients doesn't have this state"});
                }
            }catch(err){
                res.status(500).json({message:err});
            }
       
        }
    }
    catch(err){
        res.json(403,{message:"Forbidden"}) 
    }

}