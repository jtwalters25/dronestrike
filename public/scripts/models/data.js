'use strict';

(function(module) {
  function Data (opts) {
    Object.keys(opts).forEach(function(val) {
      this[val] = opts[val];
    }, this);
  }

  Data.allData = [];

  Data.prototype.insertRecord = function() {
      console.log('this', this);
      $.post('/strikes/insert', {number: this.number, country: this.country, date: this.date, narrative: this.narrative, town: this.town, location: this.location, deaths: this.deaths, deaths_min: this.deaths_min, deaths_max: this.deaths_max, civilians: this.civilians, injuries: this.injuries, children: this.children, tweet_id: this.tweet_id, bureau_id: this.bureau_id, bij_summary_short: this.bij_summary_short, bij_link: this.bij_link, target: this.target, lat: this.lat, lon: this.lon, names: this.names})
  };

    Data.loadAll = function(rows) {
      console.log('in loadall');
      Data.allData = rows.map(function(ele) {
        return new Data(ele);
      });
    };


    Data.fetchAll = function(ctx, next) {
      console.log('in data.fetchAll');
      $.get('/strikes/all')
        .then(function(rows) {
          if (rows.length) {
            console.log('rows in datafetchall if',rows);
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
               console.log('rawData after GET', rawData.strike);
               rawData.strike.forEach(function(item) {
                 var strike = new Data(item);
                 console.log('strike', strike);
                 strike.insertRecord();
               });
               Data.fetchAll();
             });
          }
        });
    };

  // Data.findWhere = function(field, value, callback) {
  //   console.log(field, 'field', value, 'value');
  //   console.log(Data.allData);
  //   console.log('findwhere', Data.allData.filter(strike => {strike.field.toUpperCase() === value.toUpperCase()}));
  // }

        // Data.findWhere = function(field, value, callback) {
        //   $.get('/strikes/all')
        //     [
        //       {
        //         sql: 'SELECT * FROM strikes WHERE ' + field + ' = ?;',
        //         data: [value]
        //       }
        //     ],
        //     callback()
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
