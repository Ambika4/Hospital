const Report=require('../../../models/report');
const jwt = require('jsonwebtoken');
module.exports.status=async function(req,res){
   
    try{
         //verify whether doctor is logged in 
        let authData= jwt.verify(req.token,'hospital');
       
        if(authData){
            try{
                //only patient name is important so populate that only
               let report=await Report.find({status:req.params.status}).populate('patient','name');
                if(report){
                    res.status(200).json({report});
                }
                //if none of patient has input state
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