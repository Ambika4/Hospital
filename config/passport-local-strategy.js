const passport=require('passport');

//Strategy property we want to use
const LocalStrategy = require('passport-local').Strategy;

//import Doctor
const Doctor=require('../models/doctor');
//authentication using passport
//tell passport to use local startegy
passport.use(new LocalStrategy({
   usernameField:'email' ,
   //this allow us to keep req as first argument of function
   passReqToCallback: true
},
//done is inbuilt function to passport it is callback function
//It will call based on data passed
function(req,email,password,done){
//we need to find employee ans establish the identity

   Doctor.findOne({email:email},function(err,doctor){
       //Error
       if(err)
       {
          req.send(400).json({message:'error in finding Doctor',err});
          
           //report error to passport
           return done(err);
       }
       //if user is not found or password is incorrect
       if(!doctor|| doctor.password!=password)
       {
        res.send(400).json({message:'Invalid user name or password ofDoctor',err});
       
           return done(null,false);
       }
      
       return done(null,doctor);
   });
}

));

//serializing the employee to decide which key is to be kept in the cookies
passport.serializeUser(function(doctor,done){
    done(null,doctor.id);
})

//deserializing the employee from the key in the cookies
passport.deserializeUser(function(id,done){
    Doctor.findById(id,function(err,doctor){
        if(err){
         
            req.send(400).json({message:'error in finding Employee->passport',err});
           //report error to passport
           //done function is call back function
           return done(err);
        }
        return done(null,doctor);
    });

});

//check if user is aunthenticated
//use as middleware
passport.checkAuthentication=function(req,res,next){
    //if the user is sign in pass on the request to next function(controller's action)
    if(req.isAuthenticated()){
        return next();
    }
    //if the employee is not signed in
    // return res.redirect('/api/v1/employees/');
}

passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        //req.user contains the current siged in user from the session cookie and we are 
        //just sending this to the locals for the views
        res.locals.user=req.user;
        
       
    }
    next();
}
module.exports=passport;