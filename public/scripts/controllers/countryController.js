'use strict';

(function(mod) {
  const countryController = {};

  countryController.index = function(ctx) {
    $(`#${ctx.params.name}`).css('height', '100%');
    $('html').css({'height':'100%', 'margin':'0', 'padding':'0'});
    $('body').css({'height':'100%', 'margin':'0', 'padding':'0'});
    $('section').fadeOut();
    $(`#${ctx.params.name}`).fadeIn();
  };

  mod.countryController = countryController;
})(window);
