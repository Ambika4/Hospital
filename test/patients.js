//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Patient = require('../models/patient')

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const should = chai.should();
chai.use(chaiHttp);

describe('Patients', () => {
	beforeEach((done) => { //Before each test we empty the database
		Patient.remove({}, (err) => { 
		   done();		   
		});		
    });

});

