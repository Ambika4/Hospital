const express= require('express');/*It will fetch old instance of express if we are adding it for second time*/
/*express is required only once*/
const router=express.Router();

console.log('router loaded');



router.use('/api',require('./api'));

//for any further routes access from here
//router.use('/routername',require('./routerfile));


module.exports=router;