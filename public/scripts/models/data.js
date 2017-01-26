'use strict';

(function(module) {
  function Data (opts) {
    Object.keys(opts).forEach(function(val) {
      this[val] = opts[val];
    }, this);
  }
  var giantObject = {};

  Data.allData = [];

  giantObject.insertRecord = function(obj) {
    console.log('obj', obj);
    $.post('/strikes/insert', {allstrikes: obj})
  }

    Data.loadAll = function(rows) {
      console.log('in loadall');
      Data.allData = rows.map(function(ele) {
        return new Data(ele);
      });
    };

    Data.fetchAll = function(ctx, next) {
      $.get('/strikes/all')
        .then(function(rows) {
          if (rows.length) {
            Data.loadAll(rows);
            console.log(rows.length, 'rows length');
            ctx.data = Data.allData;
            next();
          } else {
            $.ajax({
              url: 'http://api.dronestre.am/data',
              method: 'GET',
              dataType: 'jsonp'
            })
             .then(rawData => {
               var tempData = rawData.strike.map(val => {
                 return {number: val.number, country: val.country, lon: val.lon, lat: val.lat}
               });
               let somalia = tempData.filter(val => {return val.country === 'Somalia'});
               let yemen = tempData.filter(val => {return val.country === 'Yemen'});
               let pakistan = tempData.filter(val => {return val.country.indexOf('P') === 0});
               console.log('s', somalia, 'y', yemen, 'p', pakistan);
               giantObject.insertRecord(JSON.stringify(somalia));
              //  giantObject.insertRecord(JSON.stringify(yemen));
              //  giantObject.insertRecord(JSON.stringify(pakistan));
              //  Data.fetchAll();
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
