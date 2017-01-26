'use strict'

const pg = require('pg');
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
        response.send(result.rows);
        client.end();
      }
    );
  })
});

app.post('/strikes/insert', (request, response) => {
  var client = new pg.Client(conString);
  client.connect(err => {
    if (err) console.error(err);
    client.query(
      `INSERT INTO strikes (number, country, date, narrative, town, location, deaths, deaths_min, deaths_max, civilians, injuries, children, tweet_id, bureau_id, bij_summary_short, bij_link, target, lat, lon, names) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20);`,
      [ request.body.number,
        request.body.country,
        request.body.date,
        request.body.narrative,
        request.body.town,
        request.body.location,
        request.body.deaths,
        request.body.deaths_min,
        request.body.deaths_max,
        request.body.civilians,
        request.body.injuries,
        request.body.children,
        request.body.tweet_id,
        request.body.bureau_id,
        request.body.bij_summary_short,
        request.body.bij_link,
        request.body.target,
        request.body.lat,
        request.body.lon,
        request.body.names],
      err => {
        if (err) console.error(err);
      });
  })
})

app.get('*', function(request, response){
  console.log('New request', request.url);
  response.sendFile('404.html', {root: './public'});
})



app.listen(PORT, function(){
  console.log(`server is up and running. and can be accessed at localhost:${PORT}`);
})
