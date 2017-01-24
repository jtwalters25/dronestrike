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
  // dataController.loadByAuthor = function(ctx, next) {
  //   let authorData = function(dataByAuthor) {
  //     ctx.data = dataByAuthor;
  //     next();
  //   };
  //
  //   Data.findWhere(
  //     'author', ctx.params.authorName.replace('+', ' '), authorData
  //   );
  // };
  //
  // dataController.loadByCategory = function(ctx, next) {
  //   var categoryData = function(dataInCategory) {
  //     ctx.data = dataInCategory;
  //     next();
  //   };
  //
  //   Data.findWhere('category', ctx.params.categoryName, categoryData);
  // };

  dataController.loadAll = function(ctx, next) {
    var droneData = function(allData) {
      ctx.data = Data.allData;
      next();
    };
    console.log('ctx', ctx.data);
    if (Data.allData.length) {
      ctx.data = Data.allData;
      next();
    } else {
      Data.fetchAll(droneData);
    }
  };

  mod.dataController = dataController;
})(window);
