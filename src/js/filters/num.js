'use strict';

/* Filters */
// need load the moment.js to use this filter. 
angular.module('app')
.filter('num',
     [
     function() {
      return function(input) {
      return parseInt(input, 10);
    }
     } ]);  





/*
angular.module('app')
     .filter('num', function() {
    return function(input) {
      return parseInt(input, 10);
    }
});

*/