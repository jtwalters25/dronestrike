'use strict';

(function(mod) {
  const somaliaController = {};
  somaliaController.index = function() {
    $('#map').css('height', '100%');
    $('html').css({'height':'100%', 'margin':'0', 'padding':'0'});
    $('body').css({'height':'100%', 'margin':'0', 'padding':'0'});
    $('section').fadeOut();
    somaliaView.makeMap();
    $('#map').fadeIn();
  };

  mod.somaliaController = somaliaController;
})(window);
