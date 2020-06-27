var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../index');
var User = require('../models/user');
//const { resource } = require('../app');
//var expect = chai.expect;


var user_id = ""
var user_token = ""

var should = chai.should();
chai.use(chaiHttp);

describe('User', function() {
    it('should list ALL users on /api/users GET', function(done) {
      chai.request(server)
      //chai.request('http://localhost:3001')
        .get('/api/users')            
        .end(function(err, res){
          res.should.have.status(200);
          res.should.be.json; // ei tartu jos xml ? 
          res.body.should.be.a('array'); // 
          res.body[0].should.have.property('email');
          res.body[0].should.have.property('fullname');
          res.body[0].fullname.should.equal('Pekka Pouta');
          res.body[0].email.should.equal('pekkas@mtv3.fi');
          done();
        })
    })
    /* tämä ei toimi
    it('should list a SINGLE user on /api/users/<id> GET', function(done) {
      var newUser = new User({
        email: "mocha@gmail.com",
        fullname: "Mocha TestUser",
        password: "salasana"
      })
      newUser.save(function(err, data)  {
      chai.request(server)        
        .get('/api/users/'+data.id)            
        .end(function(err, res){
          //res.should.have.status(200);
          res.should.be.json; 
          res.body.should.be.a('object'); // 
          res.body.should.have.property('email');
          res.body.should.have.property('_id');          
          res.body.email.should.equal('mocha@gmail.com');
          res.body._id.should.equal(data.id)
          done();
        })
      })
    }) */
    it('should add a SINGLE user on /api/users POST', function(done) {
      chai.request(server)
      .post('/api/users')
      .send({'email': 'mocha.admin@gmail.com', 
            'password': 'salasana', 
            'fullname': 'Mocha Admin', 
            'nickname': 'coffee',
            'userType': 'admin'
        })
      .end(function(err, res){
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('email');
        res.body.should.have.property('id'); 
        res.body.email.should.equal('mocha.admin@gmail.com');
        res.body.fullname.should.equal('Mocha Admin');
        user_id = res.body.id; // save for later deleting 
        //user_token = res.body.token // talletettava ennenkuin voi poistaa ?
        done();
      });

    })
    /* login, token saatava ennenkuin voidaan update, delete tehdä
    describe('Login API', function() { */
    it('Should success if credential is valid', function(done) {
      chai.request(server)
        .post('/api/users/login')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        //.set('Authorization', token)
        .send({ email: 'mocha.admin@gmail.com', password: 'salasana' })                          
        .end(function(err,res){
          console.log('login result: ', res.body)
          res.should.have.status(200)
          res.body.should.have.property('token')
          user_token = res.body.token
          done()
          }); 
    })
  
    it('should update a SINGLE user on /api/users/<id> PUT');
    })
   /* it('should delete a SINGLE user on /api/users/<id> DELETE', function(done) {
      chai.request(server)
      .delete('/api/users/'+user_id)
      .end(function(error, response) {
        response.should.have.status(204)
      })  
    })*/
  

/*
describe('Comments', function() {
    it('should list ALL blobs on /api/comments GET');
    it('should list a SINGLE blob on /api/comments/<id> GET');
    it('should add a SINGLE blob on /api/comments POST');
    it('should update a SINGLE blob on /api/comments/<id> PUT');
    it('should delete a SINGLE blob on /api/comments/<id> DELETE');
  });

describe('Category', function() {
    it('should list ALL blobs on /api/categories GET');
    it('should list a SINGLE blob on /api/categories/<id> GET');
    it('should add a SINGLE blob on /api/categories POST');
    it('should update a SINGLE blob on /api/categories/<id> PUT');
    it('should delete a SINGLE blob on /api/categories/<id> DELETE');
  });

describe('Thread', function() {
    it('should list ALL blobs on /api/threads GET');
    it('should list a SINGLE blob on /api/threads/<id> GET');
    it('should add a SINGLE blob on /api/threads POST');
    it('should update a SINGLE blob on /api/threads/<id> PUT');
    it('should delete a SINGLE blob on /api/threads/<id> DELETE');
  }); 
  */