'use strict';

/* Controllers */
  // signin controller
app.controller('HomeCtrl', ['$scope', '$fbutil', 'user', function($scope, $fbutil, $user) {

    $scope.syncedValue = fbutil.syncObject('syncedValue');
    $scope.user = user;
    $scope.FBURL = FBURL;
}])
;



/*   function ($scope, fbutil, user, FBURL) { */