//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Patient = require('../models/patient');
let Doctor = require('../models/doctor');
let token='';

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const should = chai.should();
chai.use(chaiHttp);


//so that token can be genrated and used further
describe('/login doctors', () => {
  it('it should check the created doctor logged in', (done) => {
        chai.request(server)
        .post('/api/v1/doctors/login')
        .send({
            "email":"kambika1309@gmail.com",
            "password":123
        })
        .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.an('object')
              res.body.should.have.property('token')
              token = res.body.token
              
          done();
        });
  });

});


describe('/patients/register', () => {
  it('it should return 403 forbidden as accessing without token', done => {
    const patient= {
      mobileNo: 9836531701,
      name:"Alisha",
      gender:"Female"
    }
   
    chai
     .request(server)
     .post('/api/v1/patients/register')
     .send(patient)
     .end((err, res) => {
      res.should.have.status(403)
      res.body.should.be.an('object')
      done()
     })
  
    })



it('it should return newly created patient', done => {
  const patient= {
    mobileNo: 9836531713,
    name:"Alisha",
    gender:"Female"
  }

  chai
   .request(server)
   .post('/api/v1/patients/register')
   .set('authorization', `bearer ${token}`)
   .send(patient)
   .end((err, res) => {
    res.should.have.status(200)
    res.body.should.be.a('object')
    res.body.should.have.property('message').eql('Patient registered successfully')
    res.body.newPatient.should.have.property('name');
    res.body.newPatient.should.have.property('mobileNo');
    res.body.newPatient.should.have.property('gender');
   
    done()
   })

  })


  it('it should return already existing patient', done => {
    const patient= {
      mobileNo: 9836531710,
      name:"Alisha",
      gender:"Female"
    }
   
    chai
     .request(server)
     .post('/api/v1/patients/register')
     .set('authorization', `bearer ${token}`)
     .send(patient)
     .end((err, res) => {
      res.should.have.status(200)
      res.body.should.be.a('object')
      res.body.should.have.property('message').eql('Patient already exist')
      res.body.patient.should.have.property('name');
      res.body.patient.should.have.property('mobileNo');
      res.body.patient.should.have.property('gender');
      done()
     })
  
    })
  })


describe('/patients/:id/create_report',() =>{
  it('it should create report for patient of given id by logged in doctor', (done) => {
  
      chai
      .request(server)
      .post('/api/v1/patients/5eb9a09e9e049839e1a4cf36/create_report')
      .set('authorization', `bearer ${token}`)
      .send({
        status:"Travelled-Quarantine"
      })
      .end((err,res)=>{
        res.should.have.status(200);
        res.body.should.be.an('object')
        res.body.report.should.have.property('status')
        res.body.report.should.have.property('doctor')
        res.body.report.should.have.property('patient')
        done()
      })
    })
  

  it('it should give status 403 as accessing without token', (done) => {
   
      chai
      .request(server)
      .post('/api/v1/patients/5eb9a09e9e049839e1a4cf36/create_report')
      .send({
        status:"Travelled-Quarantine"
      })
      .end((err,res)=>{
        res.should.have.status(403);
        res.body.should.be.an('object')
        done()
      })
    })
  })
