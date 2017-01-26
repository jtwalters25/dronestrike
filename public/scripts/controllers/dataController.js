'use strict';

(function(mod) {
  const dataController = {};

  // Data.createTable();

  dataController.index = function(ctx, next) {
    if(ctx.data.length) {
      dataView.index(ctx.data);
    } else {
      page('/');
    }
  };

  dataController.loadByCountry = function(ctx, next) {
    console.log('in loadbycountry');
    var countryData = function(dataByCountry) {
      ctx.data = dataByCountry;
      console.log('ctx.data', ctx.data);
      next();
    };
    let temp = ctx.pathname;
    ctx.pathname = temp.slice(1,(temp.length));
    console.log('name', ctx.pathname);
    Data.findWhere('country', ctx.pathname, countryData);
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
      ctx.data = Data.allData;
    }
    next();
  }

  mod.dataController = dataController;
})(window);
