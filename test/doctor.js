//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Doctor = require('../models/doctor')

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const should = chai.should();
chai.use(chaiHttp);

describe('Doctors', () => {
	beforeEach((done) => { //Before each test we empty the database
		Doctor.remove({}, (err) => { 
		   done();		   
		});		
    });

});

/*
  * Test the /doctors/register
  */
 describe('/register doctors', () => {
    it('it should check the newly created doctor', (done) => {
          chai.request(server)
          .post('/api/v1/doctors/register')
          .send({
              "email":"kambika1309@gmail.com",
              "name":"Ambika",
              "password":123
          })
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('Doctor registered successfully');
            done();
          });
    });
});

