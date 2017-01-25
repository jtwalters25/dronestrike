'use strict';

(function(module) {
  function Data (opts) {
    Object.keys(opts).forEach(function(val) {
      this[val] = opts[val];
    }, this);
  }

  Data.allData = [];

  // Data.createTable = function(callback) {
  //   webDB.execute(
  //     'CREATE TABLE IF NOT EXISTS strikes (' +
  //     'id INTEGER PRIMARY KEY,' +
  //     'number INTEGER, ' +
  //     'country VARCHAR (25), ' +
  //     'date VARCHAR (30), ' +
  //     'narrative VARCHAR (255), ' +
  //     'town VARCHAR (25), ' +
  //     'location VARCHAR (60), ' +
  //     'deaths VARCHAR (255), ' +
  //     'deaths_min VARCHAR (10), ' +
  //     'deaths_max VARCHAR (10), ' +
  //     'civilians VARCHAR (10), ' +
  //     'injuries VARCHAR (10), ' +
  //     'children VARCHAR (10), ' +
  //     'tweet_id VARCHAR (20), ' +
  //     'bureau_id VARCHAR (25), ' +
  //     'bij_summary_short VARCHAR(255), ' +
  //     'bij_link VARCHAR (60), ' +
  //     'target VARCHAR (60), ' +
  //     'lat VARCHAR (15), ' +
  //     'lon VARCHAR (15), ' +
  //     'names VARCHAR (1200));',
  //     callback
  //   );
  // };

  Data.prototype.insertRecord = function() {
    $.post('/strikes/insert',
      `{number: ${1}, country: ${2}, date: ${3}, narrative: ${4}, town: ${5}, location: ${6}, deaths: ${7}, deaths_min: ${8}, deaths_max: ${9}, civilians: ${10}, injuries: ${11}, children: ${12}, tweet_id: ${13}, bureau_id: ${14}, date: ${15}, category: ${16}number: ${17}, bij_summary_short: ${18}, bij_link: ${19}, target: ${20},lat: ${21}, lon: ${22}, names: ${23})`,
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
      ])
  }

    Data.loadAll = function(rows) {
      Data.allData = rows.map(function(ele) {
        return new Data(ele);
      });
    };

    Data.fetchAll = function(ctx, next) {
      $.get('/strikes/all')
        .then(function(rows) {
          if (rows.length) {
            console.log('rows in datafetchall',rows);
            Data.loadAll(rows);
            // ctx.data = Data.allData;
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
               Data.fetchAll();
             });
          }
        });
    };

        // Data.findWhere = function(field, value, callback) {
        //   webDB.execute(
        //     [
        //       {
        //         sql: 'SELECT * FROM strikes WHERE ' + field + ' = ?;',
        //         data: [value]
        //       }
        //     ],
        //     callback()
        //   );
        // };

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
