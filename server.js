'use strict'

const pg = require('pg');
pg.defaults.poolSize = 0;
const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const app = express();
const conString = process.env.DATABASE_URL || 'postgres://localhost:5432';

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(express.static('./public'));

app.get('/map', function(request, response){
  response.sendFile('index.html', {root: './public'});
})

app.get('/somalia', function(request, response){
  response.sendFile('index.html', {root: './public'});
})

app.get('/about', function(request, response){
  response.sendFile('index.html', {root: './public'});
})

app.get('/stats', function(request, response){
  response.sendFile('index.html', {root: './public'});
})

app.get('/index', function(request, response){
  response.sendFile('index.html', {root: './public'});
})

app.get('/', function(request, response){
  response.sendFile('index.html', {root: './public'});
})

app.get('/strikes/all', (request, response) => {
  let client = new pg.Client(conString);
  client.connect(err => {
    if (err) console.error(err);
    client.query(
      `SELECT * FROM strikes;`,
      (err, result) => {
        if (err) console.error(err);
        response.send(result);
        client.end();
      }
    );
  })
});

app.post('/strikes/insert', (request, response) => {
  console.log('request body', request.body);
  var client = new pg.Client(conString);
  console.log('in strikes insert');
  client.connect(err => {
    console.log('in strikes insert client connect')
    if (err) console.error(err);
    client.query(
      `INSERT INTO strikes (allstrikes) VALUES ($1);`,
      [ request.body ],
      err => {
        if (err) {
          console.error(err);
          response.send(err);
        }
        console.log('in strikes insert at end of query');
        client.end();
      });
  })
  console.log('in strikes insert before final closing brackety thingies');
})

app.get('*', function(request, response){
  console.log('New request', request.url);
  response.sendFile('404.html', {root: './public'});
})



app.listen(PORT, function(){
  console.log(`server is up and running. and can be accessed at localhost:${PORT}`);
})
