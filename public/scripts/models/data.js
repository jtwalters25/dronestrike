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
      'names VARCHAR (1200));',
      callback
    );
  };

  Data.prototype.insertRecord = function(callback) {
    webDB.execute(
      [
        {
          'sql': 'INSERT INTO strikes ' +
          '(number, country, date, narrative, town, location, deaths, deaths_min, deaths_max, civilians, injuries, children, tweet_id, bureau_id, bij_summary_short, bij_link, target, lat, lon, names) ' +
          'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
          'data':
          [
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
            this.names
          ]
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

    Data.fetchAll = function(ctx, next) {
      webDB.execute(
        'SELECT * FROM strikes ORDER BY number DESC',
        function(rows) {
          if (rows.length) {
            console.log('rows',rows);
            Data.loadAll(rows);
            ctx.data = Data.allData;
            next();
          } else {
            $.ajax({
              url: 'http://api.dronestre.am/data',
              method: 'GET',
              dataType: 'jsonp'
            })
             .then(rawData => {
               rawData.strike.forEach(function(item) {
                 console.log('rawData', rawData.strike);
                 var strike = new Data(item);
                 strike.insertRecord();
               });
               webDB.execute(
                'SELECT * FROM strikes ORDER BY date DESC',
                function(rows) {
                  Data.loadAll(rows);
                  ctx.data = Data.allData;
                  next();
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

        Data.allCountries = function() {
          return Data.allData.map(function(strike) {
            return strike.country;
          })
          .reduce(function(names, name) {
            if (names.indexOf(name) === -1) {
              names.push(name);
            }
            return names;
          }, []);
        };

        // Data.allCategories = function(callback) {
        //   webDB.execute('SELECT DISTINCT category FROM strikes;', callback);
        // };

          module.Data = Data;
        })(window);
