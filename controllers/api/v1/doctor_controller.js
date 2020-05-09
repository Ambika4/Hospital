const Doctor=require('../../../models/doctor');

module.exports.create=async function(req,res){

    try{
        console.log(req.body)
        let doctor=await Doctor.findOne({email:req.body.email});
    
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
        
        if(doctor)
        res.status(200).json({message:"Doctor is already registered"});
    }
    catch(err)
    {
        res.status(500).json({message:err});
    }
}

