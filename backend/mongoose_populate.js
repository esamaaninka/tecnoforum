require('dotenv').config()
var assert = require('assert')
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Types.ObjectId;

function task() {
    console.log('setTimeout Demo!')
}


console.log('\n===========');
console.log('    mongoose version: %s', mongoose.version);
console.log('========\n\n');

const url = process.env.MONGODB_LOCAL_POPULATE_URI
console.log('connecting to ', url)
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.on('error', function () {
    console.error('connection error', arguments);
  });

  
var user = new Schema({
    name: String
    , phone: String
    , friends: [{ type: Schema.ObjectId, ref: 'User' }]
});
user.set('toObject', { depopulate: true })

var User = mongoose.model('User', user);

var blogpost = Schema({
    title: String
  , category: String  
  , tags: [String]
  , author: { type: Schema.ObjectId, ref: 'User' }
})
blogpost.set('toObject', { depopulate: true })

var BlogPost = mongoose.model('BlogPost', blogpost);




mongoose.connection.on('open', function () {
  var userIds = [new ObjectId, new ObjectId, new ObjectId, new ObjectId];
  var users = [];

  users.push({
      _id: userIds[0]
    , name: 'mary'
    ,phone: '123456'
    , friends: [userIds[1], userIds[2], userIds[3]]
  });
  users.push({
      _id: userIds[1]
    , name: 'bob'
    ,phone: '1234567'
    , friends: [userIds[0], userIds[2], userIds[3]]
  });
  users.push({
      _id: userIds[2]
    , name: 'joe'
    ,phone: '12345678'
    , friends: [userIds[0], userIds[1], userIds[3]]
  });
  users.push({
      _id: userIds[3]
    , name: 'sally'
    ,phone: '123456789'
    , friends: [userIds[0], userIds[1], userIds[2]]
  });

  User.create(users, function (err, docs) {
    assert.ifError(err);
    

    var blogposts = [];
    blogposts.push({ title: 'blog 1', category: 'JII', tags: ['fun','cool'], author: userIds[3] })
    blogposts.push({ title: 'blog 2', category: 'HAA',tags: ['cool'], author: userIds[1] })
    blogposts.push({ title: 'blog 3', category: 'HUU',tags: ['fun','odd'], author: userIds[2] })

    BlogPost.create(blogposts, function (err, docs) {
      assert.ifError(err);
        
      
      BlogPost.find({ tags: 'fun' })
        .lean()
        .populate('author')
        .exec(function (err, docs) { // Sally: Mary,Bob, Joe   Joe: Mary,Bob, Sally
          assert.ifError(err);
          //console.log('temp log: ', docs);

          var opts = {
            path: 'author.friends'
          , select: 'name'
          , options: { limit: 5 }
          }
        
          BlogPost.populate(docs, opts, function (err, docs) {
            assert.ifError(err);
            console.log('-----');
            console.log(docs);
            done();
        })
        
      })
      
      
    })

})
  })


function done (err) {
  console.log("odotetaan hetki ennen droppausta? ")
  setTimeout(task, 3000);
  if (err) console.error(err.stack);
     mongoose.connection.db.dropDatabase(function () {

    mongoose.connection.close();
    });
}