'use strict';

(function(mod) {
  const homeController = {};
  homeController.index = function(ctx, next) {
    $('html').css({'height':'100%', 'margin':'auto', 'padding':'inherit'});
    $('section').fadeOut();
    $('#home').fadeIn();
    next();
  };

  mod.homeController = homeController;
})(window);
