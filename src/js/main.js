'use strict';

/* Controllers */

angular.module('app')
    .controller('AppCtrl', ['$scope', '$window',
        function($scope, $window) {
            // add 'ie' classes to html

            // config
            $scope.app = {
                name: 'Vibesample',
                version: '.5',
                // for chart colors
                color: {
                    primary: '#7266ba',
                    info: '#23b7e5',
                    success: '#27c24c',
                    warning: '#fad733',
                    danger: '#f05050',
                    light: '#e8eff0',
                    dark: '#3a3f51',
                    black: '#1c2b36'
                },
                settings: {
                    themeID: 1,
                    navbarHeaderColor: 'bg-white-only',
                    navbarCollapseColor: 'bg-white-only',
                    asideColor: 'bg-black',
                    headerFixed: true,
                    asideFixed: false,
                    asideFolded: false,
                    asideDock: false,
                    container: false
                }
            }

        }
    ]);
