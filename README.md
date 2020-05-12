# Hospital
An API for the doctors of a Hospital which has been allocated by the govt for testing and quarantine + well being of  COVID-19 patients
Steps to setup the Project    
1.Install Node.js depending on your operating system    
2.npm init :-It is used to setup npm package   
3.npm install --save express    
4.Do "npm install" to install all dependency as per project requirement.    

There are 6 apis:-  
1)Register Doctor   
route:-/api/v1/doctors/register   
Method:POST  
Input/Req:{"name":"Ambika","password":123,"email":"aia@gmail.com"}    
Output/Res:{ "message": "Doctor registered successfully"}          

2)Login Doctor
route:-/api/v1/doctors/login   
Method:POST   
Input/Req:{"password":123,"email":"aia@gmail.com"}  
OUtput/Res:{
    "token": "you_will_get_the_token"   
}       

3)Register Patient   
route:-/api/v1/patients/register    
METHOD:POST   
Input/Res:{"name":"Siriti","mobileNo":123434444,"gender":"Female"}   
set token in authorization field of header
Output/Res:{     
    "newPatient": {         
        "reports": [],
        "_id": "5eba4fb7d0f30122c896f60d",     
        "mobileNo": "123434444",     
        "name": "Siriti",    
        "gender": "Female",   
        "__v": 0     
    },      
    "message": "Patient registered successfully"     
}     

4)Create Report Patient  
route:-/api/v1/patients/:id/create_report    
METHOD:POST  
Input/Res:{"status":"Travelled-Quarantine"}    
set token in authorization field of header    
Output/res:{       
    "report": {
        "_id": "5eba4fe8d0f30122c896f60e",    
        "status": "Travelled-Quarantine",     
        "doctor": "Ambika",     
        "patient": "5eba4fb7d0f30122c896f60d",     
        "createdAt": "2020-05-12T07:27:36.798Z",    
        "updatedAt": "2020-05-12T07:27:36.798Z",     
        "__v": 0     
    },     
    "message": "Report created succeesfully"    
}   

5)Get all reports   
route:-/api/v1/patients/:id/all_reports   
Method:GET   
set token in authorization field of header   
Output/res:{    
    "All_reports": [     
        {     
            "_id": "5eb7c08660d46928e02872b1",     
            "status": "Travelled-Quarantine",     
            "doctor": "Ambika",     
            "patient": "5eb71d142fc4b20dd7359ee1",     
            "createdAt": "2020-05-10T08:51:18.425Z",    
            "updatedAt": "2020-05-10T08:51:18.425Z",      
            "__v": 0   
        }    
    ]    
}   
6)Get report by status   
route:-api/v1/reports/Travelled-Quarantine  , Can be either of: [Negative, Travelled-Quarantine, Symptoms-Quarantine, Positive-Admit]    
Method:GET   
set token in authorization field of header    
Output/res: {    
    "report": [   
        {   
            "_id": "5eb7c08660d46928e02872b1",  
            "status": "Travelled-Quarantine",   
            "doctor": "Ambika",   
            "patient": {    
                "_id": "5eb71d142fc4b20dd7359ee1",   
                "name": "Raju"  
            },   
            "createdAt": "2020-05-10T08:51:18.425Z",  
            "updatedAt": "2020-05-10T08:51:18.425Z",   
            "__v": 0   
        },   
        {    
            "_id": "5eb7c0c160d46928e02872b3",   
            "status": "Travelled-Quarantine",   
            "doctor": "Ambika",   
            "patient": {    
                "_id": "5eb6c3021dc6306e1a821e3a",   
                "name": "Rajni"    
            },    
            "createdAt": "2020-05-10T08:52:17.477Z",   
            "updatedAt": "2020-05-10T08:52:17.477Z",   
            "__v": 0    
        }    
        
    ]    
}   

