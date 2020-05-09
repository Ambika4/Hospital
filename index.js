const express = require('express');
const app = express();
const port=8000;/** On port 80 all website hosts */
/*app listen to the port*/
const db=require('./config/mongoose');
const bodyParser = require('body-parser')

//for parsing body
app.use(bodyParser.json());

app.use('/',require('./routes'));
app.listen(port,function(err){
    if(err){
        console.log('Error: ',err);
        /*interpolition
        console.log(`Error in running : ${err}`);
        */
    }
    console.log(`server is running on port${port}`);
});