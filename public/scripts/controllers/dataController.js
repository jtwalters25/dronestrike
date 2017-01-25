'use strict';

(function(mod) {
  const dataController = {};

  Data.createTable();

  dataController.index = function(ctx, next) {
    if(ctx.data.length) {
      console.log('in datacontrollerindex if');
      dataView.index(ctx.data);
    } else {
      console.log('in datacontrollerindex if');
      page('/');
    }
  };

  // dataController.loadById = function(ctx, next) {
  //   let droneData = function(data) {
  //     ctx.data = data;
  //     next();
  //   };
  //   Data.findWhere('id', ctx.params.id, droneData);
  // };
  //
  dataController.loadByCountry = function(ctx, next) {
    console.log('in loadbycountry');
    var countryData = function(dataByCountry) {
      ctx.data = dataByCountry;
      next();
    };
    Data.findWhere('country', ctx.params.country, countryData);
  };
  //
  // dataController.loadByCategory = function(ctx, next) {
  //   var categoryData = function(dataInCategory) {
  //     ctx.data = dataInCategory;
  //     next();
  //   };
  //
  //   Data.findWhere('category', ctx.params.categoryName, categoryData);
  // }

  dataController.loadAll = function(ctx, next) {
    console.log('dataalldata length', Data.allData.length);
    if (Data.allData.length) {
      console.log('in if of dc.loadall, alldata', Data.allData.length);
      ctx.data = Data.allData;
    }
    next();
  }

  mod.dataController = dataController;
})(window);
