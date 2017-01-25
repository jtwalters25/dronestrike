'use strict'

// const pg = require('pg');
const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const app = express();
const conString = process.env.DATABASE_URL || 'postgres://localhost:5432';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('./public'));

app.get('/map', function(request, response){
  response.sendFile('index.html', {root: './public'});
})

app.get('/about', function(request, response){
  response.sendFile('index.html', {root: './public'});
})

app.get('/stat', function(request, response){
  response.sendFile('index.html', {root: './public'});
})

app.get('/index', function(request, response){
  response.sendFile('index.html', {root: './public'});
})

app.get('/', function(request, response){
  response.sendFile('index.html', {root: './public'});
})


app.get('*', function(request, response){
  console.log('New request', request.url);
  response.sendFile('404.html', {root: './public'});
})
app.listen(PORT, function(){
  console.log(`server is up and running. and can be accessed at localhost:${PORT}`);
})
