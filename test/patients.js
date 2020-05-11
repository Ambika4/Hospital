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

describe('/register patient', () => {
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
  })

describe('/register patient', () => {
it('it should return newly created patient', done => {
  const patient= {
    mobileNo: 9836531711,
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
})

describe('/register patient', () => {
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
      res.body.newPatient.should.have.property('name');
      res.body.newPatient.should.have.property('mobileNo');
      res.body.newPatient.should.have.property('gender');
      done()
     })
  
    })
  })