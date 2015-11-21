'use strict';


angular.module('app', [
    'ui.router',
    'ngStorage',
    'ui.bootstrap',
    'oc.lazyLoad',
    'pascalprecht.translate',
    'firebase',
    'simpleLogin',
    'changeEmail',
    'leaflet-directive'
])

  .run(['simpleLogin', function(simpleLogin) {
    //console.log('run'); //debug
    simpleLogin.getUser();
  }])

