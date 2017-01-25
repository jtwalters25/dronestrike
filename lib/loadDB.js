'use strict'

const Promise = require('bluebird')
const fsProm = Promise.promisifyAll(require('fs'))
const pg = require('pg')
const Pool = pg.Pool
const ops = module.exports = {}
console.log('in loadb')
const pool = new Pool({
  user: process.env.USER,
  password: '',
  host: 'localhost',
  database: process.env.USER,
  max: 10,
  idleTimeoutMillis: 1000
})

pool.on('error', e => console.error(e))

function SQL(parts, ...values) {
  return {
    text: parts.reduce((prev, curr, i) => `${prev}$${i}${curr}`),
    values
  };
}

const getAuthorId = function(record) {
  return new Promise((res, rej) => {
    res(
      pool.query(SQL`SELECT author_id FROM authors WHERE author=${record.author}`)
      .then(id => {
        record.id = id.rows[0].author_id
        return record
      })
    )
    .catch(err => rej(err))
  })
}

const loadRecordArticle = function(record) {
  return new Promise((res, rej) => {
    res(pool.query(SQL`INSERT INTO
                       articles(author_id, title, category, "publishedOn", body)
                       VALUES(${record.id}, ${record.title}, ${record.category}, ${record.publishedOn}, ${record.body})`))
    .catch(err => rej(err))
  })
}



ops.createTableStrike = function() {
  console.log('createTableStrike');
  return new Promise((res, rej) => {
    const sqlCreate =
      'CREATE TABLE IF NOT EXISTS strikes (' +
      'id INTEGER PRIMARY KEY,' +
      'number INTEGER, ' +
      'country VARCHAR (25), ' +
      'date VARCHAR (30), ' +
      'narrative VARCHAR (255), ' +
      'town VARCHAR (25), ' +
      'location VARCHAR (60), ' +
      'deaths VARCHAR (255), ' +
      'deaths_min VARCHAR (10), ' +
      'deaths_max VARCHAR (10), ' +
      'civilians VARCHAR (10), ' +
      'injuries VARCHAR (10), ' +
      'children VARCHAR (10), ' +
      'tweet_id VARCHAR (20), ' +
      'bureau_id VARCHAR (25), ' +
      'bij_summary_short VARCHAR(255), ' +
      'bij_link VARCHAR (60), ' +
      'target VARCHAR (60), ' +
      'lat VARCHAR (15), ' +
      'lon VARCHAR (15), ' +
      'names VARCHAR (1200));'
    res(
      pool.query(sqlCreate)
      .then(() => console.log('db created'))
      .catch(err => rej(err))
    )
  })
}

// ops.loadStrikes = (file) => {
//   return fsProm.readFileAsync(`${__dirname}/../public/data/${file}`)
//   .then(data => JSON.parse(data.toString().trim()))
//   .then(records => records.map(getAuthorId))
//   .then(proms => Promise.all(proms))
//   .then(records => records.map(loadRecordArticle))
//   .then(() => console.log('articles loaded successfully'))
//   .then(proms => Promise.all(proms))
//   .catch(err => console.error(err))
// }
