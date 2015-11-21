'use strict';


angular.module('app', [
    'ui.router',
    'ui.bootstrap',
    'oc.lazyLoad',
    'firebase',
    'simpleLogin',
    'leaflet-directive'
])

  .run(['simpleLogin', function(simpleLogin) {
    //console.log('run'); //debug
    simpleLogin.getUser();
  }])

