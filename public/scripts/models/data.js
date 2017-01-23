'use strict';

(function(module) {
  function Data (opts) {
    Object.keys(opts).forEach(function(val) {
      this[val] = opts[val];
    }, this);
  }

  Data.allData = [];

  Data.createTable = function(callback) {
    webDB.execute(
      'CREATE TABLE IF NOT EXISTS strikes (' +
        '_id INTEGER PRIMARY KEY, ' +
        'number INTEGER, ' +
        'country VARCHAR(25), ' +
        'date DATETIME (30), ' +
        'narrative VARCHAR (255), ' +
        'town VARCHAR (25), ' +
        'location VARCHAR(60), ' +
        'deaths VARCHAR(255), ' +
        'deaths_min INTEGER, ' +
        'deaths_max INTEGER, ' +
        'civilians INTEGER, ' +
        'injuries INTEGER, ' +
        'children INTEGER, ' +
        'tweet_id INTEGER, ' +
        'bureau_id VARCHAR(25), ' +
        'bij_summary_short VARCHAR(255), ' +
        'bij_link VARCHAR(60), ' +
        'target VARCHAR(60), ' +
        'lat DECIMAL(2,8), ' +
        'lon DECIMAL(3,8), ' +
        'articles VARCHAR(100), ' +
        'names VARCHAR(1200));',
      callback
    );
  };

  Data.prototype.insertRecord = function(callback) {
    webDB.execute(
      [
        {
          'sql': 'INSERT INTO strikes ' +
          '(title, author, authorUrl, category, publishedOn, body) ' +
          'VALUES (?, ?, ?, ?, ?, ?);',
          'data':
            [this.title,
             this.author,
             this.authorUrl,
             this.category,
             this.publishedOn,
             this.body],
        }
      ],
      callback
    );
  };

  Data.prototype.deleteRecord = function(callback) {
    webDB.execute(
      [
        {
          'sql': 'DELETE FROM strikes WHERE id = ?;',
          'data': [this.id]
        }
      ],
      callback
    );
  };

  Data.prototype.updateRecord = function(callback) {
    webDB.execute(
      [
        {
          'sql': 'UPDATE strikes SET '+
          'title = ?, ' +
          'author = ?, ' +
          'authorUrl = ?, ' +
          'category = ?, ' +
          'publishedOn = ?, ' +
          'body = ? ' +
          'WHERE id = ?;',
          'data':
            [this.title,
             this.author,
             this.authorUrl,
             this.category,
             this.publishedOn,
             this.body,
             this.id]
        }
      ],
      callback
    );
  };

  Data.loadAll = function(rows) {
    Data.allData = rows.map(function(ele) {
      return new Data(ele);
    });
  };

  Data.fetchAll = function(callback) {
    webDB.execute(
      'SELECT * FROM strikes ORDER BY publishedOn DESC',
        function(rows) {
          if (rows.length) {
            Data.loadAll(rows);
            callback();
          } else {
            $.getJSON('/data/hackerIpsum.json', function(rawData) {
              rawData.forEach(function(item) {
                var strike = new Data(item);
                strike.insertRecord();
              });
              webDB.execute(
                'SELECT * FROM strikes ORDER BY publishedOn DESC',
                function(rows) {
                  Data.loadAll(rows);
                  callback();
                });
            });
          }
        });
  };

  Data.findWhere = function(field, value, callback) {
    webDB.execute(
      [
        {
          sql: 'SELECT * FROM strikes WHERE ' + field + ' = ?;',
          data: [value]
        }
      ],
      callback
    );
  };

  // DONE: Example of synchronous, FP approach to getting unique data
  Data.allAuthors = function() {
    return Data.allData.map(function(strike) {
      return strike.author;
    })
    .reduce(function(names, name) {
      if (names.indexOf(name) === -1) {
        names.push(name);
      }
      return names;
    }, []);
  };

  Data.allCategories = function(callback) {
    webDB.execute('SELECT DISTINCT category FROM strikes;', callback);
  };

  Data.numWordsAll = function() {
    return Data.allData.map(function(strike) {
      return strike.body.match(/\w+/g).length;
    })
    .reduce(function(a, b) {
      return a + b;
    });
  };

  Data.numWordsByAuthor = function() {
    return Data.allAuthors().map(function(author) {
      return {
        name: author,
        numWords: Data.allData.filter(function(a) {
          return a.author === author;
        })
        .map(function(a) {
          return a.body.match(/\w+/g).length;
        })
        .reduce(function(a, b) {
          return a + b;
        })
      };
    });
  };

  module.Data = Data;
})(window);
