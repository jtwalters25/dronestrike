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

ops.createTableStrike = function() {
  console.log('createTableStrike');
  return new Promise((res, rej) => {
    const sqlCreate =
      `CREATE TABLE IF NOT EXISTS strikes (allstrikes VARCHAR);`
      //       'number INTEGER PRIMARY KEY,' +
      // 'country VARCHAR, ' +
      // 'date VARCHAR, ' +
      // 'narrative VARCHAR, ' +
      // 'town VARCHAR, ' +
      // 'location VARCHAR, ' +
      // 'deaths VARCHAR, ' +
      // 'deaths_min VARCHAR, ' +
      // 'deaths_max VARCHAR, ' +
      // 'civilians VARCHAR, ' +
      // 'injuries VARCHAR, ' +
      // 'children VARCHAR, ' +
      // 'tweet_id VARCHAR, ' +
      // 'bureau_id VARCHAR, ' +
      // 'bij_summary_short VARCHAR, ' +
      // 'bij_link VARCHAR, ' +
      // 'target VARCHAR, ' +
      // 'lat VARCHAR, ' +
      // 'lon VARCHAR, ' +
      // 'names VARCHAR);'
    res(
      pool.query(sqlCreate)
      .then(() => console.log('db created'))
      .catch(err => rej(err))
    )
  })
}
