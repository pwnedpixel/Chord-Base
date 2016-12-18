console.log('May Node be with you')

const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient
var bodyParser = require('body-parser');
var router = express.Router();
var User = require('./data/users');
var Song=  require('./data/songs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var db
MongoClient.connect('mongodb://andy:andy@ds163377.mlab.com:63377/chordbase', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(8081, () => {
    console.log('listening on 8081')
  })
})

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
});

router.get('/', function(req, res) {
    res.json({
        message: 'hooray! welcome to our api!'
    });
})
//USERS------------------------------------------------------------------
//Get all users
.get('/usr',(req, res) => {
  db.collection('users').find().toArray((err, result) => {
    res.json(result)
  })
})
//get user by Email
.get('/usr/u/:email',(req, res) => {
  db.collection('users').find({userName:req.params.email}).toArray((err, result) => {
    res.json(result)
  })
})

.post('/usr', (req, res) => {
  db.collection('users').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.json({message: 'user added'});
  })
})
//SONGS--------------------------------------------------------------------
//Get all songs
.get('/song',(req, res) => {
  db.collection('songs').find().toArray((err, result) => {
    res.json(result)
  })
})
//Get Users Songs
.get('/song/u/:user',(req, res) => {
  db.collection('songs').find({author:req.params.user}).toArray((err, result) => {
    res.json(result)
  })
})

//Get Public Songs
.get('/song/p',(req, res) => {
  db.collection('songs').find({public:"true"}).toArray((err, result) => {
    res.json(result)
  })
})

//Get song by ID
.get('/song/f/:id',(req, res) => {
  var ObjectId = require('mongodb').ObjectId;
  var id = req.params.id;
  var o_id = new ObjectId(id);
  db.collection('songs').find({_id:o_id}).toArray((err, result) => {
    res.json(result)
  })
})

//Update a song
.put('/song/f/:id',(req, res) => {
  var ObjectId = require('mongodb').ObjectId;
  var id = req.params.id;
  var o_id = new ObjectId(id);
  db.collection('songs').update({_id:o_id},req.body, (err, result) =>{
    if (err) return console.log(err)

    console.log("updated");
    res.json({message: 'Song updated'});
  })
})

.delete('/song/f/:id',(req, res) => {
  var ObjectId = require('mongodb').ObjectId;
  var id = req.params.id;
  var o_id = new ObjectId(id);
  db.collection('songs').remove({_id:o_id},(err, result) => {
    res.json(result)
  })
})


.post('/song', (req, res) => {
  db.collection('songs').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.json({message: 'Song added'});
  })
})


app.use('/api', router);
