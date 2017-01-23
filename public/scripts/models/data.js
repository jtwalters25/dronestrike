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
          ('_id, number, country, date, narrative, town, location, deaths, deaths_min, deaths_max, civilians, injuries, children, tweet_id, bureau_id, bij_summary_short, bij_link, target, lat, lon, articles, names') +
          'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
          'data':
          [
            this._id,
            this.number,
            this.country,
            this.date,
            this.narrative,
            this.town,
            this.location,
            this.deaths,
            this.deaths_min,
            this.deaths_max,
            this.civilians,
            this.injuries,
            this.children,
            this.tweet_id,
            this.bureau_id,
            this.bij_summary_short,
            this.bij_link,
            this.target,
            this.lat,
            this.lon,
            this.articles,
            this.names]
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
            $.get('http://api.dronestre.am/data')
             .then(rawData => {
               rawData.forEach(function(item) {
               var strike = new Data(item);
               strike.insertRecord();
              });
              webDB.execute(
                'SELECT * FROM strikes ORDER BY date DESC',
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

          module.Data = Data;
        })(window);
