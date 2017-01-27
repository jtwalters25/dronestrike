'use strict';

(function(mod) {
  const homeController = {};
  homeController.index = function() {
    $('html').css({'height':'100%', 'margin':'auto', 'padding':'inherit'});
    $('section').fadeOut();
    $('#home').fadeIn();
  };

  mod.homeController = homeController;
})(window);
