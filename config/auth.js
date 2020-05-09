const passport = require("passport");

module.exports.verifyToken=function(req,res,next){
    //Get auth header value
    const bearerHeader=req.headers['authorization'];
    //check if bearer  is undefined
    if(typeof bearerHeader!=='undefined'){
        //split at the space
        const bearer=bearerHeader.split(' ');
        //Get token from array
        const bearerToken=bearer[1];
        //set the token
        req.token=bearerToken;
        //next middleware
        next();
    }else{
        res.sendStatus(403);
    }
}
 