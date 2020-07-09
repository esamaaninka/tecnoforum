var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../index');
var User = require('../models/user');
var config = require('../utils/config');
const logger = require('../utils/logger');
//const { resource } = require('../app');
//var expect = chai.expect;


var user_id = ""
var user_token = ""
var admin_token = ""
var broken_token = "ey1hbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik1vY2hhIEFkbWluIiwiaWQiOiI1ZWZkYmM2YmUwZjY3ZDhhMDQyYTZiMzkiLCJpYXQiOjE1OTM2ODc1NzV9._znN2oYOSlhmuYcELqK7N2_p3c6_kwIMOdZxReSCs-I"

var should = chai.should();
chai.use(chaiHttp);

// delete db before running tests

logger.info('MOCHA with CHAI')
// check whether we are in test/local mode then drop collection
//if(config.MODE) {
//  logger.info('Dropping user collection')
  //User.collection.drop(); 
//}

/* before - after -hooks will be run for  each  test
  beforeEach(function(done){
    var newUser = new User({
      fullname: 'Mocha Deplorable',
      email: 'mocha.deplorable@test.com',
      nickname: 'mocha test user'
    });
    newUser.save(function(err) {
      done();
    });
  });

  afterEach(function(done){
    User.collection.drop();
    done();
  });
*/
describe('Drop collection', function() {
  it('should drop User collection', function(done) {
    if(config.MODE) {
      logger.info('Dropping user collection')
      User.collection.drop()
    }
    done()
  })
})
  

describe('User', function() {
  it('should add a SINGLE deplorable user on /api/users POST', function(done) {
    chai.request(server)
    .post('/api/users')
    .send({'email': 'mocha.deplorable@test.com', 
          'password': 'salasana', 
          'fullname': 'Mocha Deplorable', 
          'nickname': 'java',
          'userType': 'user'
      })
    .end(function(err, res){
      res.should.have.status(201);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('email');
      res.body.should.have.property('id'); 
      res.body.email.should.equal('mocha.deplorable@test.com');
      res.body.fullname.should.equal('Mocha Deplorable');
      user_id = res.body.id; // save for later deleting 
      done();
    });
  })
    
  it('should add a SINGLE admin user on /api/users POST', function(done) {
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
      done();
    })
  })

  it('should list ALL users on /api/users GET', function(done) {
    chai.request(server)
    
      .get('/api/users')            
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json; // ei tartu jos xml ? 
        res.body.should.be.a('array'); // 
        res.body[0].should.have.property('email');
        res.body[0].should.have.property('fullname');
        res.body[0].fullname.should.equal('Mocha Deplorable');
        res.body[0].email.should.equal('mocha.deplorable@test.com');
        done();
      })
  }) 

    //describe('Login API', function() { 
  it('Admin Login should success if credential is valid', function(done) {
    chai.request(server)
      .post('/api/users/login')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({ email: 'mocha.admin@gmail.com', password: 'salasana' })                          
      .end(function(err,res){
        //console.log('login result: ', res.body)
        res.should.have.status(200)
        res.body.should.have.property('token')
        admin_token = res.body.token
        done()
        }); 
  })

  it('User Login should success if credential is valid', function(done) {
    chai.request(server)
      .post('/api/users/login')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({ email: 'mocha.deplorable@test.com', password: 'salasana' })                          
      .end(function(err,res){
        //console.log('login result: ', res.body)
        res.should.have.status(200)
        res.body.should.have.property('token')
        user_token = res.body.token
        done()
        }); 
  })

  // update with ADMIN token
  it('should update by Admin a user on /api/users/<id> PUT', function(done){
    chai.request(server)
      .put('/api/users/')
      .set('Authorization', `bearer ${admin_token}`)
      .send({'id': `${user_id}`,'nickname': 'admin assigned', 'email': "mocha_deplorable@test.com",'fullname':'Mocha Deplorable'})
      .end(function(err, res){
        res.should.have.status(200)
        res.body.nickname.should.equal('admin assigned')
        done()
      })
    })

  // update with USER token
  it('should update by User itself on /api/users/<id> PUT', function(done){
    chai.request(server)
      .put('/api/users/')
      .set('Authorization', `bearer ${user_token}`)
      .send({'id': `${user_id}`, 'nickname': 'updated by myself','email': "mocha_deplorable@test.com", 'fullname': 'Mocha Deplorable'})
      .end(function(err, res){
        //console.log('test driver got put response: ', res.body)
        res.should.have.status(200)
        res.body.nickname.should.equal('updated by myself')
        done()
      })
    })

    it('should fail (not admin) to delete a SINGLE user on /api/users/<id> DELETE', function(done) {
      chai.request(server)
      .delete('/api/users/'+user_id)
      .set('Authorization', `bearer ${user_token}`)
      .end(function(error, response) {
        response.should.have.status(401)
        done()
      })  
    })

    it('should fail (broken token) to delete a SINGLE user on /api/users/<id> DELETE', function(done) {
      chai.request(server)
      .delete('/api/users/'+user_id)
      .set('Authorization', `bearer ${broken_token}`)
      .end(function(error, response) {
        response.should.have.status(401)
        done()
      })  
    })
  

  it('should delete a SINGLE user on /api/users/<id> DELETE', function(done) {
    chai.request(server)
    .delete('/api/users/'+user_id)
    .set('Authorization', `bearer ${admin_token}`)
    .end(function(error, response) {
      response.should.have.status(204)
      done()
    })  
  })

})


describe('Comments', function() {
    it('should list ALL Comments on /api/comments GET', function(done){
      chai.request(server)
      .get('/api/comments')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json; // ei tartu jos xml ? 
        res.body.should.be.a('array'); // 
        res.body[0].should.have.property('comment');
        res.body[0].should.have.property('user_id')
        done()
      })
    });
    it('should list a SINGLE Comment on /api/comments/<id> GET');
    it('should add a SINGLE Comment on /api/comments POST');
    it('should update a SINGLE Commenton /api/comments/<id> PUT');
    
    it('should delete a SINGLE user on /api/comments/<id> DELETE', function(done) {
      chai.request(server)
      .delete('/api/comments/'+comment_id)
      .set('Authorization', `bearer ${admin_token}`)
      .end(function(error, response) {
        response.should.have.status(204)
        // check that deleted comment id removed from threads and user
        done()
      })  
    })
  });
/*
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