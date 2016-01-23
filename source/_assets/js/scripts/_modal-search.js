angular
  .module('searchApp', [])
  .config([
    '$interpolateProvider', function($interpolateProvider) {
      return $interpolateProvider.startSymbol('{(').endSymbol(')}');
    }
  ])
  .controller('searchController', ['$scope', '$http', function($scope, $http){
    $scope.pesquisar = function(q) {
      $scope.posts = [];
      if (q != "" && q != undefined && q.length >= 1) {
        $http.get('/search.json', { "data" : q }).success(function(data) {
          $scope.posts = data;
        });
      }
    };
  }]);

(function($) {
  'use strict';

  $(document).ready(function($) {
    var $body  = $('body'),
        $modal = $('#modalSearch');

    $('.open-close-search').on('click', function(e) {
      e.preventDefault();

      $modal.stop(true, true).toggleClass('modal-search-open');
      $body.stop(true, true).toggleClass('modal-search-open');
    });
  });

})(jQuery);
