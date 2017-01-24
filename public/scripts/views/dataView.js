'use strict';

(function(viewModule) {

  var dataView = {};

  var render = function(data) {
    var template = Handlebars.compile($('#data-template').text());
    return template(data);
  };

  // dataView.populateFilters = function() {
  //   var options;
  //   var template = Handlebars.compile($('#option-template').text());
  //   options = Data.allCountries()
  //     .map(function(country) {
  //       return template({val: country});
  //     });
  //   $('#author-filter').append(options);
  //
  //   Data.allCategories(function(rows) {
  //     $('#category-filter').append(
  //       rows.map(function(row) {
  //         return template({val: row.category});
  //       })
  //     );
  //   });
  // };

  // dataView.handleFilters = function() {
  //   $('#filters').one('change', 'select', function() {
  //     var resource = this.id.replace('-filter', '');
  //     $(this).parent().siblings().children().val('');
  //     page('/' + resource + '/' +
  //       $(this).val().replace(/\W+/g, '+')
  //     );
  //   });
  // };

  dataView.index = function(data) {
    $('#data').show()
    $('#nav').hide();

    $('#data article').remove();
    data.forEach(function(a) {
      $('#data').append(render(a));
    });

    // dataView.populateFilters();
    // dataView.handleFilters();

  };

  viewModule.dataView = dataView;
})(window);
