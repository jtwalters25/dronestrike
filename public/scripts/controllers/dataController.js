'use strict';

(function(mod) {
  const dataController = {};

  Data.createTable();

  dataController.index = function(ctx, next) {
    if(ctx.data.length) {
      dataView.index(ctx.data);
    } else{
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
    let countryData = function(dataByCountry) {
      ctx.data = dataByCountry;
      next();
    };
    Data.findWhere(
      'country', ctx.params.countryName.replace('+', ' '), countryData
    );
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
    if (Data.allData.length) {
    var droneData = function(allData) {
      ctx.data = Data.allData;
    };

    if (Data.allData.length) {
      console.log('what up punk');
      ctx.data = Data.allData;
      next();
    }
    }
  }

  mod.dataController = dataController;
})(window);
