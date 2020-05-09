const Patient=require('../../../models/patient')
module.exports.create=async function(req,res){

    try{
       
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
            console.log(newPatient);
            res.status(200).json({message:"Patient registered successfully"});
        }
        
        
    }
    catch(err)
    {
        res.status(500).json({message:err});
    }
}