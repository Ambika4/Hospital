const passport=require('passport');
//importing jwt startegy
const JWTStrategy=require('passport-jwt').Strategy;
//It will help to extract jwt from header
const ExtractJWT=require('passport-jwt').ExtractJwt;

//we need user for authentication or establishing authentication
const Doctor=require('../models/doctor');

let opts={
    jwtFromRequest:ExtractJWT.fromAuthHeaderAsBearerToken,
    //key for encrypt and decrypt
    secretOrKey:'hospital'
}

passport.use(new JWTStrategy(opts,function(jwtPayLoad,done){
    //it is storing user information in payload
   Doctor.findById(jwtPayLoad._id,function(err,user){
       if(err){console.log('Error in finding user in jwt');return;}
       if(user){
           return done(null,user);
       }else{
           return done(null,false);
       }
   }) 
}));


module.exports=passport;