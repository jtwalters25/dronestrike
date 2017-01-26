'use strict';

(function(mod) {
  const countryController = {};

//   articleController.index = function(ctx, next) {
//   if(ctx.articles.length) {
//     articleView.index(ctx.articles);
//   } else{
//     page('/');
//   }
// };
  countryController.index = function() {
    $('#map').css('height', '100%');
    $('html').css({'height':'100%', 'margin':'0', 'padding':'0'});
    $('body').css({'height':'100%', 'margin':'0', 'padding':'0'});
    $('section').fadeOut();
    $('#map').fadeIn();
  };

  mod.countryController = countryController;
})(window);
