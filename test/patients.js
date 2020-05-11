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


//so that token can be genrated and used firther
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
it('it should return newly created patient', done => {
  const patient= {
    mobileNo: 9836531704,
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
    done()
   })

  })
})

