'use strict';

(function(mod) {
  const aboutController = {};
  aboutController.index = function() {
    console.log('in about cotroller');
    $('html').css({'height':'100%', 'margin':'auto', 'padding':'inherit'});
    $('section').hide();
    $('#aboutUs').fadeIn();
  };

  mod.aboutController = aboutController;
})(window);
