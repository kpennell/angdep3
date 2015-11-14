'use strict';


angular.module('app', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'ngStorage',
    'ui.bootstrap',
    'ui.utils',
    'ui.load',
    'ui.jq',
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


/*
  .run(['simpleLogin', function(simpleLogin) {
    //console.log('run'); //debug
    simpleLogin.getUser();
  }]);
*/

// config

var app =  angular.module('app').config(
    [        '$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
    function ($controllerProvider,   $compileProvider,   $filterProvider,   $provide) {

        // lazy controller, directive and service
        //app.controller = $controllerProvider.register;
        app.directive  = $compileProvider.directive;
        app.filter     = $filterProvider.register;
        app.factory    = $provide.factory;
        app.service    = $provide.service;
        app.constant   = $provide.constant;
        app.value      = $provide.value;
        
    }
  ])



  // angfire config
  .constant('version', '0.8.0')

  // where to redirect users if they need to authenticate (see routeSecurity.js)
  .constant('loginRedirectPath', '/signin')

  // your Firebase URL goes here
  .constant('FBURL', 'https://torid-fire-4332.firebaseio.com')

  .constant('loginProviders', 'facebook,password')

  // double check that the app has been configured before running it and blowing up space and time
  .run(['FBURL', '$timeout', function(FBURL, $timeout) {
    if( FBURL === 'https://INSTANCE.firebaseio.com' ) {
      angular.element(document.body).html('<h1>Please configure app/js/config.js before running!</h1>');
      $timeout(function() {
        angular.element(document.body).removeClass('hide');
      }, 250);
    }
  }]);


/*
  .config(['$translateProvider', function($translateProvider){
    // Register a loader for the static files
    // So, the module will search missing translation tables under the specified urls.
    // Those urls are [prefix][langKey][suffix].
    $translateProvider.useStaticFilesLoader({
      prefix: 'l10n/',
      suffix: '.js'
    });
    // Tell the module what language to use by default
    $translateProvider.preferredLanguage('en');
    // Tell the module to store the language in the local storage
    $translateProvider.useLocalStorage();
  }])

*/

// lazyload config

angular.module('app')
    /**
   * jQuery plugin config use ui-jq directive , config the js and css files that required
   * key: function name of the jQuery plugin
   * value: array of the css js file located
   */
  .constant('JQ_CONFIG', {
      easyPieChart:   ['vendor/jquery/charts/easypiechart/jquery.easy-pie-chart.js'],
      sparkline:      ['vendor/jquery/charts/sparkline/jquery.sparkline.min.js'],
      plot:           ['vendor/jquery/charts/flot/jquery.flot.min.js',
                          'vendor/jquery/charts/flot/jquery.flot.resize.js',
                          'vendor/jquery/charts/flot/jquery.flot.tooltip.min.js',
                          'vendor/jquery/charts/flot/jquery.flot.spline.js',
                          'vendor/jquery/charts/flot/jquery.flot.orderBars.js',
                          'vendor/jquery/charts/flot/jquery.flot.pie.min.js'],
      slimScroll:     ['vendor/jquery/slimscroll/jquery.slimscroll.min.js'],
      sortable:       ['vendor/jquery/sortable/jquery.sortable.js'],
      nestable:       ['vendor/jquery/nestable/jquery.nestable.js',
                          'vendor/jquery/nestable/nestable.css'],
      filestyle:      ['vendor/jquery/file/bootstrap-filestyle.min.js'],
      slider:         ['vendor/jquery/slider/bootstrap-slider.js',
                          'vendor/jquery/slider/slider.css'],
      chosen:         ['vendor/jquery/chosen/chosen.jquery.min.js',
                          'vendor/jquery/chosen/chosen.css'],
      TouchSpin:      ['vendor/jquery/spinner/jquery.bootstrap-touchspin.min.js',
                          'vendor/jquery/spinner/jquery.bootstrap-touchspin.css'],
      wysiwyg:        ['vendor/jquery/wysiwyg/bootstrap-wysiwyg.js',
                          'vendor/jquery/wysiwyg/jquery.hotkeys.js'],
      dataTable:      ['vendor/jquery/datatables/jquery.dataTables.min.js',
                          'vendor/jquery/datatables/dataTables.bootstrap.js',
                          'vendor/jquery/datatables/dataTables.bootstrap.css'],
      vectorMap:      ['vendor/jquery/jvectormap/jquery-jvectormap.min.js',
                          'vendor/jquery/jvectormap/jquery-jvectormap-world-mill-en.js',
                          'vendor/jquery/jvectormap/jquery-jvectormap-us-aea-en.js',
                          'vendor/jquery/jvectormap/jquery-jvectormap.css'],
      footable:       ['vendor/jquery/footable/footable.all.min.js',
                          'vendor/jquery/footable/footable.core.css']
      }
  )
  // oclazyload config
  .config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
      // We configure ocLazyLoad to use the lib script.js as the async loader
      $ocLazyLoadProvider.config({
          debug:  true,
          events: true,
          modules: [
              {
                  name: 'ngGrid',
                  files: [
                      'vendor/modules/ng-grid/ng-grid.min.js',
                      'vendor/modules/ng-grid/ng-grid.min.css',
                      'vendor/modules/ng-grid/theme.css'
                  ]
              },
              {
                  name: 'ui.grid',
                  files: [
                      'vendor/modules/angular-ui-grid/ui-grid.min.js',
                      'vendor/modules/angular-ui-grid/ui-grid.min.css'
                  ]
              },
              {
                  name: 'ui.select',
                  files: [
                      'vendor/modules/angular-ui-select/select.min.js',
                      'vendor/modules/angular-ui-select/select.min.css'
                  ]
              },
              {
                  name:'angularFileUpload',
                  files: [
                    'vendor/modules/angular-file-upload/angular-file-upload.min.js'
                  ]
              },
              {
                  name:'ui.calendar',
                  files: ['vendor/modules/angular-ui-calendar/calendar.js']
              },
              {
                  name: 'ngImgCrop',
                  files: [
                      'vendor/modules/ngImgCrop/ng-img-crop.js',
                      'vendor/modules/ngImgCrop/ng-img-crop.css'
                  ]
              },
              {
                  name: 'angularBootstrapNavTree',
                  files: [
                      'vendor/modules/angular-bootstrap-nav-tree/abn_tree_directive.js',
                      'vendor/modules/angular-bootstrap-nav-tree/abn_tree.css'
                  ]
              },
              {
                  name: 'toaster',
                  files: [
                      'vendor/modules/angularjs-toaster/toaster.js',
                      'vendor/modules/angularjs-toaster/toaster.css'
                  ]
              },
              {
                  name: 'textAngular',
                  files: [
                      'vendor/modules/textAngular/textAngular-sanitize.min.js',
                      'vendor/modules/textAngular/textAngular.min.js'
                  ]
              },
              {
                  name: 'vr.directives.slider',
                  files: [
                      'vendor/modules/angular-slider/angular-slider.min.js',
                      'vendor/modules/angular-slider/angular-slider.css'
                  ]
              },
              {
                  name: 'com.2fdevs.videogular',
                  files: [
                      'vendor/modules/videogular/videogular.min.js'
                  ]
              },
              {
                  name: 'com.2fdevs.videogular.plugins.controls',
                  files: [
                      'vendor/modules/videogular/plugins/controls.min.js'
                  ]
              },
              {
                  name: 'com.2fdevs.videogular.plugins.buffering',
                  files: [
                      'vendor/modules/videogular/plugins/buffering.min.js'
                  ]
              },
              {
                  name: 'com.2fdevs.videogular.plugins.overlayplay',
                  files: [
                      'vendor/modules/videogular/plugins/overlay-play.min.js'
                  ]
              },
              {
                  name: 'com.2fdevs.videogular.plugins.poster',
                  files: [
                      'vendor/modules/videogular/plugins/poster.min.js'
                  ]
              },
              {
                  name: 'com.2fdevs.videogular.plugins.imaads',
                  files: [
                      'vendor/modules/videogular/plugins/ima-ads.min.js'
                  ]
              },
              {
                  name: 'xeditable',
                  files: [
                      'vendor/modules/angular-xeditable/js/xeditable.min.js',
                      'vendor/modules/angular-xeditable/css/xeditable.css'
                  ]
              }
          ]
      });
  }])
;

'use strict';

/**
 * Config for the router
 */
angular.module('app')
  .run(
    [          '$rootScope', '$state', '$stateParams',
      function ($rootScope,   $state,   $stateParams) {
          $rootScope.$state = $state;
          $rootScope.$stateParams = $stateParams;
      }
    ]
  )
  .config(
    [          '$stateProvider', '$urlRouterProvider','$locationProvider',
      function ($stateProvider,  $urlRouterProvider, $locationProvider) {

        $urlRouterProvider
             .otherwise('/denver/shows');
         $stateProvider
             .state('denver', {
                 abstract: true,
                 url: '/denver',
                 templateUrl: 'tpl/app.html',
                 resolve: {
                   user: ['simpleLogin', function(simpleLogin) {
                   return simpleLogin.getUser();
                   }]
                 }
             })

             .state('denver.shows', {
                 url: '/shows',
                 templateUrl: 'tpl/vibesample.html',
                 controller: 'ShowsCtrl'
             })
             .state('denver.signin', {
                 url: '/signin',
                 templateUrl: 'tpl/signin.html',
                 controller: 'SignInCtrl'
             })
              .state('denver.account', {
                 url: '/account',
                 templateUrl: 'tpl/account.html',
                 controller: 'AccountCtrl',
                 authRequired: true,
                 resolve: {
                   user: ['simpleLogin', function(simpleLogin) {
                   return simpleLogin.getUser();
                   }]

                 }
             })

              .state('denver.favorites', {
                 url: '/favorites',
                 templateUrl: 'tpl/favorites.html',
                 controller: 'FavoritesCtrl',
                 authRequired: true,
                 resolve: {
                     deps: ['$ocLazyLoad',
                       function( $ocLazyLoad ){
                             return $ocLazyLoad.load('js/controllers/favoritesctrl.js');

                     }],
                   user: ['simpleLogin', function(simpleLogin) {
                   return simpleLogin.getUser();
                   }]

                 }
             })

              .state('denver.about', {
               url: '/about',
               templateUrl: 'tpl/about.html'
             })




      }
    ]
  );

'use strict';

/**
 * Config for the router
 */
angular.module('app')
  .run(
    [          '$rootScope', '$state', '$stateParams',
      function ($rootScope,   $state,   $stateParams) {
          $rootScope.$state = $state;
          $rootScope.$stateParams = $stateParams;
      }
    ]
  )
  .config(
    [          '$stateProvider', '$urlRouterProvider','$locationProvider',
      function ($stateProvider,  $urlRouterProvider, $locationProvider) {

        //$locationProvider.html5Mode(true);


        $urlRouterProvider
             .otherwise('/app/vibesample');
         $stateProvider
             .state('app', {
                 abstract: true,
                 url: '/app',
                 templateUrl: 'tpl/app.html',
                 resolve: {
                   user: ['simpleLogin', function(simpleLogin) {
                   return simpleLogin.getUser();
                   }]
                 }
             })

             .state('app.vibesample', {
                 url: '/vibesample',
                 templateUrl: 'tpl/vibesample.html',
                 controller: 'ShowsCtrl'
             })
             .state('app.signin', {
                 url: '/signin',
                 templateUrl: 'tpl/signin.html',
                 controller: 'SignInCtrl',
                 resolve: {
                     deps: ['$ocLazyLoad',
                       function( $ocLazyLoad ){
                             return $ocLazyLoad.load('js/controllers/SignInCtrl.js');

                     }]
                 }
             })
              .state('app.account', {
                 url: '/account',
                 templateUrl: 'tpl/account.html',
                 controller: 'AccountCtrl',
                 authRequired: true,
                 resolve: {
                     
                   user: ['simpleLogin', function(simpleLogin) {
                   return simpleLogin.getUser();
                   }]

                 }
             })

              .state('app.favorites', {
                 url: '/favorites',
                 templateUrl: 'tpl/favorites.html',
                 controller: 'FavoritesCtrl',
                 authRequired: true,
                 resolve: {
                     deps: ['$ocLazyLoad',
                       function( $ocLazyLoad ){
                             return $ocLazyLoad.load('js/controllers/favoritesctrl.js');

                     }],
                   user: ['simpleLogin', function(simpleLogin) {
                   return simpleLogin.getUser();
                   }]

                 }
             })

              .state('app.about', {
               url: '/about',
               templateUrl: 'tpl/about.html'
             })




      }
    ]
  );


// a simple wrapper on Firebase and AngularFire to simplify deps and keep things DRY
angular.module('firebase.utils', ['firebase', 'app']) // not loading....
   .factory('fbutil', ['$window', 'FBURL', '$firebase', function($window, FBURL, $firebase) {
      "use strict";

      return {
        syncObject: function(path, factoryConfig) {
          return syncData.apply(null, arguments).$asObject();
        },

        syncArray: function(path, factoryConfig) {
          return syncData.apply(null, arguments).$asArray();
        },

        ref: firebaseRef
      };

      function pathRef(args) {
        for (var i = 0; i < args.length; i++) {
          if (angular.isArray(args[i])) {
            args[i] = pathRef(args[i]);
          }
          else if( typeof args[i] !== 'string' ) {
            throw new Error('Argument '+i+' to firebaseRef is not a string: '+args[i]);
          }
        }
        return args.join('/');
      }

      /**
       * Example:
       * <code>
       *    function(firebaseRef) {
         *       var ref = firebaseRef('path/to/data');
         *    }
       * </code>
       *
       * @function
       * @name firebaseRef
       * @param {String|Array...} path relative path to the root folder in Firebase instance
       * @return a Firebase instance
       */
      function firebaseRef(path) {
        var ref = new $window.Firebase(FBURL);
        var args = Array.prototype.slice.call(arguments);
        if( args.length ) {
          ref = ref.child(pathRef(args));
        }
        return ref;
      }

      /**
       * Create a $firebase reference with just a relative path. For example:
       *
       * <code>
       * function(syncData) {
         *    // a regular $firebase ref
         *    $scope.widget = syncData('widgets/alpha');
         *
         *    // or automatic 3-way binding
         *    syncData('widgets/alpha').$bind($scope, 'widget');
         * }
       * </code>
       *
       * Props is the second param passed into $firebase. It can also contain limit, startAt, endAt,
       * and they will be applied to the ref before passing into $firebase
       *
       * @function
       * @name syncData
       * @param {String|Array...} path relative path to the root folder in Firebase instance
       * @param {object} [props]
       * @return a Firebase instance
       */
      function syncData(path, props) {
        var ref = firebaseRef(path);
        props = angular.extend({}, props);
        angular.forEach(['limit', 'startAt', 'endAt'], function(k) {
          if( props.hasOwnProperty(k) ) {
            var v = props[k];
            ref = ref[k].apply(ref, angular.isArray(v)? v : [v]);
            delete props[k];
          }
        });
        return $firebase(ref, props);
      }
   }]);


'use strict';

/* Controllers */

angular.module('app')
  .controller('AppCtrl', ['$scope', '$translate', '$localStorage', '$window',
    function(              $scope,   $translate,   $localStorage,   $window ) {
      // add 'ie' classes to html
      var isIE = !!navigator.userAgent.match(/MSIE/i);
      isIE && angular.element($window.document.body).addClass('ie');
      isSmartDevice( $window ) && angular.element($window.document.body).addClass('smart');

      // config
      $scope.app = {
        name: 'Vibesample',
        version: '.5',
        // for chart colors
        color: {
          primary: '#7266ba',
          info:    '#23b7e5',
          success: '#27c24c',
          warning: '#fad733',
          danger:  '#f05050',
          light:   '#e8eff0',
          dark:    '#3a3f51',
          black:   '#1c2b36'
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


      // save settings to local storage
      if ( angular.isDefined($localStorage.settings) ) {
        $scope.app.settings = $localStorage.settings;
      } else {
        $localStorage.settings = $scope.app.settings;
      }
      $scope.$watch('app.settings', function(){
        if( $scope.app.settings.asideDock  &&  $scope.app.settings.asideFixed ){
          // aside dock and fixed must set the header fixed.
          $scope.app.settings.headerFixed = true;
        }
        // save to local storage
        $localStorage.settings = $scope.app.settings;
      }, true);

      // angular translate
      $scope.lang = { isopen: false };
      $scope.langs = {en:'English', de_DE:'German', it_IT:'Italian'};
      $scope.selectLang = $scope.langs[$translate.proposedLanguage()] || "English";
      $scope.setLang = function(langKey, $event) {
        // set the current lang
        $scope.selectLang = $scope.langs[langKey];
        // You can change the language during runtime
        $translate.use(langKey);
        $scope.lang.isopen = !$scope.lang.isopen;
      };

      function isSmartDevice( $window )
      {
          // Adapted from http://www.detectmobilebrowsers.com
          var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
          // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
          return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
      }

  }]);

'use strict';

/* Controllers */

"use strict";app.controller("AccountCtrl",["$scope","simpleLogin","fbutil","user","$state","$rootScope",function(e,o,t,n,r,a){function i(){e.err=null,e.msg=null,e.emailerr=null,e.emailmsg=null}var s=t.syncObject(["users",n.uid]);s.$bindTo(e,"profile"),e.signout=function(){a.FavoritesLength=0,s.$destroy(),o.logout(),r.go("denver.shows")},e.changePassword=function(t,n,r){i(),t&&n&&r?r!==n?e.err="New pass and confirm do not match":o.changePassword(s.email,t,r).then(function(){e.msg="Password changed"},function(o){e.err=o}):e.err="Please fill in all password fields"},e.clear=i,e.changeEmail=function(n,r){i(),s.$destroy(),o.changeEmail(n,r).then(function(o){s=t.syncObject(["users",o.uid]),s.$bindTo(e,"profile"),e.emailmsg="Email changed"},function(o){e.emailerr=o})}}]),app.controller("ShowsCtrl",["$scope","$rootScope","$state","$firebase","$filter","simpleLogin","leafletData","Player",function(e,o,t,n,r,a,i,s){function l(o){var t=o.target;t.setIcon(g),e.$apply(function(){e.hoveritem=t.feature.properties.id.replace(/^\D+/g,"")})}function c(o){var t=o.target;t.setIcon(p),e.$apply(function(){e.hoveritem={}})}var d=new Firebase("https://torid-fire-4332.firebaseio.com"),u=n(d.child("shows"));e.shows=u.$asArray(),e.listShows=[],e.filteredShows=[],e.daysAhead=.5,e.cityoptions=["Denver*","(More Cities Soon)"],e.day=Date.now(),e.selectDay=function(o){var t=Date.now();e.day=o,e.daysAhead=(e.day-t)/864e5},e.days=[e.day+0,e.day+864e5,e.day+1728e5,e.day+2592e5,e.day+3456e5,e.day+432e6,e.day+5184e5],e.radioModel="Right",e.checkModel={left:!1,middle:!1,right:!0},e.checkIfLoggedIn=function(o){null===a.user?t.go("denver.signin"):e.toggleStarred(o)},a.getUser().then(function(t){if(!t)return void 0;var r=n(d.child("users").child(t.uid).child("favorites"));e.loggedInUserFavorites=r.$asObject(),e.loggedInUserFavorites.$loaded(function(){var t=function(){o.FavoritesLength=0,angular.forEach(e.loggedInUserFavorites,function(t,n){e.loggedInUserFavorites[n]===!0&&o.FavoritesLength++})};t(),e.toggleStarred=function(o){e.loggedInUserFavorites[o.properties.id]=e.loggedInUserFavorites[o.properties.id]===!0?!1:void 0===e.loggedInUserFavorites.$value?!0:!0,e.loggedInUserFavorites.$save(),t()}})}),e.shows.$loaded(function(){e.listShows=e.shows[0],e.$watch("daysAhead",function(){e.filteredShows=r("upComing")(e.listShows,"properties.date",e.daysAhead),angular.extend(e,{geojson:{data:e.filteredShows,onEachFeature:function(e,o){o.bindPopup(e.properties.artist+"&nbsp;&#64;&nbsp;"+e.properties.venue_name),o.setIcon(p),o.on({mouseover:l,mouseout:c}),m[e.properties.id]=o}}})})}),e.player=s,e.$on("statusChanged",function(){e.$$phase||e.$digest()}),e.$watch("player.currentTrack.properties.id",function(){angular.element(".list-group-item").removeClass("playing"),s.currentTrack&&s.currentTrack.properties.id&&angular.element(".list-group-item"+s.currentTrack.properties.id).addClass("playing")}),e.setPosition=function(e){var o=(e.pageX-e.currentTarget.offsetLeft)/e.currentTarget.offsetWidth;s.setPosition(o)},angular.extend(e,{center:{lat:39.744213,lng:-104.990456,zoom:13,scrollWheelZoom:"center"},defaults:{tileLayer:"https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoia3Blbm5lbGwiLCJhIjoid3QxaFNMTSJ9.5HjAo-fmMghcHGeCMOMheg",maxZoom:16,path:{weight:2,color:"#800000",opacity:1}}});var p=L.icon({iconUrl:"img/marker-icon.png",shadowUrl:"img/marker-shadow.png",popupAnchor:[1,-24],iconAnchor:[13,27]}),g=L.icon({iconUrl:"img/marker-green.png",shadowUrl:"img/marker-shadow.png",popupAnchor:[1,-24],iconAnchor:[13,27]}),m={};e.hoveritem={},e.menuMouse=function(e){var o=m[e.properties.id];o.setIcon(g),o.openPopup()},e.menuMouseout=function(e){var o=m[e.properties.id];o.setIcon(p),o.closePopup()}}]),app.controller("AccordionDemoCtrl",["$scope",function(e){e.oneAtATime=!0,e.groups=[{title:"Accordion group header - #1",content:"Dynamic group body - #1"},{title:"Accordion group header - #2",content:"Dynamic group body - #2"}],e.items=["Item 1","Item 2","Item 3"],e.addItem=function(){var o=e.items.length+1;e.items.push("Item "+o)},e.status={isFirstOpen:!0,isFirstDisabled:!1}}]),app.controller("AlertDemoCtrl",["$scope",function(e){e.alerts=[{type:"success",msg:"Well done! You successfully read this important alert message."},{type:"info",msg:"Heads up! This alert needs your attention, but it is not super important."},{type:"warning",msg:"Warning! Best check yo self, you are not looking too good..."}],e.addAlert=function(){e.alerts.push({type:"danger",msg:"Oh snap! Change a few things up and try submitting again."})},e.closeAlert=function(o){e.alerts.splice(o,1)}}]),app.controller("ButtonsDemoCtrl",["$scope",function(e){e.singleModel=1,e.radioModel="Middle",e.checkModel={left:!1,middle:!0,right:!1}}]),app.controller("CarouselDemoCtrl",["$scope",function(e){e.myInterval=5e3;var o=e.slides=[];e.addSlide=function(){o.push({image:"img/c"+o.length+".jpg",text:["Carousel text #0","Carousel text #1","Carousel text #2","Carousel text #3"][o.length%4]})};for(var t=0;4>t;t++)e.addSlide()}]),app.controller("DropdownDemoCtrl",["$scope",function(e){e.items=["The first choice!","And another choice for you.","but wait! A third!"],e.status={isopen:!1},e.toggled=function(){},e.toggleDropdown=function(o){o.preventDefault(),o.stopPropagation(),e.status.isopen=!e.status.isopen}}]),app.controller("ModalInstanceCtrl",["$scope","$modalInstance","items",function(e,o,t){e.items=t,e.selected={item:e.items[0]},e.ok=function(){o.close(e.selected.item)},e.cancel=function(){o.dismiss("cancel")}}]),app.controller("ModalDemoCtrl",["$scope","$modal","$log",function(e,o,t){e.items=["item1","item2","item3"],e.open=function(n){var r=o.open({templateUrl:"myModalContent.html",controller:"ModalInstanceCtrl",size:n,resolve:{items:function(){return e.items}}});r.result.then(function(o){e.selected=o},function(){t.info("Modal dismissed at: "+new Date)})}}]),app.controller("PaginationDemoCtrl",["$scope","$log",function(e,o){e.totalItems=64,e.currentPage=4,e.setPage=function(o){e.currentPage=o},e.pageChanged=function(){o.info("Page changed to: "+e.currentPage)},e.maxSize=5,e.bigTotalItems=175,e.bigCurrentPage=1}]),app.controller("PopoverDemoCtrl",["$scope",function(e){e.dynamicPopover="Hello, World!",e.dynamicPopoverTitle="Title"}]),app.controller("ProgressDemoCtrl",["$scope",function(e){e.max=200,e.random=function(){var o,t=Math.floor(100*Math.random()+1);o=25>t?"success":50>t?"info":75>t?"warning":"danger",e.showWarning="danger"===o||"warning"===o,e.dynamic=t,e.type=o},e.random(),e.randomStacked=function(){e.stacked=[];for(var o=["success","info","warning","danger"],t=0,n=Math.floor(4*Math.random()+1);n>t;t++){var r=Math.floor(4*Math.random());e.stacked.push({value:Math.floor(30*Math.random()+1),type:o[r]})}},e.randomStacked()}]),app.controller("TabsDemoCtrl",["$scope",function(e){e.tabs=[{title:"Dynamic Title 1",content:"Dynamic content 1"},{title:"Dynamic Title 2",content:"Dynamic content 2",disabled:!0}]}]),app.controller("RatingDemoCtrl",["$scope",function(e){e.rate=7,e.max=10,e.isReadonly=!1,e.hoveringOver=function(o){e.overStar=o,e.percent=100*(o/e.max)}}]),app.controller("TooltipDemoCtrl",["$scope",function(e){e.dynamicTooltip="Hello, World!",e.dynamicTooltipText="dynamic",e.htmlTooltip="I've been made <b>bold</b>!"}]),app.controller("TypeaheadDemoCtrl",["$scope","$http",function(e,o){e.selected=void 0,e.states=["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Dakota","North Carolina","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming"],e.getLocation=function(e){return o.get("http://maps.googleapis.com/maps/api/geocode/json",{params:{address:e,sensor:!1}}).then(function(e){var o=[];return angular.forEach(e.data.results,function(e){o.push(e.formatted_address)}),o})}}]),app.controller("DatepickerDemoCtrl",["$scope",function(e){e.today=function(){e.dt=new Date},e.today(),e.clear=function(){e.dt=null},e.disabled=function(e,o){return"day"===o&&(0===e.getDay()||6===e.getDay())},e.toggleMin=function(){e.minDate=e.minDate?null:new Date},e.toggleMin(),e.open=function(o){o.preventDefault(),o.stopPropagation(),e.opened=!0},e.dateOptions={formatYear:"yy",startingDay:1,"class":"datepicker"},e.initDate=new Date("2016-15-20"),e.formats=["dd-MMMM-yyyy","yyyy/MM/dd","dd.MM.yyyy","shortDate"],e.format=e.formats[0]}]),app.controller("TimepickerDemoCtrl",["$scope",function(e){e.mytime=new Date,e.hstep=1,e.mstep=15,e.options={hstep:[1,2,3],mstep:[1,5,10,15,25,30]},e.ismeridian=!0,e.toggleMode=function(){e.ismeridian=!e.ismeridian},e.update=function(){var o=new Date;o.setHours(14),o.setMinutes(0),e.mytime=o},e.changed=function(){},e.clear=function(){e.mytime=null}}]),app.controller("FlotChartDemoCtrl",["$scope",function(e){e.d=[[1,6.5],[2,6.5],[3,7],[4,8],[5,7.5],[6,7],[7,6.8],[8,7],[9,7.2],[10,7],[11,6.8],[12,7]],e.d0_1=[[0,7],[1,6.5],[2,12.5],[3,7],[4,9],[5,6],[6,11],[7,6.5],[8,8],[9,7]],e.d0_2=[[0,4],[1,4.5],[2,7],[3,4.5],[4,3],[5,3.5],[6,6],[7,3],[8,4],[9,3]],e.d1_1=[[10,120],[20,70],[30,70],[40,60]],e.d1_2=[[10,50],[20,60],[30,90],[40,35]],e.d1_3=[[10,80],[20,40],[30,30],[40,20]],e.d2=[];for(var o=0;20>o;++o)e.d2.push([o,Math.round(100*Math.sin(o))/100]);e.d3=[{label:"iPhone5S",data:40},{label:"iPad Mini",data:10},{label:"iPad Mini Retina",data:20},{label:"iPhone4S",data:12},{label:"iPad Air",data:18}],e.refreshData=function(){e.d0_1=e.d0_2},e.getRandomData=function(){var e=[],o=150;for(e.length>0&&(e=e.slice(1));e.length<o;){var t=e.length>0?e[e.length-1]:50,n=t+10*Math.random()-5;0>n?n=0:n>100&&(n=100),e.push(Math.round(100*n)/100)}for(var r=[],a=0;a<e.length;++a)r.push([a,e[a]]);return r},e.d4=e.getRandomData()}]),app.controller("ctrlname",["$scope","$http","$state",function(e){e.user={},e.authError=null,e.login=function(){e.authError=null}}]),app.controller("FavoritesCtrl",["$scope","$rootScope","$firebase","simpleLogin","$location",function(e,o,t,n){var r=new Firebase("https://torid-fire-4332.firebaseio.com"),a=t(r.child("shows"));e.shows=a.$asArray(),n.getUser().then(function(n){var a=t(r.child("users").child(n.uid).child("favorites"));e.UserFavorites=a.$asObject(),e.UserFavorites.$loaded(function(){var t;t=e.shows[0],e.currentlyFavorited=[],angular.forEach(t,function(o,n){e.UserFavorites[o.properties.id]===!0&&e.currentlyFavorited.push(t[n])});var n=function(){o.FavoritesLength=0,angular.forEach(e.UserFavorites,function(t,n){e.UserFavorites[n]===!0&&o.FavoritesLength++})};n(),e.toggleStarred=function(o){e.UserFavorites[o.properties.id]=e.UserFavorites[o.properties.id]===!0?!1:void 0===e.UserFavorites.$value?!0:!0,n(),e.UserFavorites.$save()}})}),e.favorite={},e.streamTrack=function(o){SC.stream(o.properties.stream_url,function(o){e.sound=o,soundManager.stopAll(),o.play()}),o.visible=!1},e.pauseTrack=function(o){e.sound.pause(),o.visible=!0}}]),app.controller("HomeCtrl",["$scope","$fbutil","user",function(e){e.syncedValue=fbutil.syncObject("syncedValue"),e.user=user,e.FBURL=FBURL}]),app.controller("SignInCtrl",["$scope","simpleLogin","$state","$firebaseSimpleLogin","$rootScope",function(e,o,t,n,r){function a(){return e.email?e.pass&&e.confirm?e.createMode&&e.pass!==e.confirm&&(e.err="Passwords do not match"):e.err="Please enter a password":e.err="Please enter an email address",!e.err}function i(e){return angular.isObject(e)&&e.code?e.code:e+""}e.email=null,e.pass=null,e.confirm=null,e.createMode=!1;var s=new Firebase("https://torid-fire-4332.firebaseio.com");e.auth=n(s),e.user=null,e.loginFacebook=function(o){e.auth.$login(o)},r.$on("$firebaseSimpleLogin:login",function(o,n){e.user=n,t.go("denver.shows")}),r.$on("$firebaseSimpleLogin:logout",function(){e.user=null}),r.$on("$firebaseSimpleLogin:error",function(e,o){console.log("Error logging user in: ",o)}),e.loginEmail=function(n,r){e.err=null,o.login(n,r).then(function(){t.go("denver.shows")},function(o){e.err=i(o)})},e.createAccount=function(){e.err=null,a()&&o.createAccount(e.email,e.pass).then(function(){t.go("denver.signin")},function(o){e.err=i(o)})},e.sendPasswordResetEmail=function(o){var r=new Firebase("https://torid-fire-4332.firebaseio.com");e.loginObj=n(r),e.loginObj.$sendPasswordResetEmail(o).then(function(){e.resetForm=!1,e.resetEmail="",t.go("denver.shows")},function(o){"INVALID_EMAIL"===o.code?(e.errors.push("There is no account associated with that email"),e.resetForm=!1):e.errors.push("Something went wrong..")})}}]);

angular.module('app')
  .directive('appVersion', ['version', function(version) {
    return function(scope, elm) {
      elm.text(version);
    };
  }]);


  
angular.module('app')
.directive('ngHideAuth', ['simpleLogin', '$timeout', function (simpleLogin, $timeout) {
    var isLoggedIn;
    simpleLogin.watch(function(user) {
      isLoggedIn = !!user;
    });

    return {
      restrict: 'A',
      link: function(scope, el) {
        function update() {
          el.addClass('ng-cloak'); // hide until we process it

          // sometimes if ngCloak exists on same element, they argue, so make sure that
          // this one always runs last for reliability
          $timeout(function () {
            el.toggleClass('ng-cloak', isLoggedIn !== false);
          }, 0);
        }

        update();
        simpleLogin.watch(update, scope);
      }
    };
  }]);
angular.module('app')
  .directive('ngShowAuth', ['simpleLogin', '$timeout', function (simpleLogin, $timeout) {
    var isLoggedIn;
    simpleLogin.watch(function(user) {
      isLoggedIn = !!user;
    });

    return {
      restrict: 'A',
      link: function(scope, el) {
        el.addClass('ng-cloak'); // hide until we process it

        function update() {
          // sometimes if ngCloak exists on same element, they argue, so make sure that
          // this one always runs last for reliability
          $timeout(function () {
            el.toggleClass('ng-cloak', !isLoggedIn);
          }, 0);
        }

        update();
        simpleLogin.watch(update, scope);
      }
    };
  }]);
angular.module('app')
  .directive('setNgAnimate', ['$animate', function ($animate) {
    return {
        link: function ($scope, $element, $attrs) {
            $scope.$watch( function() {
                return $scope.$eval($attrs.setNgAnimate, $scope);
            }, function(valnew, valold){
                $animate.enabled(!!valnew, $element);
            });
        }
    };
  }]);
angular.module('app')
  .directive('uiButterbar', ['$rootScope', '$anchorScroll', function($rootScope, $anchorScroll) {
     return {
      restrict: 'AC',
      template:'<span class="bar"></span>',
      link: function(scope, el, attrs) {        
        el.addClass('butterbar hide');
        scope.$on('$stateChangeStart', function(event) {
          $anchorScroll();
          el.removeClass('hide').addClass('active');
        });
        scope.$on('$stateChangeSuccess', function( event, toState, toParams, fromState ) {
          event.targetScope.$watch('$viewContentLoaded', function(){
            el.addClass('hide').removeClass('active');
          })
        });
      }
     };
  }]);
angular.module('app')
  .directive('uiFocus', function($timeout, $parse) {
    return {
      link: function(scope, element, attr) {
        var model = $parse(attr.uiFocus);
        scope.$watch(model, function(value) {
          if(value === true) {
            $timeout(function() {
              element[0].focus();
            });
          }
        });
        element.bind('blur', function() {
           scope.$apply(model.assign(scope, false));
        });
      }
    };
  });
 angular.module('app')
  .directive('uiFullscreen', ['uiLoad', '$document', '$window', function(uiLoad, $document, $window) {
    return {
      restrict: 'AC',
      template:'<i class="fa fa-expand fa-fw text"></i><i class="fa fa-compress fa-fw text-active"></i>',
      link: function(scope, el, attr) {
        el.addClass('hide');
        uiLoad.load('vendor/libs/screenfull.min.js').then(function(){
          // disable on ie11
          if (screenfull.enabled && !navigator.userAgent.match(/Trident.*rv:11\./)) {
            el.removeClass('hide');
          }
          el.on('click', function(){
            var target;
            attr.target && ( target = $(attr.target)[0] );            
            screenfull.toggle(target);
          });
          $document.on(screenfull.raw.fullscreenchange, function () {
            if(screenfull.isFullscreen){
              el.addClass('active');
            }else{
              el.removeClass('active');
            }
          });
        });
      }
    };
  }]);
'use strict';

/**
 * 0.1.1
 * General-purpose jQuery wrapper. Simply pass the plugin name as the expression.
 *
 * It is possible to specify a default set of parameters for each jQuery plugin.
 * Under the jq key, namespace each plugin by that which will be passed to ui-jq.
 * Unfortunately, at this time you can only pre-define the first parameter.
 * @example { jq : { datepicker : { showOn:'click' } } }
 *
 * @param ui-jq {string} The $elm.[pluginName]() to call.
 * @param [ui-options] {mixed} Expression to be evaluated and passed as options to the function
 *     Multiple parameters can be separated by commas
 * @param [ui-refresh] {expression} Watch expression and refire plugin on changes
 *
 * @example <input ui-jq="datepicker" ui-options="{showOn:'click'},secondParameter,thirdParameter" ui-refresh="iChange">
 */
angular.module('ui.jq', ['ui.load']).
  value('uiJqConfig', {}).
  directive('uiJq', ['uiJqConfig', 'JQ_CONFIG', 'uiLoad', '$timeout', function uiJqInjectingFunction(uiJqConfig, JQ_CONFIG, uiLoad, $timeout) {

  return {
    restrict: 'A',
    compile: function uiJqCompilingFunction(tElm, tAttrs) {

      if (!angular.isFunction(tElm[tAttrs.uiJq]) && !JQ_CONFIG[tAttrs.uiJq]) {
        throw new Error('ui-jq: The "' + tAttrs.uiJq + '" function does not exist');
      }
      var options = uiJqConfig && uiJqConfig[tAttrs.uiJq];

      return function uiJqLinkingFunction(scope, elm, attrs) {

        function getOptions(){
          var linkOptions = [];

          // If ui-options are passed, merge (or override) them onto global defaults and pass to the jQuery method
          if (attrs.uiOptions) {
            linkOptions = scope.$eval('[' + attrs.uiOptions + ']');
            if (angular.isObject(options) && angular.isObject(linkOptions[0])) {
              linkOptions[0] = angular.extend({}, options, linkOptions[0]);
            }
          } else if (options) {
            linkOptions = [options];
          }
          return linkOptions;
        }

        // If change compatibility is enabled, the form input's "change" event will trigger an "input" event
        if (attrs.ngModel && elm.is('select,input,textarea')) {
          elm.bind('change', function() {
            elm.trigger('input');
          });
        }

        // Call jQuery method and pass relevant options
        function callPlugin() {
          $timeout(function() {
            elm[attrs.uiJq].apply(elm, getOptions());
          }, 0, false);
        }

        function refresh(){
          // If ui-refresh is used, re-fire the the method upon every change
          if (attrs.uiRefresh) {
            scope.$watch(attrs.uiRefresh, function() {
              callPlugin();
            });
          }
        }

        if ( JQ_CONFIG[attrs.uiJq] ) {
          uiLoad.load(JQ_CONFIG[attrs.uiJq]).then(function() {
            callPlugin();
            refresh();
          }).catch(function() {
            
          });
        } else {
          callPlugin();
          refresh();
        }
      };
    }
  };
}]);
angular.module('app')
  .directive('uiModule', ['MODULE_CONFIG','uiLoad', '$compile', function(MODULE_CONFIG, uiLoad, $compile) {
    return {
      restrict: 'A',
      compile: function (el, attrs) {
        var contents = el.contents().clone();
        return function(scope, el, attrs){
          el.contents().remove();
          uiLoad.load(MODULE_CONFIG[attrs.uiModule])
          .then(function(){
            $compile(contents)(scope, function(clonedElement, scope) {
              el.append(clonedElement);
            });
          });
        }
      }
    };
  }]);
angular.module('app')
  .directive('uiNav', ['$timeout', function($timeout) {
    return {
      restrict: 'AC',
      link: function(scope, el, attr) {
        var _window = $(window), 
        _mb = 768, 
        wrap = $('.app-aside'), 
        next, 
        backdrop = '.dropdown-backdrop';
        // unfolded
        el.on('click', 'a', function(e) {
          next && next.trigger('mouseleave.nav');
          var _this = $(this);
          _this.parent().siblings( ".active" ).toggleClass('active');
          _this.next().is('ul') &&  _this.parent().toggleClass('active') &&  e.preventDefault();
          // mobile
          _this.next().is('ul') || ( ( _window.width() < _mb ) && $('.app-aside').removeClass('show off-screen') );
        });

        // folded & fixed
        el.on('mouseenter', 'a', function(e){
          next && next.trigger('mouseleave.nav');
          $('> .nav', wrap).remove();
          if ( !$('.app-aside-fixed.app-aside-folded').length || ( _window.width() < _mb ) || $('.app-aside-dock').length) return;
          var _this = $(e.target)
          , top
          , w_h = $(window).height()
          , offset = 50
          , min = 150;

          !_this.is('a') && (_this = _this.closest('a'));
          if( _this.next().is('ul') ){
             next = _this.next();
          }else{
            return;
          }
         
          _this.parent().addClass('active');
          top = _this.parent().position().top + offset;
          next.css('top', top);
          if( top + next.height() > w_h ){
            next.css('bottom', 0);
          }
          if(top + min > w_h){
            next.css('bottom', w_h - top - offset).css('top', 'auto');
          }
          next.appendTo(wrap);

          next.on('mouseleave.nav', function(e){
            $(backdrop).remove();
            next.appendTo(_this.parent());
            next.off('mouseleave.nav').css('top', 'auto').css('bottom', 'auto');
            _this.parent().removeClass('active');
          });

          $('.smart').length && $('<div class="dropdown-backdrop"/>').insertAfter('.app-aside').on('click', function(next){
            next && next.trigger('mouseleave.nav');
          });

        });

        wrap.on('mouseleave', function(e){
          next && next.trigger('mouseleave.nav');
          $('> .nav', wrap).remove();
        });
      }
    };
  }]);
angular.module('app')
  .directive('uiScroll', ['$location', '$anchorScroll', function($location, $anchorScroll) {
    return {
      restrict: 'AC',
      link: function(scope, el, attr) {
        el.on('click', function(e) {
          $location.hash(attr.uiScroll);
          $anchorScroll();
        });
      }
    };
  }]);
angular.module('app')
  .directive('uiShift', ['$timeout', function($timeout) {
    return {
      restrict: 'A',
      link: function(scope, el, attr) {
        // get the $prev or $parent of this el
        var _el = $(el),
            _window = $(window),
            prev = _el.prev(),
            parent,
            width = _window.width()
            ;

        !prev.length && (parent = _el.parent());
        
        function sm(){
          $timeout(function () {
            var method = attr.uiShift;
            var target = attr.target;
            _el.hasClass('in') || _el[method](target).addClass('in');
          });
        }
        
        function md(){
          parent && parent['prepend'](el);
          !parent && _el['insertAfter'](prev);
          _el.removeClass('in');
        }

        (width < 768 && sm()) || md();

        _window.resize(function() {
          if(width !== _window.width()){
            $timeout(function(){
              (_window.width() < 768 && sm()) || md();
              width = _window.width();
            });
          }
        });
      }
    };
  }]);
angular.module('app')
  .directive('uiToggleClass', ['$timeout', '$document', function($timeout, $document) {
    return {
      restrict: 'AC',
      link: function(scope, el, attr) {
        el.on('click', function(e) {
          e.preventDefault();
          var classes = attr.uiToggleClass.split(','),
              targets = (attr.target && attr.target.split(',')) || Array(el),
              key = 0;
          angular.forEach(classes, function( _class ) {
            var target = targets[(targets.length && key)];            
            ( _class.indexOf( '*' ) !== -1 ) && magic(_class, target);
            $( target ).toggleClass(_class);
            key ++;
          });
          $(el).toggleClass('active');

          function magic(_class, target){
            var patt = new RegExp( '\\s' + 
                _class.
                  replace( /\*/g, '[A-Za-z0-9-_]+' ).
                  split( ' ' ).
                  join( '\\s|\\s' ) + 
                '\\s', 'g' );
            var cn = ' ' + $(target)[0].className + ' ';
            while ( patt.test( cn ) ) {
              cn = cn.replace( patt, ' ' );
            }
            $(target)[0].className = $.trim( cn );
          }
        });
      }
    };
  }]);
'use strict';

/* Filters */
// need load the moment.js to use this filter. 
angular.module('app')
  .filter('fromNow', function() {
    return function(date) {
      return moment(date).fromNow();
    }
  });
'use strict';

/* Filters */
// need load the moment.js to use this filter. 
angular.module('app')
.filter('noFractionCurrency',
     [ '$filter', '$locale',
     function(filter, locale) {
       var currencyFilter = filter('currency');
       var formats = locale.NUMBER_FORMATS;
       return function(amount, currencySymbol) {
         var value = currencyFilter(amount, currencySymbol);
         var sep = value.indexOf(formats.DECIMAL_SEP);
         if(amount >= 0) { 
           return value.substring(0, sep);
         }
         return value.substring(0, sep) + ')';
       };
     } ]);  



angular.module('app')
     .filter('num', function() {
    return function(input) {
      return parseInt(input, 10);
    }
});




'use strict';

angular.module('app')
     .filter('prettyTime', function() {
  return function(value) {
    var hours = Math.floor(value / 3600),
        mins = '0' + Math.floor((value % 3600) / 60),
        secs = '0' + Math.floor((value % 60));
        mins = mins.substr(mins.length - 2);
        secs = secs.substr(secs.length - 2);
    if(!isNaN(secs)){
      if (hours){
        return hours+':'+mins+':'+secs;
      } else {
        return mins+':'+secs;
      };
    } else {
      return '00:00';
    };
  };
});

'use strict';

/* Filters */
angular.module('app')
     .filter('upComing', ['$parse',
     function($parse) {
       return function(items, field, days) {
         var timeStart = +Date.now() + ((days - .8) * 86400000);  // This needs finessing.
         var timeEnd = +Date.now() + ((days + .3) * 86400000); // 1 day in ms
         var fieldFn = $parse(field);
         return (items || []).filter(function(item) {
           var field = +new Date(fieldFn(item));
           return (field > timeStart && field < timeEnd);
         });
       };
     }
   ]);

angular.module('changeEmail', ['firebase.utils'])
  .factory('changeEmail', ['fbutil', '$q', function(fbutil, $q) {
    return function(password, oldEmail, newEmail, simpleLogin) {
      var ctx = { old: { email: oldEmail }, curr: { email: newEmail } };

      // execute activities in order; first we authenticate the user
      return authOldAccount()
        // then we fetch old account details
        .then( loadOldProfile )
        // then we create a new account
        .then( createNewAccount )
        // then we copy old account info
        .then( copyProfile )
        // and once they safely exist, then we can delete the old ones
        // we have to authenticate as the old user again
        .then( authOldAccount )
        .then( removeOldProfile )
        .then( removeOldLogin )
        // and now authenticate as the new user
        .then( authNewAccount )
        .catch(function(err) { console.error(err); return $q.reject(err); });

      function authOldAccount() {
        return simpleLogin.login(ctx.old.email, password).then(function(user) {
          ctx.old.uid = user.uid;
        });
      }

      function loadOldProfile() {
        var def = $q.defer();
        ctx.old.ref = fbutil.ref('users', ctx.old.uid);
        ctx.old.ref.once('value',
          function(snap){
            var dat = snap.val();
            if( dat === null ) {
              def.reject(oldEmail + ' not found');
            }
            else {
              ctx.old.name = dat.name;
              def.resolve();
            }
          },
          function(err){
            def.reject(err);
          });
        return def.promise;
      }

      function createNewAccount() {
        return simpleLogin.createAccount(ctx.curr.email, password, ctx.old.name).then(function(user) {
          ctx.curr.uid = user.uid;
        });
      }

      function copyProfile() {
        var d = $q.defer();
        ctx.curr.ref = fbutil.ref('users', ctx.curr.uid);
        var profile = {email: ctx.curr.email, name: ctx.old.name||''};
        ctx.curr.ref.set(profile, function(err) {
          if (err) {
            d.reject(err);
          } else {
            d.resolve();
          }
        });
        return d.promise;
      }

      function removeOldProfile() {
        var d = $q.defer();
        ctx.old.ref.remove(function(err) {
          if (err) {
            d.reject(err);
          } else {
            d.resolve();
          }
        });
        return d.promise;
      }

      function removeOldLogin() {
        var def = $q.defer();
        simpleLogin.removeUser(ctx.old.email, password).then(function() {
          def.resolve();
        }, function(err) {
          def.reject(err);
        });
        return def.promise;
      }

      function authNewAccount() {
        return simpleLogin.login(ctx.curr.email, password);
      }
    };
  }]);

'use strict';

angular.module('app')
     .service('Player', ['$rootScope',
     function($rootScope) {

    var playingSound;
    $rootScope.trackPlayingIndex;  // trying to figure out index


    return {

      playing: false,

      play: function (track, index) {

        $rootScope.trackPlayingIndex = index;

        if (!track) {
          if (this.currentTrack && playingSound) {
            playingSound.play();
            this.playing = true;
            $rootScope.$broadcast('statusChanged', true);
          }

          return;
        }

        var player = this;

        SC.stream(track.properties.stream_url, function(sound){

          if (playingSound) {
           playingSound.stop();
         }

          sound.play({
            whileplaying: function () {
              player.duration = Math.floor(this.durationEstimate / 1000);
              player.position = Math.floor(this.position / 1000);
              player.progress = (this.position / this.durationEstimate) * 100;
              $rootScope.$broadcast('statusChanged', true);
            },
            onfinish: function () {
              $rootScope.$broadcast('finished');
            }
          });

          //console.log(player);

          playingSound = sound;
          player.currentTrack = track;
          player.playing = true;
          $rootScope.$broadcast('statusChanged', true);
        });
      },

      pause: function () {
        if (playingSound) {
          playingSound.pause();
          this.playing = false;
          $rootScope.trackPlayingIndex = {};

          $rootScope.$broadcast('statusChanged', true);
        }

      },

      setPosition: function (percent) {
        playingSound.setPosition(percent * playingSound.duration);
      },


};




     }
   ]);

'use strict';


angular.module('simpleLogin', ['firebase', 'firebase.utils', 'changeEmail'])

  // a simple wrapper on simpleLogin.getUser() that rejects the promise
  // if the user does not exists (i.e. makes user required)
  .factory('requireUser', ['simpleLogin', '$q', function(simpleLogin, $q) {
    return function() {
      return simpleLogin.getUser().then(function (user) {
        return user ? user : $q.reject({ authRequired: true });
      });
    }
  }])

  .factory('simpleLogin', ['$firebaseSimpleLogin', 'fbutil', 'createProfile', 'changeEmail', '$q', '$rootScope',
    function($firebaseSimpleLogin, fbutil, createProfile, changeEmail, $q, $rootScope) {
      var auth = $firebaseSimpleLogin(fbutil.ref());
      var listeners = [];

      function statusChange() {
        fns.getUser().then(function(user) {
          fns.user = user || null;
          angular.forEach(listeners, function(fn) {
            fn(user||null);
          });
        });
      }

      var fns = {
        user: null,

        getUser: function() {
          return auth.$getCurrentUser();
        },

        /**
         * @param {string} email
         * @param {string} pass
         * @returns {*}
         */
        login: function(email, pass) {
          return auth.$login('password', {
            email: email,
            password: pass,
            rememberMe: true
          });
        },

        logout: function() {
          auth.$logout();
        },

        createAccount: function(email, pass, name) {
          return auth.$createUser(email, pass)
            .then(function() {
              // authenticate so we have permission to write to Firebase
              return fns.login(email, pass);
            })
            .then(function(user) {
              // store user data in Firebase after creating account
              return createProfile(user.uid, email, name).then(function() {
                return user;
              })
            });
        },

        changePassword: function(email, oldpass, newpass) {
          return auth.$changePassword(email, oldpass, newpass);
        },

        changeEmail: function(password, newEmail) {
          return changeEmail(password, fns.user.email, newEmail, this);
        },

        removeUser: function(email, pass) {
          return auth.$removeUser(email, pass);
        },

        watch: function(cb, $scope) {
          fns.getUser().then(function(user) {
            cb(user);
          });
          listeners.push(cb);
          var unbind = function() {
            var i = listeners.indexOf(cb);
            if( i > -1 ) { listeners.splice(i, 1); }
          };
          if( $scope ) {
            $scope.$on('$destroy', unbind);
          }
          return unbind;
        }
      };

      $rootScope.$on('$firebaseSimpleLogin:login', statusChange);
      $rootScope.$on('$firebaseSimpleLogin:logout', statusChange);
      $rootScope.$on('$firebaseSimpleLogin:error', statusChange);
      statusChange();

      return fns;
    }])

  .factory('createProfile', ['fbutil', '$q', '$timeout', function(fbutil, $q, $timeout) {
    return function(id, email, name) {
      var ref = fbutil.ref('users', id), def = $q.defer();
      ref.set({email: email, name: name||firstPartOfEmail(email)}, function(err) {
        $timeout(function() {
          if( err ) {
            def.reject(err);
          }
          else {
            def.resolve(ref);
          }
        })
      });

      function firstPartOfEmail(email) {
        return ucfirst(email.substr(0, email.indexOf('@'))||'');
      }

      function ucfirst (str) {
        // credits: http://kevin.vanzonneveld.net
        str += '';
        var f = str.charAt(0).toUpperCase();
        return f + str.substr(1);
      }

      return def.promise;
    }
  }]);

'use strict';

/**
 * 0.1.1
 * Deferred load js/css file, used for ui-jq.js and Lazy Loading.
 *
 * @ flatfull.com All Rights Reserved.
 * Author url: http://themeforest.net/user/flatfull
 */

angular.module('ui.load', [])
	.service('uiLoad', ['$document', '$q', '$timeout', function ($document, $q, $timeout) {

		var loaded = [];
		var promise = false;
		var deferred = $q.defer();

		/**
		 * Chain loads the given sources
		 * @param srcs array, script or css
		 * @returns {*} Promise that will be resolved once the sources has been loaded.
		 */
		this.load = function (srcs) {
			srcs = angular.isArray(srcs) ? srcs : srcs.split(/\s+/);
			var self = this;
			if(!promise){
				promise = deferred.promise;
			}
      angular.forEach(srcs, function(src) {
      	promise = promise.then( function(){
      		return src.indexOf('.css') >=0 ? self.loadCSS(src) : self.loadScript(src);
      	} );
      });
      deferred.resolve();
      return promise;
		}

		/**
		 * Dynamically loads the given script
		 * @param src The url of the script to load dynamically
		 * @returns {*} Promise that will be resolved once the script has been loaded.
		 */
		this.loadScript = function (src) {
			if(loaded[src]) return loaded[src].promise;

			var deferred = $q.defer();
			var script = $document[0].createElement('script');
			script.src = src;
			script.onload = function (e) {
				$timeout(function () {
					deferred.resolve(e);
				});
			};
			script.onerror = function (e) {
				$timeout(function () {
					deferred.reject(e);
				});
			};
			$document[0].body.appendChild(script);
			loaded[src] = deferred;

			return deferred.promise;
		};

		/**
		 * Dynamically loads the given CSS file
		 * @param href The url of the CSS to load dynamically
		 * @returns {*} Promise that will be resolved once the CSS file has been loaded.
		 */
		this.loadCSS = function (href) {
			if(loaded[href]) return loaded[href].promise;

			var deferred = $q.defer();
			var style = $document[0].createElement('link');
			style.rel = 'stylesheet';
			style.type = 'text/css';
			style.href = href;
			style.onload = function (e) {
				$timeout(function () {
					deferred.resolve(e);
				});
			};
			style.onerror = function (e) {
				$timeout(function () {
					deferred.reject(e);
				});
			};
			$document[0].head.appendChild(style);
			loaded[href] = deferred;

			return deferred.promise;
		};
}]);

/**
 * calendarDemoApp - 0.1.3
 */

app.controller('FullcalendarCtrl', ['$scope', function($scope) {

    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    /* event source that pulls from google.com */
    $scope.eventSource = {
            url: "http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic",
            className: 'gcal-event',           // an option!
            currentTimezone: 'America/Chicago' // an option!
    };

    /* event source that contains custom events on the scope */
    $scope.events = [
      {title:'All Day Event', start: new Date(y, m, 1), className: ['b-l b-2x b-info'], location:'New York', info:'This a all day event that will start from 9:00 am to 9:00 pm, have fun!'},
      {title:'Dance class', start: new Date(y, m, 3), end: new Date(y, m, 4, 9, 30), allDay: false, className: ['b-l b-2x b-danger'], location:'London', info:'Two days dance training class.'},
      {title:'Game racing', start: new Date(y, m, 6, 16, 0), className: ['b-l b-2x b-info'], location:'Hongkong', info:'The most big racing of this year.'},
      {title:'Soccer', start: new Date(y, m, 8, 15, 0), className: ['b-l b-2x b-info'], location:'Rio', info:'Do not forget to watch.'},
      {title:'Family', start: new Date(y, m, 9, 19, 30), end: new Date(y, m, 9, 20, 30), className: ['b-l b-2x b-success'], info:'Family party'},
      {title:'Long Event', start: new Date(y, m, d - 5), end: new Date(y, m, d - 2), className: ['bg-success bg'], location:'HD City', info:'It is a long long event'},
      {title:'Play game', start: new Date(y, m, d - 1, 16, 0), className: ['b-l b-2x b-info'], location:'Tokyo', info:'Tokyo Game Racing'},
      {title:'Birthday Party', start: new Date(y, m, d + 1, 19, 0), end: new Date(y, m, d + 1, 22, 30), allDay: false, className: ['b-l b-2x b-primary'], location:'New York', info:'Party all day'},
      {title:'Repeating Event', start: new Date(y, m, d + 4, 16, 0), alDay: false, className: ['b-l b-2x b-warning'], location:'Home Town', info:'Repeat every day'},      
      {title:'Click for Google', start: new Date(y, m, 28), end: new Date(y, m, 29), url: 'http://google.com/', className: ['b-l b-2x b-primary']},
      {title:'Feed cat', start: new Date(y, m+1, 6, 18, 0), className: ['b-l b-2x b-info']}
    ];

    /* alert on dayClick */
    $scope.precision = 400;
    $scope.lastClickTime = 0;
    $scope.alertOnEventClick = function( date, jsEvent, view ){
      var time = new Date().getTime();
      if(time - $scope.lastClickTime <= $scope.precision){
          $scope.events.push({
            title: 'New Event',
            start: date,
            className: ['b-l b-2x b-info']
          });
      }
      $scope.lastClickTime = time;
    };
    /* alert on Drop */
    $scope.alertOnDrop = function(event, delta, revertFunc, jsEvent, ui, view){
       $scope.alertMessage = ('Event Droped to make dayDelta ' + delta);
    };
    /* alert on Resize */
    $scope.alertOnResize = function(event, delta, revertFunc, jsEvent, ui, view){
       $scope.alertMessage = ('Event Resized to make dayDelta ' + delta);
    };

    $scope.overlay = $('.fc-overlay');
    $scope.alertOnMouseOver = function( event, jsEvent, view ){
      $scope.event = event;
      $scope.overlay.removeClass('left right').find('.arrow').removeClass('left right top pull-up');
      var wrap = $(jsEvent.target).closest('.fc-event');
      var cal = wrap.closest('.calendar');
      var left = wrap.offset().left - cal.offset().left;
      var right = cal.width() - (wrap.offset().left - cal.offset().left + wrap.width());
      if( right > $scope.overlay.width() ) { 
        $scope.overlay.addClass('left').find('.arrow').addClass('left pull-up')
      }else if ( left > $scope.overlay.width() ) {
        $scope.overlay.addClass('right').find('.arrow').addClass('right pull-up');
      }else{
        $scope.overlay.find('.arrow').addClass('top');
      }
      (wrap.find('.fc-overlay').length == 0) && wrap.append( $scope.overlay );
    }

    /* config object */
    $scope.uiConfig = {
      calendar:{
        height: 450,
        editable: true,
        header:{
          left: 'prev',
          center: 'title',
          right: 'next'
        },
        dayClick: $scope.alertOnEventClick,
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize,
        eventMouseover: $scope.alertOnMouseOver
      }
    };
    
    /* add custom event*/
    $scope.addEvent = function() {
      $scope.events.push({
        title: 'New Event',
        start: new Date(y, m, d),
        className: ['b-l b-2x b-info']
      });
    };

    /* remove event */
    $scope.remove = function(index) {
      $scope.events.splice(index,1);
    };

    /* Change View */
    $scope.changeView = function(view, calendar) {
      $('.calendar').fullCalendar('changeView', view);
    };

    $scope.today = function(calendar) {
      $('.calendar').fullCalendar('today');
    };

    /* event sources array*/
    $scope.eventSources = [$scope.events];
}]);
/* EOF */
app.controller('ContactCtrl', ['$scope', '$http', '$filter', function($scope, $http, $filter) {
  $http.get('js/app/contact/contacts.json').then(function (resp) {
    $scope.items = resp.data.items;
    $scope.item = $filter('orderBy')($scope.items, 'first')[0];
    $scope.item.selected = true;
  });

  $scope.filter = '';
  $scope.groups = [
    {name: 'Coworkers'}, 
    {name: 'Family'}, 
    {name: 'Friends'}, 
    {name: 'Partners'}, 
    {name: 'Group'}
  ];

  $scope.createGroup = function(){
    var group = {name: 'New Group'};
    group.name = $scope.checkItem(group, $scope.groups, 'name');
    $scope.groups.push(group);
  };

  $scope.checkItem = function(obj, arr, key){
    var i=0;
    angular.forEach(arr, function(item) {
      if(item[key].indexOf( obj[key] ) == 0){
        var j = item[key].replace(obj[key], '').trim();
        if(j){
          i = Math.max(i, parseInt(j)+1);
        }else{
          i = 1;
        }
      }
    });
    return obj[key] + (i ? ' '+i : '');
  };

  $scope.deleteGroup = function(item){
    $scope.groups.splice($scope.groups.indexOf(item), 1);
  };

  $scope.selectGroup = function(item){    
    angular.forEach($scope.groups, function(item) {
      item.selected = false;
    });
    $scope.group = item;
    $scope.group.selected = true;
    $scope.filter = item.name;
  };

  $scope.selectItem = function(item){    
    angular.forEach($scope.items, function(item) {
      item.selected = false;
      item.editing = false;
    });
    $scope.item = item;
    $scope.item.selected = true;
  };

  $scope.deleteItem = function(item){
    $scope.items.splice($scope.items.indexOf(item), 1);
    $scope.item = $filter('orderBy')($scope.items, 'first')[0];
    if($scope.item) $scope.item.selected = true;
  };

  $scope.createItem = function(){
    var item = {
      group: 'Friends',
      avatar:'img/a0.jpg'
    };
    $scope.items.push(item);
    $scope.selectItem(item);
    $scope.item.editing = true;
  };

  $scope.editItem = function(item){
    if(item && item.selected){
      item.editing = true;
    }
  };

  $scope.doneEditing = function(item){
    item.editing = false;
  };

}]);
// A RESTful factory for retreiving mails from 'mails.json'
app.factory('mails', ['$http', function ($http) {
  var path = 'js/app/mail/mails.json';
  var mails = $http.get(path).then(function (resp) {
    return resp.data.mails;
  });

  var factory = {};
  factory.all = function () {
    return mails;
  };
  factory.get = function (id) {
    return mails.then(function(mails){
      for (var i = 0; i < mails.length; i++) {
        if (mails[i].id == id) return mails[i];
      }
      return null;
    })
  };
  return factory;
}]);
app.controller('MailCtrl', ['$scope', function($scope) {
  $scope.folds = [
    {name: 'Inbox', filter:''},
    {name: 'Starred', filter:'starred'},
    {name: 'Sent', filter:'sent'},
    {name: 'Important', filter:'important'},
    {name: 'Draft', filter:'draft'},
    {name: 'Trash', filter:'trash'}
  ];

  $scope.labels = [
    {name: 'Angular', filter:'angular', color:'#23b7e5'},
    {name: 'Bootstrap', filter:'bootstrap', color:'#7266ba'},
    {name: 'Client', filter:'client', color:'#fad733'},
    {name: 'Work', filter:'work', color:'#27c24c'}
  ];

  $scope.addLabel = function(){
    $scope.labels.push(
      {
        name: $scope.newLabel.name,
        filter: angular.lowercase($scope.newLabel.name),
        color: '#ccc'
      }
    );
    $scope.newLabel.name = '';
  }

  $scope.labelClass = function(label) {
    return {
      'b-l-info': angular.lowercase(label) === 'angular',
      'b-l-primary': angular.lowercase(label) === 'bootstrap',
      'b-l-warning': angular.lowercase(label) === 'client',
      'b-l-success': angular.lowercase(label) === 'work'      
    };
  };

}]);

app.controller('MailListCtrl', ['$scope', 'mails', '$stateParams', function($scope, mails, $stateParams) {
  $scope.fold = $stateParams.fold;
  mails.all().then(function(mails){
    $scope.mails = mails;
  });
}]);

app.controller('MailDetailCtrl', ['$scope', 'mails', '$stateParams', function($scope, mails, $stateParams) {
  mails.get($stateParams.mailId).then(function(mail){
    $scope.mail = mail;
  })
}]);

app.controller('MailNewCtrl', ['$scope', function($scope) {
  $scope.mail = {
    to: '',
    subject: '',
    content: ''
  }
  $scope.tolist = [
    {name: 'James', email:'james@gmail.com'},
    {name: 'Luoris Kiso', email:'luoris.kiso@hotmail.com'},
    {name: 'Lucy Yokes', email:'lucy.yokes@gmail.com'}
  ];
}]);

angular.module('app').directive('labelColor', function(){
  return function(scope, $el, attrs){
    $el.css({'color': attrs.color});
  }
});
/*!
 * JavaScript - loadGoogleMaps( version, apiKey, language )
 *
 * - Load Google Maps API using jQuery Deferred. 
 *   Useful if you want to only load the Google Maps API on-demand.
 * - Requires jQuery 1.5
 * 
 * Copyright (c) 2011 Glenn Baker
 * Dual licensed under the MIT and GPL licenses.
 */
/*globals window, google, jQuery*/
var loadGoogleMaps = (function($) {
	
	var now = $.now(),
	
		promise;
	
	return function( version, apiKey, language ) {
		
		if( promise ) { return promise; }
		
			//Create a Deferred Object
		var	deferred = $.Deferred(),
		
			//Declare a resolve function, pass google.maps for the done functions
			resolve = function () {
				deferred.resolve( window.google && google.maps ? google.maps : false );
			},
			
			//global callback name
			callbackName = "loadGoogleMaps_" + ( now++ ),
			
			// Default Parameters
			params = $.extend(
			 {'sensor': false}
			 , apiKey ? {"key": apiKey} : {}
			 , language ? {"language": language} : {} 
			);;
		
		//If google.maps exists, then Google Maps API was probably loaded with the <script> tag
		if( window.google && google.maps ) {
			
			resolve();
		
		//If the google.load method exists, lets load the Google Maps API in Async.
		} else if ( window.google && google.load ) {
		
			google.load("maps", version || 3, {"other_params": $.param(params) , "callback" : resolve});

		//Last, try pure jQuery Ajax technique to load the Google Maps API in Async.
		} else {
			
			//Ajax URL params
			params = $.extend( params, {
				'v': version || 3,
				'callback': callbackName
			});
			
			//Declare the global callback
			window[callbackName] = function( ) {
				
				resolve();
				
				//Delete callback
				setTimeout(function() {
					try{
						delete window[callbackName];
					} catch( e ) {}
				}, 20);
			};
			
			//Can't use the jXHR promise because 'script' doesn't support 'callback=?'
			$.ajax({
				dataType: 'script',
				data: params,
				url: 'http://maps.google.com/maps/api/js'				
			});
			
		}
	
		promise = deferred.promise(); 
		
		return promise;
	};
	
}(jQuery));

/* global console:false, google:false */
/*jshint unused:false */
'use strict';

app.controller('MapCtrl', ['$scope', function ($scope) {

    $scope.myMarkers = [];

    $scope.mapOptions = {
      center: new google.maps.LatLng(35.784, -78.670),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    $scope.addMarker = function ($event, $params) {
      $scope.myMarkers.push(new google.maps.Marker({
        map: $scope.myMap,
        position: $params[0].latLng
      }));
    };

    $scope.setZoomMessage = function (zoom) {
      $scope.zoomMessage = 'You just zoomed to ' + zoom + '!';
      console.log(zoom, 'zoomed');
    };

    $scope.openMarkerInfo = function (marker) {
      $scope.currentMarker = marker;
      $scope.currentMarkerLat = marker.getPosition().lat();
      $scope.currentMarkerLng = marker.getPosition().lng();
      $scope.myInfoWindow.open($scope.myMap, marker);
    };

    $scope.setMarkerPosition = function (marker, lat, lng) {
      marker.setPosition(new google.maps.LatLng(lat, lng));
    };
  }])
;
'use strict';

(function () {
  //Setup map events from a google map object to trigger on a given element too,
  //then we just use ui-event to catch events from an element
  function bindMapEvents(scope, eventsStr, googleObject, element) {
    angular.forEach(eventsStr.split(' '), function (eventName) {
      //Prefix all googlemap events with 'map-', so eg 'click'
      //for the googlemap doesn't interfere with a normal 'click' event
      window.google.maps.event.addListener(googleObject, eventName, function (event) {
        element.triggerHandler('map-' + eventName, event);
        //We create an $apply if it isn't happening. we need better support for this
        //We don't want to use timeout because tons of these events fire at once,
        //and we only need one $apply
        if (!scope.$$phase){ scope.$apply();}
      });
    });
  }

  app.value('uiMapConfig', {});
  app.directive('uiMap',
    ['uiMapConfig', '$parse', function (uiMapConfig, $parse) {

      var mapEvents = 'bounds_changed center_changed click dblclick drag dragend ' +
        'dragstart heading_changed idle maptypeid_changed mousemove mouseout ' +
        'mouseover projection_changed resize rightclick tilesloaded tilt_changed ' +
        'zoom_changed';
      var options = uiMapConfig || {};

      return {
        restrict: 'A',
        //doesn't work as E for unknown reason
        link: function (scope, elm, attrs) {
          var opts = angular.extend({}, options, scope.$eval(attrs.uiOptions));
          var map = new window.google.maps.Map(elm[0], opts);
          var model = $parse(attrs.uiMap);

          //Set scope variable for the map
          model.assign(scope, map);

          bindMapEvents(scope, mapEvents, map, elm);
        }
      };
    }]);

  app.value('uiMapInfoWindowConfig', {});
  app.directive('uiMapInfoWindow',
    ['uiMapInfoWindowConfig', '$parse', '$compile', function (uiMapInfoWindowConfig, $parse, $compile) {

      var infoWindowEvents = 'closeclick content_change domready ' +
        'position_changed zindex_changed';
      var options = uiMapInfoWindowConfig || {};

      return {
        link: function (scope, elm, attrs) {
          var opts = angular.extend({}, options, scope.$eval(attrs.uiOptions));
          opts.content = elm[0];
          var model = $parse(attrs.uiMapInfoWindow);
          var infoWindow = model(scope);

          if (!infoWindow) {
            infoWindow = new window.google.maps.InfoWindow(opts);
            model.assign(scope, infoWindow);
          }

          bindMapEvents(scope, infoWindowEvents, infoWindow, elm);

          /* The info window's contents dont' need to be on the dom anymore,
           google maps has them stored.  So we just replace the infowindow element
           with an empty div. (we don't just straight remove it from the dom because
           straight removing things from the dom can mess up angular) */
          elm.replaceWith('<div></div>');

          //Decorate infoWindow.open to $compile contents before opening
          var _open = infoWindow.open;
          infoWindow.open = function open(a1, a2, a3, a4, a5, a6) {
            $compile(elm.contents())(scope);
            _open.call(infoWindow, a1, a2, a3, a4, a5, a6);
          };
        }
      };
    }]);

  /*
   * Map overlay directives all work the same. Take map marker for example
   * <ui-map-marker="myMarker"> will $watch 'myMarker' and each time it changes,
   * it will hook up myMarker's events to the directive dom element.  Then
   * ui-event will be able to catch all of myMarker's events. Super simple.
   */
  function mapOverlayDirective(directiveName, events) {
    app.directive(directiveName, [function () {
      return {
        restrict: 'A',
        link: function (scope, elm, attrs) {
          scope.$watch(attrs[directiveName], function (newObject) {
            if (newObject) {
              bindMapEvents(scope, events, newObject, elm);
            }
          });
        }
      };
    }]);
  }

  mapOverlayDirective('uiMapMarker',
    'animation_changed click clickable_changed cursor_changed ' +
      'dblclick drag dragend draggable_changed dragstart flat_changed icon_changed ' +
      'mousedown mouseout mouseover mouseup position_changed rightclick ' +
      'shadow_changed shape_changed title_changed visible_changed zindex_changed');

  mapOverlayDirective('uiMapPolyline',
    'click dblclick mousedown mousemove mouseout mouseover mouseup rightclick');

  mapOverlayDirective('uiMapPolygon',
    'click dblclick mousedown mousemove mouseout mouseover mouseup rightclick');

  mapOverlayDirective('uiMapRectangle',
    'bounds_changed click dblclick mousedown mousemove mouseout mouseover ' +
      'mouseup rightclick');

  mapOverlayDirective('uiMapCircle',
    'center_changed click dblclick mousedown mousemove ' +
      'mouseout mouseover mouseup radius_changed rightclick');

  mapOverlayDirective('uiMapGroundOverlay',
    'click dblclick');

})();

app.controller('MusicCtrl',
  ["$sce",'$scope', function ($sce, $scope) {    
    $scope.API = null;
    $scope.active = 0;

    $scope.audios = [
      {
        title: "1. Lentement",
        artist:"Miaow",
        poster: "img/b0.jpg",
        sources: [
          {src: $sce.trustAsResourceUrl("http://flatfull.com/themes/assets/musics/Miaow-03-Lentement.mp3"), type: "audio/mpeg"},
          {src: $sce.trustAsResourceUrl("http://flatfull.com/themes/assets/musics/Miaow-03-Lentement.ogg"), type: "audio/ogg"}
        ]
      },
      {
        title: "2. Bubble",
        artist:"Miaow",
        poster: "img/b1.jpg",
        sources: [
          {src: $sce.trustAsResourceUrl("http://flatfull.com/themes/assets/musics/Miaow-07-Bubble.mp3"), type: "audio/mpeg"},
          {src: $sce.trustAsResourceUrl("http://flatfull.com/themes/assets/musics/Miaow-07-Bubble.ogg"), type: "audio/ogg"}
        ]
      },      
      {
        title: "3. Partir",
        artist:"Miaow",
        poster: "img/b2.jpg",
        sources: [
          {src: $sce.trustAsResourceUrl("http://flatfull.com/themes/assets/musics/Miaow-09-Partir.mp3"), type: "audio/mpeg"},
          {src: $sce.trustAsResourceUrl("http://flatfull.com/themes/assets/musics/Miaow-09-Partir.ogg"), type: "audio/ogg"}
        ]
      }
    ];

    $scope.config = {
      sources: $scope.audios[0].sources,
      title: $scope.audios[0].title,
      repeat: false,
      shuffle: false,
      autoPlay: true,
      theme: {
        url: "js/app/music/videogular.css"
      }
    };

    $scope.onPlayerReady = function(API) {
      $scope.API = API;
      if ($scope.API.currentState == 'play' || $scope.isCompleted) $scope.API.play();
      $scope.isCompleted = false;
    };

    $scope.onComplete = function() {
      $scope.isCompleted = true;
      // shuffle
      if($scope.config.shuffle){
        $scope.active = $scope.getRandom($scope.active);
      // next item
      }else{
        $scope.active++;
      }
      
      // last item
      if ($scope.active >= $scope.audios.length) {
        $scope.active = 0;
        // repeat
        if($scope.config.repeat){
          $scope.setActive($scope.active);
        }
      }else{
        $scope.setActive($scope.active);
      }
    };

    $scope.getRandom = function(index){
      var i = Math.floor( Math.random() * $scope.audios.length );
      if ( !(i-index) ){
        i = $scope.getRandom( index );
      }
      return i;
    }

    $scope.play = function(index){
      $scope.isCompleted = true;
      // get prev or next item
      index == "next" ? $scope.active++ : $scope.active--;
      if ($scope.active >= $scope.audios.length) $scope.active = 0;
      if ($scope.active == -1) $scope.active = $scope.audios.length - 1;
      // play it
      $scope.setActive($scope.active);
    };

    $scope.setActive = function(index){
      $scope.API.stop();
      $scope.config.sources = $scope.audios[index].sources;
      $scope.config.title = $scope.audios[index].title;
    };

    $scope.toggleRepeat = function(){
      $scope.config.repeat = !$scope.config.repeat;
      if ($scope.isCompleted) $scope.API.play();
    };

    $scope.toggleShuffle = function(){
      $scope.config.shuffle = !$scope.config.shuffle;
      console.log($scope.API.currentState);
      if ($scope.isCompleted) $scope.API.play();
    };

    // video
    $scope.video = {
      sources: [
        {src: $sce.trustAsResourceUrl("http://flatfull.com/themes/assets/video/big_buck_bunny_trailer.m4v"), type: "video/mp4"},
        {src: $sce.trustAsResourceUrl("http://flatfull.com/themes/assets/video/big_buck_bunny_trailer.webm"), type: "video/webm"},
        {src: $sce.trustAsResourceUrl("http://flatfull.com/themes/assets/video/big_buck_bunny_trailer.ogv"), type: "video/ogg"}
      ],
      theme: {
        url: "js/app/music/videogular.css"
      },
      plugins: {
        controls: {
          autoHide: true,
          autoHideTime: 5000
        },
        poster: "img/c1.jpg"
      }
    };

  }]
);
app.controller('NoteCtrl', ['$scope', '$http', function($scope, $http) {
  $http.get('js/app/note/notes.json').then(function (resp) {
    $scope.notes = resp.data.notes;
    // set default note
    $scope.note = $scope.notes[0];
    $scope.notes[0].selected = true;
  });

  $scope.colors = ['primary', 'info', 'success', 'warning', 'danger', 'dark'];

  $scope.createNote = function(){
    var note = {
      content: 'New note',
      color: $scope.colors[Math.floor((Math.random()*3))],
      date: Date.now()
    };
    $scope.notes.push(note);
    $scope.selectNote(note);
  }

  $scope.deleteNote = function(note){
    $scope.notes.splice($scope.notes.indexOf(note), 1);
    if(note.selected){
      $scope.note = $scope.notes[0];
      $scope.notes.length && ($scope.notes[0].selected = true);
    }
  }

  $scope.selectNote = function(note){
    angular.forEach($scope.notes, function(note) {
      note.selected = false;
    });
    $scope.note = note;
    $scope.note.selected = true;
  }

}]);
var angularSkycons = angular.module( 'angular-skycons', [] );


angularSkycons.directive( 'skycon', function () {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            icon: "=",
            size: "="
        },
        link: function ( scope, element, attrs ) {

            // make a canvas for our icon
            var canvas = document.createElement( 'canvas' );

            // set the CSS class from attribute
            if ( !attrs.class ) {
                canvas.className = "";
            } else {
                canvas.className = attrs.class;
            }

            // set default color if "color" attribute not present
            var config = {};
            if ( !attrs.color ) {
                config.color = "black";
            } else {
                config.color = attrs.color;
            }

            var skycons = new Skycons( config );

            // watch the size property from the controller
            scope.$watch( "size", function ( newVal, oldVal ) {
                if ( newVal ) {
                    canvas.height = newVal;
                    canvas.width = newVal;
                } else {
                    canvas.height = scope.size || 64;
                    canvas.width = scope.size  || 64;
                }
            }, true );

            // watch the icon property from the controller
            scope.$watch( "icon", function () {
                skycons.set( canvas, scope.icon );
            }, true );

            skycons.play();

            if ( element[0].nodeType === 8 ) {
                element.replaceWith( canvas );
            } else {
                element[0].appendChild( canvas );
            }
            
            scope.$on('$destroy', function () {
                skycons.remove(canvas);
                if (skycons.list.length === 0) {
                    skycons.pause(canvas);
                }
            });
        }
    };
} );

app.controller("WeatherCtrl", ['$scope', 'yahooApi', 'geoApi', function($scope, yahooApi, geoApi) {
    $scope.userSearchText = '';
    $scope.search = {};
    $scope.forcast = {};
    $scope.place = {};
    $scope.data = {};

    // get place
    geoApi.then(function(res) {
      $scope.userSearchText = res.data.city+", "+res.data.country_code;
      $scope.getLocations();
    });
    
    // get locations
    $scope.getLocations = function () {
      var query = 'select * from geo.places where text="' + $scope.userSearchText + '"';
      yahooApi.query({'q':query,'format':'json'}, {}, function (response) {
        $scope.search = response;
        if(response.query.count === 1 && !response.query.results.channel){
          $scope.getWeather( response.query.results.place.woeid, response.query.results.place.name, response.query.results.place.country.content);
        }
      });
    };

    // get weather
    $scope.getWeather = function(woeid, city, country){
      $scope.place.city = city;
      $scope.place.country = country;
      var query = 'select item from weather.forecast where woeid=' + woeid;
      yahooApi.query({'q':query,'format':'json'}, {}, function (response) {
        response.query.results.channel.item.forecast.forEach(function(i, v) {
          i.icon = $scope.getCustomIcon(i.code);
        });
        response.query.results.channel.item.condition.icon = $scope.getCustomIcon(response.query.results.channel.item.condition.code);
        $scope.data = response;
      });
    };

    $scope.getCustomIcon = function (condition) {
      switch (condition) {
        case "0":
        case "1":
        case "2":
        case "24":
        case "25":
            return "wind";
        case "5":
        case "6":
        case "7":        
        case "18":        
            return "sleet";
        case "3":
        case "4":
        case "8":        
        case "9":
        case "10":
        case "11":
        case "12":
        case "35":
        case "37":
        case "38":
        case "39":        
        case "40":
        case "45":
        case "47":
            return "rain";
        case "13":
        case "14":
        case "15":
        case "16":
        case "17":
        case "41":
        case "42":
        case "43":
        case "46":
            return "snow";
        case "19":
        case "20":
        case "21":
        case "22":
        case "23":
            return "fog";        
        case "26":
        case "27":
        case "28":
        case "44":
            return "cloudy";
        case "29":
            return "partly-cloudy-night";
        case "30":
            return "partly-cloudy-day";
        case "31":
        case "33":
            return "clear-night";
        case "32":
        case "34":
        case "36":
            return "clear-day";
        default:
            return "";
      }
    }
  }
]);

app.factory('yahooApi', ['$resource', function($resource) {
  return $resource('http://query.yahooapis.com/v1/public/yql', {}, 
    {'query': 
      {
        method: 'GET', 
        isArray: false
      }
    }
  );
}]);

app.factory('geoApi', ['$http', function($http) {
    return $http.jsonp("http://muslimsalat.com/daily.json?callback=JSON_CALLBACK");
  }
]);

function JSON_CALLBACK(){
  // Nothing
}
(function(global) {
  "use strict";

  /* Set up a RequestAnimationFrame shim so we can animate efficiently FOR
   * GREAT JUSTICE. */
  var requestInterval, cancelInterval;

  (function() {
    var raf = global.requestAnimationFrame       ||
              global.webkitRequestAnimationFrame ||
              global.mozRequestAnimationFrame    ||
              global.oRequestAnimationFrame      ||
              global.msRequestAnimationFrame     ,
        caf = global.cancelAnimationFrame        ||
              global.webkitCancelAnimationFrame  ||
              global.mozCancelAnimationFrame     ||
              global.oCancelAnimationFrame       ||
              global.msCancelAnimationFrame      ;

    if(raf && caf) {
      requestInterval = function(fn, delay) {
        var handle = {value: null};

        function loop() {
          handle.value = raf(loop);
          fn();
        }

        loop();
        return handle;
      };

      cancelInterval = function(handle) {
        caf(handle.value);
      };
    }

    else {
      requestInterval = setInterval;
      cancelInterval = clearInterval;
    }
  }());

  /* Catmull-rom spline stuffs. */
  /*
  function upsample(n, spline) {
    var polyline = [],
        len = spline.length,
        bx  = spline[0],
        by  = spline[1],
        cx  = spline[2],
        cy  = spline[3],
        dx  = spline[4],
        dy  = spline[5],
        i, j, ax, ay, px, qx, rx, sx, py, qy, ry, sy, t;

    for(i = 6; i !== spline.length; i += 2) {
      ax = bx;
      bx = cx;
      cx = dx;
      dx = spline[i    ];
      px = -0.5 * ax + 1.5 * bx - 1.5 * cx + 0.5 * dx;
      qx =        ax - 2.5 * bx + 2.0 * cx - 0.5 * dx;
      rx = -0.5 * ax            + 0.5 * cx           ;
      sx =                   bx                      ;

      ay = by;
      by = cy;
      cy = dy;
      dy = spline[i + 1];
      py = -0.5 * ay + 1.5 * by - 1.5 * cy + 0.5 * dy;
      qy =        ay - 2.5 * by + 2.0 * cy - 0.5 * dy;
      ry = -0.5 * ay            + 0.5 * cy           ;
      sy =                   by                      ;

      for(j = 0; j !== n; ++j) {
        t = j / n;

        polyline.push(
          ((px * t + qx) * t + rx) * t + sx,
          ((py * t + qy) * t + ry) * t + sy
        );
      }
    }

    polyline.push(
      px + qx + rx + sx,
      py + qy + ry + sy
    );

    return polyline;
  }

  function downsample(n, polyline) {
    var len = 0,
        i, dx, dy;

    for(i = 2; i !== polyline.length; i += 2) {
      dx = polyline[i    ] - polyline[i - 2];
      dy = polyline[i + 1] - polyline[i - 1];
      len += Math.sqrt(dx * dx + dy * dy);
    }

    len /= n;

    var small = [],
        target = len,
        min = 0,
        max, t;

    small.push(polyline[0], polyline[1]);

    for(i = 2; i !== polyline.length; i += 2) {
      dx = polyline[i    ] - polyline[i - 2];
      dy = polyline[i + 1] - polyline[i - 1];
      max = min + Math.sqrt(dx * dx + dy * dy);

      if(max > target) {
        t = (target - min) / (max - min);

        small.push(
          polyline[i - 2] + dx * t,
          polyline[i - 1] + dy * t
        );

        target += len;
      }

      min = max;
    }

    small.push(polyline[polyline.length - 2], polyline[polyline.length - 1]);

    return small;
  }
  */

  /* Define skycon things. */
  /* FIXME: I'm *really really* sorry that this code is so gross. Really, I am.
   * I'll try to clean it up eventually! Promise! */
  var KEYFRAME = 500,
      STROKE = 0.08,
      TAU = 2.0 * Math.PI,
      TWO_OVER_SQRT_2 = 2.0 / Math.sqrt(2);

  function circle(ctx, x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, TAU, false);
    ctx.fill();
  }

  function line(ctx, ax, ay, bx, by) {
    ctx.beginPath();
    ctx.moveTo(ax, ay);
    ctx.lineTo(bx, by);
    ctx.stroke();
  }

  function puff(ctx, t, cx, cy, rx, ry, rmin, rmax) {
    var c = Math.cos(t * TAU),
        s = Math.sin(t * TAU);

    rmax -= rmin;

    circle(
      ctx,
      cx - s * rx,
      cy + c * ry + rmax * 0.5,
      rmin + (1 - c * 0.5) * rmax
    );
  }

  function puffs(ctx, t, cx, cy, rx, ry, rmin, rmax) {
    var i;

    for(i = 5; i--; )
      puff(ctx, t + i / 5, cx, cy, rx, ry, rmin, rmax);
  }

  function cloud(ctx, t, cx, cy, cw, s, color) {
    t /= 30000;

    var a = cw * 0.21,
        b = cw * 0.12,
        c = cw * 0.24,
        d = cw * 0.28;

    ctx.fillStyle = color;
    puffs(ctx, t, cx, cy, a, b, c, d);

    ctx.globalCompositeOperation = 'destination-out';
    puffs(ctx, t, cx, cy, a, b, c - s, d - s);
    ctx.globalCompositeOperation = 'source-over';
  }

  function sun(ctx, t, cx, cy, cw, s, color) {
    t /= 120000;

    var a = cw * 0.25 - s * 0.5,
        b = cw * 0.32 + s * 0.5,
        c = cw * 0.50 - s * 0.5,
        i, p, cos, sin;

    ctx.strokeStyle = color;
    ctx.lineWidth = s;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctx.beginPath();
    ctx.arc(cx, cy, a, 0, TAU, false);
    ctx.stroke();

    for(i = 8; i--; ) {
      p = (t + i / 8) * TAU;
      cos = Math.cos(p);
      sin = Math.sin(p);
      line(ctx, cx + cos * b, cy + sin * b, cx + cos * c, cy + sin * c);
    }
  }

  function moon(ctx, t, cx, cy, cw, s, color) {
    t /= 15000;

    var a = cw * 0.29 - s * 0.5,
        b = cw * 0.05,
        c = Math.cos(t * TAU),
        p = c * TAU / -16;

    ctx.strokeStyle = color;
    ctx.lineWidth = s;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    cx += c * b;

    ctx.beginPath();
    ctx.arc(cx, cy, a, p + TAU / 8, p + TAU * 7 / 8, false);
    ctx.arc(cx + Math.cos(p) * a * TWO_OVER_SQRT_2, cy + Math.sin(p) * a * TWO_OVER_SQRT_2, a, p + TAU * 5 / 8, p + TAU * 3 / 8, true);
    ctx.closePath();
    ctx.stroke();
  }

  function rain(ctx, t, cx, cy, cw, s, color) {
    t /= 1350;

    var a = cw * 0.16,
        b = TAU * 11 / 12,
        c = TAU *  7 / 12,
        i, p, x, y;

    ctx.fillStyle = color;

    for(i = 4; i--; ) {
      p = (t + i / 4) % 1;
      x = cx + ((i - 1.5) / 1.5) * (i === 1 || i === 2 ? -1 : 1) * a;
      y = cy + p * p * cw;
      ctx.beginPath();
      ctx.moveTo(x, y - s * 1.5);
      ctx.arc(x, y, s * 0.75, b, c, false);
      ctx.fill();
    }
  }

  function sleet(ctx, t, cx, cy, cw, s, color) {
    t /= 750;

    var a = cw * 0.1875,
        b = TAU * 11 / 12,
        c = TAU *  7 / 12,
        i, p, x, y;

    ctx.strokeStyle = color;
    ctx.lineWidth = s * 0.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    for(i = 4; i--; ) {
      p = (t + i / 4) % 1;
      x = Math.floor(cx + ((i - 1.5) / 1.5) * (i === 1 || i === 2 ? -1 : 1) * a) + 0.5;
      y = cy + p * cw;
      line(ctx, x, y - s * 1.5, x, y + s * 1.5);
    }
  }

  function snow(ctx, t, cx, cy, cw, s, color) {
    t /= 3000;

    var a  = cw * 0.16,
        b  = s * 0.75,
        u  = t * TAU * 0.7,
        ux = Math.cos(u) * b,
        uy = Math.sin(u) * b,
        v  = u + TAU / 3,
        vx = Math.cos(v) * b,
        vy = Math.sin(v) * b,
        w  = u + TAU * 2 / 3,
        wx = Math.cos(w) * b,
        wy = Math.sin(w) * b,
        i, p, x, y;

    ctx.strokeStyle = color;
    ctx.lineWidth = s * 0.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    for(i = 4; i--; ) {
      p = (t + i / 4) % 1;
      x = cx + Math.sin((p + i / 4) * TAU) * a;
      y = cy + p * cw;

      line(ctx, x - ux, y - uy, x + ux, y + uy);
      line(ctx, x - vx, y - vy, x + vx, y + vy);
      line(ctx, x - wx, y - wy, x + wx, y + wy);
    }
  }

  function fogbank(ctx, t, cx, cy, cw, s, color) {
    t /= 30000;

    var a = cw * 0.21,
        b = cw * 0.06,
        c = cw * 0.21,
        d = cw * 0.28;

    ctx.fillStyle = color;
    puffs(ctx, t, cx, cy, a, b, c, d);

    ctx.globalCompositeOperation = 'destination-out';
    puffs(ctx, t, cx, cy, a, b, c - s, d - s);
    ctx.globalCompositeOperation = 'source-over';
  }

  /*
  var WIND_PATHS = [
        downsample(63, upsample(8, [
          -1.00, -0.28,
          -0.75, -0.18,
          -0.50,  0.12,
          -0.20,  0.12,
          -0.04, -0.04,
          -0.07, -0.18,
          -0.19, -0.18,
          -0.23, -0.05,
          -0.12,  0.11,
           0.02,  0.16,
           0.20,  0.15,
           0.50,  0.07,
           0.75,  0.18,
           1.00,  0.28
        ])),
        downsample(31, upsample(16, [
          -1.00, -0.10,
          -0.75,  0.00,
          -0.50,  0.10,
          -0.25,  0.14,
           0.00,  0.10,
           0.25,  0.00,
           0.50, -0.10,
           0.75, -0.14,
           1.00, -0.10
        ]))
      ];
  */

  var WIND_PATHS = [
        [
          -0.7500, -0.1800, -0.7219, -0.1527, -0.6971, -0.1225,
          -0.6739, -0.0910, -0.6516, -0.0588, -0.6298, -0.0262,
          -0.6083,  0.0065, -0.5868,  0.0396, -0.5643,  0.0731,
          -0.5372,  0.1041, -0.5033,  0.1259, -0.4662,  0.1406,
          -0.4275,  0.1493, -0.3881,  0.1530, -0.3487,  0.1526,
          -0.3095,  0.1488, -0.2708,  0.1421, -0.2319,  0.1342,
          -0.1943,  0.1217, -0.1600,  0.1025, -0.1290,  0.0785,
          -0.1012,  0.0509, -0.0764,  0.0206, -0.0547, -0.0120,
          -0.0378, -0.0472, -0.0324, -0.0857, -0.0389, -0.1241,
          -0.0546, -0.1599, -0.0814, -0.1876, -0.1193, -0.1964,
          -0.1582, -0.1935, -0.1931, -0.1769, -0.2157, -0.1453,
          -0.2290, -0.1085, -0.2327, -0.0697, -0.2240, -0.0317,
          -0.2064,  0.0033, -0.1853,  0.0362, -0.1613,  0.0672,
          -0.1350,  0.0961, -0.1051,  0.1213, -0.0706,  0.1397,
          -0.0332,  0.1512,  0.0053,  0.1580,  0.0442,  0.1624,
           0.0833,  0.1636,  0.1224,  0.1615,  0.1613,  0.1565,
           0.1999,  0.1500,  0.2378,  0.1402,  0.2749,  0.1279,
           0.3118,  0.1147,  0.3487,  0.1015,  0.3858,  0.0892,
           0.4236,  0.0787,  0.4621,  0.0715,  0.5012,  0.0702,
           0.5398,  0.0766,  0.5768,  0.0890,  0.6123,  0.1055,
           0.6466,  0.1244,  0.6805,  0.1440,  0.7147,  0.1630,
           0.7500,  0.1800
        ],
        [
          -0.7500,  0.0000, -0.7033,  0.0195, -0.6569,  0.0399,
          -0.6104,  0.0600, -0.5634,  0.0789, -0.5155,  0.0954,
          -0.4667,  0.1089, -0.4174,  0.1206, -0.3676,  0.1299,
          -0.3174,  0.1365, -0.2669,  0.1398, -0.2162,  0.1391,
          -0.1658,  0.1347, -0.1157,  0.1271, -0.0661,  0.1169,
          -0.0170,  0.1046,  0.0316,  0.0903,  0.0791,  0.0728,
           0.1259,  0.0534,  0.1723,  0.0331,  0.2188,  0.0129,
           0.2656, -0.0064,  0.3122, -0.0263,  0.3586, -0.0466,
           0.4052, -0.0665,  0.4525, -0.0847,  0.5007, -0.1002,
           0.5497, -0.1130,  0.5991, -0.1240,  0.6491, -0.1325,
           0.6994, -0.1380,  0.7500, -0.1400
        ]
      ],
      WIND_OFFSETS = [
        {start: 0.36, end: 0.11},
        {start: 0.56, end: 0.16}
      ];

  function leaf(ctx, t, x, y, cw, s, color) {
    var a = cw / 8,
        b = a / 3,
        c = 2 * b,
        d = (t % 1) * TAU,
        e = Math.cos(d),
        f = Math.sin(d);

    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.lineWidth = s;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctx.beginPath();
    ctx.arc(x        , y        , a, d          , d + Math.PI, false);
    ctx.arc(x - b * e, y - b * f, c, d + Math.PI, d          , false);
    ctx.arc(x + c * e, y + c * f, b, d + Math.PI, d          , true );
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fill();
    ctx.globalCompositeOperation = 'source-over';
    ctx.stroke();
  }

  function swoosh(ctx, t, cx, cy, cw, s, index, total, color) {
    t /= 2500;

    var path = WIND_PATHS[index],
        a = (t + index - WIND_OFFSETS[index].start) % total,
        c = (t + index - WIND_OFFSETS[index].end  ) % total,
        e = (t + index                            ) % total,
        b, d, f, i;

    ctx.strokeStyle = color;
    ctx.lineWidth = s;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    if(a < 1) {
      ctx.beginPath();

      a *= path.length / 2 - 1;
      b  = Math.floor(a);
      a -= b;
      b *= 2;
      b += 2;

      ctx.moveTo(
        cx + (path[b - 2] * (1 - a) + path[b    ] * a) * cw,
        cy + (path[b - 1] * (1 - a) + path[b + 1] * a) * cw
      );

      if(c < 1) {
        c *= path.length / 2 - 1;
        d  = Math.floor(c);
        c -= d;
        d *= 2;
        d += 2;

        for(i = b; i !== d; i += 2)
          ctx.lineTo(cx + path[i] * cw, cy + path[i + 1] * cw);

        ctx.lineTo(
          cx + (path[d - 2] * (1 - c) + path[d    ] * c) * cw,
          cy + (path[d - 1] * (1 - c) + path[d + 1] * c) * cw
        );
      }

      else
        for(i = b; i !== path.length; i += 2)
          ctx.lineTo(cx + path[i] * cw, cy + path[i + 1] * cw);

      ctx.stroke();
    }

    else if(c < 1) {
      ctx.beginPath();

      c *= path.length / 2 - 1;
      d  = Math.floor(c);
      c -= d;
      d *= 2;
      d += 2;

      ctx.moveTo(cx + path[0] * cw, cy + path[1] * cw);

      for(i = 2; i !== d; i += 2)
        ctx.lineTo(cx + path[i] * cw, cy + path[i + 1] * cw);

      ctx.lineTo(
        cx + (path[d - 2] * (1 - c) + path[d    ] * c) * cw,
        cy + (path[d - 1] * (1 - c) + path[d + 1] * c) * cw
      );

      ctx.stroke();
    }

    if(e < 1) {
      e *= path.length / 2 - 1;
      f  = Math.floor(e);
      e -= f;
      f *= 2;
      f += 2;

      leaf(
        ctx,
        t,
        cx + (path[f - 2] * (1 - e) + path[f    ] * e) * cw,
        cy + (path[f - 1] * (1 - e) + path[f + 1] * e) * cw,
        cw,
        s,
        color
      );
    }
  }

  var Skycons = function(opts) {
        this.list        = [];
        this.interval    = null;
        this.color       = opts && opts.color ? opts.color : "black";
        this.resizeClear = !!(opts && opts.resizeClear);
      };

  Skycons.CLEAR_DAY = function(ctx, t, color) {
    var w = ctx.canvas.width,
        h = ctx.canvas.height,
        s = Math.min(w, h);

    sun(ctx, t, w * 0.5, h * 0.5, s, s * STROKE, color);
  };

  Skycons.CLEAR_NIGHT = function(ctx, t, color) {
    var w = ctx.canvas.width,
        h = ctx.canvas.height,
        s = Math.min(w, h);

    moon(ctx, t, w * 0.5, h * 0.5, s, s * STROKE, color);
  };

  Skycons.PARTLY_CLOUDY_DAY = function(ctx, t, color) {
    var w = ctx.canvas.width,
        h = ctx.canvas.height,
        s = Math.min(w, h);

    sun(ctx, t, w * 0.625, h * 0.375, s * 0.75, s * STROKE, color);
    cloud(ctx, t, w * 0.375, h * 0.625, s * 0.75, s * STROKE, color);
  };

  Skycons.PARTLY_CLOUDY_NIGHT = function(ctx, t, color) {
    var w = ctx.canvas.width,
        h = ctx.canvas.height,
        s = Math.min(w, h);

    moon(ctx, t, w * 0.667, h * 0.375, s * 0.75, s * STROKE, color);
    cloud(ctx, t, w * 0.375, h * 0.625, s * 0.75, s * STROKE, color);
  };

  Skycons.CLOUDY = function(ctx, t, color) {
    var w = ctx.canvas.width,
        h = ctx.canvas.height,
        s = Math.min(w, h);

    cloud(ctx, t, w * 0.5, h * 0.5, s, s * STROKE, color);
  };

  Skycons.RAIN = function(ctx, t, color) {
    var w = ctx.canvas.width,
        h = ctx.canvas.height,
        s = Math.min(w, h);

    rain(ctx, t, w * 0.5, h * 0.37, s * 0.9, s * STROKE, color);
    cloud(ctx, t, w * 0.5, h * 0.37, s * 0.9, s * STROKE, color);
  };

  Skycons.SLEET = function(ctx, t, color) {
    var w = ctx.canvas.width,
        h = ctx.canvas.height,
        s = Math.min(w, h);

    sleet(ctx, t, w * 0.5, h * 0.37, s * 0.9, s * STROKE, color);
    cloud(ctx, t, w * 0.5, h * 0.37, s * 0.9, s * STROKE, color);
  };

  Skycons.SNOW = function(ctx, t, color) {
    var w = ctx.canvas.width,
        h = ctx.canvas.height,
        s = Math.min(w, h);

    snow(ctx, t, w * 0.5, h * 0.37, s * 0.9, s * STROKE, color);
    cloud(ctx, t, w * 0.5, h * 0.37, s * 0.9, s * STROKE, color);
  };

  Skycons.WIND = function(ctx, t, color) {
    var w = ctx.canvas.width,
        h = ctx.canvas.height,
        s = Math.min(w, h);

    swoosh(ctx, t, w * 0.5, h * 0.5, s, s * STROKE, 0, 2, color);
    swoosh(ctx, t, w * 0.5, h * 0.5, s, s * STROKE, 1, 2, color);
  };

  Skycons.FOG = function(ctx, t, color) {
    var w = ctx.canvas.width,
        h = ctx.canvas.height,
        s = Math.min(w, h),
        k = s * STROKE;

    fogbank(ctx, t, w * 0.5, h * 0.32, s * 0.75, k, color);

    t /= 5000;

    var a = Math.cos((t       ) * TAU) * s * 0.02,
        b = Math.cos((t + 0.25) * TAU) * s * 0.02,
        c = Math.cos((t + 0.50) * TAU) * s * 0.02,
        d = Math.cos((t + 0.75) * TAU) * s * 0.02,
        n = h * 0.936,
        e = Math.floor(n - k * 0.5) + 0.5,
        f = Math.floor(n - k * 2.5) + 0.5;

    ctx.strokeStyle = color;
    ctx.lineWidth = k;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    line(ctx, a + w * 0.2 + k * 0.5, e, b + w * 0.8 - k * 0.5, e);
    line(ctx, c + w * 0.2 + k * 0.5, f, d + w * 0.8 - k * 0.5, f);
  };

  Skycons.prototype = {
    _determineDrawingFunction: function(draw) {
      if(typeof draw === "string")
        draw = Skycons[draw.toUpperCase().replace(/-/g, "_")] || null;

      return draw;
    },
    add: function(el, draw) {
      var obj;

      if(typeof el === "string")
        el = document.getElementById(el);

      // Does nothing if canvas name doesn't exists
      if(el === null)
        return;

      draw = this._determineDrawingFunction(draw);

      // Does nothing if the draw function isn't actually a function
      if(typeof draw !== "function")
        return;

      obj = {
        element: el,
        context: el.getContext("2d"),
        drawing: draw
      };

      this.list.push(obj);
      this.draw(obj, KEYFRAME);
    },
    set: function(el, draw) {
      var i;

      if(typeof el === "string")
        el = document.getElementById(el);

      for(i = this.list.length; i--; )
        if(this.list[i].element === el) {
          this.list[i].drawing = this._determineDrawingFunction(draw);
          this.draw(this.list[i], KEYFRAME);
          return;
        }

      this.add(el, draw);
    },
    remove: function(el) {
      var i;

      if(typeof el === "string")
        el = document.getElementById(el);

      for(i = this.list.length; i--; )
        if(this.list[i].element === el) {
          this.list.splice(i, 1);
          return;
        }
    },
    draw: function(obj, time) {
      var canvas = obj.context.canvas;

      if(this.resizeClear)
        canvas.width = canvas.width;

      else
        obj.context.clearRect(0, 0, canvas.width, canvas.height);

      obj.drawing(obj.context, time, this.color);
    },
    play: function() {
      var self = this;

      this.pause();
      this.interval = requestInterval(function() {
        var now = Date.now(),
            i;

        for(i = self.list.length; i--; )
          self.draw(self.list[i], now);
      }, 1000 / 60);
    },
    pause: function() {
      var i;

      if(this.interval) {
        cancelInterval(this.interval);
        this.interval = null;
      }
    }
  };

  global.Skycons = Skycons;
}(this));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImNvbmZpZy5qcyIsImNvbmZpZy5sYXp5bG9hZC5qcyIsImNvbmZpZy5yb3V0ZXIuanMiLCJjb25maWcucm91dGVyb2xkLmpzIiwiZmlyZWJhc2UudXRpbHMuanMiLCJtYWluLmpzIiwiY29udHJvbGxlcnMvQWNjb3VudEN0cmwuanMiLCJjb250cm9sbGVycy9TaG93c0N0cmwuanMiLCJjb250cm9sbGVycy9ib290c3RyYXAuanMiLCJjb250cm9sbGVycy9jaGFydC5qcyIsImNvbnRyb2xsZXJzL2N0cmx0ZW1wbGF0ZS5qcyIsImNvbnRyb2xsZXJzL2Zhdm9yaXRlc2N0cmwuanMiLCJjb250cm9sbGVycy9ob21lY3RybC5qcyIsImNvbnRyb2xsZXJzL3NpZ25pbmN0cmwuanMiLCJkaXJlY3RpdmVzL2FwcFZlcnNpb24uanMiLCJkaXJlY3RpdmVzL25nSGlkZUF1dGguanMiLCJkaXJlY3RpdmVzL25nU2hvd0F1dGguanMiLCJkaXJlY3RpdmVzL3NldG5nYW5pbWF0ZS5qcyIsImRpcmVjdGl2ZXMvdWktYnV0dGVyYmFyLmpzIiwiZGlyZWN0aXZlcy91aS1mb2N1cy5qcyIsImRpcmVjdGl2ZXMvdWktZnVsbHNjcmVlbi5qcyIsImRpcmVjdGl2ZXMvdWktanEuanMiLCJkaXJlY3RpdmVzL3VpLW1vZHVsZS5qcyIsImRpcmVjdGl2ZXMvdWktbmF2LmpzIiwiZGlyZWN0aXZlcy91aS1zY3JvbGwuanMiLCJkaXJlY3RpdmVzL3VpLXNoaWZ0LmpzIiwiZGlyZWN0aXZlcy91aS10b2dnbGVjbGFzcy5qcyIsImZpbHRlcnMvZnJvbU5vdy5qcyIsImZpbHRlcnMvbm9GcmFjdGlvbkN1cnJlbmN5LmpzIiwiZmlsdGVycy9udW0uanMiLCJmaWx0ZXJzL3ByZXR0eVRpbWUuanMiLCJmaWx0ZXJzL3VwQ29taW5nLmpzIiwic2VydmljZXMvY2hhbmdlRW1haWwuanMiLCJzZXJ2aWNlcy9wbGF5ZXIuanMiLCJzZXJ2aWNlcy9zaW1wbGVMb2dpbi5qcyIsInNlcnZpY2VzL3VpLWxvYWQuanMiLCJhcHAvY2FsZW5kYXIvY2FsZW5kYXIuanMiLCJhcHAvY29udGFjdC9jb250YWN0LmpzIiwiYXBwL21haWwvbWFpbC1zZXJ2aWNlLmpzIiwiYXBwL21haWwvbWFpbC5qcyIsImFwcC9tYXAvbG9hZC1nb29nbGUtbWFwcy5qcyIsImFwcC9tYXAvbWFwLmpzIiwiYXBwL21hcC91aS1tYXAuanMiLCJhcHAvbXVzaWMvY3RybC5qcyIsImFwcC9ub3RlL25vdGUuanMiLCJhcHAvd2VhdGhlci9hbmd1bGFyLXNreWNvbnMuanMiLCJhcHAvd2VhdGhlci9jdHJsLmpzIiwiYXBwL3dlYXRoZXIvc2t5Y29ucy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3RHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDeEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMzREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQy9UQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN6R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN6Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM5RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbklBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3RGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcclxuXHJcblxyXG5hbmd1bGFyLm1vZHVsZSgnYXBwJywgW1xyXG4gICAgJ25nQW5pbWF0ZScsXHJcbiAgICAnbmdDb29raWVzJyxcclxuICAgICduZ1Jlc291cmNlJyxcclxuICAgICduZ1Nhbml0aXplJyxcclxuICAgICduZ1RvdWNoJyxcclxuICAgICd1aS5yb3V0ZXInLFxyXG4gICAgJ25nU3RvcmFnZScsXHJcbiAgICAndWkuYm9vdHN0cmFwJyxcclxuICAgICd1aS51dGlscycsXHJcbiAgICAndWkubG9hZCcsXHJcbiAgICAndWkuanEnLFxyXG4gICAgJ29jLmxhenlMb2FkJyxcclxuICAgICdwYXNjYWxwcmVjaHQudHJhbnNsYXRlJyxcclxuICAgICdmaXJlYmFzZScsXHJcbiAgICAnc2ltcGxlTG9naW4nLFxyXG4gICAgJ2NoYW5nZUVtYWlsJyxcclxuICAgICdsZWFmbGV0LWRpcmVjdGl2ZSdcclxuXSlcclxuXHJcbiAgLnJ1bihbJ3NpbXBsZUxvZ2luJywgZnVuY3Rpb24oc2ltcGxlTG9naW4pIHtcclxuICAgIC8vY29uc29sZS5sb2coJ3J1bicpOyAvL2RlYnVnXHJcbiAgICBzaW1wbGVMb2dpbi5nZXRVc2VyKCk7XHJcbiAgfV0pXHJcblxyXG5cclxuLypcclxuICAucnVuKFsnc2ltcGxlTG9naW4nLCBmdW5jdGlvbihzaW1wbGVMb2dpbikge1xyXG4gICAgLy9jb25zb2xlLmxvZygncnVuJyk7IC8vZGVidWdcclxuICAgIHNpbXBsZUxvZ2luLmdldFVzZXIoKTtcclxuICB9XSk7XHJcbiovXHJcbiIsIi8vIGNvbmZpZ1xuXG52YXIgYXBwID0gIGFuZ3VsYXIubW9kdWxlKCdhcHAnKS5jb25maWcoXG4gICAgWyAgICAgICAgJyRjb250cm9sbGVyUHJvdmlkZXInLCAnJGNvbXBpbGVQcm92aWRlcicsICckZmlsdGVyUHJvdmlkZXInLCAnJHByb3ZpZGUnLFxuICAgIGZ1bmN0aW9uICgkY29udHJvbGxlclByb3ZpZGVyLCAgICRjb21waWxlUHJvdmlkZXIsICAgJGZpbHRlclByb3ZpZGVyLCAgICRwcm92aWRlKSB7XG5cbiAgICAgICAgLy8gbGF6eSBjb250cm9sbGVyLCBkaXJlY3RpdmUgYW5kIHNlcnZpY2VcbiAgICAgICAgYXBwLmNvbnRyb2xsZXIgPSAkY29udHJvbGxlclByb3ZpZGVyLnJlZ2lzdGVyO1xuICAgICAgICBhcHAuZGlyZWN0aXZlICA9ICRjb21waWxlUHJvdmlkZXIuZGlyZWN0aXZlO1xuICAgICAgICBhcHAuZmlsdGVyICAgICA9ICRmaWx0ZXJQcm92aWRlci5yZWdpc3RlcjtcbiAgICAgICAgYXBwLmZhY3RvcnkgICAgPSAkcHJvdmlkZS5mYWN0b3J5O1xuICAgICAgICBhcHAuc2VydmljZSAgICA9ICRwcm92aWRlLnNlcnZpY2U7XG4gICAgICAgIGFwcC5jb25zdGFudCAgID0gJHByb3ZpZGUuY29uc3RhbnQ7XG4gICAgICAgIGFwcC52YWx1ZSAgICAgID0gJHByb3ZpZGUudmFsdWU7XG4gICAgICAgIFxuICAgIH1cbiAgXSlcblxuXG5cbiAgLy8gYW5nZmlyZSBjb25maWdcbiAgLmNvbnN0YW50KCd2ZXJzaW9uJywgJzAuOC4wJylcblxuICAvLyB3aGVyZSB0byByZWRpcmVjdCB1c2VycyBpZiB0aGV5IG5lZWQgdG8gYXV0aGVudGljYXRlIChzZWUgcm91dGVTZWN1cml0eS5qcylcbiAgLmNvbnN0YW50KCdsb2dpblJlZGlyZWN0UGF0aCcsICcvc2lnbmluJylcblxuICAvLyB5b3VyIEZpcmViYXNlIFVSTCBnb2VzIGhlcmVcbiAgLmNvbnN0YW50KCdGQlVSTCcsICdodHRwczovL3RvcmlkLWZpcmUtNDMzMi5maXJlYmFzZWlvLmNvbScpXG5cbiAgLmNvbnN0YW50KCdsb2dpblByb3ZpZGVycycsICdmYWNlYm9vayxwYXNzd29yZCcpXG5cbiAgLy8gZG91YmxlIGNoZWNrIHRoYXQgdGhlIGFwcCBoYXMgYmVlbiBjb25maWd1cmVkIGJlZm9yZSBydW5uaW5nIGl0IGFuZCBibG93aW5nIHVwIHNwYWNlIGFuZCB0aW1lXG4gIC5ydW4oWydGQlVSTCcsICckdGltZW91dCcsIGZ1bmN0aW9uKEZCVVJMLCAkdGltZW91dCkge1xuICAgIGlmKCBGQlVSTCA9PT0gJ2h0dHBzOi8vSU5TVEFOQ0UuZmlyZWJhc2Vpby5jb20nICkge1xuICAgICAgYW5ndWxhci5lbGVtZW50KGRvY3VtZW50LmJvZHkpLmh0bWwoJzxoMT5QbGVhc2UgY29uZmlndXJlIGFwcC9qcy9jb25maWcuanMgYmVmb3JlIHJ1bm5pbmchPC9oMT4nKTtcbiAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICBhbmd1bGFyLmVsZW1lbnQoZG9jdW1lbnQuYm9keSkucmVtb3ZlQ2xhc3MoJ2hpZGUnKTtcbiAgICAgIH0sIDI1MCk7XG4gICAgfVxuICB9XSk7XG5cblxuLypcbiAgLmNvbmZpZyhbJyR0cmFuc2xhdGVQcm92aWRlcicsIGZ1bmN0aW9uKCR0cmFuc2xhdGVQcm92aWRlcil7XG4gICAgLy8gUmVnaXN0ZXIgYSBsb2FkZXIgZm9yIHRoZSBzdGF0aWMgZmlsZXNcbiAgICAvLyBTbywgdGhlIG1vZHVsZSB3aWxsIHNlYXJjaCBtaXNzaW5nIHRyYW5zbGF0aW9uIHRhYmxlcyB1bmRlciB0aGUgc3BlY2lmaWVkIHVybHMuXG4gICAgLy8gVGhvc2UgdXJscyBhcmUgW3ByZWZpeF1bbGFuZ0tleV1bc3VmZml4XS5cbiAgICAkdHJhbnNsYXRlUHJvdmlkZXIudXNlU3RhdGljRmlsZXNMb2FkZXIoe1xuICAgICAgcHJlZml4OiAnbDEwbi8nLFxuICAgICAgc3VmZml4OiAnLmpzJ1xuICAgIH0pO1xuICAgIC8vIFRlbGwgdGhlIG1vZHVsZSB3aGF0IGxhbmd1YWdlIHRvIHVzZSBieSBkZWZhdWx0XG4gICAgJHRyYW5zbGF0ZVByb3ZpZGVyLnByZWZlcnJlZExhbmd1YWdlKCdlbicpO1xuICAgIC8vIFRlbGwgdGhlIG1vZHVsZSB0byBzdG9yZSB0aGUgbGFuZ3VhZ2UgaW4gdGhlIGxvY2FsIHN0b3JhZ2VcbiAgICAkdHJhbnNsYXRlUHJvdmlkZXIudXNlTG9jYWxTdG9yYWdlKCk7XG4gIH1dKVxuXG4qL1xuIiwiLy8gbGF6eWxvYWQgY29uZmlnXG5cbmFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuICAgIC8qKlxuICAgKiBqUXVlcnkgcGx1Z2luIGNvbmZpZyB1c2UgdWktanEgZGlyZWN0aXZlICwgY29uZmlnIHRoZSBqcyBhbmQgY3NzIGZpbGVzIHRoYXQgcmVxdWlyZWRcbiAgICoga2V5OiBmdW5jdGlvbiBuYW1lIG9mIHRoZSBqUXVlcnkgcGx1Z2luXG4gICAqIHZhbHVlOiBhcnJheSBvZiB0aGUgY3NzIGpzIGZpbGUgbG9jYXRlZFxuICAgKi9cbiAgLmNvbnN0YW50KCdKUV9DT05GSUcnLCB7XG4gICAgICBlYXN5UGllQ2hhcnQ6ICAgWyd2ZW5kb3IvanF1ZXJ5L2NoYXJ0cy9lYXN5cGllY2hhcnQvanF1ZXJ5LmVhc3ktcGllLWNoYXJ0LmpzJ10sXG4gICAgICBzcGFya2xpbmU6ICAgICAgWyd2ZW5kb3IvanF1ZXJ5L2NoYXJ0cy9zcGFya2xpbmUvanF1ZXJ5LnNwYXJrbGluZS5taW4uanMnXSxcbiAgICAgIHBsb3Q6ICAgICAgICAgICBbJ3ZlbmRvci9qcXVlcnkvY2hhcnRzL2Zsb3QvanF1ZXJ5LmZsb3QubWluLmpzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJ3ZlbmRvci9qcXVlcnkvY2hhcnRzL2Zsb3QvanF1ZXJ5LmZsb3QucmVzaXplLmpzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJ3ZlbmRvci9qcXVlcnkvY2hhcnRzL2Zsb3QvanF1ZXJ5LmZsb3QudG9vbHRpcC5taW4uanMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAndmVuZG9yL2pxdWVyeS9jaGFydHMvZmxvdC9qcXVlcnkuZmxvdC5zcGxpbmUuanMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAndmVuZG9yL2pxdWVyeS9jaGFydHMvZmxvdC9qcXVlcnkuZmxvdC5vcmRlckJhcnMuanMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAndmVuZG9yL2pxdWVyeS9jaGFydHMvZmxvdC9qcXVlcnkuZmxvdC5waWUubWluLmpzJ10sXG4gICAgICBzbGltU2Nyb2xsOiAgICAgWyd2ZW5kb3IvanF1ZXJ5L3NsaW1zY3JvbGwvanF1ZXJ5LnNsaW1zY3JvbGwubWluLmpzJ10sXG4gICAgICBzb3J0YWJsZTogICAgICAgWyd2ZW5kb3IvanF1ZXJ5L3NvcnRhYmxlL2pxdWVyeS5zb3J0YWJsZS5qcyddLFxuICAgICAgbmVzdGFibGU6ICAgICAgIFsndmVuZG9yL2pxdWVyeS9uZXN0YWJsZS9qcXVlcnkubmVzdGFibGUuanMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAndmVuZG9yL2pxdWVyeS9uZXN0YWJsZS9uZXN0YWJsZS5jc3MnXSxcbiAgICAgIGZpbGVzdHlsZTogICAgICBbJ3ZlbmRvci9qcXVlcnkvZmlsZS9ib290c3RyYXAtZmlsZXN0eWxlLm1pbi5qcyddLFxuICAgICAgc2xpZGVyOiAgICAgICAgIFsndmVuZG9yL2pxdWVyeS9zbGlkZXIvYm9vdHN0cmFwLXNsaWRlci5qcycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICd2ZW5kb3IvanF1ZXJ5L3NsaWRlci9zbGlkZXIuY3NzJ10sXG4gICAgICBjaG9zZW46ICAgICAgICAgWyd2ZW5kb3IvanF1ZXJ5L2Nob3Nlbi9jaG9zZW4uanF1ZXJ5Lm1pbi5qcycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICd2ZW5kb3IvanF1ZXJ5L2Nob3Nlbi9jaG9zZW4uY3NzJ10sXG4gICAgICBUb3VjaFNwaW46ICAgICAgWyd2ZW5kb3IvanF1ZXJ5L3NwaW5uZXIvanF1ZXJ5LmJvb3RzdHJhcC10b3VjaHNwaW4ubWluLmpzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJ3ZlbmRvci9qcXVlcnkvc3Bpbm5lci9qcXVlcnkuYm9vdHN0cmFwLXRvdWNoc3Bpbi5jc3MnXSxcbiAgICAgIHd5c2l3eWc6ICAgICAgICBbJ3ZlbmRvci9qcXVlcnkvd3lzaXd5Zy9ib290c3RyYXAtd3lzaXd5Zy5qcycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICd2ZW5kb3IvanF1ZXJ5L3d5c2l3eWcvanF1ZXJ5LmhvdGtleXMuanMnXSxcbiAgICAgIGRhdGFUYWJsZTogICAgICBbJ3ZlbmRvci9qcXVlcnkvZGF0YXRhYmxlcy9qcXVlcnkuZGF0YVRhYmxlcy5taW4uanMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAndmVuZG9yL2pxdWVyeS9kYXRhdGFibGVzL2RhdGFUYWJsZXMuYm9vdHN0cmFwLmpzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJ3ZlbmRvci9qcXVlcnkvZGF0YXRhYmxlcy9kYXRhVGFibGVzLmJvb3RzdHJhcC5jc3MnXSxcbiAgICAgIHZlY3Rvck1hcDogICAgICBbJ3ZlbmRvci9qcXVlcnkvanZlY3Rvcm1hcC9qcXVlcnktanZlY3Rvcm1hcC5taW4uanMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAndmVuZG9yL2pxdWVyeS9qdmVjdG9ybWFwL2pxdWVyeS1qdmVjdG9ybWFwLXdvcmxkLW1pbGwtZW4uanMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAndmVuZG9yL2pxdWVyeS9qdmVjdG9ybWFwL2pxdWVyeS1qdmVjdG9ybWFwLXVzLWFlYS1lbi5qcycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICd2ZW5kb3IvanF1ZXJ5L2p2ZWN0b3JtYXAvanF1ZXJ5LWp2ZWN0b3JtYXAuY3NzJ10sXG4gICAgICBmb290YWJsZTogICAgICAgWyd2ZW5kb3IvanF1ZXJ5L2Zvb3RhYmxlL2Zvb3RhYmxlLmFsbC5taW4uanMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAndmVuZG9yL2pxdWVyeS9mb290YWJsZS9mb290YWJsZS5jb3JlLmNzcyddXG4gICAgICB9XG4gIClcbiAgLy8gb2NsYXp5bG9hZCBjb25maWdcbiAgLmNvbmZpZyhbJyRvY0xhenlMb2FkUHJvdmlkZXInLCBmdW5jdGlvbigkb2NMYXp5TG9hZFByb3ZpZGVyKSB7XG4gICAgICAvLyBXZSBjb25maWd1cmUgb2NMYXp5TG9hZCB0byB1c2UgdGhlIGxpYiBzY3JpcHQuanMgYXMgdGhlIGFzeW5jIGxvYWRlclxuICAgICAgJG9jTGF6eUxvYWRQcm92aWRlci5jb25maWcoe1xuICAgICAgICAgIGRlYnVnOiAgdHJ1ZSxcbiAgICAgICAgICBldmVudHM6IHRydWUsXG4gICAgICAgICAgbW9kdWxlczogW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBuYW1lOiAnbmdHcmlkJyxcbiAgICAgICAgICAgICAgICAgIGZpbGVzOiBbXG4gICAgICAgICAgICAgICAgICAgICAgJ3ZlbmRvci9tb2R1bGVzL25nLWdyaWQvbmctZ3JpZC5taW4uanMnLFxuICAgICAgICAgICAgICAgICAgICAgICd2ZW5kb3IvbW9kdWxlcy9uZy1ncmlkL25nLWdyaWQubWluLmNzcycsXG4gICAgICAgICAgICAgICAgICAgICAgJ3ZlbmRvci9tb2R1bGVzL25nLWdyaWQvdGhlbWUuY3NzJ1xuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBuYW1lOiAndWkuZ3JpZCcsXG4gICAgICAgICAgICAgICAgICBmaWxlczogW1xuICAgICAgICAgICAgICAgICAgICAgICd2ZW5kb3IvbW9kdWxlcy9hbmd1bGFyLXVpLWdyaWQvdWktZ3JpZC5taW4uanMnLFxuICAgICAgICAgICAgICAgICAgICAgICd2ZW5kb3IvbW9kdWxlcy9hbmd1bGFyLXVpLWdyaWQvdWktZ3JpZC5taW4uY3NzJ1xuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBuYW1lOiAndWkuc2VsZWN0JyxcbiAgICAgICAgICAgICAgICAgIGZpbGVzOiBbXG4gICAgICAgICAgICAgICAgICAgICAgJ3ZlbmRvci9tb2R1bGVzL2FuZ3VsYXItdWktc2VsZWN0L3NlbGVjdC5taW4uanMnLFxuICAgICAgICAgICAgICAgICAgICAgICd2ZW5kb3IvbW9kdWxlcy9hbmd1bGFyLXVpLXNlbGVjdC9zZWxlY3QubWluLmNzcydcbiAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgbmFtZTonYW5ndWxhckZpbGVVcGxvYWQnLFxuICAgICAgICAgICAgICAgICAgZmlsZXM6IFtcbiAgICAgICAgICAgICAgICAgICAgJ3ZlbmRvci9tb2R1bGVzL2FuZ3VsYXItZmlsZS11cGxvYWQvYW5ndWxhci1maWxlLXVwbG9hZC5taW4uanMnXG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIG5hbWU6J3VpLmNhbGVuZGFyJyxcbiAgICAgICAgICAgICAgICAgIGZpbGVzOiBbJ3ZlbmRvci9tb2R1bGVzL2FuZ3VsYXItdWktY2FsZW5kYXIvY2FsZW5kYXIuanMnXVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBuYW1lOiAnbmdJbWdDcm9wJyxcbiAgICAgICAgICAgICAgICAgIGZpbGVzOiBbXG4gICAgICAgICAgICAgICAgICAgICAgJ3ZlbmRvci9tb2R1bGVzL25nSW1nQ3JvcC9uZy1pbWctY3JvcC5qcycsXG4gICAgICAgICAgICAgICAgICAgICAgJ3ZlbmRvci9tb2R1bGVzL25nSW1nQ3JvcC9uZy1pbWctY3JvcC5jc3MnXG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIG5hbWU6ICdhbmd1bGFyQm9vdHN0cmFwTmF2VHJlZScsXG4gICAgICAgICAgICAgICAgICBmaWxlczogW1xuICAgICAgICAgICAgICAgICAgICAgICd2ZW5kb3IvbW9kdWxlcy9hbmd1bGFyLWJvb3RzdHJhcC1uYXYtdHJlZS9hYm5fdHJlZV9kaXJlY3RpdmUuanMnLFxuICAgICAgICAgICAgICAgICAgICAgICd2ZW5kb3IvbW9kdWxlcy9hbmd1bGFyLWJvb3RzdHJhcC1uYXYtdHJlZS9hYm5fdHJlZS5jc3MnXG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIG5hbWU6ICd0b2FzdGVyJyxcbiAgICAgICAgICAgICAgICAgIGZpbGVzOiBbXG4gICAgICAgICAgICAgICAgICAgICAgJ3ZlbmRvci9tb2R1bGVzL2FuZ3VsYXJqcy10b2FzdGVyL3RvYXN0ZXIuanMnLFxuICAgICAgICAgICAgICAgICAgICAgICd2ZW5kb3IvbW9kdWxlcy9hbmd1bGFyanMtdG9hc3Rlci90b2FzdGVyLmNzcydcbiAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgbmFtZTogJ3RleHRBbmd1bGFyJyxcbiAgICAgICAgICAgICAgICAgIGZpbGVzOiBbXG4gICAgICAgICAgICAgICAgICAgICAgJ3ZlbmRvci9tb2R1bGVzL3RleHRBbmd1bGFyL3RleHRBbmd1bGFyLXNhbml0aXplLm1pbi5qcycsXG4gICAgICAgICAgICAgICAgICAgICAgJ3ZlbmRvci9tb2R1bGVzL3RleHRBbmd1bGFyL3RleHRBbmd1bGFyLm1pbi5qcydcbiAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgbmFtZTogJ3ZyLmRpcmVjdGl2ZXMuc2xpZGVyJyxcbiAgICAgICAgICAgICAgICAgIGZpbGVzOiBbXG4gICAgICAgICAgICAgICAgICAgICAgJ3ZlbmRvci9tb2R1bGVzL2FuZ3VsYXItc2xpZGVyL2FuZ3VsYXItc2xpZGVyLm1pbi5qcycsXG4gICAgICAgICAgICAgICAgICAgICAgJ3ZlbmRvci9tb2R1bGVzL2FuZ3VsYXItc2xpZGVyL2FuZ3VsYXItc2xpZGVyLmNzcydcbiAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgbmFtZTogJ2NvbS4yZmRldnMudmlkZW9ndWxhcicsXG4gICAgICAgICAgICAgICAgICBmaWxlczogW1xuICAgICAgICAgICAgICAgICAgICAgICd2ZW5kb3IvbW9kdWxlcy92aWRlb2d1bGFyL3ZpZGVvZ3VsYXIubWluLmpzJ1xuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBuYW1lOiAnY29tLjJmZGV2cy52aWRlb2d1bGFyLnBsdWdpbnMuY29udHJvbHMnLFxuICAgICAgICAgICAgICAgICAgZmlsZXM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAndmVuZG9yL21vZHVsZXMvdmlkZW9ndWxhci9wbHVnaW5zL2NvbnRyb2xzLm1pbi5qcydcbiAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgbmFtZTogJ2NvbS4yZmRldnMudmlkZW9ndWxhci5wbHVnaW5zLmJ1ZmZlcmluZycsXG4gICAgICAgICAgICAgICAgICBmaWxlczogW1xuICAgICAgICAgICAgICAgICAgICAgICd2ZW5kb3IvbW9kdWxlcy92aWRlb2d1bGFyL3BsdWdpbnMvYnVmZmVyaW5nLm1pbi5qcydcbiAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgbmFtZTogJ2NvbS4yZmRldnMudmlkZW9ndWxhci5wbHVnaW5zLm92ZXJsYXlwbGF5JyxcbiAgICAgICAgICAgICAgICAgIGZpbGVzOiBbXG4gICAgICAgICAgICAgICAgICAgICAgJ3ZlbmRvci9tb2R1bGVzL3ZpZGVvZ3VsYXIvcGx1Z2lucy9vdmVybGF5LXBsYXkubWluLmpzJ1xuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBuYW1lOiAnY29tLjJmZGV2cy52aWRlb2d1bGFyLnBsdWdpbnMucG9zdGVyJyxcbiAgICAgICAgICAgICAgICAgIGZpbGVzOiBbXG4gICAgICAgICAgICAgICAgICAgICAgJ3ZlbmRvci9tb2R1bGVzL3ZpZGVvZ3VsYXIvcGx1Z2lucy9wb3N0ZXIubWluLmpzJ1xuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBuYW1lOiAnY29tLjJmZGV2cy52aWRlb2d1bGFyLnBsdWdpbnMuaW1hYWRzJyxcbiAgICAgICAgICAgICAgICAgIGZpbGVzOiBbXG4gICAgICAgICAgICAgICAgICAgICAgJ3ZlbmRvci9tb2R1bGVzL3ZpZGVvZ3VsYXIvcGx1Z2lucy9pbWEtYWRzLm1pbi5qcydcbiAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgbmFtZTogJ3hlZGl0YWJsZScsXG4gICAgICAgICAgICAgICAgICBmaWxlczogW1xuICAgICAgICAgICAgICAgICAgICAgICd2ZW5kb3IvbW9kdWxlcy9hbmd1bGFyLXhlZGl0YWJsZS9qcy94ZWRpdGFibGUubWluLmpzJyxcbiAgICAgICAgICAgICAgICAgICAgICAndmVuZG9yL21vZHVsZXMvYW5ndWxhci14ZWRpdGFibGUvY3NzL3hlZGl0YWJsZS5jc3MnXG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICB9KTtcbiAgfV0pXG47XG4iLCIndXNlIHN0cmljdCc7XHJcblxyXG4vKipcclxuICogQ29uZmlnIGZvciB0aGUgcm91dGVyXHJcbiAqL1xyXG5hbmd1bGFyLm1vZHVsZSgnYXBwJylcclxuICAucnVuKFxyXG4gICAgWyAgICAgICAgICAnJHJvb3RTY29wZScsICckc3RhdGUnLCAnJHN0YXRlUGFyYW1zJyxcclxuICAgICAgZnVuY3Rpb24gKCRyb290U2NvcGUsICAgJHN0YXRlLCAgICRzdGF0ZVBhcmFtcykge1xyXG4gICAgICAgICAgJHJvb3RTY29wZS4kc3RhdGUgPSAkc3RhdGU7XHJcbiAgICAgICAgICAkcm9vdFNjb3BlLiRzdGF0ZVBhcmFtcyA9ICRzdGF0ZVBhcmFtcztcclxuICAgICAgfVxyXG4gICAgXVxyXG4gIClcclxuICAuY29uZmlnKFxyXG4gICAgWyAgICAgICAgICAnJHN0YXRlUHJvdmlkZXInLCAnJHVybFJvdXRlclByb3ZpZGVyJywnJGxvY2F0aW9uUHJvdmlkZXInLFxyXG4gICAgICBmdW5jdGlvbiAoJHN0YXRlUHJvdmlkZXIsICAkdXJsUm91dGVyUHJvdmlkZXIsICRsb2NhdGlvblByb3ZpZGVyKSB7XHJcblxyXG4gICAgICAgICR1cmxSb3V0ZXJQcm92aWRlclxyXG4gICAgICAgICAgICAgLm90aGVyd2lzZSgnL2RlbnZlci9zaG93cycpO1xyXG4gICAgICAgICAkc3RhdGVQcm92aWRlclxyXG4gICAgICAgICAgICAgLnN0YXRlKCdkZW52ZXInLCB7XHJcbiAgICAgICAgICAgICAgICAgYWJzdHJhY3Q6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgdXJsOiAnL2RlbnZlcicsXHJcbiAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd0cGwvYXBwLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICAgICAgICAgICAgIHVzZXI6IFsnc2ltcGxlTG9naW4nLCBmdW5jdGlvbihzaW1wbGVMb2dpbikge1xyXG4gICAgICAgICAgICAgICAgICAgcmV0dXJuIHNpbXBsZUxvZ2luLmdldFVzZXIoKTtcclxuICAgICAgICAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAuc3RhdGUoJ2RlbnZlci5zaG93cycsIHtcclxuICAgICAgICAgICAgICAgICB1cmw6ICcvc2hvd3MnLFxyXG4gICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndHBsL3ZpYmVzYW1wbGUuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ1Nob3dzQ3RybCcsXHJcbiAgICAgICAgICAgICAgICAgcmVzb2x2ZToge1xyXG4gICAgICAgICAgICAgICAgICAgICBkZXBzOiBbJyRvY0xhenlMb2FkJyxcclxuICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiggJG9jTGF6eUxvYWQgKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJG9jTGF6eUxvYWQubG9hZCgnanMvY29udHJvbGxlcnMvU2hvd3NDdHJsLmpzJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICB9XSAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAuc3RhdGUoJ2RlbnZlci5zaWduaW4nLCB7XHJcbiAgICAgICAgICAgICAgICAgdXJsOiAnL3NpZ25pbicsXHJcbiAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd0cGwvc2lnbmluLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdTaWduSW5DdHJsJyxcclxuICAgICAgICAgICAgICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgIGRlcHM6IFsnJG9jTGF6eUxvYWQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCAkb2NMYXp5TG9hZCApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkb2NMYXp5TG9hZC5sb2FkKCdqcy9jb250cm9sbGVycy9zaWduaW5jdHJsLmpzJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgLnN0YXRlKCdkZW52ZXIuYWNjb3VudCcsIHtcclxuICAgICAgICAgICAgICAgICB1cmw6ICcvYWNjb3VudCcsXHJcbiAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd0cGwvYWNjb3VudC5odG1sJyxcclxuICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnQWNjb3VudEN0cmwnLFxyXG4gICAgICAgICAgICAgICAgIGF1dGhSZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgIGRlcHM6IFsnJG9jTGF6eUxvYWQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCAkb2NMYXp5TG9hZCApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkb2NMYXp5TG9hZC5sb2FkKCdqcy9jb250cm9sbGVycy9BY2NvdW50Q3RybC5qcycpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgfV0sXHJcbiAgICAgICAgICAgICAgICAgICB1c2VyOiBbJ3NpbXBsZUxvZ2luJywgZnVuY3Rpb24oc2ltcGxlTG9naW4pIHtcclxuICAgICAgICAgICAgICAgICAgIHJldHVybiBzaW1wbGVMb2dpbi5nZXRVc2VyKCk7XHJcbiAgICAgICAgICAgICAgICAgICB9XVxyXG5cclxuICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAuc3RhdGUoJ2RlbnZlci5mYXZvcml0ZXMnLCB7XHJcbiAgICAgICAgICAgICAgICAgdXJsOiAnL2Zhdm9yaXRlcycsXHJcbiAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd0cGwvZmF2b3JpdGVzLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdGYXZvcml0ZXNDdHJsJyxcclxuICAgICAgICAgICAgICAgICBhdXRoUmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgcmVzb2x2ZToge1xyXG4gICAgICAgICAgICAgICAgICAgICBkZXBzOiBbJyRvY0xhenlMb2FkJyxcclxuICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiggJG9jTGF6eUxvYWQgKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJG9jTGF6eUxvYWQubG9hZCgnanMvY29udHJvbGxlcnMvZmF2b3JpdGVzY3RybC5qcycpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgfV0sXHJcbiAgICAgICAgICAgICAgICAgICB1c2VyOiBbJ3NpbXBsZUxvZ2luJywgZnVuY3Rpb24oc2ltcGxlTG9naW4pIHtcclxuICAgICAgICAgICAgICAgICAgIHJldHVybiBzaW1wbGVMb2dpbi5nZXRVc2VyKCk7XHJcbiAgICAgICAgICAgICAgICAgICB9XVxyXG5cclxuICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAuc3RhdGUoJ2RlbnZlci5hYm91dCcsIHtcclxuICAgICAgICAgICAgICAgdXJsOiAnL2Fib3V0JyxcclxuICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd0cGwvYWJvdXQuaHRtbCdcclxuICAgICAgICAgICAgIH0pXHJcblxyXG5cclxuXHJcblxyXG4gICAgICB9XHJcbiAgICBdXHJcbiAgKTtcclxuIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLyoqXHJcbiAqIENvbmZpZyBmb3IgdGhlIHJvdXRlclxyXG4gKi9cclxuYW5ndWxhci5tb2R1bGUoJ2FwcCcpXHJcbiAgLnJ1bihcclxuICAgIFsgICAgICAgICAgJyRyb290U2NvcGUnLCAnJHN0YXRlJywgJyRzdGF0ZVBhcmFtcycsXHJcbiAgICAgIGZ1bmN0aW9uICgkcm9vdFNjb3BlLCAgICRzdGF0ZSwgICAkc3RhdGVQYXJhbXMpIHtcclxuICAgICAgICAgICRyb290U2NvcGUuJHN0YXRlID0gJHN0YXRlO1xyXG4gICAgICAgICAgJHJvb3RTY29wZS4kc3RhdGVQYXJhbXMgPSAkc3RhdGVQYXJhbXM7XHJcbiAgICAgIH1cclxuICAgIF1cclxuICApXHJcbiAgLmNvbmZpZyhcclxuICAgIFsgICAgICAgICAgJyRzdGF0ZVByb3ZpZGVyJywgJyR1cmxSb3V0ZXJQcm92aWRlcicsJyRsb2NhdGlvblByb3ZpZGVyJyxcclxuICAgICAgZnVuY3Rpb24gKCRzdGF0ZVByb3ZpZGVyLCAgJHVybFJvdXRlclByb3ZpZGVyLCAkbG9jYXRpb25Qcm92aWRlcikge1xyXG5cclxuICAgICAgICAvLyRsb2NhdGlvblByb3ZpZGVyLmh0bWw1TW9kZSh0cnVlKTtcclxuXHJcblxyXG4gICAgICAgICR1cmxSb3V0ZXJQcm92aWRlclxyXG4gICAgICAgICAgICAgLm90aGVyd2lzZSgnL2FwcC92aWJlc2FtcGxlJyk7XHJcbiAgICAgICAgICRzdGF0ZVByb3ZpZGVyXHJcbiAgICAgICAgICAgICAuc3RhdGUoJ2FwcCcsIHtcclxuICAgICAgICAgICAgICAgICBhYnN0cmFjdDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICB1cmw6ICcvYXBwJyxcclxuICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3RwbC9hcHAuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICAgcmVzb2x2ZToge1xyXG4gICAgICAgICAgICAgICAgICAgdXNlcjogWydzaW1wbGVMb2dpbicsIGZ1bmN0aW9uKHNpbXBsZUxvZ2luKSB7XHJcbiAgICAgICAgICAgICAgICAgICByZXR1cm4gc2ltcGxlTG9naW4uZ2V0VXNlcigpO1xyXG4gICAgICAgICAgICAgICAgICAgfV1cclxuICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgIC5zdGF0ZSgnYXBwLnZpYmVzYW1wbGUnLCB7XHJcbiAgICAgICAgICAgICAgICAgdXJsOiAnL3ZpYmVzYW1wbGUnLFxyXG4gICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndHBsL3ZpYmVzYW1wbGUuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ1Nob3dzQ3RybCcsXHJcbiAgICAgICAgICAgICAgICAgcmVzb2x2ZToge1xyXG4gICAgICAgICAgICAgICAgICAgICBkZXBzOiBbJyRvY0xhenlMb2FkJyxcclxuICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiggJG9jTGF6eUxvYWQgKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJG9jTGF6eUxvYWQubG9hZCgnanMvY29udHJvbGxlcnMvU2hvd3NDdHJsLmpzJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICB9XSAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAuc3RhdGUoJ2FwcC5zaWduaW4nLCB7XHJcbiAgICAgICAgICAgICAgICAgdXJsOiAnL3NpZ25pbicsXHJcbiAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd0cGwvc2lnbmluLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdTaWduSW5DdHJsJyxcclxuICAgICAgICAgICAgICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgIGRlcHM6IFsnJG9jTGF6eUxvYWQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCAkb2NMYXp5TG9hZCApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkb2NMYXp5TG9hZC5sb2FkKCdqcy9jb250cm9sbGVycy9TaWduSW5DdHJsLmpzJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgLnN0YXRlKCdhcHAuYWNjb3VudCcsIHtcclxuICAgICAgICAgICAgICAgICB1cmw6ICcvYWNjb3VudCcsXHJcbiAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd0cGwvYWNjb3VudC5odG1sJyxcclxuICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnQWNjb3VudEN0cmwnLFxyXG4gICAgICAgICAgICAgICAgIGF1dGhSZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgIGRlcHM6IFsnJG9jTGF6eUxvYWQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCAkb2NMYXp5TG9hZCApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkb2NMYXp5TG9hZC5sb2FkKCdqcy9jb250cm9sbGVycy9BY2NvdW50Q3RybC5qcycpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgfV0sXHJcbiAgICAgICAgICAgICAgICAgICB1c2VyOiBbJ3NpbXBsZUxvZ2luJywgZnVuY3Rpb24oc2ltcGxlTG9naW4pIHtcclxuICAgICAgICAgICAgICAgICAgIHJldHVybiBzaW1wbGVMb2dpbi5nZXRVc2VyKCk7XHJcbiAgICAgICAgICAgICAgICAgICB9XVxyXG5cclxuICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAuc3RhdGUoJ2FwcC5mYXZvcml0ZXMnLCB7XHJcbiAgICAgICAgICAgICAgICAgdXJsOiAnL2Zhdm9yaXRlcycsXHJcbiAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd0cGwvZmF2b3JpdGVzLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdGYXZvcml0ZXNDdHJsJyxcclxuICAgICAgICAgICAgICAgICBhdXRoUmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgcmVzb2x2ZToge1xyXG4gICAgICAgICAgICAgICAgICAgICBkZXBzOiBbJyRvY0xhenlMb2FkJyxcclxuICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiggJG9jTGF6eUxvYWQgKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJG9jTGF6eUxvYWQubG9hZCgnanMvY29udHJvbGxlcnMvZmF2b3JpdGVzY3RybC5qcycpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgfV0sXHJcbiAgICAgICAgICAgICAgICAgICB1c2VyOiBbJ3NpbXBsZUxvZ2luJywgZnVuY3Rpb24oc2ltcGxlTG9naW4pIHtcclxuICAgICAgICAgICAgICAgICAgIHJldHVybiBzaW1wbGVMb2dpbi5nZXRVc2VyKCk7XHJcbiAgICAgICAgICAgICAgICAgICB9XVxyXG5cclxuICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAuc3RhdGUoJ2FwcC5hYm91dCcsIHtcclxuICAgICAgICAgICAgICAgdXJsOiAnL2Fib3V0JyxcclxuICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd0cGwvYWJvdXQuaHRtbCdcclxuICAgICAgICAgICAgIH0pXHJcblxyXG5cclxuXHJcblxyXG4gICAgICB9XHJcbiAgICBdXHJcbiAgKTtcclxuIiwiXG4vLyBhIHNpbXBsZSB3cmFwcGVyIG9uIEZpcmViYXNlIGFuZCBBbmd1bGFyRmlyZSB0byBzaW1wbGlmeSBkZXBzIGFuZCBrZWVwIHRoaW5ncyBEUllcbmFuZ3VsYXIubW9kdWxlKCdmaXJlYmFzZS51dGlscycsIFsnZmlyZWJhc2UnLCAnYXBwJ10pIC8vIG5vdCBsb2FkaW5nLi4uLlxuICAgLmZhY3RvcnkoJ2ZidXRpbCcsIFsnJHdpbmRvdycsICdGQlVSTCcsICckZmlyZWJhc2UnLCBmdW5jdGlvbigkd2luZG93LCBGQlVSTCwgJGZpcmViYXNlKSB7XG4gICAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc3luY09iamVjdDogZnVuY3Rpb24ocGF0aCwgZmFjdG9yeUNvbmZpZykge1xuICAgICAgICAgIHJldHVybiBzeW5jRGF0YS5hcHBseShudWxsLCBhcmd1bWVudHMpLiRhc09iamVjdCgpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHN5bmNBcnJheTogZnVuY3Rpb24ocGF0aCwgZmFjdG9yeUNvbmZpZykge1xuICAgICAgICAgIHJldHVybiBzeW5jRGF0YS5hcHBseShudWxsLCBhcmd1bWVudHMpLiRhc0FycmF5KCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgcmVmOiBmaXJlYmFzZVJlZlxuICAgICAgfTtcblxuICAgICAgZnVuY3Rpb24gcGF0aFJlZihhcmdzKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGlmIChhbmd1bGFyLmlzQXJyYXkoYXJnc1tpXSkpIHtcbiAgICAgICAgICAgIGFyZ3NbaV0gPSBwYXRoUmVmKGFyZ3NbaV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIGlmKCB0eXBlb2YgYXJnc1tpXSAhPT0gJ3N0cmluZycgKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FyZ3VtZW50ICcraSsnIHRvIGZpcmViYXNlUmVmIGlzIG5vdCBhIHN0cmluZzogJythcmdzW2ldKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFyZ3Muam9pbignLycpO1xuICAgICAgfVxuXG4gICAgICAvKipcbiAgICAgICAqIEV4YW1wbGU6XG4gICAgICAgKiA8Y29kZT5cbiAgICAgICAqICAgIGZ1bmN0aW9uKGZpcmViYXNlUmVmKSB7XG4gICAgICAgICAqICAgICAgIHZhciByZWYgPSBmaXJlYmFzZVJlZigncGF0aC90by9kYXRhJyk7XG4gICAgICAgICAqICAgIH1cbiAgICAgICAqIDwvY29kZT5cbiAgICAgICAqXG4gICAgICAgKiBAZnVuY3Rpb25cbiAgICAgICAqIEBuYW1lIGZpcmViYXNlUmVmXG4gICAgICAgKiBAcGFyYW0ge1N0cmluZ3xBcnJheS4uLn0gcGF0aCByZWxhdGl2ZSBwYXRoIHRvIHRoZSByb290IGZvbGRlciBpbiBGaXJlYmFzZSBpbnN0YW5jZVxuICAgICAgICogQHJldHVybiBhIEZpcmViYXNlIGluc3RhbmNlXG4gICAgICAgKi9cbiAgICAgIGZ1bmN0aW9uIGZpcmViYXNlUmVmKHBhdGgpIHtcbiAgICAgICAgdmFyIHJlZiA9IG5ldyAkd2luZG93LkZpcmViYXNlKEZCVVJMKTtcbiAgICAgICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgICAgICBpZiggYXJncy5sZW5ndGggKSB7XG4gICAgICAgICAgcmVmID0gcmVmLmNoaWxkKHBhdGhSZWYoYXJncykpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZWY7XG4gICAgICB9XG5cbiAgICAgIC8qKlxuICAgICAgICogQ3JlYXRlIGEgJGZpcmViYXNlIHJlZmVyZW5jZSB3aXRoIGp1c3QgYSByZWxhdGl2ZSBwYXRoLiBGb3IgZXhhbXBsZTpcbiAgICAgICAqXG4gICAgICAgKiA8Y29kZT5cbiAgICAgICAqIGZ1bmN0aW9uKHN5bmNEYXRhKSB7XG4gICAgICAgICAqICAgIC8vIGEgcmVndWxhciAkZmlyZWJhc2UgcmVmXG4gICAgICAgICAqICAgICRzY29wZS53aWRnZXQgPSBzeW5jRGF0YSgnd2lkZ2V0cy9hbHBoYScpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAvLyBvciBhdXRvbWF0aWMgMy13YXkgYmluZGluZ1xuICAgICAgICAgKiAgICBzeW5jRGF0YSgnd2lkZ2V0cy9hbHBoYScpLiRiaW5kKCRzY29wZSwgJ3dpZGdldCcpO1xuICAgICAgICAgKiB9XG4gICAgICAgKiA8L2NvZGU+XG4gICAgICAgKlxuICAgICAgICogUHJvcHMgaXMgdGhlIHNlY29uZCBwYXJhbSBwYXNzZWQgaW50byAkZmlyZWJhc2UuIEl0IGNhbiBhbHNvIGNvbnRhaW4gbGltaXQsIHN0YXJ0QXQsIGVuZEF0LFxuICAgICAgICogYW5kIHRoZXkgd2lsbCBiZSBhcHBsaWVkIHRvIHRoZSByZWYgYmVmb3JlIHBhc3NpbmcgaW50byAkZmlyZWJhc2VcbiAgICAgICAqXG4gICAgICAgKiBAZnVuY3Rpb25cbiAgICAgICAqIEBuYW1lIHN5bmNEYXRhXG4gICAgICAgKiBAcGFyYW0ge1N0cmluZ3xBcnJheS4uLn0gcGF0aCByZWxhdGl2ZSBwYXRoIHRvIHRoZSByb290IGZvbGRlciBpbiBGaXJlYmFzZSBpbnN0YW5jZVxuICAgICAgICogQHBhcmFtIHtvYmplY3R9IFtwcm9wc11cbiAgICAgICAqIEByZXR1cm4gYSBGaXJlYmFzZSBpbnN0YW5jZVxuICAgICAgICovXG4gICAgICBmdW5jdGlvbiBzeW5jRGF0YShwYXRoLCBwcm9wcykge1xuICAgICAgICB2YXIgcmVmID0gZmlyZWJhc2VSZWYocGF0aCk7XG4gICAgICAgIHByb3BzID0gYW5ndWxhci5leHRlbmQoe30sIHByb3BzKTtcbiAgICAgICAgYW5ndWxhci5mb3JFYWNoKFsnbGltaXQnLCAnc3RhcnRBdCcsICdlbmRBdCddLCBmdW5jdGlvbihrKSB7XG4gICAgICAgICAgaWYoIHByb3BzLmhhc093blByb3BlcnR5KGspICkge1xuICAgICAgICAgICAgdmFyIHYgPSBwcm9wc1trXTtcbiAgICAgICAgICAgIHJlZiA9IHJlZltrXS5hcHBseShyZWYsIGFuZ3VsYXIuaXNBcnJheSh2KT8gdiA6IFt2XSk7XG4gICAgICAgICAgICBkZWxldGUgcHJvcHNba107XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuICRmaXJlYmFzZShyZWYsIHByb3BzKTtcbiAgICAgIH1cbiAgIH1dKTtcblxuIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLyogQ29udHJvbGxlcnMgKi9cclxuXHJcbmFuZ3VsYXIubW9kdWxlKCdhcHAnKVxyXG4gIC5jb250cm9sbGVyKCdBcHBDdHJsJywgWyckc2NvcGUnLCAnJHRyYW5zbGF0ZScsICckbG9jYWxTdG9yYWdlJywgJyR3aW5kb3cnLFxyXG4gICAgZnVuY3Rpb24oICAgICAgICAgICAgICAkc2NvcGUsICAgJHRyYW5zbGF0ZSwgICAkbG9jYWxTdG9yYWdlLCAgICR3aW5kb3cgKSB7XHJcbiAgICAgIC8vIGFkZCAnaWUnIGNsYXNzZXMgdG8gaHRtbFxyXG4gICAgICB2YXIgaXNJRSA9ICEhbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvTVNJRS9pKTtcclxuICAgICAgaXNJRSAmJiBhbmd1bGFyLmVsZW1lbnQoJHdpbmRvdy5kb2N1bWVudC5ib2R5KS5hZGRDbGFzcygnaWUnKTtcclxuICAgICAgaXNTbWFydERldmljZSggJHdpbmRvdyApICYmIGFuZ3VsYXIuZWxlbWVudCgkd2luZG93LmRvY3VtZW50LmJvZHkpLmFkZENsYXNzKCdzbWFydCcpO1xyXG5cclxuICAgICAgLy8gY29uZmlnXHJcbiAgICAgICRzY29wZS5hcHAgPSB7XHJcbiAgICAgICAgbmFtZTogJ1ZpYmVzYW1wbGUnLFxyXG4gICAgICAgIHZlcnNpb246ICcuNScsXHJcbiAgICAgICAgLy8gZm9yIGNoYXJ0IGNvbG9yc1xyXG4gICAgICAgIGNvbG9yOiB7XHJcbiAgICAgICAgICBwcmltYXJ5OiAnIzcyNjZiYScsXHJcbiAgICAgICAgICBpbmZvOiAgICAnIzIzYjdlNScsXHJcbiAgICAgICAgICBzdWNjZXNzOiAnIzI3YzI0YycsXHJcbiAgICAgICAgICB3YXJuaW5nOiAnI2ZhZDczMycsXHJcbiAgICAgICAgICBkYW5nZXI6ICAnI2YwNTA1MCcsXHJcbiAgICAgICAgICBsaWdodDogICAnI2U4ZWZmMCcsXHJcbiAgICAgICAgICBkYXJrOiAgICAnIzNhM2Y1MScsXHJcbiAgICAgICAgICBibGFjazogICAnIzFjMmIzNidcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICB0aGVtZUlEOiAxLFxyXG4gICAgICAgICAgbmF2YmFySGVhZGVyQ29sb3I6ICdiZy13aGl0ZS1vbmx5JyxcclxuICAgICAgICAgIG5hdmJhckNvbGxhcHNlQ29sb3I6ICdiZy13aGl0ZS1vbmx5JyxcclxuICAgICAgICAgIGFzaWRlQ29sb3I6ICdiZy1ibGFjaycsXHJcbiAgICAgICAgICBoZWFkZXJGaXhlZDogdHJ1ZSxcclxuICAgICAgICAgIGFzaWRlRml4ZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgYXNpZGVGb2xkZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgYXNpZGVEb2NrOiBmYWxzZSxcclxuICAgICAgICAgIGNvbnRhaW5lcjogZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcblxyXG4gICAgICAvLyBzYXZlIHNldHRpbmdzIHRvIGxvY2FsIHN0b3JhZ2VcclxuICAgICAgaWYgKCBhbmd1bGFyLmlzRGVmaW5lZCgkbG9jYWxTdG9yYWdlLnNldHRpbmdzKSApIHtcclxuICAgICAgICAkc2NvcGUuYXBwLnNldHRpbmdzID0gJGxvY2FsU3RvcmFnZS5zZXR0aW5ncztcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAkbG9jYWxTdG9yYWdlLnNldHRpbmdzID0gJHNjb3BlLmFwcC5zZXR0aW5ncztcclxuICAgICAgfVxyXG4gICAgICAkc2NvcGUuJHdhdGNoKCdhcHAuc2V0dGluZ3MnLCBmdW5jdGlvbigpe1xyXG4gICAgICAgIGlmKCAkc2NvcGUuYXBwLnNldHRpbmdzLmFzaWRlRG9jayAgJiYgICRzY29wZS5hcHAuc2V0dGluZ3MuYXNpZGVGaXhlZCApe1xyXG4gICAgICAgICAgLy8gYXNpZGUgZG9jayBhbmQgZml4ZWQgbXVzdCBzZXQgdGhlIGhlYWRlciBmaXhlZC5cclxuICAgICAgICAgICRzY29wZS5hcHAuc2V0dGluZ3MuaGVhZGVyRml4ZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBzYXZlIHRvIGxvY2FsIHN0b3JhZ2VcclxuICAgICAgICAkbG9jYWxTdG9yYWdlLnNldHRpbmdzID0gJHNjb3BlLmFwcC5zZXR0aW5ncztcclxuICAgICAgfSwgdHJ1ZSk7XHJcblxyXG4gICAgICAvLyBhbmd1bGFyIHRyYW5zbGF0ZVxyXG4gICAgICAkc2NvcGUubGFuZyA9IHsgaXNvcGVuOiBmYWxzZSB9O1xyXG4gICAgICAkc2NvcGUubGFuZ3MgPSB7ZW46J0VuZ2xpc2gnLCBkZV9ERTonR2VybWFuJywgaXRfSVQ6J0l0YWxpYW4nfTtcclxuICAgICAgJHNjb3BlLnNlbGVjdExhbmcgPSAkc2NvcGUubGFuZ3NbJHRyYW5zbGF0ZS5wcm9wb3NlZExhbmd1YWdlKCldIHx8IFwiRW5nbGlzaFwiO1xyXG4gICAgICAkc2NvcGUuc2V0TGFuZyA9IGZ1bmN0aW9uKGxhbmdLZXksICRldmVudCkge1xyXG4gICAgICAgIC8vIHNldCB0aGUgY3VycmVudCBsYW5nXHJcbiAgICAgICAgJHNjb3BlLnNlbGVjdExhbmcgPSAkc2NvcGUubGFuZ3NbbGFuZ0tleV07XHJcbiAgICAgICAgLy8gWW91IGNhbiBjaGFuZ2UgdGhlIGxhbmd1YWdlIGR1cmluZyBydW50aW1lXHJcbiAgICAgICAgJHRyYW5zbGF0ZS51c2UobGFuZ0tleSk7XHJcbiAgICAgICAgJHNjb3BlLmxhbmcuaXNvcGVuID0gISRzY29wZS5sYW5nLmlzb3BlbjtcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGZ1bmN0aW9uIGlzU21hcnREZXZpY2UoICR3aW5kb3cgKVxyXG4gICAgICB7XHJcbiAgICAgICAgICAvLyBBZGFwdGVkIGZyb20gaHR0cDovL3d3dy5kZXRlY3Rtb2JpbGVicm93c2Vycy5jb21cclxuICAgICAgICAgIHZhciB1YSA9ICR3aW5kb3dbJ25hdmlnYXRvciddWyd1c2VyQWdlbnQnXSB8fCAkd2luZG93WyduYXZpZ2F0b3InXVsndmVuZG9yJ10gfHwgJHdpbmRvd1snb3BlcmEnXTtcclxuICAgICAgICAgIC8vIENoZWNrcyBmb3IgaU9zLCBBbmRyb2lkLCBCbGFja2JlcnJ5LCBPcGVyYSBNaW5pLCBhbmQgV2luZG93cyBtb2JpbGUgZGV2aWNlc1xyXG4gICAgICAgICAgcmV0dXJuICgvaVBob25lfGlQb2R8aVBhZHxTaWxrfEFuZHJvaWR8QmxhY2tCZXJyeXxPcGVyYSBNaW5pfElFTW9iaWxlLykudGVzdCh1YSk7XHJcbiAgICAgIH1cclxuXHJcbiAgfV0pO1xyXG4iLCIndXNlIHN0cmljdCc7XG5cbi8qIENvbnRyb2xsZXJzICovXG5cbmFwcC5jb250cm9sbGVyKCdBY2NvdW50Q3RybCcsIFsnJHNjb3BlJywgJ3NpbXBsZUxvZ2luJywgJ2ZidXRpbCcsICd1c2VyJywgJyRzdGF0ZScsJyRyb290U2NvcGUnLFxuZnVuY3Rpb24oJHNjb3BlLCBzaW1wbGVMb2dpbiwgZmJ1dGlsLCB1c2VyLCAkc3RhdGUsICRyb290U2NvcGUpIHtcbiAgICAvLyBjcmVhdGUgYSAzLXdheSBiaW5kaW5nIHdpdGggdGhlIHVzZXIgcHJvZmlsZSBvYmplY3QgaW4gRmlyZWJhc2VcbiAgICB2YXIgcHJvZmlsZSA9IGZidXRpbC5zeW5jT2JqZWN0KFsndXNlcnMnLCB1c2VyLnVpZF0pO1xuICAgIC8vY29uc29sZS5sb2cocHJvZmlsZSk7XG4gICAgcHJvZmlsZS4kYmluZFRvKCRzY29wZSwgJ3Byb2ZpbGUnKTtcblxuICAgIC8vIGV4cG9zZSBsb2dvdXQgZnVuY3Rpb24gdG8gc2NvcGVcbiAgICAkc2NvcGUuc2lnbm91dCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJHJvb3RTY29wZS5GYXZvcml0ZXNMZW5ndGggPSAwO1xuICAgICAgICBwcm9maWxlLiRkZXN0cm95KCk7XG4gICAgICAgIHNpbXBsZUxvZ2luLmxvZ291dCgpO1xuICAgICAgICAkc3RhdGUuZ28oJ2RlbnZlci5zaG93cycpO1xuICAgIH07XG5cbiAgICAkc2NvcGUuY2hhbmdlUGFzc3dvcmQgPSBmdW5jdGlvbiAocGFzcywgY29uZmlybSwgbmV3UGFzcykge1xuICAgICAgICByZXNldE1lc3NhZ2VzKCk7XG4gICAgICAgIGlmICghcGFzcyB8fCAhY29uZmlybSB8fCAhbmV3UGFzcykge1xuICAgICAgICAgICAgJHNjb3BlLmVyciA9ICdQbGVhc2UgZmlsbCBpbiBhbGwgcGFzc3dvcmQgZmllbGRzJztcbiAgICAgICAgfSBlbHNlIGlmIChuZXdQYXNzICE9PSBjb25maXJtKSB7XG4gICAgICAgICAgICAkc2NvcGUuZXJyID0gJ05ldyBwYXNzIGFuZCBjb25maXJtIGRvIG5vdCBtYXRjaCc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzaW1wbGVMb2dpbi5jaGFuZ2VQYXNzd29yZChwcm9maWxlLmVtYWlsLCBwYXNzLCBuZXdQYXNzKVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUubXNnID0gJ1Bhc3N3b3JkIGNoYW5nZWQnO1xuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICRzY29wZS5lcnIgPSBlcnI7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfTtcblxuICAgICRzY29wZS5jbGVhciA9IHJlc2V0TWVzc2FnZXM7XG5cbiAgICAkc2NvcGUuY2hhbmdlRW1haWwgPSBmdW5jdGlvbiAocGFzcywgbmV3RW1haWwpIHtcbiAgICAgICAgcmVzZXRNZXNzYWdlcygpO1xuICAgICAgICBwcm9maWxlLiRkZXN0cm95KCk7XG4gICAgICAgIHNpbXBsZUxvZ2luLmNoYW5nZUVtYWlsKHBhc3MsIG5ld0VtYWlsKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHVzZXIpIHtcbiAgICAgICAgICAgIHByb2ZpbGUgPSBmYnV0aWwuc3luY09iamVjdChbJ3VzZXJzJywgdXNlci51aWRdKTtcbiAgICAgICAgICAgIHByb2ZpbGUuJGJpbmRUbygkc2NvcGUsICdwcm9maWxlJyk7XG4gICAgICAgICAgICAkc2NvcGUuZW1haWxtc2cgPSAnRW1haWwgY2hhbmdlZCc7XG4gICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICRzY29wZS5lbWFpbGVyciA9IGVycjtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHJlc2V0TWVzc2FnZXMoKSB7XG4gICAgICAgICRzY29wZS5lcnIgPSBudWxsO1xuICAgICAgICAkc2NvcGUubXNnID0gbnVsbDtcbiAgICAgICAgJHNjb3BlLmVtYWlsZXJyID0gbnVsbDtcbiAgICAgICAgJHNjb3BlLmVtYWlsbXNnID0gbnVsbDtcbiAgICB9XG59XSlcblxuO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKiBDb250cm9sbGVycyAqL1xuXG5hcHAuY29udHJvbGxlcignU2hvd3NDdHJsJywgWyckc2NvcGUnLCAnJHJvb3RTY29wZScgLCckc3RhdGUnLCAnJGZpcmViYXNlJywgJyRmaWx0ZXInLCAnc2ltcGxlTG9naW4nLCdsZWFmbGV0RGF0YScsJ1BsYXllcicsXG5mdW5jdGlvbigkc2NvcGUsICRyb290U2NvcGUsICRzdGF0ZSwgJGZpcmViYXNlLCAkZmlsdGVyLCBzaW1wbGVMb2dpbiwgbGVhZmxldERhdGEsIFBsYXllcikge1xuICAgIHZhciByZWYgPSBuZXcgRmlyZWJhc2UoXCJodHRwczovL3RvcmlkLWZpcmUtNDMzMi5maXJlYmFzZWlvLmNvbVwiKTtcbiAgICB2YXIgc2hvd3NTeW5jID0gJGZpcmViYXNlKHJlZi5jaGlsZChcInNob3dzXCIpKTtcbiAgICAkc2NvcGUuc2hvd3MgPSBzaG93c1N5bmMuJGFzQXJyYXkoKTtcbiAgICAkc2NvcGUubGlzdFNob3dzID0gW107XG4gICAgJHNjb3BlLmZpbHRlcmVkU2hvd3MgPSBbXTtcbiAgICAkc2NvcGUuZGF5c0FoZWFkID0gLjU7XG5cblxuICAgICRzY29wZS5jaXR5b3B0aW9ucyA9IFtcbiAgICAnRGVudmVyKicsXG4gICAgJyhNb3JlIENpdGllcyBTb29uKSdcbiAgXTtcblxuICAgIC8vJHNjb3BlLmRheW9mV2Vla1NlbGVjdGVkID0gbnVsbDtcblxuICAgICRzY29wZS5kYXkgPSBEYXRlLm5vdygpO1xuXG4gICAgJHNjb3BlLnNlbGVjdERheSA9IGZ1bmN0aW9uKGRheSkge1xuICAgICAgICB2YXIgdG9kYXlzRGF0ZWluTVMgPSBEYXRlLm5vdygpO1xuICAgICAgICAkc2NvcGUuZGF5ID0gZGF5O1xuXG4gICAgICAgICRzY29wZS5kYXlzQWhlYWQgPSAoKCRzY29wZS5kYXkgLSB0b2RheXNEYXRlaW5NUykgLyA4NjQwMDAwMCk7XG4gICAgICAgIC8vY29uc29sZS5sb2coJ2FwcHJveCBkYXlzIGFoZWFkIG9mIG5vdyAnICsgJHNjb3BlLmRheXNBaGVhZCk7XG4gICAgICAgIC8vICRzY29wZS5kYXlzQWhlYWQgbmVlZHMgdG8gYmUgYSBudW1iZXIgMS03IHNvIHRoYXQgaXQgY2FuIGZlZWQgaW50byBmaWx0ZXJcbiAgICB9XG5cblxuICAgIC8vRGF0ZS5ub3coKSArICgyICogODY0MDAwMDApXG5cbiAgICAkc2NvcGUuZGF5cyA9IFtcbiAgICAoJHNjb3BlLmRheSArICgwICogODY0MDAwMDApKSxcbiAgICAoJHNjb3BlLmRheSArICgxICogODY0MDAwMDApKSxcbiAgICAoJHNjb3BlLmRheSArICgyICogODY0MDAwMDApKSxcbiAgICAoJHNjb3BlLmRheSArICgzICogODY0MDAwMDApKSxcbiAgICAoJHNjb3BlLmRheSArICg0ICogODY0MDAwMDApKSxcbiAgICAoJHNjb3BlLmRheSArICg1ICogODY0MDAwMDApKSxcbiAgICAoJHNjb3BlLmRheSArICg2ICogODY0MDAwMDApKSxcbiAgXTtcblxuICAgICRzY29wZS5yYWRpb01vZGVsID0gJ1JpZ2h0JztcblxuICAgICAkc2NvcGUuY2hlY2tNb2RlbCA9IHtcbiAgICBsZWZ0OiBmYWxzZSxcbiAgICBtaWRkbGU6IGZhbHNlLFxuICAgIHJpZ2h0OiB0cnVlXG4gICAgfTtcblxuXG4gICAgLy8gY2hlY2tJZkxvZ2dlZEluIGdldHMgY2FsbGVkIGJ5IHRoZSBmYXZvcml0aW5nIGJ1dHRvbnMuICBDaGVja3MgaWYgdGhlIHVzZXIgaXMgbG9nZ2VkIGluIG9yIG5vdC4gIElmIG5vdCwgcmVkaXJlY3RzIHRvIHNpZ251cCBwYWdlXG4gICAgICAkc2NvcGUuY2hlY2tJZkxvZ2dlZEluID0gZnVuY3Rpb24gKHNob3cpIHtcbiAgICAgICAgaWYgKHNpbXBsZUxvZ2luLnVzZXIgPT09IG51bGwpe1xuICAgICAgICAgICAgJHN0YXRlLmdvKCdkZW52ZXIuc2lnbmluJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAkc2NvcGUudG9nZ2xlU3RhcnJlZChzaG93KTtcbiAgICAgICAgfVxuICAgIH07XG5cblxuICAgIC8vJHNjb3BlLmRheUZpbHRlck9wdGlvbnMgPSBbLjUsIDMsIDddO1xuXG4gICAgc2ltcGxlTG9naW4uZ2V0VXNlcigpLnRoZW4oZnVuY3Rpb24gKHVzZXIpIHtcblxuICAgICAgaWYoIXVzZXIpe1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgICAgIHZhciBsb2dnZWRJblVzZXJGYXZvcml0ZXNTeW5jID0gJGZpcmViYXNlKHJlZi5jaGlsZChcInVzZXJzXCIpLmNoaWxkKHVzZXIudWlkKS5jaGlsZChcImZhdm9yaXRlc1wiKSk7XG5cbiAgICAgICAgJHNjb3BlLmxvZ2dlZEluVXNlckZhdm9yaXRlcyA9IGxvZ2dlZEluVXNlckZhdm9yaXRlc1N5bmMuJGFzT2JqZWN0KCk7XG5cbiAgICAgICAgJHNjb3BlLmxvZ2dlZEluVXNlckZhdm9yaXRlcy4kbG9hZGVkKGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgdmFyIGNhbGN1bGF0ZUxlbmd0aCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICRyb290U2NvcGUuRmF2b3JpdGVzTGVuZ3RoID0gMDsgIC8vIHJvb3RTY29wZSBzbyBoZWFkZXIgY2FuIGFjY2Vzc1xuICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKCRzY29wZS5sb2dnZWRJblVzZXJGYXZvcml0ZXMsIGZ1bmN0aW9uKHZhbHVlLCBrZXkpe1xuICAgICAgICAgICAgaWYgKCRzY29wZS5sb2dnZWRJblVzZXJGYXZvcml0ZXNba2V5XSA9PT0gdHJ1ZSl7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS5GYXZvcml0ZXNMZW5ndGggKys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY2FsY3VsYXRlTGVuZ3RoKCk7XG5cbiAgICAgICAgICAgICRzY29wZS50b2dnbGVTdGFycmVkID0gZnVuY3Rpb24gKHNob3cpIHtcblxuXG4gICAgICAgICAgICAgICAgaWYgKCRzY29wZS5sb2dnZWRJblVzZXJGYXZvcml0ZXNbc2hvdy5wcm9wZXJ0aWVzLmlkXSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUubG9nZ2VkSW5Vc2VyRmF2b3JpdGVzW3Nob3cucHJvcGVydGllcy5pZF0gPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoJHNjb3BlLmxvZ2dlZEluVXNlckZhdm9yaXRlcy4kdmFsdWUgPT09IHVuZGVmaW5lZCB8fCBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5sb2dnZWRJblVzZXJGYXZvcml0ZXNbc2hvdy5wcm9wZXJ0aWVzLmlkXSA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUubG9nZ2VkSW5Vc2VyRmF2b3JpdGVzW3Nob3cucHJvcGVydGllcy5pZF0gPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJHNjb3BlLmxvZ2dlZEluVXNlckZhdm9yaXRlcykgLy8ucmVwbGFjZSggL15cXEQrL2csICcnKTtcblxuXG4gICAgICAgICAgICAgICAgJHNjb3BlLmxvZ2dlZEluVXNlckZhdm9yaXRlcy4kc2F2ZSgpO1xuICAgICAgICAgICAgICAgIGNhbGN1bGF0ZUxlbmd0aCgpO1xuICAgICAgICAgICAgfTsgLy8gdG9nZ2xlU3RhcnJlZFxuICAgICAgICB9KSAvLyBMb2FkZWRcbiAgICB9KSAvLyBVc2VyXG5cblxuXG4gICAgJHNjb3BlLnNob3dzLiRsb2FkZWQoZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIC8vIExlZnQgU2lkZWJhciBkYXRhXG5cbiAgICAgICAgJHNjb3BlLmxpc3RTaG93cyA9ICRzY29wZS5zaG93c1swXTtcblxuICAgICAgICAkc2NvcGUuJHdhdGNoKCdkYXlzQWhlYWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkc2NvcGUuZmlsdGVyZWRTaG93cyA9ICRmaWx0ZXIoJ3VwQ29taW5nJykoJHNjb3BlLmxpc3RTaG93cywgJ3Byb3BlcnRpZXMuZGF0ZScsICRzY29wZS5kYXlzQWhlYWQpO1xuXG4gICAgICAgICAgICBhbmd1bGFyLmV4dGVuZCgkc2NvcGUsIHsgLy8gTWFwIGRhdGFcbiAgICAgICAgICAgICAgICBnZW9qc29uOiB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6ICRzY29wZS5maWx0ZXJlZFNob3dzLFxuICAgICAgICAgICAgICAgICAgICBvbkVhY2hGZWF0dXJlOiBmdW5jdGlvbiAoZmVhdHVyZSwgbGF5ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxheWVyLmJpbmRQb3B1cChmZWF0dXJlLnByb3BlcnRpZXMuYXJ0aXN0ICsgJyZuYnNwOyYjNjQ7Jm5ic3A7JyArIGZlYXR1cmUucHJvcGVydGllcy52ZW51ZV9uYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxheWVyLnNldEljb24oZGVmYXVsdE1hcmtlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYXllci5vbih7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW91c2VvdmVyOiBwb2ludE1vdXNlb3ZlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb3VzZW91dDogcG9pbnRNb3VzZW91dFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYXllcnNbZmVhdHVyZS5wcm9wZXJ0aWVzLmlkXSA9IGxheWVyO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pOyAvLyB3YXRjaFxuICAgIH0pOyAvLyBsb2FkZWRcblxuIC8vIEV4cGVyaW1lbnRhbCBQbGF5ZXIgd2l0aCBzZXJ2aWNlXG5cbiAgICAkc2NvcGUucGxheWVyID0gUGxheWVyO1xuICAgIC8vY29uc29sZS5sb2coJHNjb3BlLnBsYXllcik7XG5cbiAgICAkc2NvcGUuJG9uKCdzdGF0dXNDaGFuZ2VkJywgZnVuY3Rpb24gKCkge1xuICAgICAgaWYoISRzY29wZS4kJHBoYXNlKSB7XG4gICAgICAgICRzY29wZS4kZGlnZXN0KCk7XG4gICAgICB9XG4gICAgfSk7XG5cblxuXG5cblxuICAgIC8vIHdpbGwgY2hhbmdlIHN0eWxpbmcgaWYgYWN0aXZlIHRyYWNrIGlzIHBsYXlpbmdcblxuICAgICRzY29wZS4kd2F0Y2goJ3BsYXllci5jdXJyZW50VHJhY2sucHJvcGVydGllcy5pZCcsIGZ1bmN0aW9uICgpIHtcblxuXG4gICAgYW5ndWxhci5lbGVtZW50KCcubGlzdC1ncm91cC1pdGVtJykucmVtb3ZlQ2xhc3MoJ3BsYXlpbmcnKTtcblxuICAgICAgaWYgKFBsYXllci5jdXJyZW50VHJhY2sgJiYgUGxheWVyLmN1cnJlbnRUcmFjay5wcm9wZXJ0aWVzLmlkKSB7XG4gICAgICAgIGFuZ3VsYXIuZWxlbWVudCgnLmxpc3QtZ3JvdXAtaXRlbScgKyBQbGF5ZXIuY3VycmVudFRyYWNrLnByb3BlcnRpZXMuaWQpLmFkZENsYXNzKCdwbGF5aW5nJyk7XG4gICAgICB9XG4gICAgfSk7XG5cblxuICAgICRzY29wZS5zZXRQb3NpdGlvbiA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgIHZhciBwb3NpdGlvblBlcmNlbnQgPSAoZS5wYWdlWCAtIGUuY3VycmVudFRhcmdldC5vZmZzZXRMZWZ0KSAvIGUuY3VycmVudFRhcmdldC5vZmZzZXRXaWR0aDtcbiAgICAgIFBsYXllci5zZXRQb3NpdGlvbihwb3NpdGlvblBlcmNlbnQpO1xuICAgIH07XG5cblxuXG5cbi8vIGVuZCBvZiBleHBlcmltZW50YWwgcGxheWVyXG5cblxuXG5cblxuICAgIC8vIG1hcFxuICAgICAgIGFuZ3VsYXIuZXh0ZW5kKCRzY29wZSwge1xuICAgIGNlbnRlcjoge1xuICAgICAgICBsYXQ6IDM5Ljc0NDIxMyxcbiAgICAgICAgbG5nOiAtMTA0Ljk5MDQ1NixcbiAgICAgICAgem9vbTogMTMsXG4gICAgICAgIHNjcm9sbFdoZWVsWm9vbTonY2VudGVyJ1xuICAgIH0sXG4gICAgZGVmYXVsdHM6IHtcbiAgICAgICAgdGlsZUxheWVyOiAnaHR0cHM6Ly9hcGkudGlsZXMubWFwYm94LmNvbS92NC9tYXBib3guc3RyZWV0cy97en0ve3h9L3t5fS5wbmc/YWNjZXNzX3Rva2VuPXBrLmV5SjFJam9pYTNCbGJtNWxiR3dpTENKaElqb2lkM1F4YUZOTVRTSjkuNUhqQW8tZm1NZ2hjSEdlQ01PTWhlZycsXG4gICAgICAgIG1heFpvb206IDE2LFxuICAgICAgICBwYXRoOiB7XG4gICAgICAgICAgICB3ZWlnaHQ6IDIsXG4gICAgICAgICAgICBjb2xvcjogJyM4MDAwMDAnLFxuICAgICAgICAgICAgb3BhY2l0eTogMVxuICAgICAgICB9XG4gICAgfVxuICAgIH0pO1xuXG4gICAgdmFyIGRlZmF1bHRNYXJrZXIgPSBMLmljb24oe1xuICAgICAgICBpY29uVXJsOiAnaW1nL21hcmtlci1pY29uLnBuZycsXG4gICAgICAgIHNoYWRvd1VybDogJ2ltZy9tYXJrZXItc2hhZG93LnBuZycsXG4gICAgICAgIHBvcHVwQW5jaG9yOiBbMSwgLTI0XSxcbiAgICAgICAgaWNvbkFuY2hvcjogWzEzLCAyN11cbiAgICB9KTtcblxuICAgIHZhciBtb3VzZW92ZXJNYXJrZXIgPSBMLmljb24oe1xuICAgICAgICBpY29uVXJsOiAnaW1nL21hcmtlci1ncmVlbi5wbmcnLFxuICAgICAgICBzaGFkb3dVcmw6ICdpbWcvbWFya2VyLXNoYWRvdy5wbmcnLFxuICAgICAgICBwb3B1cEFuY2hvcjogWzEsIC0yNF0sXG4gICAgICAgIGljb25BbmNob3I6IFsxMywgMjddXG4gICAgfSk7XG5cbiAgICB2YXIgbGF5ZXJzID0ge307XG5cbiAgICAkc2NvcGUuaG92ZXJpdGVtID0ge307XG5cbiAgICBmdW5jdGlvbiBwb2ludE1vdXNlb3ZlcihsZWFmbGV0RXZlbnQpIHtcbiAgICAgICAgdmFyIGxheWVyID0gbGVhZmxldEV2ZW50LnRhcmdldDtcbiAgICAgICAgbGF5ZXIuc2V0SWNvbihtb3VzZW92ZXJNYXJrZXIpO1xuXG4gICAgICAgICRzY29wZS4kYXBwbHkoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJHNjb3BlLmhvdmVyaXRlbSA9ICgobGF5ZXIuZmVhdHVyZS5wcm9wZXJ0aWVzLmlkKS5yZXBsYWNlKC9eXFxEKy9nLCAnJykpOyAvLyByZWdleCB0byBwdWxsIG51bWJlciBvdXQgb2Ygc3RyaW5nLCB3aG9haCFcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coKGxheWVyLmZlYXR1cmUucHJvcGVydGllcy5pZCkucmVwbGFjZSgvXlxcRCsvZywgJycpKTtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJHNjb3BlLmhvdmVyaXRlbSk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcG9pbnRNb3VzZW91dChsZWFmbGV0RXZlbnQpIHtcbiAgICAgICAgdmFyIGxheWVyID0gbGVhZmxldEV2ZW50LnRhcmdldDtcbiAgICAgICAgbGF5ZXIuc2V0SWNvbihkZWZhdWx0TWFya2VyKTtcblxuICAgICAgICAkc2NvcGUuJGFwcGx5KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICRzY29wZS5ob3Zlcml0ZW0gPSB7fTtcbiAgICAgICAgfSlcbiAgICB9XG5cblxuXG4gICAgJHNjb3BlLm1lbnVNb3VzZSA9IGZ1bmN0aW9uIChzaG93KSB7XG4gICAgICAgIHZhciBsYXllciA9IGxheWVyc1tzaG93LnByb3BlcnRpZXMuaWRdO1xuICAgICAgICBsYXllci5zZXRJY29uKG1vdXNlb3Zlck1hcmtlcik7XG4gICAgICAgIGxheWVyLm9wZW5Qb3B1cCgpO1xuICAgIH1cblxuICAgICRzY29wZS5tZW51TW91c2VvdXQgPSBmdW5jdGlvbiAoc2hvdykge1xuICAgICAgICB2YXIgbGF5ZXIgPSBsYXllcnNbc2hvdy5wcm9wZXJ0aWVzLmlkXTtcbiAgICAgICAgbGF5ZXIuc2V0SWNvbihkZWZhdWx0TWFya2VyKTtcbiAgICAgICAgbGF5ZXIuY2xvc2VQb3B1cCgpO1xuICAgIH1cblxuXG5cbiAgICAvLyB0cnlpbmcgbXVzaWMgcGxheWVyXG5cblxuXG5cbn1dKVxuO1xuXG5cblxuLyogTW9zdGx5IHdvcmtpbmcgc3RyZWFtX3RyYWNrXG5cbiRzY29wZS5zb3VuZCA9IHt9O1xuICAgICRzY29wZS5wbGF5ZXIgPSB7fTtcblxuICAgICRzY29wZS5zdHJlYW1UcmFjayA9IGZ1bmN0aW9uIChzaG93KSB7XG5cbiAgICAgICAgU0Muc3RyZWFtKHNob3cucHJvcGVydGllcy5zdHJlYW1fdXJsLCBmdW5jdGlvbiAoc291bmQpIHtcbiAgICAgICAgICAgICRzY29wZS5zb3VuZCA9IHNvdW5kO1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhzb3VuZCk7XG4gICAgICAgICAgICBzb3VuZE1hbmFnZXIuc3RvcEFsbCgpO1xuXG5cbiAgICAgICAgICAgIHNvdW5kLnBsYXkoe1xuICAgICAgICAgICAgICAgIHdoaWxlcGxheWluZzogZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5wbGF5ZXIuZHVyYXRpb24gPSBNYXRoLmZsb29yKHRoaXMuZHVyYXRpb25Fc3RpbWF0ZSAvIDEwMDApO1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUucGxheWVyLnBvc2l0aW9uID0gTWF0aC5mbG9vcih0aGlzLnBvc2l0aW9uIC8gMTAwMCk7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5wbGF5ZXIucHJvZ3Jlc3MgPSAodGhpcy5wb3NpdGlvbiAvIHRoaXMuZHVyYXRpb25Fc3RpbWF0ZSkgKiAxMDA7XG4gICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnc3RhdHVzQ2hhbmdlZCcsIHRydWUpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCRzY29wZS5wbGF5ZXIpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2V0UG9zaXRpb246IGZ1bmN0aW9uIChwZXJjZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHNvdW5kLnNldFBvc2l0aW9uKHBlcmNlbnQgKiB0aGlzLnNvdW5kLmR1cmF0aW9uKTtcbiAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2hvdy52aXNpYmxlID0gZmFsc2U7XG4gICAgfTtcblxuXG5cbiAgICAkc2NvcGUuJG9uKCdzdGF0dXNDaGFuZ2VkJywgZnVuY3Rpb24gKCkge1xuICAgICAgaWYoISRzY29wZS4kJHBoYXNlKSB7XG4gICAgICAgICRzY29wZS4kZGlnZXN0KCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAgJHNjb3BlLnNldFBvc2l0aW9uID0gZnVuY3Rpb24oZSkge1xuICAgICAgdmFyIHBvc2l0aW9uUGVyY2VudCA9IChlLnBhZ2VYIC0gZS5jdXJyZW50VGFyZ2V0Lm9mZnNldExlZnQpIC8gZS5jdXJyZW50VGFyZ2V0Lm9mZnNldFdpZHRoO1xuICAgICAgY29uc29sZS5sb2cocG9zaXRpb25QZXJjZW50KTtcbiAgICAgIC8vJHNjb3BlLnBsYXllci5zZXRQb3NpdGlvbihwb3NpdGlvblBlcmNlbnQpO1xuICAgIH07XG5cblxuICAgICRzY29wZS5wYXVzZVRyYWNrID0gZnVuY3Rpb24gKHNob3cpIHtcbiAgICAgICAgJHNjb3BlLnNvdW5kLnBhdXNlKCk7XG4gICAgICAgIHNob3cudmlzaWJsZSA9IHRydWU7XG4gICAgfTtcblxuXG4qL1xuIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLyogQ29udHJvbGxlcnMgKi9cclxuXHJcbiAgLy8gYm9vdHN0cmFwIGNvbnRyb2xsZXJcclxuICBhcHAuY29udHJvbGxlcignQWNjb3JkaW9uRGVtb0N0cmwnLCBbJyRzY29wZScsIGZ1bmN0aW9uKCRzY29wZSkge1xyXG4gICAgJHNjb3BlLm9uZUF0QVRpbWUgPSB0cnVlO1xyXG5cclxuICAgICRzY29wZS5ncm91cHMgPSBbXHJcbiAgICAgIHtcclxuICAgICAgICB0aXRsZTogJ0FjY29yZGlvbiBncm91cCBoZWFkZXIgLSAjMScsXHJcbiAgICAgICAgY29udGVudDogJ0R5bmFtaWMgZ3JvdXAgYm9keSAtICMxJ1xyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdGl0bGU6ICdBY2NvcmRpb24gZ3JvdXAgaGVhZGVyIC0gIzInLFxyXG4gICAgICAgIGNvbnRlbnQ6ICdEeW5hbWljIGdyb3VwIGJvZHkgLSAjMidcclxuICAgICAgfVxyXG4gICAgXTtcclxuXHJcbiAgICAkc2NvcGUuaXRlbXMgPSBbJ0l0ZW0gMScsICdJdGVtIDInLCAnSXRlbSAzJ107XHJcblxyXG4gICAgJHNjb3BlLmFkZEl0ZW0gPSBmdW5jdGlvbigpIHtcclxuICAgICAgdmFyIG5ld0l0ZW1ObyA9ICRzY29wZS5pdGVtcy5sZW5ndGggKyAxO1xyXG4gICAgICAkc2NvcGUuaXRlbXMucHVzaCgnSXRlbSAnICsgbmV3SXRlbU5vKTtcclxuICAgIH07XHJcblxyXG4gICAgJHNjb3BlLnN0YXR1cyA9IHtcclxuICAgICAgaXNGaXJzdE9wZW46IHRydWUsXHJcbiAgICAgIGlzRmlyc3REaXNhYmxlZDogZmFsc2VcclxuICAgIH07XHJcbiAgfV0pXHJcbiAgOyBcclxuICBhcHAuY29udHJvbGxlcignQWxlcnREZW1vQ3RybCcsIFsnJHNjb3BlJywgZnVuY3Rpb24oJHNjb3BlKSB7XHJcbiAgICAkc2NvcGUuYWxlcnRzID0gW1xyXG4gICAgICB7IHR5cGU6ICdzdWNjZXNzJywgbXNnOiAnV2VsbCBkb25lISBZb3Ugc3VjY2Vzc2Z1bGx5IHJlYWQgdGhpcyBpbXBvcnRhbnQgYWxlcnQgbWVzc2FnZS4nIH0sXHJcbiAgICAgIHsgdHlwZTogJ2luZm8nLCBtc2c6ICdIZWFkcyB1cCEgVGhpcyBhbGVydCBuZWVkcyB5b3VyIGF0dGVudGlvbiwgYnV0IGl0IGlzIG5vdCBzdXBlciBpbXBvcnRhbnQuJyB9LFxyXG4gICAgICB7IHR5cGU6ICd3YXJuaW5nJywgbXNnOiAnV2FybmluZyEgQmVzdCBjaGVjayB5byBzZWxmLCB5b3UgYXJlIG5vdCBsb29raW5nIHRvbyBnb29kLi4uJyB9XHJcbiAgICBdO1xyXG5cclxuICAgICRzY29wZS5hZGRBbGVydCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAkc2NvcGUuYWxlcnRzLnB1c2goe3R5cGU6ICdkYW5nZXInLCBtc2c6ICdPaCBzbmFwISBDaGFuZ2UgYSBmZXcgdGhpbmdzIHVwIGFuZCB0cnkgc3VibWl0dGluZyBhZ2Fpbi4nfSk7XHJcbiAgICB9O1xyXG5cclxuICAgICRzY29wZS5jbG9zZUFsZXJ0ID0gZnVuY3Rpb24oaW5kZXgpIHtcclxuICAgICAgJHNjb3BlLmFsZXJ0cy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgfTtcclxuICB9XSlcclxuICA7IFxyXG4gIGFwcC5jb250cm9sbGVyKCdCdXR0b25zRGVtb0N0cmwnLCBbJyRzY29wZScsIGZ1bmN0aW9uKCRzY29wZSkge1xyXG4gICAgJHNjb3BlLnNpbmdsZU1vZGVsID0gMTtcclxuXHJcbiAgICAkc2NvcGUucmFkaW9Nb2RlbCA9ICdNaWRkbGUnO1xyXG5cclxuICAgICRzY29wZS5jaGVja01vZGVsID0ge1xyXG4gICAgICBsZWZ0OiBmYWxzZSxcclxuICAgICAgbWlkZGxlOiB0cnVlLFxyXG4gICAgICByaWdodDogZmFsc2VcclxuICAgIH07XHJcbiAgfV0pXHJcbiAgOyBcclxuICBhcHAuY29udHJvbGxlcignQ2Fyb3VzZWxEZW1vQ3RybCcsIFsnJHNjb3BlJywgZnVuY3Rpb24oJHNjb3BlKSB7XHJcbiAgICAkc2NvcGUubXlJbnRlcnZhbCA9IDUwMDA7XHJcbiAgICB2YXIgc2xpZGVzID0gJHNjb3BlLnNsaWRlcyA9IFtdO1xyXG4gICAgJHNjb3BlLmFkZFNsaWRlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIHNsaWRlcy5wdXNoKHtcclxuICAgICAgICBpbWFnZTogJ2ltZy9jJyArIHNsaWRlcy5sZW5ndGggKyAnLmpwZycsXHJcbiAgICAgICAgdGV4dDogWydDYXJvdXNlbCB0ZXh0ICMwJywnQ2Fyb3VzZWwgdGV4dCAjMScsJ0Nhcm91c2VsIHRleHQgIzInLCdDYXJvdXNlbCB0ZXh0ICMzJ11bc2xpZGVzLmxlbmd0aCAlIDRdXHJcbiAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIGZvciAodmFyIGk9MDsgaTw0OyBpKyspIHtcclxuICAgICAgJHNjb3BlLmFkZFNsaWRlKCk7XHJcbiAgICB9XHJcbiAgfV0pXHJcbiAgOyBcclxuICBhcHAuY29udHJvbGxlcignRHJvcGRvd25EZW1vQ3RybCcsIFsnJHNjb3BlJywgZnVuY3Rpb24oJHNjb3BlKSB7XHJcbiAgICAkc2NvcGUuaXRlbXMgPSBbXHJcbiAgICAgICdUaGUgZmlyc3QgY2hvaWNlIScsXHJcbiAgICAgICdBbmQgYW5vdGhlciBjaG9pY2UgZm9yIHlvdS4nLFxyXG4gICAgICAnYnV0IHdhaXQhIEEgdGhpcmQhJ1xyXG4gICAgXTtcclxuXHJcbiAgICAkc2NvcGUuc3RhdHVzID0ge1xyXG4gICAgICBpc29wZW46IGZhbHNlXHJcbiAgICB9O1xyXG5cclxuICAgICRzY29wZS50b2dnbGVkID0gZnVuY3Rpb24ob3Blbikge1xyXG4gICAgICAvL2NvbnNvbGUubG9nKCdEcm9wZG93biBpcyBub3c6ICcsIG9wZW4pO1xyXG4gICAgfTtcclxuXHJcbiAgICAkc2NvcGUudG9nZ2xlRHJvcGRvd24gPSBmdW5jdGlvbigkZXZlbnQpIHtcclxuICAgICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgJHNjb3BlLnN0YXR1cy5pc29wZW4gPSAhJHNjb3BlLnN0YXR1cy5pc29wZW47XHJcbiAgICB9O1xyXG4gIH1dKVxyXG4gIDsgXHJcbiAgYXBwLmNvbnRyb2xsZXIoJ01vZGFsSW5zdGFuY2VDdHJsJywgWyckc2NvcGUnLCAnJG1vZGFsSW5zdGFuY2UnLCAnaXRlbXMnLCBmdW5jdGlvbigkc2NvcGUsICRtb2RhbEluc3RhbmNlLCBpdGVtcykge1xyXG4gICAgJHNjb3BlLml0ZW1zID0gaXRlbXM7XHJcbiAgICAkc2NvcGUuc2VsZWN0ZWQgPSB7XHJcbiAgICAgIGl0ZW06ICRzY29wZS5pdGVtc1swXVxyXG4gICAgfTtcclxuXHJcbiAgICAkc2NvcGUub2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICRtb2RhbEluc3RhbmNlLmNsb3NlKCRzY29wZS5zZWxlY3RlZC5pdGVtKTtcclxuICAgIH07XHJcblxyXG4gICAgJHNjb3BlLmNhbmNlbCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgJG1vZGFsSW5zdGFuY2UuZGlzbWlzcygnY2FuY2VsJyk7XHJcbiAgICB9O1xyXG4gIH1dKVxyXG4gIDsgXHJcbiAgYXBwLmNvbnRyb2xsZXIoJ01vZGFsRGVtb0N0cmwnLCBbJyRzY29wZScsICckbW9kYWwnLCAnJGxvZycsIGZ1bmN0aW9uKCRzY29wZSwgJG1vZGFsLCAkbG9nKSB7XHJcbiAgICAkc2NvcGUuaXRlbXMgPSBbJ2l0ZW0xJywgJ2l0ZW0yJywgJ2l0ZW0zJ107XHJcbiAgICAkc2NvcGUub3BlbiA9IGZ1bmN0aW9uIChzaXplKSB7XHJcbiAgICAgIHZhciBtb2RhbEluc3RhbmNlID0gJG1vZGFsLm9wZW4oe1xyXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnbXlNb2RhbENvbnRlbnQuaHRtbCcsXHJcbiAgICAgICAgY29udHJvbGxlcjogJ01vZGFsSW5zdGFuY2VDdHJsJyxcclxuICAgICAgICBzaXplOiBzaXplLFxyXG4gICAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICAgIGl0ZW1zOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkc2NvcGUuaXRlbXM7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIG1vZGFsSW5zdGFuY2UucmVzdWx0LnRoZW4oZnVuY3Rpb24gKHNlbGVjdGVkSXRlbSkge1xyXG4gICAgICAgICRzY29wZS5zZWxlY3RlZCA9IHNlbGVjdGVkSXRlbTtcclxuICAgICAgfSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICRsb2cuaW5mbygnTW9kYWwgZGlzbWlzc2VkIGF0OiAnICsgbmV3IERhdGUoKSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfTtcclxuICB9XSlcclxuICA7IFxyXG4gIGFwcC5jb250cm9sbGVyKCdQYWdpbmF0aW9uRGVtb0N0cmwnLCBbJyRzY29wZScsICckbG9nJywgZnVuY3Rpb24oJHNjb3BlLCAkbG9nKSB7XHJcbiAgICAkc2NvcGUudG90YWxJdGVtcyA9IDY0O1xyXG4gICAgJHNjb3BlLmN1cnJlbnRQYWdlID0gNDtcclxuXHJcbiAgICAkc2NvcGUuc2V0UGFnZSA9IGZ1bmN0aW9uIChwYWdlTm8pIHtcclxuICAgICAgJHNjb3BlLmN1cnJlbnRQYWdlID0gcGFnZU5vO1xyXG4gICAgfTtcclxuXHJcbiAgICAkc2NvcGUucGFnZUNoYW5nZWQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgJGxvZy5pbmZvKCdQYWdlIGNoYW5nZWQgdG86ICcgKyAkc2NvcGUuY3VycmVudFBhZ2UpO1xyXG4gICAgfTtcclxuXHJcbiAgICAkc2NvcGUubWF4U2l6ZSA9IDU7XHJcbiAgICAkc2NvcGUuYmlnVG90YWxJdGVtcyA9IDE3NTtcclxuICAgICRzY29wZS5iaWdDdXJyZW50UGFnZSA9IDE7XHJcbiAgfV0pXHJcbiAgOyBcclxuICBhcHAuY29udHJvbGxlcignUG9wb3ZlckRlbW9DdHJsJywgWyckc2NvcGUnLCBmdW5jdGlvbigkc2NvcGUpIHtcclxuICAgICRzY29wZS5keW5hbWljUG9wb3ZlciA9ICdIZWxsbywgV29ybGQhJztcclxuICAgICRzY29wZS5keW5hbWljUG9wb3ZlclRpdGxlID0gJ1RpdGxlJztcclxuICB9XSlcclxuICA7IFxyXG4gIGFwcC5jb250cm9sbGVyKCdQcm9ncmVzc0RlbW9DdHJsJywgWyckc2NvcGUnLCBmdW5jdGlvbigkc2NvcGUpIHtcclxuICAgICRzY29wZS5tYXggPSAyMDA7XHJcblxyXG4gICAgJHNjb3BlLnJhbmRvbSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICB2YXIgdmFsdWUgPSBNYXRoLmZsb29yKChNYXRoLnJhbmRvbSgpICogMTAwKSArIDEpO1xyXG4gICAgICB2YXIgdHlwZTtcclxuXHJcbiAgICAgIGlmICh2YWx1ZSA8IDI1KSB7XHJcbiAgICAgICAgdHlwZSA9ICdzdWNjZXNzJztcclxuICAgICAgfSBlbHNlIGlmICh2YWx1ZSA8IDUwKSB7XHJcbiAgICAgICAgdHlwZSA9ICdpbmZvJztcclxuICAgICAgfSBlbHNlIGlmICh2YWx1ZSA8IDc1KSB7XHJcbiAgICAgICAgdHlwZSA9ICd3YXJuaW5nJztcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0eXBlID0gJ2Rhbmdlcic7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgICRzY29wZS5zaG93V2FybmluZyA9ICh0eXBlID09PSAnZGFuZ2VyJyB8fCB0eXBlID09PSAnd2FybmluZycpO1xyXG5cclxuICAgICAgJHNjb3BlLmR5bmFtaWMgPSB2YWx1ZTtcclxuICAgICAgJHNjb3BlLnR5cGUgPSB0eXBlO1xyXG4gICAgfTtcclxuICAgICRzY29wZS5yYW5kb20oKTtcclxuXHJcbiAgICAkc2NvcGUucmFuZG9tU3RhY2tlZCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAkc2NvcGUuc3RhY2tlZCA9IFtdO1xyXG4gICAgICB2YXIgdHlwZXMgPSBbJ3N1Y2Nlc3MnLCAnaW5mbycsICd3YXJuaW5nJywgJ2RhbmdlciddO1xyXG5cclxuICAgICAgZm9yICh2YXIgaSA9IDAsIG4gPSBNYXRoLmZsb29yKChNYXRoLnJhbmRvbSgpICogNCkgKyAxKTsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgdmFyIGluZGV4ID0gTWF0aC5mbG9vcigoTWF0aC5yYW5kb20oKSAqIDQpKTtcclxuICAgICAgICAgICRzY29wZS5zdGFja2VkLnB1c2goe1xyXG4gICAgICAgICAgICB2YWx1ZTogTWF0aC5mbG9vcigoTWF0aC5yYW5kb20oKSAqIDMwKSArIDEpLFxyXG4gICAgICAgICAgICB0eXBlOiB0eXBlc1tpbmRleF1cclxuICAgICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gICAgJHNjb3BlLnJhbmRvbVN0YWNrZWQoKTtcclxuICB9XSlcclxuICA7IFxyXG4gIGFwcC5jb250cm9sbGVyKCdUYWJzRGVtb0N0cmwnLCBbJyRzY29wZScsIGZ1bmN0aW9uKCRzY29wZSkge1xyXG4gICAgJHNjb3BlLnRhYnMgPSBbXHJcbiAgICAgIHsgdGl0bGU6J0R5bmFtaWMgVGl0bGUgMScsIGNvbnRlbnQ6J0R5bmFtaWMgY29udGVudCAxJyB9LFxyXG4gICAgICB7IHRpdGxlOidEeW5hbWljIFRpdGxlIDInLCBjb250ZW50OidEeW5hbWljIGNvbnRlbnQgMicsIGRpc2FibGVkOiB0cnVlIH1cclxuICAgIF07XHJcbiAgfV0pXHJcbiAgOyBcclxuICBhcHAuY29udHJvbGxlcignUmF0aW5nRGVtb0N0cmwnLCBbJyRzY29wZScsIGZ1bmN0aW9uKCRzY29wZSkge1xyXG4gICAgJHNjb3BlLnJhdGUgPSA3O1xyXG4gICAgJHNjb3BlLm1heCA9IDEwO1xyXG4gICAgJHNjb3BlLmlzUmVhZG9ubHkgPSBmYWxzZTtcclxuXHJcbiAgICAkc2NvcGUuaG92ZXJpbmdPdmVyID0gZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgJHNjb3BlLm92ZXJTdGFyID0gdmFsdWU7XHJcbiAgICAgICRzY29wZS5wZXJjZW50ID0gMTAwICogKHZhbHVlIC8gJHNjb3BlLm1heCk7XHJcbiAgICB9O1xyXG4gIH1dKVxyXG4gIDsgXHJcbiAgYXBwLmNvbnRyb2xsZXIoJ1Rvb2x0aXBEZW1vQ3RybCcsIFsnJHNjb3BlJywgZnVuY3Rpb24oJHNjb3BlKSB7XHJcbiAgICAkc2NvcGUuZHluYW1pY1Rvb2x0aXAgPSAnSGVsbG8sIFdvcmxkISc7XHJcbiAgICAkc2NvcGUuZHluYW1pY1Rvb2x0aXBUZXh0ID0gJ2R5bmFtaWMnO1xyXG4gICAgJHNjb3BlLmh0bWxUb29sdGlwID0gJ0lcXCd2ZSBiZWVuIG1hZGUgPGI+Ym9sZDwvYj4hJztcclxuICB9XSlcclxuICA7IFxyXG4gIGFwcC5jb250cm9sbGVyKCdUeXBlYWhlYWREZW1vQ3RybCcsIFsnJHNjb3BlJywgJyRodHRwJywgZnVuY3Rpb24oJHNjb3BlLCAkaHR0cCkge1xyXG4gICAgJHNjb3BlLnNlbGVjdGVkID0gdW5kZWZpbmVkO1xyXG4gICAgJHNjb3BlLnN0YXRlcyA9IFsnQWxhYmFtYScsICdBbGFza2EnLCAnQXJpem9uYScsICdBcmthbnNhcycsICdDYWxpZm9ybmlhJywgJ0NvbG9yYWRvJywgJ0Nvbm5lY3RpY3V0JywgJ0RlbGF3YXJlJywgJ0Zsb3JpZGEnLCAnR2VvcmdpYScsICdIYXdhaWknLCAnSWRhaG8nLCAnSWxsaW5vaXMnLCAnSW5kaWFuYScsICdJb3dhJywgJ0thbnNhcycsICdLZW50dWNreScsICdMb3Vpc2lhbmEnLCAnTWFpbmUnLCAnTWFyeWxhbmQnLCAnTWFzc2FjaHVzZXR0cycsICdNaWNoaWdhbicsICdNaW5uZXNvdGEnLCAnTWlzc2lzc2lwcGknLCAnTWlzc291cmknLCAnTW9udGFuYScsICdOZWJyYXNrYScsICdOZXZhZGEnLCAnTmV3IEhhbXBzaGlyZScsICdOZXcgSmVyc2V5JywgJ05ldyBNZXhpY28nLCAnTmV3IFlvcmsnLCAnTm9ydGggRGFrb3RhJywgJ05vcnRoIENhcm9saW5hJywgJ09oaW8nLCAnT2tsYWhvbWEnLCAnT3JlZ29uJywgJ1Blbm5zeWx2YW5pYScsICdSaG9kZSBJc2xhbmQnLCAnU291dGggQ2Fyb2xpbmEnLCAnU291dGggRGFrb3RhJywgJ1Rlbm5lc3NlZScsICdUZXhhcycsICdVdGFoJywgJ1Zlcm1vbnQnLCAnVmlyZ2luaWEnLCAnV2FzaGluZ3RvbicsICdXZXN0IFZpcmdpbmlhJywgJ1dpc2NvbnNpbicsICdXeW9taW5nJ107XHJcbiAgICAvLyBBbnkgZnVuY3Rpb24gcmV0dXJuaW5nIGEgcHJvbWlzZSBvYmplY3QgY2FuIGJlIHVzZWQgdG8gbG9hZCB2YWx1ZXMgYXN5bmNocm9ub3VzbHlcclxuICAgICRzY29wZS5nZXRMb2NhdGlvbiA9IGZ1bmN0aW9uKHZhbCkge1xyXG4gICAgICByZXR1cm4gJGh0dHAuZ2V0KCdodHRwOi8vbWFwcy5nb29nbGVhcGlzLmNvbS9tYXBzL2FwaS9nZW9jb2RlL2pzb24nLCB7XHJcbiAgICAgICAgcGFyYW1zOiB7XHJcbiAgICAgICAgICBhZGRyZXNzOiB2YWwsXHJcbiAgICAgICAgICBzZW5zb3I6IGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgICB9KS50aGVuKGZ1bmN0aW9uKHJlcyl7XHJcbiAgICAgICAgdmFyIGFkZHJlc3NlcyA9IFtdO1xyXG4gICAgICAgIGFuZ3VsYXIuZm9yRWFjaChyZXMuZGF0YS5yZXN1bHRzLCBmdW5jdGlvbihpdGVtKXtcclxuICAgICAgICAgIGFkZHJlc3Nlcy5wdXNoKGl0ZW0uZm9ybWF0dGVkX2FkZHJlc3MpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBhZGRyZXNzZXM7XHJcbiAgICAgIH0pO1xyXG4gICAgfTtcclxuICB9XSlcclxuICA7IFxyXG4gIGFwcC5jb250cm9sbGVyKCdEYXRlcGlja2VyRGVtb0N0cmwnLCBbJyRzY29wZScsIGZ1bmN0aW9uKCRzY29wZSkge1xyXG4gICAgJHNjb3BlLnRvZGF5ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICRzY29wZS5kdCA9IG5ldyBEYXRlKCk7XHJcbiAgICB9O1xyXG4gICAgJHNjb3BlLnRvZGF5KCk7XHJcblxyXG4gICAgJHNjb3BlLmNsZWFyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAkc2NvcGUuZHQgPSBudWxsO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBEaXNhYmxlIHdlZWtlbmQgc2VsZWN0aW9uXHJcbiAgICAkc2NvcGUuZGlzYWJsZWQgPSBmdW5jdGlvbihkYXRlLCBtb2RlKSB7XHJcbiAgICAgIHJldHVybiAoIG1vZGUgPT09ICdkYXknICYmICggZGF0ZS5nZXREYXkoKSA9PT0gMCB8fCBkYXRlLmdldERheSgpID09PSA2ICkgKTtcclxuICAgIH07XHJcblxyXG4gICAgJHNjb3BlLnRvZ2dsZU1pbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAkc2NvcGUubWluRGF0ZSA9ICRzY29wZS5taW5EYXRlID8gbnVsbCA6IG5ldyBEYXRlKCk7XHJcbiAgICB9O1xyXG4gICAgJHNjb3BlLnRvZ2dsZU1pbigpO1xyXG5cclxuICAgICRzY29wZS5vcGVuID0gZnVuY3Rpb24oJGV2ZW50KSB7XHJcbiAgICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgICAkc2NvcGUub3BlbmVkID0gdHJ1ZTtcclxuICAgIH07XHJcblxyXG4gICAgJHNjb3BlLmRhdGVPcHRpb25zID0ge1xyXG4gICAgICBmb3JtYXRZZWFyOiAneXknLFxyXG4gICAgICBzdGFydGluZ0RheTogMSxcclxuICAgICAgY2xhc3M6ICdkYXRlcGlja2VyJ1xyXG4gICAgfTtcclxuXHJcbiAgICAkc2NvcGUuaW5pdERhdGUgPSBuZXcgRGF0ZSgnMjAxNi0xNS0yMCcpO1xyXG4gICAgJHNjb3BlLmZvcm1hdHMgPSBbJ2RkLU1NTU0teXl5eScsICd5eXl5L01NL2RkJywgJ2RkLk1NLnl5eXknLCAnc2hvcnREYXRlJ107XHJcbiAgICAkc2NvcGUuZm9ybWF0ID0gJHNjb3BlLmZvcm1hdHNbMF07XHJcbiAgfV0pXHJcbiAgOyBcclxuICBhcHAuY29udHJvbGxlcignVGltZXBpY2tlckRlbW9DdHJsJywgWyckc2NvcGUnLCBmdW5jdGlvbigkc2NvcGUpIHtcclxuICAgICRzY29wZS5teXRpbWUgPSBuZXcgRGF0ZSgpO1xyXG5cclxuICAgICRzY29wZS5oc3RlcCA9IDE7XHJcbiAgICAkc2NvcGUubXN0ZXAgPSAxNTtcclxuXHJcbiAgICAkc2NvcGUub3B0aW9ucyA9IHtcclxuICAgICAgaHN0ZXA6IFsxLCAyLCAzXSxcclxuICAgICAgbXN0ZXA6IFsxLCA1LCAxMCwgMTUsIDI1LCAzMF1cclxuICAgIH07XHJcblxyXG4gICAgJHNjb3BlLmlzbWVyaWRpYW4gPSB0cnVlO1xyXG4gICAgJHNjb3BlLnRvZ2dsZU1vZGUgPSBmdW5jdGlvbigpIHtcclxuICAgICAgJHNjb3BlLmlzbWVyaWRpYW4gPSAhICRzY29wZS5pc21lcmlkaWFuO1xyXG4gICAgfTtcclxuXHJcbiAgICAkc2NvcGUudXBkYXRlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIHZhciBkID0gbmV3IERhdGUoKTtcclxuICAgICAgZC5zZXRIb3VycyggMTQgKTtcclxuICAgICAgZC5zZXRNaW51dGVzKCAwICk7XHJcbiAgICAgICRzY29wZS5teXRpbWUgPSBkO1xyXG4gICAgfTtcclxuXHJcbiAgICAkc2NvcGUuY2hhbmdlZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgLy9jb25zb2xlLmxvZygnVGltZSBjaGFuZ2VkIHRvOiAnICsgJHNjb3BlLm15dGltZSk7XHJcbiAgICB9O1xyXG5cclxuICAgICRzY29wZS5jbGVhciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAkc2NvcGUubXl0aW1lID0gbnVsbDtcclxuICAgIH07XHJcbiAgfV0pOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8qIENvbnRyb2xsZXJzICovXHJcblxyXG5hcHBcclxuICAvLyBGbG90IENoYXJ0IGNvbnRyb2xsZXIgXHJcbiAgLmNvbnRyb2xsZXIoJ0Zsb3RDaGFydERlbW9DdHJsJywgWyckc2NvcGUnLCBmdW5jdGlvbigkc2NvcGUpIHtcclxuICAgICRzY29wZS5kID0gWyBbMSw2LjVdLFsyLDYuNV0sWzMsN10sWzQsOF0sWzUsNy41XSxbNiw3XSxbNyw2LjhdLFs4LDddLFs5LDcuMl0sWzEwLDddLFsxMSw2LjhdLFsxMiw3XSBdO1xyXG5cclxuICAgICRzY29wZS5kMF8xID0gWyBbMCw3XSxbMSw2LjVdLFsyLDEyLjVdLFszLDddLFs0LDldLFs1LDZdLFs2LDExXSxbNyw2LjVdLFs4LDhdLFs5LDddIF07XHJcblxyXG4gICAgJHNjb3BlLmQwXzIgPSBbIFswLDRdLFsxLDQuNV0sWzIsN10sWzMsNC41XSxbNCwzXSxbNSwzLjVdLFs2LDZdLFs3LDNdLFs4LDRdLFs5LDNdIF07XHJcblxyXG4gICAgJHNjb3BlLmQxXzEgPSBbIFsxMCwgMTIwXSwgWzIwLCA3MF0sIFszMCwgNzBdLCBbNDAsIDYwXSBdO1xyXG5cclxuICAgICRzY29wZS5kMV8yID0gWyBbMTAsIDUwXSwgIFsyMCwgNjBdLCBbMzAsIDkwXSwgIFs0MCwgMzVdIF07XHJcblxyXG4gICAgJHNjb3BlLmQxXzMgPSBbIFsxMCwgODBdLCAgWzIwLCA0MF0sIFszMCwgMzBdLCAgWzQwLCAyMF0gXTtcclxuXHJcbiAgICAkc2NvcGUuZDIgPSBbXTtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDIwOyArK2kpIHtcclxuICAgICAgJHNjb3BlLmQyLnB1c2goW2ksIE1hdGgucm91bmQoIE1hdGguc2luKGkpKjEwMCkvMTAwXSApO1xyXG4gICAgfSAgIFxyXG5cclxuICAgICRzY29wZS5kMyA9IFsgXHJcbiAgICAgIHsgbGFiZWw6IFwiaVBob25lNVNcIiwgZGF0YTogNDAgfSwgXHJcbiAgICAgIHsgbGFiZWw6IFwiaVBhZCBNaW5pXCIsIGRhdGE6IDEwIH0sXHJcbiAgICAgIHsgbGFiZWw6IFwiaVBhZCBNaW5pIFJldGluYVwiLCBkYXRhOiAyMCB9LFxyXG4gICAgICB7IGxhYmVsOiBcImlQaG9uZTRTXCIsIGRhdGE6IDEyIH0sXHJcbiAgICAgIHsgbGFiZWw6IFwiaVBhZCBBaXJcIiwgZGF0YTogMTggfVxyXG4gICAgXTtcclxuXHJcbiAgICAkc2NvcGUucmVmcmVzaERhdGEgPSBmdW5jdGlvbigpe1xyXG4gICAgICAkc2NvcGUuZDBfMSA9ICRzY29wZS5kMF8yO1xyXG4gICAgfTtcclxuXHJcbiAgICAkc2NvcGUuZ2V0UmFuZG9tRGF0YSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICB2YXIgZGF0YSA9IFtdLFxyXG4gICAgICB0b3RhbFBvaW50cyA9IDE1MDtcclxuICAgICAgaWYgKGRhdGEubGVuZ3RoID4gMClcclxuICAgICAgICBkYXRhID0gZGF0YS5zbGljZSgxKTtcclxuICAgICAgd2hpbGUgKGRhdGEubGVuZ3RoIDwgdG90YWxQb2ludHMpIHtcclxuICAgICAgICB2YXIgcHJldiA9IGRhdGEubGVuZ3RoID4gMCA/IGRhdGFbZGF0YS5sZW5ndGggLSAxXSA6IDUwLFxyXG4gICAgICAgICAgeSA9IHByZXYgKyBNYXRoLnJhbmRvbSgpICogMTAgLSA1O1xyXG4gICAgICAgIGlmICh5IDwgMCkge1xyXG4gICAgICAgICAgeSA9IDA7XHJcbiAgICAgICAgfSBlbHNlIGlmICh5ID4gMTAwKSB7XHJcbiAgICAgICAgICB5ID0gMTAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkYXRhLnB1c2goTWF0aC5yb3VuZCh5KjEwMCkvMTAwKTtcclxuICAgICAgfVxyXG4gICAgICAvLyBaaXAgdGhlIGdlbmVyYXRlZCB5IHZhbHVlcyB3aXRoIHRoZSB4IHZhbHVlc1xyXG4gICAgICB2YXIgcmVzID0gW107XHJcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgIHJlcy5wdXNoKFtpLCBkYXRhW2ldXSlcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gcmVzO1xyXG4gICAgfVxyXG5cclxuICAgICRzY29wZS5kNCA9ICRzY29wZS5nZXRSYW5kb21EYXRhKCk7XHJcbiAgfV0pOyIsIid1c2Ugc3RyaWN0JztcblxuLyogQ29udHJvbGxlcnMgKi9cbiAgLy8gc2lnbmluIGNvbnRyb2xsZXJcbmFwcC5jb250cm9sbGVyKCdjdHJsbmFtZScsIFsnJHNjb3BlJywgJyRodHRwJywgJyRzdGF0ZScsIGZ1bmN0aW9uKCRzY29wZSwgJGh0dHAsICRzdGF0ZSkge1xuICAgICRzY29wZS51c2VyID0ge307XG4gICAgJHNjb3BlLmF1dGhFcnJvciA9IG51bGw7XG4gICAgJHNjb3BlLmxvZ2luID0gZnVuY3Rpb24oKSB7XG4gICAgICAkc2NvcGUuYXV0aEVycm9yID0gbnVsbDtcblxuICAgIH07XG4gIH1dKVxuOyIsIid1c2Ugc3RyaWN0JztcblxuLyogQ29udHJvbGxlcnMgKi9cbiAgLy8gc2lnbmluIGNvbnRyb2xsZXJcbmFwcC5jb250cm9sbGVyKCdGYXZvcml0ZXNDdHJsJywgWyckc2NvcGUnLCckcm9vdFNjb3BlJywgJyRmaXJlYmFzZScsICdzaW1wbGVMb2dpbicsICckbG9jYXRpb24nLCBmdW5jdGlvbiAoJHNjb3BlLCAkcm9vdFNjb3BlLCAkZmlyZWJhc2UsIHNpbXBsZUxvZ2luLCAkbG9jYXRpb24pIHtcblxuICAgIHZhciByZWYgPSBuZXcgRmlyZWJhc2UoXCJodHRwczovL3RvcmlkLWZpcmUtNDMzMi5maXJlYmFzZWlvLmNvbVwiKTsgLy8gc2hvd3NcbiAgICB2YXIgc2hvd3NTeW5jID0gJGZpcmViYXNlKHJlZi5jaGlsZChcInNob3dzXCIpKTtcbiAgICAkc2NvcGUuc2hvd3MgPSBzaG93c1N5bmMuJGFzQXJyYXkoKTtcblxuICAgIHNpbXBsZUxvZ2luLmdldFVzZXIoKS50aGVuKGZ1bmN0aW9uICh1c2VyKSB7XG5cbiAgICAgICAgdmFyIEZhdm9yaXRlc1N5bmMgPSAkZmlyZWJhc2UocmVmLmNoaWxkKFwidXNlcnNcIikuY2hpbGQodXNlci51aWQpLmNoaWxkKFwiZmF2b3JpdGVzXCIpKTtcbiAgICAgICAgJHNjb3BlLlVzZXJGYXZvcml0ZXMgPSBGYXZvcml0ZXNTeW5jLiRhc09iamVjdCgpOyAvLyBlLmcuIHNob3cxID0gdHJ1ZVxuXG4gICAgICAgICRzY29wZS5Vc2VyRmF2b3JpdGVzLiRsb2FkZWQoZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICB2YXIgc2hvd3NBcnI7XG4gICAgICAgICAgICBzaG93c0FyciA9ICRzY29wZS5zaG93c1swXTtcblxuICAgICAgICAgICAgJHNjb3BlLmN1cnJlbnRseUZhdm9yaXRlZCA9IFtdOyAgLy8gQXJyYXlcblxuICAgICAgICAgICAgLy8gY3JlYXRlcyAkc2NvcGUuY3VycmVudGx5RmF2b3JpdGVkIG9uIHBhZ2UgbG9hZFxuICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKHNob3dzQXJyLCBmdW5jdGlvbih2YWx1ZSwga2V5KXtcbiAgICAgICAgICAgICAgICBpZiAoJHNjb3BlLlVzZXJGYXZvcml0ZXNbdmFsdWUucHJvcGVydGllcy5pZF0gPT09IHRydWUpe1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuY3VycmVudGx5RmF2b3JpdGVkLnB1c2goc2hvd3NBcnJbdmFsdWUsIGtleV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB2YXIgY2FsY3VsYXRlTGVuZ3RoID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJHJvb3RTY29wZS5GYXZvcml0ZXNMZW5ndGggPSAwO1xuICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKCRzY29wZS5Vc2VyRmF2b3JpdGVzLCBmdW5jdGlvbih2YWx1ZSwga2V5KXtcbiAgICAgICAgICAgICAgICBpZiAoJHNjb3BlLlVzZXJGYXZvcml0ZXNba2V5XSA9PT0gdHJ1ZSl7XG4gICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUuRmF2b3JpdGVzTGVuZ3RoICsrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY2FsY3VsYXRlTGVuZ3RoKCk7XG5cbiAgICAgICAgICAgICRzY29wZS50b2dnbGVTdGFycmVkID0gZnVuY3Rpb24gKGZhdm9yaXRlKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoJHNjb3BlLlVzZXJGYXZvcml0ZXNbZmF2b3JpdGUucHJvcGVydGllcy5pZF0gPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLlVzZXJGYXZvcml0ZXNbZmF2b3JpdGUucHJvcGVydGllcy5pZF0gPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoJHNjb3BlLlVzZXJGYXZvcml0ZXMuJHZhbHVlID09PSB1bmRlZmluZWQgfHwgbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuVXNlckZhdm9yaXRlc1tmYXZvcml0ZS5wcm9wZXJ0aWVzLmlkXSA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuVXNlckZhdm9yaXRlc1tmYXZvcml0ZS5wcm9wZXJ0aWVzLmlkXSA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY2FsY3VsYXRlTGVuZ3RoKCk7XG5cbiAgICAgICAgICAgICAgICAkc2NvcGUuVXNlckZhdm9yaXRlcy4kc2F2ZSgpO1xuICAgICAgICAgICAgfTsgLy8gdG9nZ2xlU3RhcnJlZFxuXG4gICAgICAgIH0pIC8vIGxvYWRlZFxuXG4gICAgfSkgLy91c2VyIHByb21pc2VcblxuICAgIC8vIHNvdW5kY2xvdWQgc3RyZWFtaW5nIHN0dWZmXG5cbiAgICAkc2NvcGUuZmF2b3JpdGUgPSB7fTtcblxuICAgICRzY29wZS5zdHJlYW1UcmFjayA9IGZ1bmN0aW9uIChmYXZvcml0ZSkge1xuXG4gICAgICAgIFNDLnN0cmVhbShmYXZvcml0ZS5wcm9wZXJ0aWVzLnN0cmVhbV91cmwsIGZ1bmN0aW9uIChzb3VuZCkge1xuICAgICAgICAgICAgJHNjb3BlLnNvdW5kID0gc291bmQ7XG4gICAgICAgICAgICBzb3VuZE1hbmFnZXIuc3RvcEFsbCgpO1xuICAgICAgICAgICAgc291bmQucGxheSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBmYXZvcml0ZS52aXNpYmxlID0gZmFsc2U7XG4gICAgfTtcblxuICAgICRzY29wZS5wYXVzZVRyYWNrID0gZnVuY3Rpb24gKGZhdm9yaXRlKSB7XG4gICAgICAgICRzY29wZS5zb3VuZC5wYXVzZSgpO1xuICAgICAgICBmYXZvcml0ZS52aXNpYmxlID0gdHJ1ZTtcbiAgICB9O1xuXG5cblxuXG4gIH1dKVxuO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKiBDb250cm9sbGVycyAqL1xuICAvLyBzaWduaW4gY29udHJvbGxlclxuYXBwLmNvbnRyb2xsZXIoJ0hvbWVDdHJsJywgWyckc2NvcGUnLCAnJGZidXRpbCcsICd1c2VyJywgZnVuY3Rpb24oJHNjb3BlLCAkZmJ1dGlsLCAkdXNlcikge1xuXG4gICAgJHNjb3BlLnN5bmNlZFZhbHVlID0gZmJ1dGlsLnN5bmNPYmplY3QoJ3N5bmNlZFZhbHVlJyk7XG4gICAgJHNjb3BlLnVzZXIgPSB1c2VyO1xuICAgICRzY29wZS5GQlVSTCA9IEZCVVJMO1xufV0pXG47XG5cblxuXG4vKiAgIGZ1bmN0aW9uICgkc2NvcGUsIGZidXRpbCwgdXNlciwgRkJVUkwpIHsgKi8iLCIndXNlIHN0cmljdCc7XG5cblxuYXBwLmNvbnRyb2xsZXIoJ1NpZ25JbkN0cmwnLCBbJyRzY29wZScsICdzaW1wbGVMb2dpbicsICckc3RhdGUnLCckZmlyZWJhc2VTaW1wbGVMb2dpbicsJyRyb290U2NvcGUnLFxuIGZ1bmN0aW9uKCRzY29wZSwgc2ltcGxlTG9naW4sICRzdGF0ZSwgJGZpcmViYXNlU2ltcGxlTG9naW4sJHJvb3RTY29wZSkge1xuXG4gICAgJHNjb3BlLmVtYWlsID0gbnVsbDtcbiAgICAkc2NvcGUucGFzcyA9IG51bGw7XG4gICAgJHNjb3BlLmNvbmZpcm0gPSBudWxsO1xuICAgICRzY29wZS5jcmVhdGVNb2RlID0gZmFsc2U7XG5cblxuICAgIHZhciBmaXJlYmFzZVJlZiA9IG5ldyBGaXJlYmFzZShcImh0dHBzOi8vdG9yaWQtZmlyZS00MzMyLmZpcmViYXNlaW8uY29tXCIpO1xuICAvLyBDcmVhdGUgYSBGaXJlYmFzZSBTaW1wbGUgTG9naW4gb2JqZWN0XG4gICAgJHNjb3BlLmF1dGggPSAkZmlyZWJhc2VTaW1wbGVMb2dpbihmaXJlYmFzZVJlZik7XG4gIC8vIEluaXRpYWxseSBzZXQgbm8gdXNlciB0byBiZSBsb2dnZWQgaW5cbiAgICAkc2NvcGUudXNlciA9IG51bGw7XG4gIC8vIExvZ3MgYSB1c2VyIGluIHdpdGggaW5wdXR0ZWQgcHJvdmlkZXJcblxuICAgICRzY29wZS5sb2dpbkZhY2Vib29rID0gZnVuY3Rpb24ocHJvdmlkZXIpIHtcbiAgICAkc2NvcGUuYXV0aC4kbG9naW4ocHJvdmlkZXIpXG5cbiAgfTtcblxuICAgLy8gVXBvbiBzdWNjZXNzZnVsIGxvZ2luLCBzZXQgdGhlIHVzZXIgb2JqZWN0XG4gICRyb290U2NvcGUuJG9uKFwiJGZpcmViYXNlU2ltcGxlTG9naW46bG9naW5cIiwgZnVuY3Rpb24oZXZlbnQsIHVzZXIpIHtcbiAgICAkc2NvcGUudXNlciA9IHVzZXI7XG5cbiAgICAkc3RhdGUuZ28oJ2RlbnZlci5zaG93cycpO1xuICB9KTtcbiAgLy8gVXBvbiBzdWNjZXNzZnVsIGxvZ291dCwgcmVzZXQgdGhlIHVzZXIgb2JqZWN0XG4gICRyb290U2NvcGUuJG9uKFwiJGZpcmViYXNlU2ltcGxlTG9naW46bG9nb3V0XCIsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgJHNjb3BlLnVzZXIgPSBudWxsO1xuICB9KTtcbiAgLy8gTG9nIGFueSBsb2dpbi1yZWxhdGVkIGVycm9ycyB0byB0aGUgY29uc29sZVxuICAkcm9vdFNjb3BlLiRvbihcIiRmaXJlYmFzZVNpbXBsZUxvZ2luOmVycm9yXCIsIGZ1bmN0aW9uKGV2ZW50LCBlcnJvcikge1xuICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgbG9nZ2luZyB1c2VyIGluOiBcIiwgZXJyb3IpO1xuICB9KTtcblxuXG4gICAgJHNjb3BlLmxvZ2luRW1haWwgPSBmdW5jdGlvbiAoZW1haWwsIHBhc3MpIHtcbiAgICAgICAgJHNjb3BlLmVyciA9IG51bGw7XG4gICAgICAgIHNpbXBsZUxvZ2luLmxvZ2luKGVtYWlsLCBwYXNzKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCAvKiB1c2VyICovICkge1xuICAgICAgICAgICAgJHN0YXRlLmdvKCdkZW52ZXIuc2hvd3MnKTtcbiAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgJHNjb3BlLmVyciA9IGVyck1lc3NhZ2UoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuXG5cbiAgICAkc2NvcGUuY3JlYXRlQWNjb3VudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJHNjb3BlLmVyciA9IG51bGw7XG4gICAgICAgIGlmIChhc3NlcnRWYWxpZEFjY291bnRQcm9wcygpKSB7XG4gICAgICAgICAgICBzaW1wbGVMb2dpbi5jcmVhdGVBY2NvdW50KCRzY29wZS5lbWFpbCwgJHNjb3BlLnBhc3MpXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCAvKiB1c2VyICovICkge1xuICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnZGVudmVyLnNpZ25pbicpO1xuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICRzY29wZS5lcnIgPSBlcnJNZXNzYWdlKGVycik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBhc3NlcnRWYWxpZEFjY291bnRQcm9wcygpIHtcbiAgICAgICAgaWYgKCEkc2NvcGUuZW1haWwpIHtcbiAgICAgICAgICAgICRzY29wZS5lcnIgPSAnUGxlYXNlIGVudGVyIGFuIGVtYWlsIGFkZHJlc3MnO1xuICAgICAgICB9IGVsc2UgaWYgKCEkc2NvcGUucGFzcyB8fCAhJHNjb3BlLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICRzY29wZS5lcnIgPSAnUGxlYXNlIGVudGVyIGEgcGFzc3dvcmQnO1xuICAgICAgICB9IGVsc2UgaWYgKCRzY29wZS5jcmVhdGVNb2RlICYmICRzY29wZS5wYXNzICE9PSAkc2NvcGUuY29uZmlybSkge1xuICAgICAgICAgICAgJHNjb3BlLmVyciA9ICdQYXNzd29yZHMgZG8gbm90IG1hdGNoJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gISRzY29wZS5lcnI7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZXJyTWVzc2FnZShlcnIpIHtcbiAgICAgICAgcmV0dXJuIGFuZ3VsYXIuaXNPYmplY3QoZXJyKSAmJiBlcnIuY29kZSA/IGVyci5jb2RlIDogZXJyICsgJyc7XG4gICAgfVxuXG5cbiAgICAkc2NvcGUuc2VuZFBhc3N3b3JkUmVzZXRFbWFpbCA9IGZ1bmN0aW9uKGVtYWlsKXsgICAvLyBuZWVkIHRvIGluamVjdCB0aGUgcmlnaHQgc2VydmljZSB0byBtYWtlIHRoaXMgd29ya1xuICAgICAgICB2YXIgZGF0YVJlZiA9IG5ldyBGaXJlYmFzZShcImh0dHBzOi8vdG9yaWQtZmlyZS00MzMyLmZpcmViYXNlaW8uY29tXCIpO1xuICAgICAgICAkc2NvcGUubG9naW5PYmogPSAkZmlyZWJhc2VTaW1wbGVMb2dpbihkYXRhUmVmKTtcblxuICAgICAgICAkc2NvcGUubG9naW5PYmouJHNlbmRQYXNzd29yZFJlc2V0RW1haWwoZW1haWwpLnRoZW4oZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIC8vIHNob3cgZmxhc2ggbm90aWZpY2F0aW9uIHRoYXQgZW1haWwgd2FzIHNlbnRcbiAgICAgICAgICAgICRzY29wZS5yZXNldEZvcm0gPSBmYWxzZTtcbiAgICAgICAgICAgICRzY29wZS5yZXNldEVtYWlsID0gJyc7XG4gICAgICAgICAgICAvLyRzY29wZS5ub3RpZmljYXRpb25zLnB1c2goJ1RlbXBvcmFyeSBwYXNzd29yZCBzZW50ISBUcnkgbG9nZ2luZyBpbicpXG5cbiAgICAgICAgICAgICRzdGF0ZS5nbygnZGVudmVyLnNob3dzJyk7XG4gICAgICAgIH0sIGZ1bmN0aW9uKGVycil7XG5cbiAgICAgICAgICAgIGlmIChlcnIuY29kZSA9PT0gJ0lOVkFMSURfRU1BSUwnKXtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZXJyb3JzLnB1c2goJ1RoZXJlIGlzIG5vIGFjY291bnQgYXNzb2NpYXRlZCB3aXRoIHRoYXQgZW1haWwnKVxuICAgICAgICAgICAgICAgICRzY29wZS5yZXNldEZvcm0gPSBmYWxzZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmVycm9ycy5wdXNoKCdTb21ldGhpbmcgd2VudCB3cm9uZy4uJylcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cblxufV0pXG47XG4iLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcbiAgLmRpcmVjdGl2ZSgnYXBwVmVyc2lvbicsIFsndmVyc2lvbicsIGZ1bmN0aW9uKHZlcnNpb24pIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oc2NvcGUsIGVsbSkge1xuICAgICAgZWxtLnRleHQodmVyc2lvbik7XG4gICAgfTtcbiAgfV0pO1xuXG5cbiAgIiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpXG4uZGlyZWN0aXZlKCduZ0hpZGVBdXRoJywgWydzaW1wbGVMb2dpbicsICckdGltZW91dCcsIGZ1bmN0aW9uIChzaW1wbGVMb2dpbiwgJHRpbWVvdXQpIHtcbiAgICB2YXIgaXNMb2dnZWRJbjtcbiAgICBzaW1wbGVMb2dpbi53YXRjaChmdW5jdGlvbih1c2VyKSB7XG4gICAgICBpc0xvZ2dlZEluID0gISF1c2VyO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnQScsXG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWwpIHtcbiAgICAgICAgZnVuY3Rpb24gdXBkYXRlKCkge1xuICAgICAgICAgIGVsLmFkZENsYXNzKCduZy1jbG9haycpOyAvLyBoaWRlIHVudGlsIHdlIHByb2Nlc3MgaXRcblxuICAgICAgICAgIC8vIHNvbWV0aW1lcyBpZiBuZ0Nsb2FrIGV4aXN0cyBvbiBzYW1lIGVsZW1lbnQsIHRoZXkgYXJndWUsIHNvIG1ha2Ugc3VyZSB0aGF0XG4gICAgICAgICAgLy8gdGhpcyBvbmUgYWx3YXlzIHJ1bnMgbGFzdCBmb3IgcmVsaWFiaWxpdHlcbiAgICAgICAgICAkdGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBlbC50b2dnbGVDbGFzcygnbmctY2xvYWsnLCBpc0xvZ2dlZEluICE9PSBmYWxzZSk7XG4gICAgICAgICAgfSwgMCk7XG4gICAgICAgIH1cblxuICAgICAgICB1cGRhdGUoKTtcbiAgICAgICAgc2ltcGxlTG9naW4ud2F0Y2godXBkYXRlLCBzY29wZSk7XG4gICAgICB9XG4gICAgfTtcbiAgfV0pOyIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuICAuZGlyZWN0aXZlKCduZ1Nob3dBdXRoJywgWydzaW1wbGVMb2dpbicsICckdGltZW91dCcsIGZ1bmN0aW9uIChzaW1wbGVMb2dpbiwgJHRpbWVvdXQpIHtcbiAgICB2YXIgaXNMb2dnZWRJbjtcbiAgICBzaW1wbGVMb2dpbi53YXRjaChmdW5jdGlvbih1c2VyKSB7XG4gICAgICBpc0xvZ2dlZEluID0gISF1c2VyO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnQScsXG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWwpIHtcbiAgICAgICAgZWwuYWRkQ2xhc3MoJ25nLWNsb2FrJyk7IC8vIGhpZGUgdW50aWwgd2UgcHJvY2VzcyBpdFxuXG4gICAgICAgIGZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgICAgICAgICAvLyBzb21ldGltZXMgaWYgbmdDbG9hayBleGlzdHMgb24gc2FtZSBlbGVtZW50LCB0aGV5IGFyZ3VlLCBzbyBtYWtlIHN1cmUgdGhhdFxuICAgICAgICAgIC8vIHRoaXMgb25lIGFsd2F5cyBydW5zIGxhc3QgZm9yIHJlbGlhYmlsaXR5XG4gICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZWwudG9nZ2xlQ2xhc3MoJ25nLWNsb2FrJywgIWlzTG9nZ2VkSW4pO1xuICAgICAgICAgIH0sIDApO1xuICAgICAgICB9XG5cbiAgICAgICAgdXBkYXRlKCk7XG4gICAgICAgIHNpbXBsZUxvZ2luLndhdGNoKHVwZGF0ZSwgc2NvcGUpO1xuICAgICAgfVxuICAgIH07XG4gIH1dKTsiLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcclxuICAuZGlyZWN0aXZlKCdzZXROZ0FuaW1hdGUnLCBbJyRhbmltYXRlJywgZnVuY3Rpb24gKCRhbmltYXRlKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGxpbms6IGZ1bmN0aW9uICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMpIHtcclxuICAgICAgICAgICAgJHNjb3BlLiR3YXRjaCggZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJHNjb3BlLiRldmFsKCRhdHRycy5zZXROZ0FuaW1hdGUsICRzY29wZSk7XHJcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uKHZhbG5ldywgdmFsb2xkKXtcclxuICAgICAgICAgICAgICAgICRhbmltYXRlLmVuYWJsZWQoISF2YWxuZXcsICRlbGVtZW50KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICB9XSk7IiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpXHJcbiAgLmRpcmVjdGl2ZSgndWlCdXR0ZXJiYXInLCBbJyRyb290U2NvcGUnLCAnJGFuY2hvclNjcm9sbCcsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRhbmNob3JTY3JvbGwpIHtcclxuICAgICByZXR1cm4ge1xyXG4gICAgICByZXN0cmljdDogJ0FDJyxcclxuICAgICAgdGVtcGxhdGU6JzxzcGFuIGNsYXNzPVwiYmFyXCI+PC9zcGFuPicsXHJcbiAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbCwgYXR0cnMpIHsgICAgICAgIFxyXG4gICAgICAgIGVsLmFkZENsYXNzKCdidXR0ZXJiYXIgaGlkZScpO1xyXG4gICAgICAgIHNjb3BlLiRvbignJHN0YXRlQ2hhbmdlU3RhcnQnLCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgICAgJGFuY2hvclNjcm9sbCgpO1xyXG4gICAgICAgICAgZWwucmVtb3ZlQ2xhc3MoJ2hpZGUnKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgc2NvcGUuJG9uKCckc3RhdGVDaGFuZ2VTdWNjZXNzJywgZnVuY3Rpb24oIGV2ZW50LCB0b1N0YXRlLCB0b1BhcmFtcywgZnJvbVN0YXRlICkge1xyXG4gICAgICAgICAgZXZlbnQudGFyZ2V0U2NvcGUuJHdhdGNoKCckdmlld0NvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBlbC5hZGRDbGFzcygnaGlkZScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgICB9O1xyXG4gIH1dKTsiLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcclxuICAuZGlyZWN0aXZlKCd1aUZvY3VzJywgZnVuY3Rpb24oJHRpbWVvdXQsICRwYXJzZSkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHIpIHtcclxuICAgICAgICB2YXIgbW9kZWwgPSAkcGFyc2UoYXR0ci51aUZvY3VzKTtcclxuICAgICAgICBzY29wZS4kd2F0Y2gobW9kZWwsIGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgICBpZih2YWx1ZSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICBlbGVtZW50WzBdLmZvY3VzKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGVsZW1lbnQuYmluZCgnYmx1cicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgIHNjb3BlLiRhcHBseShtb2RlbC5hc3NpZ24oc2NvcGUsIGZhbHNlKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgfSk7IiwiIGFuZ3VsYXIubW9kdWxlKCdhcHAnKVxyXG4gIC5kaXJlY3RpdmUoJ3VpRnVsbHNjcmVlbicsIFsndWlMb2FkJywgJyRkb2N1bWVudCcsICckd2luZG93JywgZnVuY3Rpb24odWlMb2FkLCAkZG9jdW1lbnQsICR3aW5kb3cpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHJlc3RyaWN0OiAnQUMnLFxyXG4gICAgICB0ZW1wbGF0ZTonPGkgY2xhc3M9XCJmYSBmYS1leHBhbmQgZmEtZncgdGV4dFwiPjwvaT48aSBjbGFzcz1cImZhIGZhLWNvbXByZXNzIGZhLWZ3IHRleHQtYWN0aXZlXCI+PC9pPicsXHJcbiAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbCwgYXR0cikge1xyXG4gICAgICAgIGVsLmFkZENsYXNzKCdoaWRlJyk7XHJcbiAgICAgICAgdWlMb2FkLmxvYWQoJ3ZlbmRvci9saWJzL3NjcmVlbmZ1bGwubWluLmpzJykudGhlbihmdW5jdGlvbigpe1xyXG4gICAgICAgICAgLy8gZGlzYWJsZSBvbiBpZTExXHJcbiAgICAgICAgICBpZiAoc2NyZWVuZnVsbC5lbmFibGVkICYmICFuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9UcmlkZW50LipydjoxMVxcLi8pKSB7XHJcbiAgICAgICAgICAgIGVsLnJlbW92ZUNsYXNzKCdoaWRlJyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBlbC5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB2YXIgdGFyZ2V0O1xyXG4gICAgICAgICAgICBhdHRyLnRhcmdldCAmJiAoIHRhcmdldCA9ICQoYXR0ci50YXJnZXQpWzBdICk7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHNjcmVlbmZ1bGwudG9nZ2xlKHRhcmdldCk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgICRkb2N1bWVudC5vbihzY3JlZW5mdWxsLnJhdy5mdWxsc2NyZWVuY2hhbmdlLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmKHNjcmVlbmZ1bGwuaXNGdWxsc2NyZWVuKXtcclxuICAgICAgICAgICAgICBlbC5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgIGVsLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgfV0pOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8qKlxyXG4gKiAwLjEuMVxyXG4gKiBHZW5lcmFsLXB1cnBvc2UgalF1ZXJ5IHdyYXBwZXIuIFNpbXBseSBwYXNzIHRoZSBwbHVnaW4gbmFtZSBhcyB0aGUgZXhwcmVzc2lvbi5cclxuICpcclxuICogSXQgaXMgcG9zc2libGUgdG8gc3BlY2lmeSBhIGRlZmF1bHQgc2V0IG9mIHBhcmFtZXRlcnMgZm9yIGVhY2ggalF1ZXJ5IHBsdWdpbi5cclxuICogVW5kZXIgdGhlIGpxIGtleSwgbmFtZXNwYWNlIGVhY2ggcGx1Z2luIGJ5IHRoYXQgd2hpY2ggd2lsbCBiZSBwYXNzZWQgdG8gdWktanEuXHJcbiAqIFVuZm9ydHVuYXRlbHksIGF0IHRoaXMgdGltZSB5b3UgY2FuIG9ubHkgcHJlLWRlZmluZSB0aGUgZmlyc3QgcGFyYW1ldGVyLlxyXG4gKiBAZXhhbXBsZSB7IGpxIDogeyBkYXRlcGlja2VyIDogeyBzaG93T246J2NsaWNrJyB9IH0gfVxyXG4gKlxyXG4gKiBAcGFyYW0gdWktanEge3N0cmluZ30gVGhlICRlbG0uW3BsdWdpbk5hbWVdKCkgdG8gY2FsbC5cclxuICogQHBhcmFtIFt1aS1vcHRpb25zXSB7bWl4ZWR9IEV4cHJlc3Npb24gdG8gYmUgZXZhbHVhdGVkIGFuZCBwYXNzZWQgYXMgb3B0aW9ucyB0byB0aGUgZnVuY3Rpb25cclxuICogICAgIE11bHRpcGxlIHBhcmFtZXRlcnMgY2FuIGJlIHNlcGFyYXRlZCBieSBjb21tYXNcclxuICogQHBhcmFtIFt1aS1yZWZyZXNoXSB7ZXhwcmVzc2lvbn0gV2F0Y2ggZXhwcmVzc2lvbiBhbmQgcmVmaXJlIHBsdWdpbiBvbiBjaGFuZ2VzXHJcbiAqXHJcbiAqIEBleGFtcGxlIDxpbnB1dCB1aS1qcT1cImRhdGVwaWNrZXJcIiB1aS1vcHRpb25zPVwie3Nob3dPbjonY2xpY2snfSxzZWNvbmRQYXJhbWV0ZXIsdGhpcmRQYXJhbWV0ZXJcIiB1aS1yZWZyZXNoPVwiaUNoYW5nZVwiPlxyXG4gKi9cclxuYW5ndWxhci5tb2R1bGUoJ3VpLmpxJywgWyd1aS5sb2FkJ10pLlxyXG4gIHZhbHVlKCd1aUpxQ29uZmlnJywge30pLlxyXG4gIGRpcmVjdGl2ZSgndWlKcScsIFsndWlKcUNvbmZpZycsICdKUV9DT05GSUcnLCAndWlMb2FkJywgJyR0aW1lb3V0JywgZnVuY3Rpb24gdWlKcUluamVjdGluZ0Z1bmN0aW9uKHVpSnFDb25maWcsIEpRX0NPTkZJRywgdWlMb2FkLCAkdGltZW91dCkge1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgcmVzdHJpY3Q6ICdBJyxcclxuICAgIGNvbXBpbGU6IGZ1bmN0aW9uIHVpSnFDb21waWxpbmdGdW5jdGlvbih0RWxtLCB0QXR0cnMpIHtcclxuXHJcbiAgICAgIGlmICghYW5ndWxhci5pc0Z1bmN0aW9uKHRFbG1bdEF0dHJzLnVpSnFdKSAmJiAhSlFfQ09ORklHW3RBdHRycy51aUpxXSkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcigndWktanE6IFRoZSBcIicgKyB0QXR0cnMudWlKcSArICdcIiBmdW5jdGlvbiBkb2VzIG5vdCBleGlzdCcpO1xyXG4gICAgICB9XHJcbiAgICAgIHZhciBvcHRpb25zID0gdWlKcUNvbmZpZyAmJiB1aUpxQ29uZmlnW3RBdHRycy51aUpxXTtcclxuXHJcbiAgICAgIHJldHVybiBmdW5jdGlvbiB1aUpxTGlua2luZ0Z1bmN0aW9uKHNjb3BlLCBlbG0sIGF0dHJzKSB7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGdldE9wdGlvbnMoKXtcclxuICAgICAgICAgIHZhciBsaW5rT3B0aW9ucyA9IFtdO1xyXG5cclxuICAgICAgICAgIC8vIElmIHVpLW9wdGlvbnMgYXJlIHBhc3NlZCwgbWVyZ2UgKG9yIG92ZXJyaWRlKSB0aGVtIG9udG8gZ2xvYmFsIGRlZmF1bHRzIGFuZCBwYXNzIHRvIHRoZSBqUXVlcnkgbWV0aG9kXHJcbiAgICAgICAgICBpZiAoYXR0cnMudWlPcHRpb25zKSB7XHJcbiAgICAgICAgICAgIGxpbmtPcHRpb25zID0gc2NvcGUuJGV2YWwoJ1snICsgYXR0cnMudWlPcHRpb25zICsgJ10nKTtcclxuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNPYmplY3Qob3B0aW9ucykgJiYgYW5ndWxhci5pc09iamVjdChsaW5rT3B0aW9uc1swXSkpIHtcclxuICAgICAgICAgICAgICBsaW5rT3B0aW9uc1swXSA9IGFuZ3VsYXIuZXh0ZW5kKHt9LCBvcHRpb25zLCBsaW5rT3B0aW9uc1swXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gZWxzZSBpZiAob3B0aW9ucykge1xyXG4gICAgICAgICAgICBsaW5rT3B0aW9ucyA9IFtvcHRpb25zXTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiBsaW5rT3B0aW9ucztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIElmIGNoYW5nZSBjb21wYXRpYmlsaXR5IGlzIGVuYWJsZWQsIHRoZSBmb3JtIGlucHV0J3MgXCJjaGFuZ2VcIiBldmVudCB3aWxsIHRyaWdnZXIgYW4gXCJpbnB1dFwiIGV2ZW50XHJcbiAgICAgICAgaWYgKGF0dHJzLm5nTW9kZWwgJiYgZWxtLmlzKCdzZWxlY3QsaW5wdXQsdGV4dGFyZWEnKSkge1xyXG4gICAgICAgICAgZWxtLmJpbmQoJ2NoYW5nZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBlbG0udHJpZ2dlcignaW5wdXQnKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQ2FsbCBqUXVlcnkgbWV0aG9kIGFuZCBwYXNzIHJlbGV2YW50IG9wdGlvbnNcclxuICAgICAgICBmdW5jdGlvbiBjYWxsUGx1Z2luKCkge1xyXG4gICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGVsbVthdHRycy51aUpxXS5hcHBseShlbG0sIGdldE9wdGlvbnMoKSk7XHJcbiAgICAgICAgICB9LCAwLCBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiByZWZyZXNoKCl7XHJcbiAgICAgICAgICAvLyBJZiB1aS1yZWZyZXNoIGlzIHVzZWQsIHJlLWZpcmUgdGhlIHRoZSBtZXRob2QgdXBvbiBldmVyeSBjaGFuZ2VcclxuICAgICAgICAgIGlmIChhdHRycy51aVJlZnJlc2gpIHtcclxuICAgICAgICAgICAgc2NvcGUuJHdhdGNoKGF0dHJzLnVpUmVmcmVzaCwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgY2FsbFBsdWdpbigpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICggSlFfQ09ORklHW2F0dHJzLnVpSnFdICkge1xyXG4gICAgICAgICAgdWlMb2FkLmxvYWQoSlFfQ09ORklHW2F0dHJzLnVpSnFdKS50aGVuKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjYWxsUGx1Z2luKCk7XHJcbiAgICAgICAgICAgIHJlZnJlc2goKTtcclxuICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjYWxsUGx1Z2luKCk7XHJcbiAgICAgICAgICByZWZyZXNoKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gIH07XHJcbn1dKTsiLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcclxuICAuZGlyZWN0aXZlKCd1aU1vZHVsZScsIFsnTU9EVUxFX0NPTkZJRycsJ3VpTG9hZCcsICckY29tcGlsZScsIGZ1bmN0aW9uKE1PRFVMRV9DT05GSUcsIHVpTG9hZCwgJGNvbXBpbGUpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHJlc3RyaWN0OiAnQScsXHJcbiAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uIChlbCwgYXR0cnMpIHtcclxuICAgICAgICB2YXIgY29udGVudHMgPSBlbC5jb250ZW50cygpLmNsb25lKCk7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHNjb3BlLCBlbCwgYXR0cnMpe1xyXG4gICAgICAgICAgZWwuY29udGVudHMoKS5yZW1vdmUoKTtcclxuICAgICAgICAgIHVpTG9hZC5sb2FkKE1PRFVMRV9DT05GSUdbYXR0cnMudWlNb2R1bGVdKVxyXG4gICAgICAgICAgLnRoZW4oZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgJGNvbXBpbGUoY29udGVudHMpKHNjb3BlLCBmdW5jdGlvbihjbG9uZWRFbGVtZW50LCBzY29wZSkge1xyXG4gICAgICAgICAgICAgIGVsLmFwcGVuZChjbG9uZWRFbGVtZW50KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgfV0pOyIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKVxyXG4gIC5kaXJlY3RpdmUoJ3VpTmF2JywgWyckdGltZW91dCcsIGZ1bmN0aW9uKCR0aW1lb3V0KSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICByZXN0cmljdDogJ0FDJyxcclxuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsLCBhdHRyKSB7XHJcbiAgICAgICAgdmFyIF93aW5kb3cgPSAkKHdpbmRvdyksIFxyXG4gICAgICAgIF9tYiA9IDc2OCwgXHJcbiAgICAgICAgd3JhcCA9ICQoJy5hcHAtYXNpZGUnKSwgXHJcbiAgICAgICAgbmV4dCwgXHJcbiAgICAgICAgYmFja2Ryb3AgPSAnLmRyb3Bkb3duLWJhY2tkcm9wJztcclxuICAgICAgICAvLyB1bmZvbGRlZFxyXG4gICAgICAgIGVsLm9uKCdjbGljaycsICdhJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgbmV4dCAmJiBuZXh0LnRyaWdnZXIoJ21vdXNlbGVhdmUubmF2Jyk7XHJcbiAgICAgICAgICB2YXIgX3RoaXMgPSAkKHRoaXMpO1xyXG4gICAgICAgICAgX3RoaXMucGFyZW50KCkuc2libGluZ3MoIFwiLmFjdGl2ZVwiICkudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgX3RoaXMubmV4dCgpLmlzKCd1bCcpICYmICBfdGhpcy5wYXJlbnQoKS50b2dnbGVDbGFzcygnYWN0aXZlJykgJiYgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgIC8vIG1vYmlsZVxyXG4gICAgICAgICAgX3RoaXMubmV4dCgpLmlzKCd1bCcpIHx8ICggKCBfd2luZG93LndpZHRoKCkgPCBfbWIgKSAmJiAkKCcuYXBwLWFzaWRlJykucmVtb3ZlQ2xhc3MoJ3Nob3cgb2ZmLXNjcmVlbicpICk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIGZvbGRlZCAmIGZpeGVkXHJcbiAgICAgICAgZWwub24oJ21vdXNlZW50ZXInLCAnYScsIGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgbmV4dCAmJiBuZXh0LnRyaWdnZXIoJ21vdXNlbGVhdmUubmF2Jyk7XHJcbiAgICAgICAgICAkKCc+IC5uYXYnLCB3cmFwKS5yZW1vdmUoKTtcclxuICAgICAgICAgIGlmICggISQoJy5hcHAtYXNpZGUtZml4ZWQuYXBwLWFzaWRlLWZvbGRlZCcpLmxlbmd0aCB8fCAoIF93aW5kb3cud2lkdGgoKSA8IF9tYiApIHx8ICQoJy5hcHAtYXNpZGUtZG9jaycpLmxlbmd0aCkgcmV0dXJuO1xyXG4gICAgICAgICAgdmFyIF90aGlzID0gJChlLnRhcmdldClcclxuICAgICAgICAgICwgdG9wXHJcbiAgICAgICAgICAsIHdfaCA9ICQod2luZG93KS5oZWlnaHQoKVxyXG4gICAgICAgICAgLCBvZmZzZXQgPSA1MFxyXG4gICAgICAgICAgLCBtaW4gPSAxNTA7XHJcblxyXG4gICAgICAgICAgIV90aGlzLmlzKCdhJykgJiYgKF90aGlzID0gX3RoaXMuY2xvc2VzdCgnYScpKTtcclxuICAgICAgICAgIGlmKCBfdGhpcy5uZXh0KCkuaXMoJ3VsJykgKXtcclxuICAgICAgICAgICAgIG5leHQgPSBfdGhpcy5uZXh0KCk7XHJcbiAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICBcclxuICAgICAgICAgIF90aGlzLnBhcmVudCgpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgIHRvcCA9IF90aGlzLnBhcmVudCgpLnBvc2l0aW9uKCkudG9wICsgb2Zmc2V0O1xyXG4gICAgICAgICAgbmV4dC5jc3MoJ3RvcCcsIHRvcCk7XHJcbiAgICAgICAgICBpZiggdG9wICsgbmV4dC5oZWlnaHQoKSA+IHdfaCApe1xyXG4gICAgICAgICAgICBuZXh0LmNzcygnYm90dG9tJywgMCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZih0b3AgKyBtaW4gPiB3X2gpe1xyXG4gICAgICAgICAgICBuZXh0LmNzcygnYm90dG9tJywgd19oIC0gdG9wIC0gb2Zmc2V0KS5jc3MoJ3RvcCcsICdhdXRvJyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBuZXh0LmFwcGVuZFRvKHdyYXApO1xyXG5cclxuICAgICAgICAgIG5leHQub24oJ21vdXNlbGVhdmUubmF2JywgZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICQoYmFja2Ryb3ApLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICBuZXh0LmFwcGVuZFRvKF90aGlzLnBhcmVudCgpKTtcclxuICAgICAgICAgICAgbmV4dC5vZmYoJ21vdXNlbGVhdmUubmF2JykuY3NzKCd0b3AnLCAnYXV0bycpLmNzcygnYm90dG9tJywgJ2F1dG8nKTtcclxuICAgICAgICAgICAgX3RoaXMucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgJCgnLnNtYXJ0JykubGVuZ3RoICYmICQoJzxkaXYgY2xhc3M9XCJkcm9wZG93bi1iYWNrZHJvcFwiLz4nKS5pbnNlcnRBZnRlcignLmFwcC1hc2lkZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKG5leHQpe1xyXG4gICAgICAgICAgICBuZXh0ICYmIG5leHQudHJpZ2dlcignbW91c2VsZWF2ZS5uYXYnKTtcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgd3JhcC5vbignbW91c2VsZWF2ZScsIGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgbmV4dCAmJiBuZXh0LnRyaWdnZXIoJ21vdXNlbGVhdmUubmF2Jyk7XHJcbiAgICAgICAgICAkKCc+IC5uYXYnLCB3cmFwKS5yZW1vdmUoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9XSk7IiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpXHJcbiAgLmRpcmVjdGl2ZSgndWlTY3JvbGwnLCBbJyRsb2NhdGlvbicsICckYW5jaG9yU2Nyb2xsJywgZnVuY3Rpb24oJGxvY2F0aW9uLCAkYW5jaG9yU2Nyb2xsKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICByZXN0cmljdDogJ0FDJyxcclxuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsLCBhdHRyKSB7XHJcbiAgICAgICAgZWwub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgJGxvY2F0aW9uLmhhc2goYXR0ci51aVNjcm9sbCk7XHJcbiAgICAgICAgICAkYW5jaG9yU2Nyb2xsKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgfV0pOyIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKVxyXG4gIC5kaXJlY3RpdmUoJ3VpU2hpZnQnLCBbJyR0aW1lb3V0JywgZnVuY3Rpb24oJHRpbWVvdXQpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHJlc3RyaWN0OiAnQScsXHJcbiAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbCwgYXR0cikge1xyXG4gICAgICAgIC8vIGdldCB0aGUgJHByZXYgb3IgJHBhcmVudCBvZiB0aGlzIGVsXHJcbiAgICAgICAgdmFyIF9lbCA9ICQoZWwpLFxyXG4gICAgICAgICAgICBfd2luZG93ID0gJCh3aW5kb3cpLFxyXG4gICAgICAgICAgICBwcmV2ID0gX2VsLnByZXYoKSxcclxuICAgICAgICAgICAgcGFyZW50LFxyXG4gICAgICAgICAgICB3aWR0aCA9IF93aW5kb3cud2lkdGgoKVxyXG4gICAgICAgICAgICA7XHJcblxyXG4gICAgICAgICFwcmV2Lmxlbmd0aCAmJiAocGFyZW50ID0gX2VsLnBhcmVudCgpKTtcclxuICAgICAgICBcclxuICAgICAgICBmdW5jdGlvbiBzbSgpe1xyXG4gICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgbWV0aG9kID0gYXR0ci51aVNoaWZ0O1xyXG4gICAgICAgICAgICB2YXIgdGFyZ2V0ID0gYXR0ci50YXJnZXQ7XHJcbiAgICAgICAgICAgIF9lbC5oYXNDbGFzcygnaW4nKSB8fCBfZWxbbWV0aG9kXSh0YXJnZXQpLmFkZENsYXNzKCdpbicpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGZ1bmN0aW9uIG1kKCl7XHJcbiAgICAgICAgICBwYXJlbnQgJiYgcGFyZW50WydwcmVwZW5kJ10oZWwpO1xyXG4gICAgICAgICAgIXBhcmVudCAmJiBfZWxbJ2luc2VydEFmdGVyJ10ocHJldik7XHJcbiAgICAgICAgICBfZWwucmVtb3ZlQ2xhc3MoJ2luJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAod2lkdGggPCA3NjggJiYgc20oKSkgfHwgbWQoKTtcclxuXHJcbiAgICAgICAgX3dpbmRvdy5yZXNpemUoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICBpZih3aWR0aCAhPT0gX3dpbmRvdy53aWR0aCgpKXtcclxuICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAoX3dpbmRvdy53aWR0aCgpIDwgNzY4ICYmIHNtKCkpIHx8IG1kKCk7XHJcbiAgICAgICAgICAgICAgd2lkdGggPSBfd2luZG93LndpZHRoKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gIH1dKTsiLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcclxuICAuZGlyZWN0aXZlKCd1aVRvZ2dsZUNsYXNzJywgWyckdGltZW91dCcsICckZG9jdW1lbnQnLCBmdW5jdGlvbigkdGltZW91dCwgJGRvY3VtZW50KSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICByZXN0cmljdDogJ0FDJyxcclxuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsLCBhdHRyKSB7XHJcbiAgICAgICAgZWwub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgdmFyIGNsYXNzZXMgPSBhdHRyLnVpVG9nZ2xlQ2xhc3Muc3BsaXQoJywnKSxcclxuICAgICAgICAgICAgICB0YXJnZXRzID0gKGF0dHIudGFyZ2V0ICYmIGF0dHIudGFyZ2V0LnNwbGl0KCcsJykpIHx8IEFycmF5KGVsKSxcclxuICAgICAgICAgICAgICBrZXkgPSAwO1xyXG4gICAgICAgICAgYW5ndWxhci5mb3JFYWNoKGNsYXNzZXMsIGZ1bmN0aW9uKCBfY2xhc3MgKSB7XHJcbiAgICAgICAgICAgIHZhciB0YXJnZXQgPSB0YXJnZXRzWyh0YXJnZXRzLmxlbmd0aCAmJiBrZXkpXTsgICAgICAgICAgICBcclxuICAgICAgICAgICAgKCBfY2xhc3MuaW5kZXhPZiggJyonICkgIT09IC0xICkgJiYgbWFnaWMoX2NsYXNzLCB0YXJnZXQpO1xyXG4gICAgICAgICAgICAkKCB0YXJnZXQgKS50b2dnbGVDbGFzcyhfY2xhc3MpO1xyXG4gICAgICAgICAgICBrZXkgKys7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgICQoZWwpLnRvZ2dsZUNsYXNzKCdhY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICBmdW5jdGlvbiBtYWdpYyhfY2xhc3MsIHRhcmdldCl7XHJcbiAgICAgICAgICAgIHZhciBwYXR0ID0gbmV3IFJlZ0V4cCggJ1xcXFxzJyArIFxyXG4gICAgICAgICAgICAgICAgX2NsYXNzLlxyXG4gICAgICAgICAgICAgICAgICByZXBsYWNlKCAvXFwqL2csICdbQS1aYS16MC05LV9dKycgKS5cclxuICAgICAgICAgICAgICAgICAgc3BsaXQoICcgJyApLlxyXG4gICAgICAgICAgICAgICAgICBqb2luKCAnXFxcXHN8XFxcXHMnICkgKyBcclxuICAgICAgICAgICAgICAgICdcXFxccycsICdnJyApO1xyXG4gICAgICAgICAgICB2YXIgY24gPSAnICcgKyAkKHRhcmdldClbMF0uY2xhc3NOYW1lICsgJyAnO1xyXG4gICAgICAgICAgICB3aGlsZSAoIHBhdHQudGVzdCggY24gKSApIHtcclxuICAgICAgICAgICAgICBjbiA9IGNuLnJlcGxhY2UoIHBhdHQsICcgJyApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICQodGFyZ2V0KVswXS5jbGFzc05hbWUgPSAkLnRyaW0oIGNuICk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgfV0pOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8qIEZpbHRlcnMgKi9cclxuLy8gbmVlZCBsb2FkIHRoZSBtb21lbnQuanMgdG8gdXNlIHRoaXMgZmlsdGVyLiBcclxuYW5ndWxhci5tb2R1bGUoJ2FwcCcpXHJcbiAgLmZpbHRlcignZnJvbU5vdycsIGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uKGRhdGUpIHtcclxuICAgICAgcmV0dXJuIG1vbWVudChkYXRlKS5mcm9tTm93KCk7XHJcbiAgICB9XHJcbiAgfSk7IiwiJ3VzZSBzdHJpY3QnO1xuXG4vKiBGaWx0ZXJzICovXG4vLyBuZWVkIGxvYWQgdGhlIG1vbWVudC5qcyB0byB1c2UgdGhpcyBmaWx0ZXIuIFxuYW5ndWxhci5tb2R1bGUoJ2FwcCcpXG4uZmlsdGVyKCdub0ZyYWN0aW9uQ3VycmVuY3knLFxuICAgICBbICckZmlsdGVyJywgJyRsb2NhbGUnLFxuICAgICBmdW5jdGlvbihmaWx0ZXIsIGxvY2FsZSkge1xuICAgICAgIHZhciBjdXJyZW5jeUZpbHRlciA9IGZpbHRlcignY3VycmVuY3knKTtcbiAgICAgICB2YXIgZm9ybWF0cyA9IGxvY2FsZS5OVU1CRVJfRk9STUFUUztcbiAgICAgICByZXR1cm4gZnVuY3Rpb24oYW1vdW50LCBjdXJyZW5jeVN5bWJvbCkge1xuICAgICAgICAgdmFyIHZhbHVlID0gY3VycmVuY3lGaWx0ZXIoYW1vdW50LCBjdXJyZW5jeVN5bWJvbCk7XG4gICAgICAgICB2YXIgc2VwID0gdmFsdWUuaW5kZXhPZihmb3JtYXRzLkRFQ0lNQUxfU0VQKTtcbiAgICAgICAgIGlmKGFtb3VudCA+PSAwKSB7IFxuICAgICAgICAgICByZXR1cm4gdmFsdWUuc3Vic3RyaW5nKDAsIHNlcCk7XG4gICAgICAgICB9XG4gICAgICAgICByZXR1cm4gdmFsdWUuc3Vic3RyaW5nKDAsIHNlcCkgKyAnKSc7XG4gICAgICAgfTtcbiAgICAgfSBdKTsgIFxuXG5cbiIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuICAgICAuZmlsdGVyKCdudW0nLCBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oaW5wdXQpIHtcbiAgICAgIHJldHVybiBwYXJzZUludChpbnB1dCwgMTApO1xuICAgIH1cbn0pO1xuXG4iLCJcblxuJ3VzZSBzdHJpY3QnO1xuXG5hbmd1bGFyLm1vZHVsZSgnYXBwJylcbiAgICAgLmZpbHRlcigncHJldHR5VGltZScsIGZ1bmN0aW9uKCkge1xuICByZXR1cm4gZnVuY3Rpb24odmFsdWUpIHtcbiAgICB2YXIgaG91cnMgPSBNYXRoLmZsb29yKHZhbHVlIC8gMzYwMCksXG4gICAgICAgIG1pbnMgPSAnMCcgKyBNYXRoLmZsb29yKCh2YWx1ZSAlIDM2MDApIC8gNjApLFxuICAgICAgICBzZWNzID0gJzAnICsgTWF0aC5mbG9vcigodmFsdWUgJSA2MCkpO1xuICAgICAgICBtaW5zID0gbWlucy5zdWJzdHIobWlucy5sZW5ndGggLSAyKTtcbiAgICAgICAgc2VjcyA9IHNlY3Muc3Vic3RyKHNlY3MubGVuZ3RoIC0gMik7XG4gICAgaWYoIWlzTmFOKHNlY3MpKXtcbiAgICAgIGlmIChob3Vycyl7XG4gICAgICAgIHJldHVybiBob3VycysnOicrbWlucysnOicrc2VjcztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBtaW5zKyc6JytzZWNzO1xuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICcwMDowMCc7XG4gICAgfTtcbiAgfTtcbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKiBGaWx0ZXJzICovXG5hbmd1bGFyLm1vZHVsZSgnYXBwJylcbiAgICAgLmZpbHRlcigndXBDb21pbmcnLCBbJyRwYXJzZScsXG4gICAgIGZ1bmN0aW9uKCRwYXJzZSkge1xuICAgICAgIHJldHVybiBmdW5jdGlvbihpdGVtcywgZmllbGQsIGRheXMpIHtcbiAgICAgICAgIHZhciB0aW1lU3RhcnQgPSArRGF0ZS5ub3coKSArICgoZGF5cyAtIC44KSAqIDg2NDAwMDAwKTsgIC8vIFRoaXMgbmVlZHMgZmluZXNzaW5nLlxuICAgICAgICAgdmFyIHRpbWVFbmQgPSArRGF0ZS5ub3coKSArICgoZGF5cyArIC4zKSAqIDg2NDAwMDAwKTsgLy8gMSBkYXkgaW4gbXNcbiAgICAgICAgIHZhciBmaWVsZEZuID0gJHBhcnNlKGZpZWxkKTtcbiAgICAgICAgIHJldHVybiAoaXRlbXMgfHwgW10pLmZpbHRlcihmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgIHZhciBmaWVsZCA9ICtuZXcgRGF0ZShmaWVsZEZuKGl0ZW0pKTtcbiAgICAgICAgICAgcmV0dXJuIChmaWVsZCA+IHRpbWVTdGFydCAmJiBmaWVsZCA8IHRpbWVFbmQpO1xuICAgICAgICAgfSk7XG4gICAgICAgfTtcbiAgICAgfVxuICAgXSk7XG4iLCJhbmd1bGFyLm1vZHVsZSgnY2hhbmdlRW1haWwnLCBbJ2ZpcmViYXNlLnV0aWxzJ10pXG4gIC5mYWN0b3J5KCdjaGFuZ2VFbWFpbCcsIFsnZmJ1dGlsJywgJyRxJywgZnVuY3Rpb24oZmJ1dGlsLCAkcSkge1xuICAgIHJldHVybiBmdW5jdGlvbihwYXNzd29yZCwgb2xkRW1haWwsIG5ld0VtYWlsLCBzaW1wbGVMb2dpbikge1xuICAgICAgdmFyIGN0eCA9IHsgb2xkOiB7IGVtYWlsOiBvbGRFbWFpbCB9LCBjdXJyOiB7IGVtYWlsOiBuZXdFbWFpbCB9IH07XG5cbiAgICAgIC8vIGV4ZWN1dGUgYWN0aXZpdGllcyBpbiBvcmRlcjsgZmlyc3Qgd2UgYXV0aGVudGljYXRlIHRoZSB1c2VyXG4gICAgICByZXR1cm4gYXV0aE9sZEFjY291bnQoKVxuICAgICAgICAvLyB0aGVuIHdlIGZldGNoIG9sZCBhY2NvdW50IGRldGFpbHNcbiAgICAgICAgLnRoZW4oIGxvYWRPbGRQcm9maWxlIClcbiAgICAgICAgLy8gdGhlbiB3ZSBjcmVhdGUgYSBuZXcgYWNjb3VudFxuICAgICAgICAudGhlbiggY3JlYXRlTmV3QWNjb3VudCApXG4gICAgICAgIC8vIHRoZW4gd2UgY29weSBvbGQgYWNjb3VudCBpbmZvXG4gICAgICAgIC50aGVuKCBjb3B5UHJvZmlsZSApXG4gICAgICAgIC8vIGFuZCBvbmNlIHRoZXkgc2FmZWx5IGV4aXN0LCB0aGVuIHdlIGNhbiBkZWxldGUgdGhlIG9sZCBvbmVzXG4gICAgICAgIC8vIHdlIGhhdmUgdG8gYXV0aGVudGljYXRlIGFzIHRoZSBvbGQgdXNlciBhZ2FpblxuICAgICAgICAudGhlbiggYXV0aE9sZEFjY291bnQgKVxuICAgICAgICAudGhlbiggcmVtb3ZlT2xkUHJvZmlsZSApXG4gICAgICAgIC50aGVuKCByZW1vdmVPbGRMb2dpbiApXG4gICAgICAgIC8vIGFuZCBub3cgYXV0aGVudGljYXRlIGFzIHRoZSBuZXcgdXNlclxuICAgICAgICAudGhlbiggYXV0aE5ld0FjY291bnQgKVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24oZXJyKSB7IGNvbnNvbGUuZXJyb3IoZXJyKTsgcmV0dXJuICRxLnJlamVjdChlcnIpOyB9KTtcblxuICAgICAgZnVuY3Rpb24gYXV0aE9sZEFjY291bnQoKSB7XG4gICAgICAgIHJldHVybiBzaW1wbGVMb2dpbi5sb2dpbihjdHgub2xkLmVtYWlsLCBwYXNzd29yZCkudGhlbihmdW5jdGlvbih1c2VyKSB7XG4gICAgICAgICAgY3R4Lm9sZC51aWQgPSB1c2VyLnVpZDtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGxvYWRPbGRQcm9maWxlKCkge1xuICAgICAgICB2YXIgZGVmID0gJHEuZGVmZXIoKTtcbiAgICAgICAgY3R4Lm9sZC5yZWYgPSBmYnV0aWwucmVmKCd1c2VycycsIGN0eC5vbGQudWlkKTtcbiAgICAgICAgY3R4Lm9sZC5yZWYub25jZSgndmFsdWUnLFxuICAgICAgICAgIGZ1bmN0aW9uKHNuYXApe1xuICAgICAgICAgICAgdmFyIGRhdCA9IHNuYXAudmFsKCk7XG4gICAgICAgICAgICBpZiggZGF0ID09PSBudWxsICkge1xuICAgICAgICAgICAgICBkZWYucmVqZWN0KG9sZEVtYWlsICsgJyBub3QgZm91bmQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICBjdHgub2xkLm5hbWUgPSBkYXQubmFtZTtcbiAgICAgICAgICAgICAgZGVmLnJlc29sdmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIGZ1bmN0aW9uKGVycil7XG4gICAgICAgICAgICBkZWYucmVqZWN0KGVycik7XG4gICAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBkZWYucHJvbWlzZTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gY3JlYXRlTmV3QWNjb3VudCgpIHtcbiAgICAgICAgcmV0dXJuIHNpbXBsZUxvZ2luLmNyZWF0ZUFjY291bnQoY3R4LmN1cnIuZW1haWwsIHBhc3N3b3JkLCBjdHgub2xkLm5hbWUpLnRoZW4oZnVuY3Rpb24odXNlcikge1xuICAgICAgICAgIGN0eC5jdXJyLnVpZCA9IHVzZXIudWlkO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gY29weVByb2ZpbGUoKSB7XG4gICAgICAgIHZhciBkID0gJHEuZGVmZXIoKTtcbiAgICAgICAgY3R4LmN1cnIucmVmID0gZmJ1dGlsLnJlZigndXNlcnMnLCBjdHguY3Vyci51aWQpO1xuICAgICAgICB2YXIgcHJvZmlsZSA9IHtlbWFpbDogY3R4LmN1cnIuZW1haWwsIG5hbWU6IGN0eC5vbGQubmFtZXx8Jyd9O1xuICAgICAgICBjdHguY3Vyci5yZWYuc2V0KHByb2ZpbGUsIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgIGQucmVqZWN0KGVycik7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGQucmVzb2x2ZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBkLnByb21pc2U7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHJlbW92ZU9sZFByb2ZpbGUoKSB7XG4gICAgICAgIHZhciBkID0gJHEuZGVmZXIoKTtcbiAgICAgICAgY3R4Lm9sZC5yZWYucmVtb3ZlKGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgIGQucmVqZWN0KGVycik7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGQucmVzb2x2ZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBkLnByb21pc2U7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHJlbW92ZU9sZExvZ2luKCkge1xuICAgICAgICB2YXIgZGVmID0gJHEuZGVmZXIoKTtcbiAgICAgICAgc2ltcGxlTG9naW4ucmVtb3ZlVXNlcihjdHgub2xkLmVtYWlsLCBwYXNzd29yZCkudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICBkZWYucmVzb2x2ZSgpO1xuICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICBkZWYucmVqZWN0KGVycik7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZGVmLnByb21pc2U7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGF1dGhOZXdBY2NvdW50KCkge1xuICAgICAgICByZXR1cm4gc2ltcGxlTG9naW4ubG9naW4oY3R4LmN1cnIuZW1haWwsIHBhc3N3b3JkKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XSk7IiwiXG4ndXNlIHN0cmljdCc7XG5cbmFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuICAgICAuc2VydmljZSgnUGxheWVyJywgWyckcm9vdFNjb3BlJyxcbiAgICAgZnVuY3Rpb24oJHJvb3RTY29wZSkge1xuXG4gICAgdmFyIHBsYXlpbmdTb3VuZDtcbiAgICAkcm9vdFNjb3BlLnRyYWNrUGxheWluZ0luZGV4OyAgLy8gdHJ5aW5nIHRvIGZpZ3VyZSBvdXQgaW5kZXhcblxuXG4gICAgcmV0dXJuIHtcblxuICAgICAgcGxheWluZzogZmFsc2UsXG5cbiAgICAgIHBsYXk6IGZ1bmN0aW9uICh0cmFjaywgaW5kZXgpIHtcblxuICAgICAgICAkcm9vdFNjb3BlLnRyYWNrUGxheWluZ0luZGV4ID0gaW5kZXg7XG5cbiAgICAgICAgaWYgKCF0cmFjaykge1xuICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRUcmFjayAmJiBwbGF5aW5nU291bmQpIHtcbiAgICAgICAgICAgIHBsYXlpbmdTb3VuZC5wbGF5KCk7XG4gICAgICAgICAgICB0aGlzLnBsYXlpbmcgPSB0cnVlO1xuICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdGF0dXNDaGFuZ2VkJywgdHJ1ZSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHBsYXllciA9IHRoaXM7XG5cbiAgICAgICAgU0Muc3RyZWFtKHRyYWNrLnByb3BlcnRpZXMuc3RyZWFtX3VybCwgZnVuY3Rpb24oc291bmQpe1xuXG4gICAgICAgICAgaWYgKHBsYXlpbmdTb3VuZCkge1xuICAgICAgICAgICBwbGF5aW5nU291bmQuc3RvcCgpO1xuICAgICAgICAgfVxuXG4gICAgICAgICAgc291bmQucGxheSh7XG4gICAgICAgICAgICB3aGlsZXBsYXlpbmc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgcGxheWVyLmR1cmF0aW9uID0gTWF0aC5mbG9vcih0aGlzLmR1cmF0aW9uRXN0aW1hdGUgLyAxMDAwKTtcbiAgICAgICAgICAgICAgcGxheWVyLnBvc2l0aW9uID0gTWF0aC5mbG9vcih0aGlzLnBvc2l0aW9uIC8gMTAwMCk7XG4gICAgICAgICAgICAgIHBsYXllci5wcm9ncmVzcyA9ICh0aGlzLnBvc2l0aW9uIC8gdGhpcy5kdXJhdGlvbkVzdGltYXRlKSAqIDEwMDtcbiAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdGF0dXNDaGFuZ2VkJywgdHJ1ZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25maW5pc2g6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdmaW5pc2hlZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgLy9jb25zb2xlLmxvZyhwbGF5ZXIpO1xuXG4gICAgICAgICAgcGxheWluZ1NvdW5kID0gc291bmQ7XG4gICAgICAgICAgcGxheWVyLmN1cnJlbnRUcmFjayA9IHRyYWNrO1xuICAgICAgICAgIHBsYXllci5wbGF5aW5nID0gdHJ1ZTtcbiAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3N0YXR1c0NoYW5nZWQnLCB0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgICB9LFxuXG4gICAgICBwYXVzZTogZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAocGxheWluZ1NvdW5kKSB7XG4gICAgICAgICAgcGxheWluZ1NvdW5kLnBhdXNlKCk7XG4gICAgICAgICAgdGhpcy5wbGF5aW5nID0gZmFsc2U7XG4gICAgICAgICAgJHJvb3RTY29wZS50cmFja1BsYXlpbmdJbmRleCA9IHt9O1xuXG4gICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzdGF0dXNDaGFuZ2VkJywgdHJ1ZSk7XG4gICAgICAgIH1cblxuICAgICAgfSxcblxuICAgICAgc2V0UG9zaXRpb246IGZ1bmN0aW9uIChwZXJjZW50KSB7XG4gICAgICAgIHBsYXlpbmdTb3VuZC5zZXRQb3NpdGlvbihwZXJjZW50ICogcGxheWluZ1NvdW5kLmR1cmF0aW9uKTtcbiAgICAgIH0sXG5cblxufTtcblxuXG5cblxuICAgICB9XG4gICBdKTtcbiIsIid1c2Ugc3RyaWN0JztcblxuXG5hbmd1bGFyLm1vZHVsZSgnc2ltcGxlTG9naW4nLCBbJ2ZpcmViYXNlJywgJ2ZpcmViYXNlLnV0aWxzJywgJ2NoYW5nZUVtYWlsJ10pXG5cbiAgLy8gYSBzaW1wbGUgd3JhcHBlciBvbiBzaW1wbGVMb2dpbi5nZXRVc2VyKCkgdGhhdCByZWplY3RzIHRoZSBwcm9taXNlXG4gIC8vIGlmIHRoZSB1c2VyIGRvZXMgbm90IGV4aXN0cyAoaS5lLiBtYWtlcyB1c2VyIHJlcXVpcmVkKVxuICAuZmFjdG9yeSgncmVxdWlyZVVzZXInLCBbJ3NpbXBsZUxvZ2luJywgJyRxJywgZnVuY3Rpb24oc2ltcGxlTG9naW4sICRxKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHNpbXBsZUxvZ2luLmdldFVzZXIoKS50aGVuKGZ1bmN0aW9uICh1c2VyKSB7XG4gICAgICAgIHJldHVybiB1c2VyID8gdXNlciA6ICRxLnJlamVjdCh7IGF1dGhSZXF1aXJlZDogdHJ1ZSB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfV0pXG5cbiAgLmZhY3RvcnkoJ3NpbXBsZUxvZ2luJywgWyckZmlyZWJhc2VTaW1wbGVMb2dpbicsICdmYnV0aWwnLCAnY3JlYXRlUHJvZmlsZScsICdjaGFuZ2VFbWFpbCcsICckcScsICckcm9vdFNjb3BlJyxcbiAgICBmdW5jdGlvbigkZmlyZWJhc2VTaW1wbGVMb2dpbiwgZmJ1dGlsLCBjcmVhdGVQcm9maWxlLCBjaGFuZ2VFbWFpbCwgJHEsICRyb290U2NvcGUpIHtcbiAgICAgIHZhciBhdXRoID0gJGZpcmViYXNlU2ltcGxlTG9naW4oZmJ1dGlsLnJlZigpKTtcbiAgICAgIHZhciBsaXN0ZW5lcnMgPSBbXTtcblxuICAgICAgZnVuY3Rpb24gc3RhdHVzQ2hhbmdlKCkge1xuICAgICAgICBmbnMuZ2V0VXNlcigpLnRoZW4oZnVuY3Rpb24odXNlcikge1xuICAgICAgICAgIGZucy51c2VyID0gdXNlciB8fCBudWxsO1xuICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaChsaXN0ZW5lcnMsIGZ1bmN0aW9uKGZuKSB7XG4gICAgICAgICAgICBmbih1c2VyfHxudWxsKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHZhciBmbnMgPSB7XG4gICAgICAgIHVzZXI6IG51bGwsXG5cbiAgICAgICAgZ2V0VXNlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIGF1dGguJGdldEN1cnJlbnRVc2VyKCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBlbWFpbFxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGFzc1xuICAgICAgICAgKiBAcmV0dXJucyB7Kn1cbiAgICAgICAgICovXG4gICAgICAgIGxvZ2luOiBmdW5jdGlvbihlbWFpbCwgcGFzcykge1xuICAgICAgICAgIHJldHVybiBhdXRoLiRsb2dpbigncGFzc3dvcmQnLCB7XG4gICAgICAgICAgICBlbWFpbDogZW1haWwsXG4gICAgICAgICAgICBwYXNzd29yZDogcGFzcyxcbiAgICAgICAgICAgIHJlbWVtYmVyTWU6IHRydWVcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcblxuICAgICAgICBsb2dvdXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGF1dGguJGxvZ291dCgpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGNyZWF0ZUFjY291bnQ6IGZ1bmN0aW9uKGVtYWlsLCBwYXNzLCBuYW1lKSB7XG4gICAgICAgICAgcmV0dXJuIGF1dGguJGNyZWF0ZVVzZXIoZW1haWwsIHBhc3MpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgLy8gYXV0aGVudGljYXRlIHNvIHdlIGhhdmUgcGVybWlzc2lvbiB0byB3cml0ZSB0byBGaXJlYmFzZVxuICAgICAgICAgICAgICByZXR1cm4gZm5zLmxvZ2luKGVtYWlsLCBwYXNzKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbih1c2VyKSB7XG4gICAgICAgICAgICAgIC8vIHN0b3JlIHVzZXIgZGF0YSBpbiBGaXJlYmFzZSBhZnRlciBjcmVhdGluZyBhY2NvdW50XG4gICAgICAgICAgICAgIHJldHVybiBjcmVhdGVQcm9maWxlKHVzZXIudWlkLCBlbWFpbCwgbmFtZSkudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdXNlcjtcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuXG4gICAgICAgIGNoYW5nZVBhc3N3b3JkOiBmdW5jdGlvbihlbWFpbCwgb2xkcGFzcywgbmV3cGFzcykge1xuICAgICAgICAgIHJldHVybiBhdXRoLiRjaGFuZ2VQYXNzd29yZChlbWFpbCwgb2xkcGFzcywgbmV3cGFzcyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgY2hhbmdlRW1haWw6IGZ1bmN0aW9uKHBhc3N3b3JkLCBuZXdFbWFpbCkge1xuICAgICAgICAgIHJldHVybiBjaGFuZ2VFbWFpbChwYXNzd29yZCwgZm5zLnVzZXIuZW1haWwsIG5ld0VtYWlsLCB0aGlzKTtcbiAgICAgICAgfSxcblxuICAgICAgICByZW1vdmVVc2VyOiBmdW5jdGlvbihlbWFpbCwgcGFzcykge1xuICAgICAgICAgIHJldHVybiBhdXRoLiRyZW1vdmVVc2VyKGVtYWlsLCBwYXNzKTtcbiAgICAgICAgfSxcblxuICAgICAgICB3YXRjaDogZnVuY3Rpb24oY2IsICRzY29wZSkge1xuICAgICAgICAgIGZucy5nZXRVc2VyKCkudGhlbihmdW5jdGlvbih1c2VyKSB7XG4gICAgICAgICAgICBjYih1c2VyKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBsaXN0ZW5lcnMucHVzaChjYik7XG4gICAgICAgICAgdmFyIHVuYmluZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGkgPSBsaXN0ZW5lcnMuaW5kZXhPZihjYik7XG4gICAgICAgICAgICBpZiggaSA+IC0xICkgeyBsaXN0ZW5lcnMuc3BsaWNlKGksIDEpOyB9XG4gICAgICAgICAgfTtcbiAgICAgICAgICBpZiggJHNjb3BlICkge1xuICAgICAgICAgICAgJHNjb3BlLiRvbignJGRlc3Ryb3knLCB1bmJpbmQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdW5iaW5kO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICAkcm9vdFNjb3BlLiRvbignJGZpcmViYXNlU2ltcGxlTG9naW46bG9naW4nLCBzdGF0dXNDaGFuZ2UpO1xuICAgICAgJHJvb3RTY29wZS4kb24oJyRmaXJlYmFzZVNpbXBsZUxvZ2luOmxvZ291dCcsIHN0YXR1c0NoYW5nZSk7XG4gICAgICAkcm9vdFNjb3BlLiRvbignJGZpcmViYXNlU2ltcGxlTG9naW46ZXJyb3InLCBzdGF0dXNDaGFuZ2UpO1xuICAgICAgc3RhdHVzQ2hhbmdlKCk7XG5cbiAgICAgIHJldHVybiBmbnM7XG4gICAgfV0pXG5cbiAgLmZhY3RvcnkoJ2NyZWF0ZVByb2ZpbGUnLCBbJ2ZidXRpbCcsICckcScsICckdGltZW91dCcsIGZ1bmN0aW9uKGZidXRpbCwgJHEsICR0aW1lb3V0KSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKGlkLCBlbWFpbCwgbmFtZSkge1xuICAgICAgdmFyIHJlZiA9IGZidXRpbC5yZWYoJ3VzZXJzJywgaWQpLCBkZWYgPSAkcS5kZWZlcigpO1xuICAgICAgcmVmLnNldCh7ZW1haWw6IGVtYWlsLCBuYW1lOiBuYW1lfHxmaXJzdFBhcnRPZkVtYWlsKGVtYWlsKX0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAkdGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiggZXJyICkge1xuICAgICAgICAgICAgZGVmLnJlamVjdChlcnIpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGRlZi5yZXNvbHZlKHJlZik7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSk7XG5cbiAgICAgIGZ1bmN0aW9uIGZpcnN0UGFydE9mRW1haWwoZW1haWwpIHtcbiAgICAgICAgcmV0dXJuIHVjZmlyc3QoZW1haWwuc3Vic3RyKDAsIGVtYWlsLmluZGV4T2YoJ0AnKSl8fCcnKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gdWNmaXJzdCAoc3RyKSB7XG4gICAgICAgIC8vIGNyZWRpdHM6IGh0dHA6Ly9rZXZpbi52YW56b25uZXZlbGQubmV0XG4gICAgICAgIHN0ciArPSAnJztcbiAgICAgICAgdmFyIGYgPSBzdHIuY2hhckF0KDApLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgIHJldHVybiBmICsgc3RyLnN1YnN0cigxKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGRlZi5wcm9taXNlO1xuICAgIH1cbiAgfV0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLyoqXHJcbiAqIDAuMS4xXHJcbiAqIERlZmVycmVkIGxvYWQganMvY3NzIGZpbGUsIHVzZWQgZm9yIHVpLWpxLmpzIGFuZCBMYXp5IExvYWRpbmcuXHJcbiAqXHJcbiAqIEAgZmxhdGZ1bGwuY29tIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbiAqIEF1dGhvciB1cmw6IGh0dHA6Ly90aGVtZWZvcmVzdC5uZXQvdXNlci9mbGF0ZnVsbFxyXG4gKi9cclxuXHJcbmFuZ3VsYXIubW9kdWxlKCd1aS5sb2FkJywgW10pXHJcblx0LnNlcnZpY2UoJ3VpTG9hZCcsIFsnJGRvY3VtZW50JywgJyRxJywgJyR0aW1lb3V0JywgZnVuY3Rpb24gKCRkb2N1bWVudCwgJHEsICR0aW1lb3V0KSB7XHJcblxyXG5cdFx0dmFyIGxvYWRlZCA9IFtdO1xyXG5cdFx0dmFyIHByb21pc2UgPSBmYWxzZTtcclxuXHRcdHZhciBkZWZlcnJlZCA9ICRxLmRlZmVyKCk7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBDaGFpbiBsb2FkcyB0aGUgZ2l2ZW4gc291cmNlc1xyXG5cdFx0ICogQHBhcmFtIHNyY3MgYXJyYXksIHNjcmlwdCBvciBjc3NcclxuXHRcdCAqIEByZXR1cm5zIHsqfSBQcm9taXNlIHRoYXQgd2lsbCBiZSByZXNvbHZlZCBvbmNlIHRoZSBzb3VyY2VzIGhhcyBiZWVuIGxvYWRlZC5cclxuXHRcdCAqL1xyXG5cdFx0dGhpcy5sb2FkID0gZnVuY3Rpb24gKHNyY3MpIHtcclxuXHRcdFx0c3JjcyA9IGFuZ3VsYXIuaXNBcnJheShzcmNzKSA/IHNyY3MgOiBzcmNzLnNwbGl0KC9cXHMrLyk7XHJcblx0XHRcdHZhciBzZWxmID0gdGhpcztcclxuXHRcdFx0aWYoIXByb21pc2Upe1xyXG5cdFx0XHRcdHByb21pc2UgPSBkZWZlcnJlZC5wcm9taXNlO1xyXG5cdFx0XHR9XHJcbiAgICAgIGFuZ3VsYXIuZm9yRWFjaChzcmNzLCBmdW5jdGlvbihzcmMpIHtcclxuICAgICAgXHRwcm9taXNlID0gcHJvbWlzZS50aGVuKCBmdW5jdGlvbigpe1xyXG4gICAgICBcdFx0cmV0dXJuIHNyYy5pbmRleE9mKCcuY3NzJykgPj0wID8gc2VsZi5sb2FkQ1NTKHNyYykgOiBzZWxmLmxvYWRTY3JpcHQoc3JjKTtcclxuICAgICAgXHR9ICk7XHJcbiAgICAgIH0pO1xyXG4gICAgICBkZWZlcnJlZC5yZXNvbHZlKCk7XHJcbiAgICAgIHJldHVybiBwcm9taXNlO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogRHluYW1pY2FsbHkgbG9hZHMgdGhlIGdpdmVuIHNjcmlwdFxyXG5cdFx0ICogQHBhcmFtIHNyYyBUaGUgdXJsIG9mIHRoZSBzY3JpcHQgdG8gbG9hZCBkeW5hbWljYWxseVxyXG5cdFx0ICogQHJldHVybnMgeyp9IFByb21pc2UgdGhhdCB3aWxsIGJlIHJlc29sdmVkIG9uY2UgdGhlIHNjcmlwdCBoYXMgYmVlbiBsb2FkZWQuXHJcblx0XHQgKi9cclxuXHRcdHRoaXMubG9hZFNjcmlwdCA9IGZ1bmN0aW9uIChzcmMpIHtcclxuXHRcdFx0aWYobG9hZGVkW3NyY10pIHJldHVybiBsb2FkZWRbc3JjXS5wcm9taXNlO1xyXG5cclxuXHRcdFx0dmFyIGRlZmVycmVkID0gJHEuZGVmZXIoKTtcclxuXHRcdFx0dmFyIHNjcmlwdCA9ICRkb2N1bWVudFswXS5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcclxuXHRcdFx0c2NyaXB0LnNyYyA9IHNyYztcclxuXHRcdFx0c2NyaXB0Lm9ubG9hZCA9IGZ1bmN0aW9uIChlKSB7XHJcblx0XHRcdFx0JHRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShlKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fTtcclxuXHRcdFx0c2NyaXB0Lm9uZXJyb3IgPSBmdW5jdGlvbiAoZSkge1xyXG5cdFx0XHRcdCR0aW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdGRlZmVycmVkLnJlamVjdChlKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fTtcclxuXHRcdFx0JGRvY3VtZW50WzBdLmJvZHkuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcclxuXHRcdFx0bG9hZGVkW3NyY10gPSBkZWZlcnJlZDtcclxuXHJcblx0XHRcdHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIER5bmFtaWNhbGx5IGxvYWRzIHRoZSBnaXZlbiBDU1MgZmlsZVxyXG5cdFx0ICogQHBhcmFtIGhyZWYgVGhlIHVybCBvZiB0aGUgQ1NTIHRvIGxvYWQgZHluYW1pY2FsbHlcclxuXHRcdCAqIEByZXR1cm5zIHsqfSBQcm9taXNlIHRoYXQgd2lsbCBiZSByZXNvbHZlZCBvbmNlIHRoZSBDU1MgZmlsZSBoYXMgYmVlbiBsb2FkZWQuXHJcblx0XHQgKi9cclxuXHRcdHRoaXMubG9hZENTUyA9IGZ1bmN0aW9uIChocmVmKSB7XHJcblx0XHRcdGlmKGxvYWRlZFtocmVmXSkgcmV0dXJuIGxvYWRlZFtocmVmXS5wcm9taXNlO1xyXG5cclxuXHRcdFx0dmFyIGRlZmVycmVkID0gJHEuZGVmZXIoKTtcclxuXHRcdFx0dmFyIHN0eWxlID0gJGRvY3VtZW50WzBdLmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKTtcclxuXHRcdFx0c3R5bGUucmVsID0gJ3N0eWxlc2hlZXQnO1xyXG5cdFx0XHRzdHlsZS50eXBlID0gJ3RleHQvY3NzJztcclxuXHRcdFx0c3R5bGUuaHJlZiA9IGhyZWY7XHJcblx0XHRcdHN0eWxlLm9ubG9hZCA9IGZ1bmN0aW9uIChlKSB7XHJcblx0XHRcdFx0JHRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShlKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fTtcclxuXHRcdFx0c3R5bGUub25lcnJvciA9IGZ1bmN0aW9uIChlKSB7XHJcblx0XHRcdFx0JHRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFx0ZGVmZXJyZWQucmVqZWN0KGUpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9O1xyXG5cdFx0XHQkZG9jdW1lbnRbMF0uaGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XHJcblx0XHRcdGxvYWRlZFtocmVmXSA9IGRlZmVycmVkO1xyXG5cclxuXHRcdFx0cmV0dXJuIGRlZmVycmVkLnByb21pc2U7XHJcblx0XHR9O1xyXG59XSk7XHJcbiIsIi8qKlxyXG4gKiBjYWxlbmRhckRlbW9BcHAgLSAwLjEuM1xyXG4gKi9cclxuXHJcbmFwcC5jb250cm9sbGVyKCdGdWxsY2FsZW5kYXJDdHJsJywgWyckc2NvcGUnLCBmdW5jdGlvbigkc2NvcGUpIHtcclxuXHJcbiAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICB2YXIgZCA9IGRhdGUuZ2V0RGF0ZSgpO1xyXG4gICAgdmFyIG0gPSBkYXRlLmdldE1vbnRoKCk7XHJcbiAgICB2YXIgeSA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcclxuXHJcbiAgICAvKiBldmVudCBzb3VyY2UgdGhhdCBwdWxscyBmcm9tIGdvb2dsZS5jb20gKi9cclxuICAgICRzY29wZS5ldmVudFNvdXJjZSA9IHtcclxuICAgICAgICAgICAgdXJsOiBcImh0dHA6Ly93d3cuZ29vZ2xlLmNvbS9jYWxlbmRhci9mZWVkcy91c2FfX2VuJTQwaG9saWRheS5jYWxlbmRhci5nb29nbGUuY29tL3B1YmxpYy9iYXNpY1wiLFxyXG4gICAgICAgICAgICBjbGFzc05hbWU6ICdnY2FsLWV2ZW50JywgICAgICAgICAgIC8vIGFuIG9wdGlvbiFcclxuICAgICAgICAgICAgY3VycmVudFRpbWV6b25lOiAnQW1lcmljYS9DaGljYWdvJyAvLyBhbiBvcHRpb24hXHJcbiAgICB9O1xyXG5cclxuICAgIC8qIGV2ZW50IHNvdXJjZSB0aGF0IGNvbnRhaW5zIGN1c3RvbSBldmVudHMgb24gdGhlIHNjb3BlICovXHJcbiAgICAkc2NvcGUuZXZlbnRzID0gW1xyXG4gICAgICB7dGl0bGU6J0FsbCBEYXkgRXZlbnQnLCBzdGFydDogbmV3IERhdGUoeSwgbSwgMSksIGNsYXNzTmFtZTogWydiLWwgYi0yeCBiLWluZm8nXSwgbG9jYXRpb246J05ldyBZb3JrJywgaW5mbzonVGhpcyBhIGFsbCBkYXkgZXZlbnQgdGhhdCB3aWxsIHN0YXJ0IGZyb20gOTowMCBhbSB0byA5OjAwIHBtLCBoYXZlIGZ1biEnfSxcclxuICAgICAge3RpdGxlOidEYW5jZSBjbGFzcycsIHN0YXJ0OiBuZXcgRGF0ZSh5LCBtLCAzKSwgZW5kOiBuZXcgRGF0ZSh5LCBtLCA0LCA5LCAzMCksIGFsbERheTogZmFsc2UsIGNsYXNzTmFtZTogWydiLWwgYi0yeCBiLWRhbmdlciddLCBsb2NhdGlvbjonTG9uZG9uJywgaW5mbzonVHdvIGRheXMgZGFuY2UgdHJhaW5pbmcgY2xhc3MuJ30sXHJcbiAgICAgIHt0aXRsZTonR2FtZSByYWNpbmcnLCBzdGFydDogbmV3IERhdGUoeSwgbSwgNiwgMTYsIDApLCBjbGFzc05hbWU6IFsnYi1sIGItMnggYi1pbmZvJ10sIGxvY2F0aW9uOidIb25na29uZycsIGluZm86J1RoZSBtb3N0IGJpZyByYWNpbmcgb2YgdGhpcyB5ZWFyLid9LFxyXG4gICAgICB7dGl0bGU6J1NvY2NlcicsIHN0YXJ0OiBuZXcgRGF0ZSh5LCBtLCA4LCAxNSwgMCksIGNsYXNzTmFtZTogWydiLWwgYi0yeCBiLWluZm8nXSwgbG9jYXRpb246J1JpbycsIGluZm86J0RvIG5vdCBmb3JnZXQgdG8gd2F0Y2guJ30sXHJcbiAgICAgIHt0aXRsZTonRmFtaWx5Jywgc3RhcnQ6IG5ldyBEYXRlKHksIG0sIDksIDE5LCAzMCksIGVuZDogbmV3IERhdGUoeSwgbSwgOSwgMjAsIDMwKSwgY2xhc3NOYW1lOiBbJ2ItbCBiLTJ4IGItc3VjY2VzcyddLCBpbmZvOidGYW1pbHkgcGFydHknfSxcclxuICAgICAge3RpdGxlOidMb25nIEV2ZW50Jywgc3RhcnQ6IG5ldyBEYXRlKHksIG0sIGQgLSA1KSwgZW5kOiBuZXcgRGF0ZSh5LCBtLCBkIC0gMiksIGNsYXNzTmFtZTogWydiZy1zdWNjZXNzIGJnJ10sIGxvY2F0aW9uOidIRCBDaXR5JywgaW5mbzonSXQgaXMgYSBsb25nIGxvbmcgZXZlbnQnfSxcclxuICAgICAge3RpdGxlOidQbGF5IGdhbWUnLCBzdGFydDogbmV3IERhdGUoeSwgbSwgZCAtIDEsIDE2LCAwKSwgY2xhc3NOYW1lOiBbJ2ItbCBiLTJ4IGItaW5mbyddLCBsb2NhdGlvbjonVG9reW8nLCBpbmZvOidUb2t5byBHYW1lIFJhY2luZyd9LFxyXG4gICAgICB7dGl0bGU6J0JpcnRoZGF5IFBhcnR5Jywgc3RhcnQ6IG5ldyBEYXRlKHksIG0sIGQgKyAxLCAxOSwgMCksIGVuZDogbmV3IERhdGUoeSwgbSwgZCArIDEsIDIyLCAzMCksIGFsbERheTogZmFsc2UsIGNsYXNzTmFtZTogWydiLWwgYi0yeCBiLXByaW1hcnknXSwgbG9jYXRpb246J05ldyBZb3JrJywgaW5mbzonUGFydHkgYWxsIGRheSd9LFxyXG4gICAgICB7dGl0bGU6J1JlcGVhdGluZyBFdmVudCcsIHN0YXJ0OiBuZXcgRGF0ZSh5LCBtLCBkICsgNCwgMTYsIDApLCBhbERheTogZmFsc2UsIGNsYXNzTmFtZTogWydiLWwgYi0yeCBiLXdhcm5pbmcnXSwgbG9jYXRpb246J0hvbWUgVG93bicsIGluZm86J1JlcGVhdCBldmVyeSBkYXknfSwgICAgICBcclxuICAgICAge3RpdGxlOidDbGljayBmb3IgR29vZ2xlJywgc3RhcnQ6IG5ldyBEYXRlKHksIG0sIDI4KSwgZW5kOiBuZXcgRGF0ZSh5LCBtLCAyOSksIHVybDogJ2h0dHA6Ly9nb29nbGUuY29tLycsIGNsYXNzTmFtZTogWydiLWwgYi0yeCBiLXByaW1hcnknXX0sXHJcbiAgICAgIHt0aXRsZTonRmVlZCBjYXQnLCBzdGFydDogbmV3IERhdGUoeSwgbSsxLCA2LCAxOCwgMCksIGNsYXNzTmFtZTogWydiLWwgYi0yeCBiLWluZm8nXX1cclxuICAgIF07XHJcblxyXG4gICAgLyogYWxlcnQgb24gZGF5Q2xpY2sgKi9cclxuICAgICRzY29wZS5wcmVjaXNpb24gPSA0MDA7XHJcbiAgICAkc2NvcGUubGFzdENsaWNrVGltZSA9IDA7XHJcbiAgICAkc2NvcGUuYWxlcnRPbkV2ZW50Q2xpY2sgPSBmdW5jdGlvbiggZGF0ZSwganNFdmVudCwgdmlldyApe1xyXG4gICAgICB2YXIgdGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgICBpZih0aW1lIC0gJHNjb3BlLmxhc3RDbGlja1RpbWUgPD0gJHNjb3BlLnByZWNpc2lvbil7XHJcbiAgICAgICAgICAkc2NvcGUuZXZlbnRzLnB1c2goe1xyXG4gICAgICAgICAgICB0aXRsZTogJ05ldyBFdmVudCcsXHJcbiAgICAgICAgICAgIHN0YXJ0OiBkYXRlLFxyXG4gICAgICAgICAgICBjbGFzc05hbWU6IFsnYi1sIGItMnggYi1pbmZvJ11cclxuICAgICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICAgICRzY29wZS5sYXN0Q2xpY2tUaW1lID0gdGltZTtcclxuICAgIH07XHJcbiAgICAvKiBhbGVydCBvbiBEcm9wICovXHJcbiAgICAkc2NvcGUuYWxlcnRPbkRyb3AgPSBmdW5jdGlvbihldmVudCwgZGVsdGEsIHJldmVydEZ1bmMsIGpzRXZlbnQsIHVpLCB2aWV3KXtcclxuICAgICAgICRzY29wZS5hbGVydE1lc3NhZ2UgPSAoJ0V2ZW50IERyb3BlZCB0byBtYWtlIGRheURlbHRhICcgKyBkZWx0YSk7XHJcbiAgICB9O1xyXG4gICAgLyogYWxlcnQgb24gUmVzaXplICovXHJcbiAgICAkc2NvcGUuYWxlcnRPblJlc2l6ZSA9IGZ1bmN0aW9uKGV2ZW50LCBkZWx0YSwgcmV2ZXJ0RnVuYywganNFdmVudCwgdWksIHZpZXcpe1xyXG4gICAgICAgJHNjb3BlLmFsZXJ0TWVzc2FnZSA9ICgnRXZlbnQgUmVzaXplZCB0byBtYWtlIGRheURlbHRhICcgKyBkZWx0YSk7XHJcbiAgICB9O1xyXG5cclxuICAgICRzY29wZS5vdmVybGF5ID0gJCgnLmZjLW92ZXJsYXknKTtcclxuICAgICRzY29wZS5hbGVydE9uTW91c2VPdmVyID0gZnVuY3Rpb24oIGV2ZW50LCBqc0V2ZW50LCB2aWV3ICl7XHJcbiAgICAgICRzY29wZS5ldmVudCA9IGV2ZW50O1xyXG4gICAgICAkc2NvcGUub3ZlcmxheS5yZW1vdmVDbGFzcygnbGVmdCByaWdodCcpLmZpbmQoJy5hcnJvdycpLnJlbW92ZUNsYXNzKCdsZWZ0IHJpZ2h0IHRvcCBwdWxsLXVwJyk7XHJcbiAgICAgIHZhciB3cmFwID0gJChqc0V2ZW50LnRhcmdldCkuY2xvc2VzdCgnLmZjLWV2ZW50Jyk7XHJcbiAgICAgIHZhciBjYWwgPSB3cmFwLmNsb3Nlc3QoJy5jYWxlbmRhcicpO1xyXG4gICAgICB2YXIgbGVmdCA9IHdyYXAub2Zmc2V0KCkubGVmdCAtIGNhbC5vZmZzZXQoKS5sZWZ0O1xyXG4gICAgICB2YXIgcmlnaHQgPSBjYWwud2lkdGgoKSAtICh3cmFwLm9mZnNldCgpLmxlZnQgLSBjYWwub2Zmc2V0KCkubGVmdCArIHdyYXAud2lkdGgoKSk7XHJcbiAgICAgIGlmKCByaWdodCA+ICRzY29wZS5vdmVybGF5LndpZHRoKCkgKSB7IFxyXG4gICAgICAgICRzY29wZS5vdmVybGF5LmFkZENsYXNzKCdsZWZ0JykuZmluZCgnLmFycm93JykuYWRkQ2xhc3MoJ2xlZnQgcHVsbC11cCcpXHJcbiAgICAgIH1lbHNlIGlmICggbGVmdCA+ICRzY29wZS5vdmVybGF5LndpZHRoKCkgKSB7XHJcbiAgICAgICAgJHNjb3BlLm92ZXJsYXkuYWRkQ2xhc3MoJ3JpZ2h0JykuZmluZCgnLmFycm93JykuYWRkQ2xhc3MoJ3JpZ2h0IHB1bGwtdXAnKTtcclxuICAgICAgfWVsc2V7XHJcbiAgICAgICAgJHNjb3BlLm92ZXJsYXkuZmluZCgnLmFycm93JykuYWRkQ2xhc3MoJ3RvcCcpO1xyXG4gICAgICB9XHJcbiAgICAgICh3cmFwLmZpbmQoJy5mYy1vdmVybGF5JykubGVuZ3RoID09IDApICYmIHdyYXAuYXBwZW5kKCAkc2NvcGUub3ZlcmxheSApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qIGNvbmZpZyBvYmplY3QgKi9cclxuICAgICRzY29wZS51aUNvbmZpZyA9IHtcclxuICAgICAgY2FsZW5kYXI6e1xyXG4gICAgICAgIGhlaWdodDogNDUwLFxyXG4gICAgICAgIGVkaXRhYmxlOiB0cnVlLFxyXG4gICAgICAgIGhlYWRlcjp7XHJcbiAgICAgICAgICBsZWZ0OiAncHJldicsXHJcbiAgICAgICAgICBjZW50ZXI6ICd0aXRsZScsXHJcbiAgICAgICAgICByaWdodDogJ25leHQnXHJcbiAgICAgICAgfSxcclxuICAgICAgICBkYXlDbGljazogJHNjb3BlLmFsZXJ0T25FdmVudENsaWNrLFxyXG4gICAgICAgIGV2ZW50RHJvcDogJHNjb3BlLmFsZXJ0T25Ecm9wLFxyXG4gICAgICAgIGV2ZW50UmVzaXplOiAkc2NvcGUuYWxlcnRPblJlc2l6ZSxcclxuICAgICAgICBldmVudE1vdXNlb3ZlcjogJHNjb3BlLmFsZXJ0T25Nb3VzZU92ZXJcclxuICAgICAgfVxyXG4gICAgfTtcclxuICAgIFxyXG4gICAgLyogYWRkIGN1c3RvbSBldmVudCovXHJcbiAgICAkc2NvcGUuYWRkRXZlbnQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgJHNjb3BlLmV2ZW50cy5wdXNoKHtcclxuICAgICAgICB0aXRsZTogJ05ldyBFdmVudCcsXHJcbiAgICAgICAgc3RhcnQ6IG5ldyBEYXRlKHksIG0sIGQpLFxyXG4gICAgICAgIGNsYXNzTmFtZTogWydiLWwgYi0yeCBiLWluZm8nXVxyXG4gICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgLyogcmVtb3ZlIGV2ZW50ICovXHJcbiAgICAkc2NvcGUucmVtb3ZlID0gZnVuY3Rpb24oaW5kZXgpIHtcclxuICAgICAgJHNjb3BlLmV2ZW50cy5zcGxpY2UoaW5kZXgsMSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qIENoYW5nZSBWaWV3ICovXHJcbiAgICAkc2NvcGUuY2hhbmdlVmlldyA9IGZ1bmN0aW9uKHZpZXcsIGNhbGVuZGFyKSB7XHJcbiAgICAgICQoJy5jYWxlbmRhcicpLmZ1bGxDYWxlbmRhcignY2hhbmdlVmlldycsIHZpZXcpO1xyXG4gICAgfTtcclxuXHJcbiAgICAkc2NvcGUudG9kYXkgPSBmdW5jdGlvbihjYWxlbmRhcikge1xyXG4gICAgICAkKCcuY2FsZW5kYXInKS5mdWxsQ2FsZW5kYXIoJ3RvZGF5Jyk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qIGV2ZW50IHNvdXJjZXMgYXJyYXkqL1xyXG4gICAgJHNjb3BlLmV2ZW50U291cmNlcyA9IFskc2NvcGUuZXZlbnRzXTtcclxufV0pO1xyXG4vKiBFT0YgKi8iLCJhcHAuY29udHJvbGxlcignQ29udGFjdEN0cmwnLCBbJyRzY29wZScsICckaHR0cCcsICckZmlsdGVyJywgZnVuY3Rpb24oJHNjb3BlLCAkaHR0cCwgJGZpbHRlcikge1xyXG4gICRodHRwLmdldCgnanMvYXBwL2NvbnRhY3QvY29udGFjdHMuanNvbicpLnRoZW4oZnVuY3Rpb24gKHJlc3ApIHtcclxuICAgICRzY29wZS5pdGVtcyA9IHJlc3AuZGF0YS5pdGVtcztcclxuICAgICRzY29wZS5pdGVtID0gJGZpbHRlcignb3JkZXJCeScpKCRzY29wZS5pdGVtcywgJ2ZpcnN0JylbMF07XHJcbiAgICAkc2NvcGUuaXRlbS5zZWxlY3RlZCA9IHRydWU7XHJcbiAgfSk7XHJcblxyXG4gICRzY29wZS5maWx0ZXIgPSAnJztcclxuICAkc2NvcGUuZ3JvdXBzID0gW1xyXG4gICAge25hbWU6ICdDb3dvcmtlcnMnfSwgXHJcbiAgICB7bmFtZTogJ0ZhbWlseSd9LCBcclxuICAgIHtuYW1lOiAnRnJpZW5kcyd9LCBcclxuICAgIHtuYW1lOiAnUGFydG5lcnMnfSwgXHJcbiAgICB7bmFtZTogJ0dyb3VwJ31cclxuICBdO1xyXG5cclxuICAkc2NvcGUuY3JlYXRlR3JvdXAgPSBmdW5jdGlvbigpe1xyXG4gICAgdmFyIGdyb3VwID0ge25hbWU6ICdOZXcgR3JvdXAnfTtcclxuICAgIGdyb3VwLm5hbWUgPSAkc2NvcGUuY2hlY2tJdGVtKGdyb3VwLCAkc2NvcGUuZ3JvdXBzLCAnbmFtZScpO1xyXG4gICAgJHNjb3BlLmdyb3Vwcy5wdXNoKGdyb3VwKTtcclxuICB9O1xyXG5cclxuICAkc2NvcGUuY2hlY2tJdGVtID0gZnVuY3Rpb24ob2JqLCBhcnIsIGtleSl7XHJcbiAgICB2YXIgaT0wO1xyXG4gICAgYW5ndWxhci5mb3JFYWNoKGFyciwgZnVuY3Rpb24oaXRlbSkge1xyXG4gICAgICBpZihpdGVtW2tleV0uaW5kZXhPZiggb2JqW2tleV0gKSA9PSAwKXtcclxuICAgICAgICB2YXIgaiA9IGl0ZW1ba2V5XS5yZXBsYWNlKG9ialtrZXldLCAnJykudHJpbSgpO1xyXG4gICAgICAgIGlmKGope1xyXG4gICAgICAgICAgaSA9IE1hdGgubWF4KGksIHBhcnNlSW50KGopKzEpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgaSA9IDE7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBvYmpba2V5XSArIChpID8gJyAnK2kgOiAnJyk7XHJcbiAgfTtcclxuXHJcbiAgJHNjb3BlLmRlbGV0ZUdyb3VwID0gZnVuY3Rpb24oaXRlbSl7XHJcbiAgICAkc2NvcGUuZ3JvdXBzLnNwbGljZSgkc2NvcGUuZ3JvdXBzLmluZGV4T2YoaXRlbSksIDEpO1xyXG4gIH07XHJcblxyXG4gICRzY29wZS5zZWxlY3RHcm91cCA9IGZ1bmN0aW9uKGl0ZW0peyAgICBcclxuICAgIGFuZ3VsYXIuZm9yRWFjaCgkc2NvcGUuZ3JvdXBzLCBmdW5jdGlvbihpdGVtKSB7XHJcbiAgICAgIGl0ZW0uc2VsZWN0ZWQgPSBmYWxzZTtcclxuICAgIH0pO1xyXG4gICAgJHNjb3BlLmdyb3VwID0gaXRlbTtcclxuICAgICRzY29wZS5ncm91cC5zZWxlY3RlZCA9IHRydWU7XHJcbiAgICAkc2NvcGUuZmlsdGVyID0gaXRlbS5uYW1lO1xyXG4gIH07XHJcblxyXG4gICRzY29wZS5zZWxlY3RJdGVtID0gZnVuY3Rpb24oaXRlbSl7ICAgIFxyXG4gICAgYW5ndWxhci5mb3JFYWNoKCRzY29wZS5pdGVtcywgZnVuY3Rpb24oaXRlbSkge1xyXG4gICAgICBpdGVtLnNlbGVjdGVkID0gZmFsc2U7XHJcbiAgICAgIGl0ZW0uZWRpdGluZyA9IGZhbHNlO1xyXG4gICAgfSk7XHJcbiAgICAkc2NvcGUuaXRlbSA9IGl0ZW07XHJcbiAgICAkc2NvcGUuaXRlbS5zZWxlY3RlZCA9IHRydWU7XHJcbiAgfTtcclxuXHJcbiAgJHNjb3BlLmRlbGV0ZUl0ZW0gPSBmdW5jdGlvbihpdGVtKXtcclxuICAgICRzY29wZS5pdGVtcy5zcGxpY2UoJHNjb3BlLml0ZW1zLmluZGV4T2YoaXRlbSksIDEpO1xyXG4gICAgJHNjb3BlLml0ZW0gPSAkZmlsdGVyKCdvcmRlckJ5JykoJHNjb3BlLml0ZW1zLCAnZmlyc3QnKVswXTtcclxuICAgIGlmKCRzY29wZS5pdGVtKSAkc2NvcGUuaXRlbS5zZWxlY3RlZCA9IHRydWU7XHJcbiAgfTtcclxuXHJcbiAgJHNjb3BlLmNyZWF0ZUl0ZW0gPSBmdW5jdGlvbigpe1xyXG4gICAgdmFyIGl0ZW0gPSB7XHJcbiAgICAgIGdyb3VwOiAnRnJpZW5kcycsXHJcbiAgICAgIGF2YXRhcjonaW1nL2EwLmpwZydcclxuICAgIH07XHJcbiAgICAkc2NvcGUuaXRlbXMucHVzaChpdGVtKTtcclxuICAgICRzY29wZS5zZWxlY3RJdGVtKGl0ZW0pO1xyXG4gICAgJHNjb3BlLml0ZW0uZWRpdGluZyA9IHRydWU7XHJcbiAgfTtcclxuXHJcbiAgJHNjb3BlLmVkaXRJdGVtID0gZnVuY3Rpb24oaXRlbSl7XHJcbiAgICBpZihpdGVtICYmIGl0ZW0uc2VsZWN0ZWQpe1xyXG4gICAgICBpdGVtLmVkaXRpbmcgPSB0cnVlO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gICRzY29wZS5kb25lRWRpdGluZyA9IGZ1bmN0aW9uKGl0ZW0pe1xyXG4gICAgaXRlbS5lZGl0aW5nID0gZmFsc2U7XHJcbiAgfTtcclxuXHJcbn1dKTsiLCIvLyBBIFJFU1RmdWwgZmFjdG9yeSBmb3IgcmV0cmVpdmluZyBtYWlscyBmcm9tICdtYWlscy5qc29uJ1xyXG5hcHAuZmFjdG9yeSgnbWFpbHMnLCBbJyRodHRwJywgZnVuY3Rpb24gKCRodHRwKSB7XHJcbiAgdmFyIHBhdGggPSAnanMvYXBwL21haWwvbWFpbHMuanNvbic7XHJcbiAgdmFyIG1haWxzID0gJGh0dHAuZ2V0KHBhdGgpLnRoZW4oZnVuY3Rpb24gKHJlc3ApIHtcclxuICAgIHJldHVybiByZXNwLmRhdGEubWFpbHM7XHJcbiAgfSk7XHJcblxyXG4gIHZhciBmYWN0b3J5ID0ge307XHJcbiAgZmFjdG9yeS5hbGwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gbWFpbHM7XHJcbiAgfTtcclxuICBmYWN0b3J5LmdldCA9IGZ1bmN0aW9uIChpZCkge1xyXG4gICAgcmV0dXJuIG1haWxzLnRoZW4oZnVuY3Rpb24obWFpbHMpe1xyXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1haWxzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKG1haWxzW2ldLmlkID09IGlkKSByZXR1cm4gbWFpbHNbaV07XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9KVxyXG4gIH07XHJcbiAgcmV0dXJuIGZhY3Rvcnk7XHJcbn1dKTsiLCJhcHAuY29udHJvbGxlcignTWFpbEN0cmwnLCBbJyRzY29wZScsIGZ1bmN0aW9uKCRzY29wZSkge1xyXG4gICRzY29wZS5mb2xkcyA9IFtcclxuICAgIHtuYW1lOiAnSW5ib3gnLCBmaWx0ZXI6Jyd9LFxyXG4gICAge25hbWU6ICdTdGFycmVkJywgZmlsdGVyOidzdGFycmVkJ30sXHJcbiAgICB7bmFtZTogJ1NlbnQnLCBmaWx0ZXI6J3NlbnQnfSxcclxuICAgIHtuYW1lOiAnSW1wb3J0YW50JywgZmlsdGVyOidpbXBvcnRhbnQnfSxcclxuICAgIHtuYW1lOiAnRHJhZnQnLCBmaWx0ZXI6J2RyYWZ0J30sXHJcbiAgICB7bmFtZTogJ1RyYXNoJywgZmlsdGVyOid0cmFzaCd9XHJcbiAgXTtcclxuXHJcbiAgJHNjb3BlLmxhYmVscyA9IFtcclxuICAgIHtuYW1lOiAnQW5ndWxhcicsIGZpbHRlcjonYW5ndWxhcicsIGNvbG9yOicjMjNiN2U1J30sXHJcbiAgICB7bmFtZTogJ0Jvb3RzdHJhcCcsIGZpbHRlcjonYm9vdHN0cmFwJywgY29sb3I6JyM3MjY2YmEnfSxcclxuICAgIHtuYW1lOiAnQ2xpZW50JywgZmlsdGVyOidjbGllbnQnLCBjb2xvcjonI2ZhZDczMyd9LFxyXG4gICAge25hbWU6ICdXb3JrJywgZmlsdGVyOid3b3JrJywgY29sb3I6JyMyN2MyNGMnfVxyXG4gIF07XHJcblxyXG4gICRzY29wZS5hZGRMYWJlbCA9IGZ1bmN0aW9uKCl7XHJcbiAgICAkc2NvcGUubGFiZWxzLnB1c2goXHJcbiAgICAgIHtcclxuICAgICAgICBuYW1lOiAkc2NvcGUubmV3TGFiZWwubmFtZSxcclxuICAgICAgICBmaWx0ZXI6IGFuZ3VsYXIubG93ZXJjYXNlKCRzY29wZS5uZXdMYWJlbC5uYW1lKSxcclxuICAgICAgICBjb2xvcjogJyNjY2MnXHJcbiAgICAgIH1cclxuICAgICk7XHJcbiAgICAkc2NvcGUubmV3TGFiZWwubmFtZSA9ICcnO1xyXG4gIH1cclxuXHJcbiAgJHNjb3BlLmxhYmVsQ2xhc3MgPSBmdW5jdGlvbihsYWJlbCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgJ2ItbC1pbmZvJzogYW5ndWxhci5sb3dlcmNhc2UobGFiZWwpID09PSAnYW5ndWxhcicsXHJcbiAgICAgICdiLWwtcHJpbWFyeSc6IGFuZ3VsYXIubG93ZXJjYXNlKGxhYmVsKSA9PT0gJ2Jvb3RzdHJhcCcsXHJcbiAgICAgICdiLWwtd2FybmluZyc6IGFuZ3VsYXIubG93ZXJjYXNlKGxhYmVsKSA9PT0gJ2NsaWVudCcsXHJcbiAgICAgICdiLWwtc3VjY2Vzcyc6IGFuZ3VsYXIubG93ZXJjYXNlKGxhYmVsKSA9PT0gJ3dvcmsnICAgICAgXHJcbiAgICB9O1xyXG4gIH07XHJcblxyXG59XSk7XHJcblxyXG5hcHAuY29udHJvbGxlcignTWFpbExpc3RDdHJsJywgWyckc2NvcGUnLCAnbWFpbHMnLCAnJHN0YXRlUGFyYW1zJywgZnVuY3Rpb24oJHNjb3BlLCBtYWlscywgJHN0YXRlUGFyYW1zKSB7XHJcbiAgJHNjb3BlLmZvbGQgPSAkc3RhdGVQYXJhbXMuZm9sZDtcclxuICBtYWlscy5hbGwoKS50aGVuKGZ1bmN0aW9uKG1haWxzKXtcclxuICAgICRzY29wZS5tYWlscyA9IG1haWxzO1xyXG4gIH0pO1xyXG59XSk7XHJcblxyXG5hcHAuY29udHJvbGxlcignTWFpbERldGFpbEN0cmwnLCBbJyRzY29wZScsICdtYWlscycsICckc3RhdGVQYXJhbXMnLCBmdW5jdGlvbigkc2NvcGUsIG1haWxzLCAkc3RhdGVQYXJhbXMpIHtcclxuICBtYWlscy5nZXQoJHN0YXRlUGFyYW1zLm1haWxJZCkudGhlbihmdW5jdGlvbihtYWlsKXtcclxuICAgICRzY29wZS5tYWlsID0gbWFpbDtcclxuICB9KVxyXG59XSk7XHJcblxyXG5hcHAuY29udHJvbGxlcignTWFpbE5ld0N0cmwnLCBbJyRzY29wZScsIGZ1bmN0aW9uKCRzY29wZSkge1xyXG4gICRzY29wZS5tYWlsID0ge1xyXG4gICAgdG86ICcnLFxyXG4gICAgc3ViamVjdDogJycsXHJcbiAgICBjb250ZW50OiAnJ1xyXG4gIH1cclxuICAkc2NvcGUudG9saXN0ID0gW1xyXG4gICAge25hbWU6ICdKYW1lcycsIGVtYWlsOidqYW1lc0BnbWFpbC5jb20nfSxcclxuICAgIHtuYW1lOiAnTHVvcmlzIEtpc28nLCBlbWFpbDonbHVvcmlzLmtpc29AaG90bWFpbC5jb20nfSxcclxuICAgIHtuYW1lOiAnTHVjeSBZb2tlcycsIGVtYWlsOidsdWN5Lnlva2VzQGdtYWlsLmNvbSd9XHJcbiAgXTtcclxufV0pO1xyXG5cclxuYW5ndWxhci5tb2R1bGUoJ2FwcCcpLmRpcmVjdGl2ZSgnbGFiZWxDb2xvcicsIGZ1bmN0aW9uKCl7XHJcbiAgcmV0dXJuIGZ1bmN0aW9uKHNjb3BlLCAkZWwsIGF0dHJzKXtcclxuICAgICRlbC5jc3Moeydjb2xvcic6IGF0dHJzLmNvbG9yfSk7XHJcbiAgfVxyXG59KTsiLCIvKiFcclxuICogSmF2YVNjcmlwdCAtIGxvYWRHb29nbGVNYXBzKCB2ZXJzaW9uLCBhcGlLZXksIGxhbmd1YWdlIClcclxuICpcclxuICogLSBMb2FkIEdvb2dsZSBNYXBzIEFQSSB1c2luZyBqUXVlcnkgRGVmZXJyZWQuIFxyXG4gKiAgIFVzZWZ1bCBpZiB5b3Ugd2FudCB0byBvbmx5IGxvYWQgdGhlIEdvb2dsZSBNYXBzIEFQSSBvbi1kZW1hbmQuXHJcbiAqIC0gUmVxdWlyZXMgalF1ZXJ5IDEuNVxyXG4gKiBcclxuICogQ29weXJpZ2h0IChjKSAyMDExIEdsZW5uIEJha2VyXHJcbiAqIER1YWwgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBhbmQgR1BMIGxpY2Vuc2VzLlxyXG4gKi9cclxuLypnbG9iYWxzIHdpbmRvdywgZ29vZ2xlLCBqUXVlcnkqL1xyXG52YXIgbG9hZEdvb2dsZU1hcHMgPSAoZnVuY3Rpb24oJCkge1xyXG5cdFxyXG5cdHZhciBub3cgPSAkLm5vdygpLFxyXG5cdFxyXG5cdFx0cHJvbWlzZTtcclxuXHRcclxuXHRyZXR1cm4gZnVuY3Rpb24oIHZlcnNpb24sIGFwaUtleSwgbGFuZ3VhZ2UgKSB7XHJcblx0XHRcclxuXHRcdGlmKCBwcm9taXNlICkgeyByZXR1cm4gcHJvbWlzZTsgfVxyXG5cdFx0XHJcblx0XHRcdC8vQ3JlYXRlIGEgRGVmZXJyZWQgT2JqZWN0XHJcblx0XHR2YXJcdGRlZmVycmVkID0gJC5EZWZlcnJlZCgpLFxyXG5cdFx0XHJcblx0XHRcdC8vRGVjbGFyZSBhIHJlc29sdmUgZnVuY3Rpb24sIHBhc3MgZ29vZ2xlLm1hcHMgZm9yIHRoZSBkb25lIGZ1bmN0aW9uc1xyXG5cdFx0XHRyZXNvbHZlID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdGRlZmVycmVkLnJlc29sdmUoIHdpbmRvdy5nb29nbGUgJiYgZ29vZ2xlLm1hcHMgPyBnb29nbGUubWFwcyA6IGZhbHNlICk7XHJcblx0XHRcdH0sXHJcblx0XHRcdFxyXG5cdFx0XHQvL2dsb2JhbCBjYWxsYmFjayBuYW1lXHJcblx0XHRcdGNhbGxiYWNrTmFtZSA9IFwibG9hZEdvb2dsZU1hcHNfXCIgKyAoIG5vdysrICksXHJcblx0XHRcdFxyXG5cdFx0XHQvLyBEZWZhdWx0IFBhcmFtZXRlcnNcclxuXHRcdFx0cGFyYW1zID0gJC5leHRlbmQoXHJcblx0XHRcdCB7J3NlbnNvcic6IGZhbHNlfVxyXG5cdFx0XHQgLCBhcGlLZXkgPyB7XCJrZXlcIjogYXBpS2V5fSA6IHt9XHJcblx0XHRcdCAsIGxhbmd1YWdlID8ge1wibGFuZ3VhZ2VcIjogbGFuZ3VhZ2V9IDoge30gXHJcblx0XHRcdCk7O1xyXG5cdFx0XHJcblx0XHQvL0lmIGdvb2dsZS5tYXBzIGV4aXN0cywgdGhlbiBHb29nbGUgTWFwcyBBUEkgd2FzIHByb2JhYmx5IGxvYWRlZCB3aXRoIHRoZSA8c2NyaXB0PiB0YWdcclxuXHRcdGlmKCB3aW5kb3cuZ29vZ2xlICYmIGdvb2dsZS5tYXBzICkge1xyXG5cdFx0XHRcclxuXHRcdFx0cmVzb2x2ZSgpO1xyXG5cdFx0XHJcblx0XHQvL0lmIHRoZSBnb29nbGUubG9hZCBtZXRob2QgZXhpc3RzLCBsZXRzIGxvYWQgdGhlIEdvb2dsZSBNYXBzIEFQSSBpbiBBc3luYy5cclxuXHRcdH0gZWxzZSBpZiAoIHdpbmRvdy5nb29nbGUgJiYgZ29vZ2xlLmxvYWQgKSB7XHJcblx0XHRcclxuXHRcdFx0Z29vZ2xlLmxvYWQoXCJtYXBzXCIsIHZlcnNpb24gfHwgMywge1wib3RoZXJfcGFyYW1zXCI6ICQucGFyYW0ocGFyYW1zKSAsIFwiY2FsbGJhY2tcIiA6IHJlc29sdmV9KTtcclxuXHJcblx0XHQvL0xhc3QsIHRyeSBwdXJlIGpRdWVyeSBBamF4IHRlY2huaXF1ZSB0byBsb2FkIHRoZSBHb29nbGUgTWFwcyBBUEkgaW4gQXN5bmMuXHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcclxuXHRcdFx0Ly9BamF4IFVSTCBwYXJhbXNcclxuXHRcdFx0cGFyYW1zID0gJC5leHRlbmQoIHBhcmFtcywge1xyXG5cdFx0XHRcdCd2JzogdmVyc2lvbiB8fCAzLFxyXG5cdFx0XHRcdCdjYWxsYmFjayc6IGNhbGxiYWNrTmFtZVxyXG5cdFx0XHR9KTtcclxuXHRcdFx0XHJcblx0XHRcdC8vRGVjbGFyZSB0aGUgZ2xvYmFsIGNhbGxiYWNrXHJcblx0XHRcdHdpbmRvd1tjYWxsYmFja05hbWVdID0gZnVuY3Rpb24oICkge1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdHJlc29sdmUoKTtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHQvL0RlbGV0ZSBjYWxsYmFja1xyXG5cdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHR0cnl7XHJcblx0XHRcdFx0XHRcdGRlbGV0ZSB3aW5kb3dbY2FsbGJhY2tOYW1lXTtcclxuXHRcdFx0XHRcdH0gY2F0Y2goIGUgKSB7fVxyXG5cdFx0XHRcdH0sIDIwKTtcclxuXHRcdFx0fTtcclxuXHRcdFx0XHJcblx0XHRcdC8vQ2FuJ3QgdXNlIHRoZSBqWEhSIHByb21pc2UgYmVjYXVzZSAnc2NyaXB0JyBkb2Vzbid0IHN1cHBvcnQgJ2NhbGxiYWNrPT8nXHJcblx0XHRcdCQuYWpheCh7XHJcblx0XHRcdFx0ZGF0YVR5cGU6ICdzY3JpcHQnLFxyXG5cdFx0XHRcdGRhdGE6IHBhcmFtcyxcclxuXHRcdFx0XHR1cmw6ICdodHRwOi8vbWFwcy5nb29nbGUuY29tL21hcHMvYXBpL2pzJ1x0XHRcdFx0XHJcblx0XHRcdH0pO1xyXG5cdFx0XHRcclxuXHRcdH1cclxuXHRcclxuXHRcdHByb21pc2UgPSBkZWZlcnJlZC5wcm9taXNlKCk7IFxyXG5cdFx0XHJcblx0XHRyZXR1cm4gcHJvbWlzZTtcclxuXHR9O1xyXG5cdFxyXG59KGpRdWVyeSkpO1xyXG4iLCIvKiBnbG9iYWwgY29uc29sZTpmYWxzZSwgZ29vZ2xlOmZhbHNlICovXHJcbi8qanNoaW50IHVudXNlZDpmYWxzZSAqL1xyXG4ndXNlIHN0cmljdCc7XHJcblxyXG5hcHAuY29udHJvbGxlcignTWFwQ3RybCcsIFsnJHNjb3BlJywgZnVuY3Rpb24gKCRzY29wZSkge1xyXG5cclxuICAgICRzY29wZS5teU1hcmtlcnMgPSBbXTtcclxuXHJcbiAgICAkc2NvcGUubWFwT3B0aW9ucyA9IHtcclxuICAgICAgY2VudGVyOiBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKDM1Ljc4NCwgLTc4LjY3MCksXHJcbiAgICAgIHpvb206IDE1LFxyXG4gICAgICBtYXBUeXBlSWQ6IGdvb2dsZS5tYXBzLk1hcFR5cGVJZC5ST0FETUFQXHJcbiAgICB9O1xyXG5cclxuICAgICRzY29wZS5hZGRNYXJrZXIgPSBmdW5jdGlvbiAoJGV2ZW50LCAkcGFyYW1zKSB7XHJcbiAgICAgICRzY29wZS5teU1hcmtlcnMucHVzaChuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcclxuICAgICAgICBtYXA6ICRzY29wZS5teU1hcCxcclxuICAgICAgICBwb3NpdGlvbjogJHBhcmFtc1swXS5sYXRMbmdcclxuICAgICAgfSkpO1xyXG4gICAgfTtcclxuXHJcbiAgICAkc2NvcGUuc2V0Wm9vbU1lc3NhZ2UgPSBmdW5jdGlvbiAoem9vbSkge1xyXG4gICAgICAkc2NvcGUuem9vbU1lc3NhZ2UgPSAnWW91IGp1c3Qgem9vbWVkIHRvICcgKyB6b29tICsgJyEnO1xyXG4gICAgICBjb25zb2xlLmxvZyh6b29tLCAnem9vbWVkJyk7XHJcbiAgICB9O1xyXG5cclxuICAgICRzY29wZS5vcGVuTWFya2VySW5mbyA9IGZ1bmN0aW9uIChtYXJrZXIpIHtcclxuICAgICAgJHNjb3BlLmN1cnJlbnRNYXJrZXIgPSBtYXJrZXI7XHJcbiAgICAgICRzY29wZS5jdXJyZW50TWFya2VyTGF0ID0gbWFya2VyLmdldFBvc2l0aW9uKCkubGF0KCk7XHJcbiAgICAgICRzY29wZS5jdXJyZW50TWFya2VyTG5nID0gbWFya2VyLmdldFBvc2l0aW9uKCkubG5nKCk7XHJcbiAgICAgICRzY29wZS5teUluZm9XaW5kb3cub3Blbigkc2NvcGUubXlNYXAsIG1hcmtlcik7XHJcbiAgICB9O1xyXG5cclxuICAgICRzY29wZS5zZXRNYXJrZXJQb3NpdGlvbiA9IGZ1bmN0aW9uIChtYXJrZXIsIGxhdCwgbG5nKSB7XHJcbiAgICAgIG1hcmtlci5zZXRQb3NpdGlvbihuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKGxhdCwgbG5nKSk7XHJcbiAgICB9O1xyXG4gIH1dKVxyXG47IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuKGZ1bmN0aW9uICgpIHtcclxuICAvL1NldHVwIG1hcCBldmVudHMgZnJvbSBhIGdvb2dsZSBtYXAgb2JqZWN0IHRvIHRyaWdnZXIgb24gYSBnaXZlbiBlbGVtZW50IHRvbyxcclxuICAvL3RoZW4gd2UganVzdCB1c2UgdWktZXZlbnQgdG8gY2F0Y2ggZXZlbnRzIGZyb20gYW4gZWxlbWVudFxyXG4gIGZ1bmN0aW9uIGJpbmRNYXBFdmVudHMoc2NvcGUsIGV2ZW50c1N0ciwgZ29vZ2xlT2JqZWN0LCBlbGVtZW50KSB7XHJcbiAgICBhbmd1bGFyLmZvckVhY2goZXZlbnRzU3RyLnNwbGl0KCcgJyksIGZ1bmN0aW9uIChldmVudE5hbWUpIHtcclxuICAgICAgLy9QcmVmaXggYWxsIGdvb2dsZW1hcCBldmVudHMgd2l0aCAnbWFwLScsIHNvIGVnICdjbGljaydcclxuICAgICAgLy9mb3IgdGhlIGdvb2dsZW1hcCBkb2Vzbid0IGludGVyZmVyZSB3aXRoIGEgbm9ybWFsICdjbGljaycgZXZlbnRcclxuICAgICAgd2luZG93Lmdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKGdvb2dsZU9iamVjdCwgZXZlbnROYW1lLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICBlbGVtZW50LnRyaWdnZXJIYW5kbGVyKCdtYXAtJyArIGV2ZW50TmFtZSwgZXZlbnQpO1xyXG4gICAgICAgIC8vV2UgY3JlYXRlIGFuICRhcHBseSBpZiBpdCBpc24ndCBoYXBwZW5pbmcuIHdlIG5lZWQgYmV0dGVyIHN1cHBvcnQgZm9yIHRoaXNcclxuICAgICAgICAvL1dlIGRvbid0IHdhbnQgdG8gdXNlIHRpbWVvdXQgYmVjYXVzZSB0b25zIG9mIHRoZXNlIGV2ZW50cyBmaXJlIGF0IG9uY2UsXHJcbiAgICAgICAgLy9hbmQgd2Ugb25seSBuZWVkIG9uZSAkYXBwbHlcclxuICAgICAgICBpZiAoIXNjb3BlLiQkcGhhc2UpeyBzY29wZS4kYXBwbHkoKTt9XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBhcHAudmFsdWUoJ3VpTWFwQ29uZmlnJywge30pO1xyXG4gIGFwcC5kaXJlY3RpdmUoJ3VpTWFwJyxcclxuICAgIFsndWlNYXBDb25maWcnLCAnJHBhcnNlJywgZnVuY3Rpb24gKHVpTWFwQ29uZmlnLCAkcGFyc2UpIHtcclxuXHJcbiAgICAgIHZhciBtYXBFdmVudHMgPSAnYm91bmRzX2NoYW5nZWQgY2VudGVyX2NoYW5nZWQgY2xpY2sgZGJsY2xpY2sgZHJhZyBkcmFnZW5kICcgK1xyXG4gICAgICAgICdkcmFnc3RhcnQgaGVhZGluZ19jaGFuZ2VkIGlkbGUgbWFwdHlwZWlkX2NoYW5nZWQgbW91c2Vtb3ZlIG1vdXNlb3V0ICcgK1xyXG4gICAgICAgICdtb3VzZW92ZXIgcHJvamVjdGlvbl9jaGFuZ2VkIHJlc2l6ZSByaWdodGNsaWNrIHRpbGVzbG9hZGVkIHRpbHRfY2hhbmdlZCAnICtcclxuICAgICAgICAnem9vbV9jaGFuZ2VkJztcclxuICAgICAgdmFyIG9wdGlvbnMgPSB1aU1hcENvbmZpZyB8fCB7fTtcclxuXHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgcmVzdHJpY3Q6ICdBJyxcclxuICAgICAgICAvL2RvZXNuJ3Qgd29yayBhcyBFIGZvciB1bmtub3duIHJlYXNvblxyXG4gICAgICAgIGxpbms6IGZ1bmN0aW9uIChzY29wZSwgZWxtLCBhdHRycykge1xyXG4gICAgICAgICAgdmFyIG9wdHMgPSBhbmd1bGFyLmV4dGVuZCh7fSwgb3B0aW9ucywgc2NvcGUuJGV2YWwoYXR0cnMudWlPcHRpb25zKSk7XHJcbiAgICAgICAgICB2YXIgbWFwID0gbmV3IHdpbmRvdy5nb29nbGUubWFwcy5NYXAoZWxtWzBdLCBvcHRzKTtcclxuICAgICAgICAgIHZhciBtb2RlbCA9ICRwYXJzZShhdHRycy51aU1hcCk7XHJcblxyXG4gICAgICAgICAgLy9TZXQgc2NvcGUgdmFyaWFibGUgZm9yIHRoZSBtYXBcclxuICAgICAgICAgIG1vZGVsLmFzc2lnbihzY29wZSwgbWFwKTtcclxuXHJcbiAgICAgICAgICBiaW5kTWFwRXZlbnRzKHNjb3BlLCBtYXBFdmVudHMsIG1hcCwgZWxtKTtcclxuICAgICAgICB9XHJcbiAgICAgIH07XHJcbiAgICB9XSk7XHJcblxyXG4gIGFwcC52YWx1ZSgndWlNYXBJbmZvV2luZG93Q29uZmlnJywge30pO1xyXG4gIGFwcC5kaXJlY3RpdmUoJ3VpTWFwSW5mb1dpbmRvdycsXHJcbiAgICBbJ3VpTWFwSW5mb1dpbmRvd0NvbmZpZycsICckcGFyc2UnLCAnJGNvbXBpbGUnLCBmdW5jdGlvbiAodWlNYXBJbmZvV2luZG93Q29uZmlnLCAkcGFyc2UsICRjb21waWxlKSB7XHJcblxyXG4gICAgICB2YXIgaW5mb1dpbmRvd0V2ZW50cyA9ICdjbG9zZWNsaWNrIGNvbnRlbnRfY2hhbmdlIGRvbXJlYWR5ICcgK1xyXG4gICAgICAgICdwb3NpdGlvbl9jaGFuZ2VkIHppbmRleF9jaGFuZ2VkJztcclxuICAgICAgdmFyIG9wdGlvbnMgPSB1aU1hcEluZm9XaW5kb3dDb25maWcgfHwge307XHJcblxyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIGxpbms6IGZ1bmN0aW9uIChzY29wZSwgZWxtLCBhdHRycykge1xyXG4gICAgICAgICAgdmFyIG9wdHMgPSBhbmd1bGFyLmV4dGVuZCh7fSwgb3B0aW9ucywgc2NvcGUuJGV2YWwoYXR0cnMudWlPcHRpb25zKSk7XHJcbiAgICAgICAgICBvcHRzLmNvbnRlbnQgPSBlbG1bMF07XHJcbiAgICAgICAgICB2YXIgbW9kZWwgPSAkcGFyc2UoYXR0cnMudWlNYXBJbmZvV2luZG93KTtcclxuICAgICAgICAgIHZhciBpbmZvV2luZG93ID0gbW9kZWwoc2NvcGUpO1xyXG5cclxuICAgICAgICAgIGlmICghaW5mb1dpbmRvdykge1xyXG4gICAgICAgICAgICBpbmZvV2luZG93ID0gbmV3IHdpbmRvdy5nb29nbGUubWFwcy5JbmZvV2luZG93KG9wdHMpO1xyXG4gICAgICAgICAgICBtb2RlbC5hc3NpZ24oc2NvcGUsIGluZm9XaW5kb3cpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGJpbmRNYXBFdmVudHMoc2NvcGUsIGluZm9XaW5kb3dFdmVudHMsIGluZm9XaW5kb3csIGVsbSk7XHJcblxyXG4gICAgICAgICAgLyogVGhlIGluZm8gd2luZG93J3MgY29udGVudHMgZG9udCcgbmVlZCB0byBiZSBvbiB0aGUgZG9tIGFueW1vcmUsXHJcbiAgICAgICAgICAgZ29vZ2xlIG1hcHMgaGFzIHRoZW0gc3RvcmVkLiAgU28gd2UganVzdCByZXBsYWNlIHRoZSBpbmZvd2luZG93IGVsZW1lbnRcclxuICAgICAgICAgICB3aXRoIGFuIGVtcHR5IGRpdi4gKHdlIGRvbid0IGp1c3Qgc3RyYWlnaHQgcmVtb3ZlIGl0IGZyb20gdGhlIGRvbSBiZWNhdXNlXHJcbiAgICAgICAgICAgc3RyYWlnaHQgcmVtb3ZpbmcgdGhpbmdzIGZyb20gdGhlIGRvbSBjYW4gbWVzcyB1cCBhbmd1bGFyKSAqL1xyXG4gICAgICAgICAgZWxtLnJlcGxhY2VXaXRoKCc8ZGl2PjwvZGl2PicpO1xyXG5cclxuICAgICAgICAgIC8vRGVjb3JhdGUgaW5mb1dpbmRvdy5vcGVuIHRvICRjb21waWxlIGNvbnRlbnRzIGJlZm9yZSBvcGVuaW5nXHJcbiAgICAgICAgICB2YXIgX29wZW4gPSBpbmZvV2luZG93Lm9wZW47XHJcbiAgICAgICAgICBpbmZvV2luZG93Lm9wZW4gPSBmdW5jdGlvbiBvcGVuKGExLCBhMiwgYTMsIGE0LCBhNSwgYTYpIHtcclxuICAgICAgICAgICAgJGNvbXBpbGUoZWxtLmNvbnRlbnRzKCkpKHNjb3BlKTtcclxuICAgICAgICAgICAgX29wZW4uY2FsbChpbmZvV2luZG93LCBhMSwgYTIsIGEzLCBhNCwgYTUsIGE2KTtcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICB9O1xyXG4gICAgfV0pO1xyXG5cclxuICAvKlxyXG4gICAqIE1hcCBvdmVybGF5IGRpcmVjdGl2ZXMgYWxsIHdvcmsgdGhlIHNhbWUuIFRha2UgbWFwIG1hcmtlciBmb3IgZXhhbXBsZVxyXG4gICAqIDx1aS1tYXAtbWFya2VyPVwibXlNYXJrZXJcIj4gd2lsbCAkd2F0Y2ggJ215TWFya2VyJyBhbmQgZWFjaCB0aW1lIGl0IGNoYW5nZXMsXHJcbiAgICogaXQgd2lsbCBob29rIHVwIG15TWFya2VyJ3MgZXZlbnRzIHRvIHRoZSBkaXJlY3RpdmUgZG9tIGVsZW1lbnQuICBUaGVuXHJcbiAgICogdWktZXZlbnQgd2lsbCBiZSBhYmxlIHRvIGNhdGNoIGFsbCBvZiBteU1hcmtlcidzIGV2ZW50cy4gU3VwZXIgc2ltcGxlLlxyXG4gICAqL1xyXG4gIGZ1bmN0aW9uIG1hcE92ZXJsYXlEaXJlY3RpdmUoZGlyZWN0aXZlTmFtZSwgZXZlbnRzKSB7XHJcbiAgICBhcHAuZGlyZWN0aXZlKGRpcmVjdGl2ZU5hbWUsIFtmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgcmVzdHJpY3Q6ICdBJyxcclxuICAgICAgICBsaW5rOiBmdW5jdGlvbiAoc2NvcGUsIGVsbSwgYXR0cnMpIHtcclxuICAgICAgICAgIHNjb3BlLiR3YXRjaChhdHRyc1tkaXJlY3RpdmVOYW1lXSwgZnVuY3Rpb24gKG5ld09iamVjdCkge1xyXG4gICAgICAgICAgICBpZiAobmV3T2JqZWN0KSB7XHJcbiAgICAgICAgICAgICAgYmluZE1hcEV2ZW50cyhzY29wZSwgZXZlbnRzLCBuZXdPYmplY3QsIGVsbSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfTtcclxuICAgIH1dKTtcclxuICB9XHJcblxyXG4gIG1hcE92ZXJsYXlEaXJlY3RpdmUoJ3VpTWFwTWFya2VyJyxcclxuICAgICdhbmltYXRpb25fY2hhbmdlZCBjbGljayBjbGlja2FibGVfY2hhbmdlZCBjdXJzb3JfY2hhbmdlZCAnICtcclxuICAgICAgJ2RibGNsaWNrIGRyYWcgZHJhZ2VuZCBkcmFnZ2FibGVfY2hhbmdlZCBkcmFnc3RhcnQgZmxhdF9jaGFuZ2VkIGljb25fY2hhbmdlZCAnICtcclxuICAgICAgJ21vdXNlZG93biBtb3VzZW91dCBtb3VzZW92ZXIgbW91c2V1cCBwb3NpdGlvbl9jaGFuZ2VkIHJpZ2h0Y2xpY2sgJyArXHJcbiAgICAgICdzaGFkb3dfY2hhbmdlZCBzaGFwZV9jaGFuZ2VkIHRpdGxlX2NoYW5nZWQgdmlzaWJsZV9jaGFuZ2VkIHppbmRleF9jaGFuZ2VkJyk7XHJcblxyXG4gIG1hcE92ZXJsYXlEaXJlY3RpdmUoJ3VpTWFwUG9seWxpbmUnLFxyXG4gICAgJ2NsaWNrIGRibGNsaWNrIG1vdXNlZG93biBtb3VzZW1vdmUgbW91c2VvdXQgbW91c2VvdmVyIG1vdXNldXAgcmlnaHRjbGljaycpO1xyXG5cclxuICBtYXBPdmVybGF5RGlyZWN0aXZlKCd1aU1hcFBvbHlnb24nLFxyXG4gICAgJ2NsaWNrIGRibGNsaWNrIG1vdXNlZG93biBtb3VzZW1vdmUgbW91c2VvdXQgbW91c2VvdmVyIG1vdXNldXAgcmlnaHRjbGljaycpO1xyXG5cclxuICBtYXBPdmVybGF5RGlyZWN0aXZlKCd1aU1hcFJlY3RhbmdsZScsXHJcbiAgICAnYm91bmRzX2NoYW5nZWQgY2xpY2sgZGJsY2xpY2sgbW91c2Vkb3duIG1vdXNlbW92ZSBtb3VzZW91dCBtb3VzZW92ZXIgJyArXHJcbiAgICAgICdtb3VzZXVwIHJpZ2h0Y2xpY2snKTtcclxuXHJcbiAgbWFwT3ZlcmxheURpcmVjdGl2ZSgndWlNYXBDaXJjbGUnLFxyXG4gICAgJ2NlbnRlcl9jaGFuZ2VkIGNsaWNrIGRibGNsaWNrIG1vdXNlZG93biBtb3VzZW1vdmUgJyArXHJcbiAgICAgICdtb3VzZW91dCBtb3VzZW92ZXIgbW91c2V1cCByYWRpdXNfY2hhbmdlZCByaWdodGNsaWNrJyk7XHJcblxyXG4gIG1hcE92ZXJsYXlEaXJlY3RpdmUoJ3VpTWFwR3JvdW5kT3ZlcmxheScsXHJcbiAgICAnY2xpY2sgZGJsY2xpY2snKTtcclxuXHJcbn0pKCk7XHJcbiIsImFwcC5jb250cm9sbGVyKCdNdXNpY0N0cmwnLFxyXG4gIFtcIiRzY2VcIiwnJHNjb3BlJywgZnVuY3Rpb24gKCRzY2UsICRzY29wZSkgeyAgICBcclxuICAgICRzY29wZS5BUEkgPSBudWxsO1xyXG4gICAgJHNjb3BlLmFjdGl2ZSA9IDA7XHJcblxyXG4gICAgJHNjb3BlLmF1ZGlvcyA9IFtcclxuICAgICAge1xyXG4gICAgICAgIHRpdGxlOiBcIjEuIExlbnRlbWVudFwiLFxyXG4gICAgICAgIGFydGlzdDpcIk1pYW93XCIsXHJcbiAgICAgICAgcG9zdGVyOiBcImltZy9iMC5qcGdcIixcclxuICAgICAgICBzb3VyY2VzOiBbXHJcbiAgICAgICAgICB7c3JjOiAkc2NlLnRydXN0QXNSZXNvdXJjZVVybChcImh0dHA6Ly9mbGF0ZnVsbC5jb20vdGhlbWVzL2Fzc2V0cy9tdXNpY3MvTWlhb3ctMDMtTGVudGVtZW50Lm1wM1wiKSwgdHlwZTogXCJhdWRpby9tcGVnXCJ9LFxyXG4gICAgICAgICAge3NyYzogJHNjZS50cnVzdEFzUmVzb3VyY2VVcmwoXCJodHRwOi8vZmxhdGZ1bGwuY29tL3RoZW1lcy9hc3NldHMvbXVzaWNzL01pYW93LTAzLUxlbnRlbWVudC5vZ2dcIiksIHR5cGU6IFwiYXVkaW8vb2dnXCJ9XHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdGl0bGU6IFwiMi4gQnViYmxlXCIsXHJcbiAgICAgICAgYXJ0aXN0OlwiTWlhb3dcIixcclxuICAgICAgICBwb3N0ZXI6IFwiaW1nL2IxLmpwZ1wiLFxyXG4gICAgICAgIHNvdXJjZXM6IFtcclxuICAgICAgICAgIHtzcmM6ICRzY2UudHJ1c3RBc1Jlc291cmNlVXJsKFwiaHR0cDovL2ZsYXRmdWxsLmNvbS90aGVtZXMvYXNzZXRzL211c2ljcy9NaWFvdy0wNy1CdWJibGUubXAzXCIpLCB0eXBlOiBcImF1ZGlvL21wZWdcIn0sXHJcbiAgICAgICAgICB7c3JjOiAkc2NlLnRydXN0QXNSZXNvdXJjZVVybChcImh0dHA6Ly9mbGF0ZnVsbC5jb20vdGhlbWVzL2Fzc2V0cy9tdXNpY3MvTWlhb3ctMDctQnViYmxlLm9nZ1wiKSwgdHlwZTogXCJhdWRpby9vZ2dcIn1cclxuICAgICAgICBdXHJcbiAgICAgIH0sICAgICAgXHJcbiAgICAgIHtcclxuICAgICAgICB0aXRsZTogXCIzLiBQYXJ0aXJcIixcclxuICAgICAgICBhcnRpc3Q6XCJNaWFvd1wiLFxyXG4gICAgICAgIHBvc3RlcjogXCJpbWcvYjIuanBnXCIsXHJcbiAgICAgICAgc291cmNlczogW1xyXG4gICAgICAgICAge3NyYzogJHNjZS50cnVzdEFzUmVzb3VyY2VVcmwoXCJodHRwOi8vZmxhdGZ1bGwuY29tL3RoZW1lcy9hc3NldHMvbXVzaWNzL01pYW93LTA5LVBhcnRpci5tcDNcIiksIHR5cGU6IFwiYXVkaW8vbXBlZ1wifSxcclxuICAgICAgICAgIHtzcmM6ICRzY2UudHJ1c3RBc1Jlc291cmNlVXJsKFwiaHR0cDovL2ZsYXRmdWxsLmNvbS90aGVtZXMvYXNzZXRzL211c2ljcy9NaWFvdy0wOS1QYXJ0aXIub2dnXCIpLCB0eXBlOiBcImF1ZGlvL29nZ1wifVxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgXTtcclxuXHJcbiAgICAkc2NvcGUuY29uZmlnID0ge1xyXG4gICAgICBzb3VyY2VzOiAkc2NvcGUuYXVkaW9zWzBdLnNvdXJjZXMsXHJcbiAgICAgIHRpdGxlOiAkc2NvcGUuYXVkaW9zWzBdLnRpdGxlLFxyXG4gICAgICByZXBlYXQ6IGZhbHNlLFxyXG4gICAgICBzaHVmZmxlOiBmYWxzZSxcclxuICAgICAgYXV0b1BsYXk6IHRydWUsXHJcbiAgICAgIHRoZW1lOiB7XHJcbiAgICAgICAgdXJsOiBcImpzL2FwcC9tdXNpYy92aWRlb2d1bGFyLmNzc1wiXHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgJHNjb3BlLm9uUGxheWVyUmVhZHkgPSBmdW5jdGlvbihBUEkpIHtcclxuICAgICAgJHNjb3BlLkFQSSA9IEFQSTtcclxuICAgICAgaWYgKCRzY29wZS5BUEkuY3VycmVudFN0YXRlID09ICdwbGF5JyB8fCAkc2NvcGUuaXNDb21wbGV0ZWQpICRzY29wZS5BUEkucGxheSgpO1xyXG4gICAgICAkc2NvcGUuaXNDb21wbGV0ZWQgPSBmYWxzZTtcclxuICAgIH07XHJcblxyXG4gICAgJHNjb3BlLm9uQ29tcGxldGUgPSBmdW5jdGlvbigpIHtcclxuICAgICAgJHNjb3BlLmlzQ29tcGxldGVkID0gdHJ1ZTtcclxuICAgICAgLy8gc2h1ZmZsZVxyXG4gICAgICBpZigkc2NvcGUuY29uZmlnLnNodWZmbGUpe1xyXG4gICAgICAgICRzY29wZS5hY3RpdmUgPSAkc2NvcGUuZ2V0UmFuZG9tKCRzY29wZS5hY3RpdmUpO1xyXG4gICAgICAvLyBuZXh0IGl0ZW1cclxuICAgICAgfWVsc2V7XHJcbiAgICAgICAgJHNjb3BlLmFjdGl2ZSsrO1xyXG4gICAgICB9XHJcbiAgICAgIFxyXG4gICAgICAvLyBsYXN0IGl0ZW1cclxuICAgICAgaWYgKCRzY29wZS5hY3RpdmUgPj0gJHNjb3BlLmF1ZGlvcy5sZW5ndGgpIHtcclxuICAgICAgICAkc2NvcGUuYWN0aXZlID0gMDtcclxuICAgICAgICAvLyByZXBlYXRcclxuICAgICAgICBpZigkc2NvcGUuY29uZmlnLnJlcGVhdCl7XHJcbiAgICAgICAgICAkc2NvcGUuc2V0QWN0aXZlKCRzY29wZS5hY3RpdmUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfWVsc2V7XHJcbiAgICAgICAgJHNjb3BlLnNldEFjdGl2ZSgkc2NvcGUuYWN0aXZlKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAkc2NvcGUuZ2V0UmFuZG9tID0gZnVuY3Rpb24oaW5kZXgpe1xyXG4gICAgICB2YXIgaSA9IE1hdGguZmxvb3IoIE1hdGgucmFuZG9tKCkgKiAkc2NvcGUuYXVkaW9zLmxlbmd0aCApO1xyXG4gICAgICBpZiAoICEoaS1pbmRleCkgKXtcclxuICAgICAgICBpID0gJHNjb3BlLmdldFJhbmRvbSggaW5kZXggKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gaTtcclxuICAgIH1cclxuXHJcbiAgICAkc2NvcGUucGxheSA9IGZ1bmN0aW9uKGluZGV4KXtcclxuICAgICAgJHNjb3BlLmlzQ29tcGxldGVkID0gdHJ1ZTtcclxuICAgICAgLy8gZ2V0IHByZXYgb3IgbmV4dCBpdGVtXHJcbiAgICAgIGluZGV4ID09IFwibmV4dFwiID8gJHNjb3BlLmFjdGl2ZSsrIDogJHNjb3BlLmFjdGl2ZS0tO1xyXG4gICAgICBpZiAoJHNjb3BlLmFjdGl2ZSA+PSAkc2NvcGUuYXVkaW9zLmxlbmd0aCkgJHNjb3BlLmFjdGl2ZSA9IDA7XHJcbiAgICAgIGlmICgkc2NvcGUuYWN0aXZlID09IC0xKSAkc2NvcGUuYWN0aXZlID0gJHNjb3BlLmF1ZGlvcy5sZW5ndGggLSAxO1xyXG4gICAgICAvLyBwbGF5IGl0XHJcbiAgICAgICRzY29wZS5zZXRBY3RpdmUoJHNjb3BlLmFjdGl2ZSk7XHJcbiAgICB9O1xyXG5cclxuICAgICRzY29wZS5zZXRBY3RpdmUgPSBmdW5jdGlvbihpbmRleCl7XHJcbiAgICAgICRzY29wZS5BUEkuc3RvcCgpO1xyXG4gICAgICAkc2NvcGUuY29uZmlnLnNvdXJjZXMgPSAkc2NvcGUuYXVkaW9zW2luZGV4XS5zb3VyY2VzO1xyXG4gICAgICAkc2NvcGUuY29uZmlnLnRpdGxlID0gJHNjb3BlLmF1ZGlvc1tpbmRleF0udGl0bGU7XHJcbiAgICB9O1xyXG5cclxuICAgICRzY29wZS50b2dnbGVSZXBlYXQgPSBmdW5jdGlvbigpe1xyXG4gICAgICAkc2NvcGUuY29uZmlnLnJlcGVhdCA9ICEkc2NvcGUuY29uZmlnLnJlcGVhdDtcclxuICAgICAgaWYgKCRzY29wZS5pc0NvbXBsZXRlZCkgJHNjb3BlLkFQSS5wbGF5KCk7XHJcbiAgICB9O1xyXG5cclxuICAgICRzY29wZS50b2dnbGVTaHVmZmxlID0gZnVuY3Rpb24oKXtcclxuICAgICAgJHNjb3BlLmNvbmZpZy5zaHVmZmxlID0gISRzY29wZS5jb25maWcuc2h1ZmZsZTtcclxuICAgICAgY29uc29sZS5sb2coJHNjb3BlLkFQSS5jdXJyZW50U3RhdGUpO1xyXG4gICAgICBpZiAoJHNjb3BlLmlzQ29tcGxldGVkKSAkc2NvcGUuQVBJLnBsYXkoKTtcclxuICAgIH07XHJcblxyXG4gICAgLy8gdmlkZW9cclxuICAgICRzY29wZS52aWRlbyA9IHtcclxuICAgICAgc291cmNlczogW1xyXG4gICAgICAgIHtzcmM6ICRzY2UudHJ1c3RBc1Jlc291cmNlVXJsKFwiaHR0cDovL2ZsYXRmdWxsLmNvbS90aGVtZXMvYXNzZXRzL3ZpZGVvL2JpZ19idWNrX2J1bm55X3RyYWlsZXIubTR2XCIpLCB0eXBlOiBcInZpZGVvL21wNFwifSxcclxuICAgICAgICB7c3JjOiAkc2NlLnRydXN0QXNSZXNvdXJjZVVybChcImh0dHA6Ly9mbGF0ZnVsbC5jb20vdGhlbWVzL2Fzc2V0cy92aWRlby9iaWdfYnVja19idW5ueV90cmFpbGVyLndlYm1cIiksIHR5cGU6IFwidmlkZW8vd2VibVwifSxcclxuICAgICAgICB7c3JjOiAkc2NlLnRydXN0QXNSZXNvdXJjZVVybChcImh0dHA6Ly9mbGF0ZnVsbC5jb20vdGhlbWVzL2Fzc2V0cy92aWRlby9iaWdfYnVja19idW5ueV90cmFpbGVyLm9ndlwiKSwgdHlwZTogXCJ2aWRlby9vZ2dcIn1cclxuICAgICAgXSxcclxuICAgICAgdGhlbWU6IHtcclxuICAgICAgICB1cmw6IFwianMvYXBwL211c2ljL3ZpZGVvZ3VsYXIuY3NzXCJcclxuICAgICAgfSxcclxuICAgICAgcGx1Z2luczoge1xyXG4gICAgICAgIGNvbnRyb2xzOiB7XHJcbiAgICAgICAgICBhdXRvSGlkZTogdHJ1ZSxcclxuICAgICAgICAgIGF1dG9IaWRlVGltZTogNTAwMFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcG9zdGVyOiBcImltZy9jMS5qcGdcIlxyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICB9XVxyXG4pOyIsImFwcC5jb250cm9sbGVyKCdOb3RlQ3RybCcsIFsnJHNjb3BlJywgJyRodHRwJywgZnVuY3Rpb24oJHNjb3BlLCAkaHR0cCkge1xyXG4gICRodHRwLmdldCgnanMvYXBwL25vdGUvbm90ZXMuanNvbicpLnRoZW4oZnVuY3Rpb24gKHJlc3ApIHtcclxuICAgICRzY29wZS5ub3RlcyA9IHJlc3AuZGF0YS5ub3RlcztcclxuICAgIC8vIHNldCBkZWZhdWx0IG5vdGVcclxuICAgICRzY29wZS5ub3RlID0gJHNjb3BlLm5vdGVzWzBdO1xyXG4gICAgJHNjb3BlLm5vdGVzWzBdLnNlbGVjdGVkID0gdHJ1ZTtcclxuICB9KTtcclxuXHJcbiAgJHNjb3BlLmNvbG9ycyA9IFsncHJpbWFyeScsICdpbmZvJywgJ3N1Y2Nlc3MnLCAnd2FybmluZycsICdkYW5nZXInLCAnZGFyayddO1xyXG5cclxuICAkc2NvcGUuY3JlYXRlTm90ZSA9IGZ1bmN0aW9uKCl7XHJcbiAgICB2YXIgbm90ZSA9IHtcclxuICAgICAgY29udGVudDogJ05ldyBub3RlJyxcclxuICAgICAgY29sb3I6ICRzY29wZS5jb2xvcnNbTWF0aC5mbG9vcigoTWF0aC5yYW5kb20oKSozKSldLFxyXG4gICAgICBkYXRlOiBEYXRlLm5vdygpXHJcbiAgICB9O1xyXG4gICAgJHNjb3BlLm5vdGVzLnB1c2gobm90ZSk7XHJcbiAgICAkc2NvcGUuc2VsZWN0Tm90ZShub3RlKTtcclxuICB9XHJcblxyXG4gICRzY29wZS5kZWxldGVOb3RlID0gZnVuY3Rpb24obm90ZSl7XHJcbiAgICAkc2NvcGUubm90ZXMuc3BsaWNlKCRzY29wZS5ub3Rlcy5pbmRleE9mKG5vdGUpLCAxKTtcclxuICAgIGlmKG5vdGUuc2VsZWN0ZWQpe1xyXG4gICAgICAkc2NvcGUubm90ZSA9ICRzY29wZS5ub3Rlc1swXTtcclxuICAgICAgJHNjb3BlLm5vdGVzLmxlbmd0aCAmJiAoJHNjb3BlLm5vdGVzWzBdLnNlbGVjdGVkID0gdHJ1ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAkc2NvcGUuc2VsZWN0Tm90ZSA9IGZ1bmN0aW9uKG5vdGUpe1xyXG4gICAgYW5ndWxhci5mb3JFYWNoKCRzY29wZS5ub3RlcywgZnVuY3Rpb24obm90ZSkge1xyXG4gICAgICBub3RlLnNlbGVjdGVkID0gZmFsc2U7XHJcbiAgICB9KTtcclxuICAgICRzY29wZS5ub3RlID0gbm90ZTtcclxuICAgICRzY29wZS5ub3RlLnNlbGVjdGVkID0gdHJ1ZTtcclxuICB9XHJcblxyXG59XSk7IiwidmFyIGFuZ3VsYXJTa3ljb25zID0gYW5ndWxhci5tb2R1bGUoICdhbmd1bGFyLXNreWNvbnMnLCBbXSApO1xuXG5cbmFuZ3VsYXJTa3ljb25zLmRpcmVjdGl2ZSggJ3NreWNvbicsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgICByZXBsYWNlOiB0cnVlLFxuICAgICAgICBzY29wZToge1xuICAgICAgICAgICAgaWNvbjogXCI9XCIsXG4gICAgICAgICAgICBzaXplOiBcIj1cIlxuICAgICAgICB9LFxuICAgICAgICBsaW5rOiBmdW5jdGlvbiAoIHNjb3BlLCBlbGVtZW50LCBhdHRycyApIHtcblxuICAgICAgICAgICAgLy8gbWFrZSBhIGNhbnZhcyBmb3Igb3VyIGljb25cbiAgICAgICAgICAgIHZhciBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnY2FudmFzJyApO1xuXG4gICAgICAgICAgICAvLyBzZXQgdGhlIENTUyBjbGFzcyBmcm9tIGF0dHJpYnV0ZVxuICAgICAgICAgICAgaWYgKCAhYXR0cnMuY2xhc3MgKSB7XG4gICAgICAgICAgICAgICAgY2FudmFzLmNsYXNzTmFtZSA9IFwiXCI7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNhbnZhcy5jbGFzc05hbWUgPSBhdHRycy5jbGFzcztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gc2V0IGRlZmF1bHQgY29sb3IgaWYgXCJjb2xvclwiIGF0dHJpYnV0ZSBub3QgcHJlc2VudFxuICAgICAgICAgICAgdmFyIGNvbmZpZyA9IHt9O1xuICAgICAgICAgICAgaWYgKCAhYXR0cnMuY29sb3IgKSB7XG4gICAgICAgICAgICAgICAgY29uZmlnLmNvbG9yID0gXCJibGFja1wiO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25maWcuY29sb3IgPSBhdHRycy5jb2xvcjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHNreWNvbnMgPSBuZXcgU2t5Y29ucyggY29uZmlnICk7XG5cbiAgICAgICAgICAgIC8vIHdhdGNoIHRoZSBzaXplIHByb3BlcnR5IGZyb20gdGhlIGNvbnRyb2xsZXJcbiAgICAgICAgICAgIHNjb3BlLiR3YXRjaCggXCJzaXplXCIsIGZ1bmN0aW9uICggbmV3VmFsLCBvbGRWYWwgKSB7XG4gICAgICAgICAgICAgICAgaWYgKCBuZXdWYWwgKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbnZhcy5oZWlnaHQgPSBuZXdWYWw7XG4gICAgICAgICAgICAgICAgICAgIGNhbnZhcy53aWR0aCA9IG5ld1ZhbDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjYW52YXMuaGVpZ2h0ID0gc2NvcGUuc2l6ZSB8fCA2NDtcbiAgICAgICAgICAgICAgICAgICAgY2FudmFzLndpZHRoID0gc2NvcGUuc2l6ZSAgfHwgNjQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgdHJ1ZSApO1xuXG4gICAgICAgICAgICAvLyB3YXRjaCB0aGUgaWNvbiBwcm9wZXJ0eSBmcm9tIHRoZSBjb250cm9sbGVyXG4gICAgICAgICAgICBzY29wZS4kd2F0Y2goIFwiaWNvblwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2t5Y29ucy5zZXQoIGNhbnZhcywgc2NvcGUuaWNvbiApO1xuICAgICAgICAgICAgfSwgdHJ1ZSApO1xuXG4gICAgICAgICAgICBza3ljb25zLnBsYXkoKTtcblxuICAgICAgICAgICAgaWYgKCBlbGVtZW50WzBdLm5vZGVUeXBlID09PSA4ICkge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQucmVwbGFjZVdpdGgoIGNhbnZhcyApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50WzBdLmFwcGVuZENoaWxkKCBjYW52YXMgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBza3ljb25zLnJlbW92ZShjYW52YXMpO1xuICAgICAgICAgICAgICAgIGlmIChza3ljb25zLmxpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHNreWNvbnMucGF1c2UoY2FudmFzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG59ICk7XG4iLCJhcHAuY29udHJvbGxlcihcIldlYXRoZXJDdHJsXCIsIFsnJHNjb3BlJywgJ3lhaG9vQXBpJywgJ2dlb0FwaScsIGZ1bmN0aW9uKCRzY29wZSwgeWFob29BcGksIGdlb0FwaSkge1xyXG4gICAgJHNjb3BlLnVzZXJTZWFyY2hUZXh0ID0gJyc7XHJcbiAgICAkc2NvcGUuc2VhcmNoID0ge307XHJcbiAgICAkc2NvcGUuZm9yY2FzdCA9IHt9O1xyXG4gICAgJHNjb3BlLnBsYWNlID0ge307XHJcbiAgICAkc2NvcGUuZGF0YSA9IHt9O1xyXG5cclxuICAgIC8vIGdldCBwbGFjZVxyXG4gICAgZ2VvQXBpLnRoZW4oZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICRzY29wZS51c2VyU2VhcmNoVGV4dCA9IHJlcy5kYXRhLmNpdHkrXCIsIFwiK3Jlcy5kYXRhLmNvdW50cnlfY29kZTtcclxuICAgICAgJHNjb3BlLmdldExvY2F0aW9ucygpO1xyXG4gICAgfSk7XHJcbiAgICBcclxuICAgIC8vIGdldCBsb2NhdGlvbnNcclxuICAgICRzY29wZS5nZXRMb2NhdGlvbnMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHZhciBxdWVyeSA9ICdzZWxlY3QgKiBmcm9tIGdlby5wbGFjZXMgd2hlcmUgdGV4dD1cIicgKyAkc2NvcGUudXNlclNlYXJjaFRleHQgKyAnXCInO1xyXG4gICAgICB5YWhvb0FwaS5xdWVyeSh7J3EnOnF1ZXJ5LCdmb3JtYXQnOidqc29uJ30sIHt9LCBmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAkc2NvcGUuc2VhcmNoID0gcmVzcG9uc2U7XHJcbiAgICAgICAgaWYocmVzcG9uc2UucXVlcnkuY291bnQgPT09IDEgJiYgIXJlc3BvbnNlLnF1ZXJ5LnJlc3VsdHMuY2hhbm5lbCl7XHJcbiAgICAgICAgICAkc2NvcGUuZ2V0V2VhdGhlciggcmVzcG9uc2UucXVlcnkucmVzdWx0cy5wbGFjZS53b2VpZCwgcmVzcG9uc2UucXVlcnkucmVzdWx0cy5wbGFjZS5uYW1lLCByZXNwb25zZS5xdWVyeS5yZXN1bHRzLnBsYWNlLmNvdW50cnkuY29udGVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgLy8gZ2V0IHdlYXRoZXJcclxuICAgICRzY29wZS5nZXRXZWF0aGVyID0gZnVuY3Rpb24od29laWQsIGNpdHksIGNvdW50cnkpe1xyXG4gICAgICAkc2NvcGUucGxhY2UuY2l0eSA9IGNpdHk7XHJcbiAgICAgICRzY29wZS5wbGFjZS5jb3VudHJ5ID0gY291bnRyeTtcclxuICAgICAgdmFyIHF1ZXJ5ID0gJ3NlbGVjdCBpdGVtIGZyb20gd2VhdGhlci5mb3JlY2FzdCB3aGVyZSB3b2VpZD0nICsgd29laWQ7XHJcbiAgICAgIHlhaG9vQXBpLnF1ZXJ5KHsncSc6cXVlcnksJ2Zvcm1hdCc6J2pzb24nfSwge30sIGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgIHJlc3BvbnNlLnF1ZXJ5LnJlc3VsdHMuY2hhbm5lbC5pdGVtLmZvcmVjYXN0LmZvckVhY2goZnVuY3Rpb24oaSwgdikge1xyXG4gICAgICAgICAgaS5pY29uID0gJHNjb3BlLmdldEN1c3RvbUljb24oaS5jb2RlKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXNwb25zZS5xdWVyeS5yZXN1bHRzLmNoYW5uZWwuaXRlbS5jb25kaXRpb24uaWNvbiA9ICRzY29wZS5nZXRDdXN0b21JY29uKHJlc3BvbnNlLnF1ZXJ5LnJlc3VsdHMuY2hhbm5lbC5pdGVtLmNvbmRpdGlvbi5jb2RlKTtcclxuICAgICAgICAkc2NvcGUuZGF0YSA9IHJlc3BvbnNlO1xyXG4gICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgJHNjb3BlLmdldEN1c3RvbUljb24gPSBmdW5jdGlvbiAoY29uZGl0aW9uKSB7XHJcbiAgICAgIHN3aXRjaCAoY29uZGl0aW9uKSB7XHJcbiAgICAgICAgY2FzZSBcIjBcIjpcclxuICAgICAgICBjYXNlIFwiMVwiOlxyXG4gICAgICAgIGNhc2UgXCIyXCI6XHJcbiAgICAgICAgY2FzZSBcIjI0XCI6XHJcbiAgICAgICAgY2FzZSBcIjI1XCI6XHJcbiAgICAgICAgICAgIHJldHVybiBcIndpbmRcIjtcclxuICAgICAgICBjYXNlIFwiNVwiOlxyXG4gICAgICAgIGNhc2UgXCI2XCI6XHJcbiAgICAgICAgY2FzZSBcIjdcIjogICAgICAgIFxyXG4gICAgICAgIGNhc2UgXCIxOFwiOiAgICAgICAgXHJcbiAgICAgICAgICAgIHJldHVybiBcInNsZWV0XCI7XHJcbiAgICAgICAgY2FzZSBcIjNcIjpcclxuICAgICAgICBjYXNlIFwiNFwiOlxyXG4gICAgICAgIGNhc2UgXCI4XCI6ICAgICAgICBcclxuICAgICAgICBjYXNlIFwiOVwiOlxyXG4gICAgICAgIGNhc2UgXCIxMFwiOlxyXG4gICAgICAgIGNhc2UgXCIxMVwiOlxyXG4gICAgICAgIGNhc2UgXCIxMlwiOlxyXG4gICAgICAgIGNhc2UgXCIzNVwiOlxyXG4gICAgICAgIGNhc2UgXCIzN1wiOlxyXG4gICAgICAgIGNhc2UgXCIzOFwiOlxyXG4gICAgICAgIGNhc2UgXCIzOVwiOiAgICAgICAgXHJcbiAgICAgICAgY2FzZSBcIjQwXCI6XHJcbiAgICAgICAgY2FzZSBcIjQ1XCI6XHJcbiAgICAgICAgY2FzZSBcIjQ3XCI6XHJcbiAgICAgICAgICAgIHJldHVybiBcInJhaW5cIjtcclxuICAgICAgICBjYXNlIFwiMTNcIjpcclxuICAgICAgICBjYXNlIFwiMTRcIjpcclxuICAgICAgICBjYXNlIFwiMTVcIjpcclxuICAgICAgICBjYXNlIFwiMTZcIjpcclxuICAgICAgICBjYXNlIFwiMTdcIjpcclxuICAgICAgICBjYXNlIFwiNDFcIjpcclxuICAgICAgICBjYXNlIFwiNDJcIjpcclxuICAgICAgICBjYXNlIFwiNDNcIjpcclxuICAgICAgICBjYXNlIFwiNDZcIjpcclxuICAgICAgICAgICAgcmV0dXJuIFwic25vd1wiO1xyXG4gICAgICAgIGNhc2UgXCIxOVwiOlxyXG4gICAgICAgIGNhc2UgXCIyMFwiOlxyXG4gICAgICAgIGNhc2UgXCIyMVwiOlxyXG4gICAgICAgIGNhc2UgXCIyMlwiOlxyXG4gICAgICAgIGNhc2UgXCIyM1wiOlxyXG4gICAgICAgICAgICByZXR1cm4gXCJmb2dcIjsgICAgICAgIFxyXG4gICAgICAgIGNhc2UgXCIyNlwiOlxyXG4gICAgICAgIGNhc2UgXCIyN1wiOlxyXG4gICAgICAgIGNhc2UgXCIyOFwiOlxyXG4gICAgICAgIGNhc2UgXCI0NFwiOlxyXG4gICAgICAgICAgICByZXR1cm4gXCJjbG91ZHlcIjtcclxuICAgICAgICBjYXNlIFwiMjlcIjpcclxuICAgICAgICAgICAgcmV0dXJuIFwicGFydGx5LWNsb3VkeS1uaWdodFwiO1xyXG4gICAgICAgIGNhc2UgXCIzMFwiOlxyXG4gICAgICAgICAgICByZXR1cm4gXCJwYXJ0bHktY2xvdWR5LWRheVwiO1xyXG4gICAgICAgIGNhc2UgXCIzMVwiOlxyXG4gICAgICAgIGNhc2UgXCIzM1wiOlxyXG4gICAgICAgICAgICByZXR1cm4gXCJjbGVhci1uaWdodFwiO1xyXG4gICAgICAgIGNhc2UgXCIzMlwiOlxyXG4gICAgICAgIGNhc2UgXCIzNFwiOlxyXG4gICAgICAgIGNhc2UgXCIzNlwiOlxyXG4gICAgICAgICAgICByZXR1cm4gXCJjbGVhci1kYXlcIjtcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXSk7XHJcblxyXG5hcHAuZmFjdG9yeSgneWFob29BcGknLCBbJyRyZXNvdXJjZScsIGZ1bmN0aW9uKCRyZXNvdXJjZSkge1xyXG4gIHJldHVybiAkcmVzb3VyY2UoJ2h0dHA6Ly9xdWVyeS55YWhvb2FwaXMuY29tL3YxL3B1YmxpYy95cWwnLCB7fSwgXHJcbiAgICB7J3F1ZXJ5JzogXHJcbiAgICAgIHtcclxuICAgICAgICBtZXRob2Q6ICdHRVQnLCBcclxuICAgICAgICBpc0FycmF5OiBmYWxzZVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgKTtcclxufV0pO1xyXG5cclxuYXBwLmZhY3RvcnkoJ2dlb0FwaScsIFsnJGh0dHAnLCBmdW5jdGlvbigkaHR0cCkge1xyXG4gICAgcmV0dXJuICRodHRwLmpzb25wKFwiaHR0cDovL211c2xpbXNhbGF0LmNvbS9kYWlseS5qc29uP2NhbGxiYWNrPUpTT05fQ0FMTEJBQ0tcIik7XHJcbiAgfVxyXG5dKTtcclxuXHJcbmZ1bmN0aW9uIEpTT05fQ0FMTEJBQ0soKXtcclxuICAvLyBOb3RoaW5nXHJcbn0iLCIoZnVuY3Rpb24oZ2xvYmFsKSB7XHJcbiAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gIC8qIFNldCB1cCBhIFJlcXVlc3RBbmltYXRpb25GcmFtZSBzaGltIHNvIHdlIGNhbiBhbmltYXRlIGVmZmljaWVudGx5IEZPUlxyXG4gICAqIEdSRUFUIEpVU1RJQ0UuICovXHJcbiAgdmFyIHJlcXVlc3RJbnRlcnZhbCwgY2FuY2VsSW50ZXJ2YWw7XHJcblxyXG4gIChmdW5jdGlvbigpIHtcclxuICAgIHZhciByYWYgPSBnbG9iYWwucmVxdWVzdEFuaW1hdGlvbkZyYW1lICAgICAgIHx8XHJcbiAgICAgICAgICAgICAgZ2xvYmFsLndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxyXG4gICAgICAgICAgICAgIGdsb2JhbC5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgfHxcclxuICAgICAgICAgICAgICBnbG9iYWwub1JlcXVlc3RBbmltYXRpb25GcmFtZSAgICAgIHx8XHJcbiAgICAgICAgICAgICAgZ2xvYmFsLm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lICAgICAsXHJcbiAgICAgICAgY2FmID0gZ2xvYmFsLmNhbmNlbEFuaW1hdGlvbkZyYW1lICAgICAgICB8fFxyXG4gICAgICAgICAgICAgIGdsb2JhbC53ZWJraXRDYW5jZWxBbmltYXRpb25GcmFtZSAgfHxcclxuICAgICAgICAgICAgICBnbG9iYWwubW96Q2FuY2VsQW5pbWF0aW9uRnJhbWUgICAgIHx8XHJcbiAgICAgICAgICAgICAgZ2xvYmFsLm9DYW5jZWxBbmltYXRpb25GcmFtZSAgICAgICB8fFxyXG4gICAgICAgICAgICAgIGdsb2JhbC5tc0NhbmNlbEFuaW1hdGlvbkZyYW1lICAgICAgO1xyXG5cclxuICAgIGlmKHJhZiAmJiBjYWYpIHtcclxuICAgICAgcmVxdWVzdEludGVydmFsID0gZnVuY3Rpb24oZm4sIGRlbGF5KSB7XHJcbiAgICAgICAgdmFyIGhhbmRsZSA9IHt2YWx1ZTogbnVsbH07XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGxvb3AoKSB7XHJcbiAgICAgICAgICBoYW5kbGUudmFsdWUgPSByYWYobG9vcCk7XHJcbiAgICAgICAgICBmbigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbG9vcCgpO1xyXG4gICAgICAgIHJldHVybiBoYW5kbGU7XHJcbiAgICAgIH07XHJcblxyXG4gICAgICBjYW5jZWxJbnRlcnZhbCA9IGZ1bmN0aW9uKGhhbmRsZSkge1xyXG4gICAgICAgIGNhZihoYW5kbGUudmFsdWUpO1xyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGVsc2Uge1xyXG4gICAgICByZXF1ZXN0SW50ZXJ2YWwgPSBzZXRJbnRlcnZhbDtcclxuICAgICAgY2FuY2VsSW50ZXJ2YWwgPSBjbGVhckludGVydmFsO1xyXG4gICAgfVxyXG4gIH0oKSk7XHJcblxyXG4gIC8qIENhdG11bGwtcm9tIHNwbGluZSBzdHVmZnMuICovXHJcbiAgLypcclxuICBmdW5jdGlvbiB1cHNhbXBsZShuLCBzcGxpbmUpIHtcclxuICAgIHZhciBwb2x5bGluZSA9IFtdLFxyXG4gICAgICAgIGxlbiA9IHNwbGluZS5sZW5ndGgsXHJcbiAgICAgICAgYnggID0gc3BsaW5lWzBdLFxyXG4gICAgICAgIGJ5ICA9IHNwbGluZVsxXSxcclxuICAgICAgICBjeCAgPSBzcGxpbmVbMl0sXHJcbiAgICAgICAgY3kgID0gc3BsaW5lWzNdLFxyXG4gICAgICAgIGR4ICA9IHNwbGluZVs0XSxcclxuICAgICAgICBkeSAgPSBzcGxpbmVbNV0sXHJcbiAgICAgICAgaSwgaiwgYXgsIGF5LCBweCwgcXgsIHJ4LCBzeCwgcHksIHF5LCByeSwgc3ksIHQ7XHJcblxyXG4gICAgZm9yKGkgPSA2OyBpICE9PSBzcGxpbmUubGVuZ3RoOyBpICs9IDIpIHtcclxuICAgICAgYXggPSBieDtcclxuICAgICAgYnggPSBjeDtcclxuICAgICAgY3ggPSBkeDtcclxuICAgICAgZHggPSBzcGxpbmVbaSAgICBdO1xyXG4gICAgICBweCA9IC0wLjUgKiBheCArIDEuNSAqIGJ4IC0gMS41ICogY3ggKyAwLjUgKiBkeDtcclxuICAgICAgcXggPSAgICAgICAgYXggLSAyLjUgKiBieCArIDIuMCAqIGN4IC0gMC41ICogZHg7XHJcbiAgICAgIHJ4ID0gLTAuNSAqIGF4ICAgICAgICAgICAgKyAwLjUgKiBjeCAgICAgICAgICAgO1xyXG4gICAgICBzeCA9ICAgICAgICAgICAgICAgICAgIGJ4ICAgICAgICAgICAgICAgICAgICAgIDtcclxuXHJcbiAgICAgIGF5ID0gYnk7XHJcbiAgICAgIGJ5ID0gY3k7XHJcbiAgICAgIGN5ID0gZHk7XHJcbiAgICAgIGR5ID0gc3BsaW5lW2kgKyAxXTtcclxuICAgICAgcHkgPSAtMC41ICogYXkgKyAxLjUgKiBieSAtIDEuNSAqIGN5ICsgMC41ICogZHk7XHJcbiAgICAgIHF5ID0gICAgICAgIGF5IC0gMi41ICogYnkgKyAyLjAgKiBjeSAtIDAuNSAqIGR5O1xyXG4gICAgICByeSA9IC0wLjUgKiBheSAgICAgICAgICAgICsgMC41ICogY3kgICAgICAgICAgIDtcclxuICAgICAgc3kgPSAgICAgICAgICAgICAgICAgICBieSAgICAgICAgICAgICAgICAgICAgICA7XHJcblxyXG4gICAgICBmb3IoaiA9IDA7IGogIT09IG47ICsraikge1xyXG4gICAgICAgIHQgPSBqIC8gbjtcclxuXHJcbiAgICAgICAgcG9seWxpbmUucHVzaChcclxuICAgICAgICAgICgocHggKiB0ICsgcXgpICogdCArIHJ4KSAqIHQgKyBzeCxcclxuICAgICAgICAgICgocHkgKiB0ICsgcXkpICogdCArIHJ5KSAqIHQgKyBzeVxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwb2x5bGluZS5wdXNoKFxyXG4gICAgICBweCArIHF4ICsgcnggKyBzeCxcclxuICAgICAgcHkgKyBxeSArIHJ5ICsgc3lcclxuICAgICk7XHJcblxyXG4gICAgcmV0dXJuIHBvbHlsaW5lO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gZG93bnNhbXBsZShuLCBwb2x5bGluZSkge1xyXG4gICAgdmFyIGxlbiA9IDAsXHJcbiAgICAgICAgaSwgZHgsIGR5O1xyXG5cclxuICAgIGZvcihpID0gMjsgaSAhPT0gcG9seWxpbmUubGVuZ3RoOyBpICs9IDIpIHtcclxuICAgICAgZHggPSBwb2x5bGluZVtpICAgIF0gLSBwb2x5bGluZVtpIC0gMl07XHJcbiAgICAgIGR5ID0gcG9seWxpbmVbaSArIDFdIC0gcG9seWxpbmVbaSAtIDFdO1xyXG4gICAgICBsZW4gKz0gTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqIGR5KTtcclxuICAgIH1cclxuXHJcbiAgICBsZW4gLz0gbjtcclxuXHJcbiAgICB2YXIgc21hbGwgPSBbXSxcclxuICAgICAgICB0YXJnZXQgPSBsZW4sXHJcbiAgICAgICAgbWluID0gMCxcclxuICAgICAgICBtYXgsIHQ7XHJcblxyXG4gICAgc21hbGwucHVzaChwb2x5bGluZVswXSwgcG9seWxpbmVbMV0pO1xyXG5cclxuICAgIGZvcihpID0gMjsgaSAhPT0gcG9seWxpbmUubGVuZ3RoOyBpICs9IDIpIHtcclxuICAgICAgZHggPSBwb2x5bGluZVtpICAgIF0gLSBwb2x5bGluZVtpIC0gMl07XHJcbiAgICAgIGR5ID0gcG9seWxpbmVbaSArIDFdIC0gcG9seWxpbmVbaSAtIDFdO1xyXG4gICAgICBtYXggPSBtaW4gKyBNYXRoLnNxcnQoZHggKiBkeCArIGR5ICogZHkpO1xyXG5cclxuICAgICAgaWYobWF4ID4gdGFyZ2V0KSB7XHJcbiAgICAgICAgdCA9ICh0YXJnZXQgLSBtaW4pIC8gKG1heCAtIG1pbik7XHJcblxyXG4gICAgICAgIHNtYWxsLnB1c2goXHJcbiAgICAgICAgICBwb2x5bGluZVtpIC0gMl0gKyBkeCAqIHQsXHJcbiAgICAgICAgICBwb2x5bGluZVtpIC0gMV0gKyBkeSAqIHRcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICB0YXJnZXQgKz0gbGVuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBtaW4gPSBtYXg7XHJcbiAgICB9XHJcblxyXG4gICAgc21hbGwucHVzaChwb2x5bGluZVtwb2x5bGluZS5sZW5ndGggLSAyXSwgcG9seWxpbmVbcG9seWxpbmUubGVuZ3RoIC0gMV0pO1xyXG5cclxuICAgIHJldHVybiBzbWFsbDtcclxuICB9XHJcbiAgKi9cclxuXHJcbiAgLyogRGVmaW5lIHNreWNvbiB0aGluZ3MuICovXHJcbiAgLyogRklYTUU6IEknbSAqcmVhbGx5IHJlYWxseSogc29ycnkgdGhhdCB0aGlzIGNvZGUgaXMgc28gZ3Jvc3MuIFJlYWxseSwgSSBhbS5cclxuICAgKiBJJ2xsIHRyeSB0byBjbGVhbiBpdCB1cCBldmVudHVhbGx5ISBQcm9taXNlISAqL1xyXG4gIHZhciBLRVlGUkFNRSA9IDUwMCxcclxuICAgICAgU1RST0tFID0gMC4wOCxcclxuICAgICAgVEFVID0gMi4wICogTWF0aC5QSSxcclxuICAgICAgVFdPX09WRVJfU1FSVF8yID0gMi4wIC8gTWF0aC5zcXJ0KDIpO1xyXG5cclxuICBmdW5jdGlvbiBjaXJjbGUoY3R4LCB4LCB5LCByKSB7XHJcbiAgICBjdHguYmVnaW5QYXRoKCk7XHJcbiAgICBjdHguYXJjKHgsIHksIHIsIDAsIFRBVSwgZmFsc2UpO1xyXG4gICAgY3R4LmZpbGwoKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGxpbmUoY3R4LCBheCwgYXksIGJ4LCBieSkge1xyXG4gICAgY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgY3R4Lm1vdmVUbyhheCwgYXkpO1xyXG4gICAgY3R4LmxpbmVUbyhieCwgYnkpO1xyXG4gICAgY3R4LnN0cm9rZSgpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcHVmZihjdHgsIHQsIGN4LCBjeSwgcngsIHJ5LCBybWluLCBybWF4KSB7XHJcbiAgICB2YXIgYyA9IE1hdGguY29zKHQgKiBUQVUpLFxyXG4gICAgICAgIHMgPSBNYXRoLnNpbih0ICogVEFVKTtcclxuXHJcbiAgICBybWF4IC09IHJtaW47XHJcblxyXG4gICAgY2lyY2xlKFxyXG4gICAgICBjdHgsXHJcbiAgICAgIGN4IC0gcyAqIHJ4LFxyXG4gICAgICBjeSArIGMgKiByeSArIHJtYXggKiAwLjUsXHJcbiAgICAgIHJtaW4gKyAoMSAtIGMgKiAwLjUpICogcm1heFxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHB1ZmZzKGN0eCwgdCwgY3gsIGN5LCByeCwgcnksIHJtaW4sIHJtYXgpIHtcclxuICAgIHZhciBpO1xyXG5cclxuICAgIGZvcihpID0gNTsgaS0tOyApXHJcbiAgICAgIHB1ZmYoY3R4LCB0ICsgaSAvIDUsIGN4LCBjeSwgcngsIHJ5LCBybWluLCBybWF4KTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGNsb3VkKGN0eCwgdCwgY3gsIGN5LCBjdywgcywgY29sb3IpIHtcclxuICAgIHQgLz0gMzAwMDA7XHJcblxyXG4gICAgdmFyIGEgPSBjdyAqIDAuMjEsXHJcbiAgICAgICAgYiA9IGN3ICogMC4xMixcclxuICAgICAgICBjID0gY3cgKiAwLjI0LFxyXG4gICAgICAgIGQgPSBjdyAqIDAuMjg7XHJcblxyXG4gICAgY3R4LmZpbGxTdHlsZSA9IGNvbG9yO1xyXG4gICAgcHVmZnMoY3R4LCB0LCBjeCwgY3ksIGEsIGIsIGMsIGQpO1xyXG5cclxuICAgIGN0eC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSAnZGVzdGluYXRpb24tb3V0JztcclxuICAgIHB1ZmZzKGN0eCwgdCwgY3gsIGN5LCBhLCBiLCBjIC0gcywgZCAtIHMpO1xyXG4gICAgY3R4Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9ICdzb3VyY2Utb3Zlcic7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBzdW4oY3R4LCB0LCBjeCwgY3ksIGN3LCBzLCBjb2xvcikge1xyXG4gICAgdCAvPSAxMjAwMDA7XHJcblxyXG4gICAgdmFyIGEgPSBjdyAqIDAuMjUgLSBzICogMC41LFxyXG4gICAgICAgIGIgPSBjdyAqIDAuMzIgKyBzICogMC41LFxyXG4gICAgICAgIGMgPSBjdyAqIDAuNTAgLSBzICogMC41LFxyXG4gICAgICAgIGksIHAsIGNvcywgc2luO1xyXG5cclxuICAgIGN0eC5zdHJva2VTdHlsZSA9IGNvbG9yO1xyXG4gICAgY3R4LmxpbmVXaWR0aCA9IHM7XHJcbiAgICBjdHgubGluZUNhcCA9IFwicm91bmRcIjtcclxuICAgIGN0eC5saW5lSm9pbiA9IFwicm91bmRcIjtcclxuXHJcbiAgICBjdHguYmVnaW5QYXRoKCk7XHJcbiAgICBjdHguYXJjKGN4LCBjeSwgYSwgMCwgVEFVLCBmYWxzZSk7XHJcbiAgICBjdHguc3Ryb2tlKCk7XHJcblxyXG4gICAgZm9yKGkgPSA4OyBpLS07ICkge1xyXG4gICAgICBwID0gKHQgKyBpIC8gOCkgKiBUQVU7XHJcbiAgICAgIGNvcyA9IE1hdGguY29zKHApO1xyXG4gICAgICBzaW4gPSBNYXRoLnNpbihwKTtcclxuICAgICAgbGluZShjdHgsIGN4ICsgY29zICogYiwgY3kgKyBzaW4gKiBiLCBjeCArIGNvcyAqIGMsIGN5ICsgc2luICogYyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBtb29uKGN0eCwgdCwgY3gsIGN5LCBjdywgcywgY29sb3IpIHtcclxuICAgIHQgLz0gMTUwMDA7XHJcblxyXG4gICAgdmFyIGEgPSBjdyAqIDAuMjkgLSBzICogMC41LFxyXG4gICAgICAgIGIgPSBjdyAqIDAuMDUsXHJcbiAgICAgICAgYyA9IE1hdGguY29zKHQgKiBUQVUpLFxyXG4gICAgICAgIHAgPSBjICogVEFVIC8gLTE2O1xyXG5cclxuICAgIGN0eC5zdHJva2VTdHlsZSA9IGNvbG9yO1xyXG4gICAgY3R4LmxpbmVXaWR0aCA9IHM7XHJcbiAgICBjdHgubGluZUNhcCA9IFwicm91bmRcIjtcclxuICAgIGN0eC5saW5lSm9pbiA9IFwicm91bmRcIjtcclxuXHJcbiAgICBjeCArPSBjICogYjtcclxuXHJcbiAgICBjdHguYmVnaW5QYXRoKCk7XHJcbiAgICBjdHguYXJjKGN4LCBjeSwgYSwgcCArIFRBVSAvIDgsIHAgKyBUQVUgKiA3IC8gOCwgZmFsc2UpO1xyXG4gICAgY3R4LmFyYyhjeCArIE1hdGguY29zKHApICogYSAqIFRXT19PVkVSX1NRUlRfMiwgY3kgKyBNYXRoLnNpbihwKSAqIGEgKiBUV09fT1ZFUl9TUVJUXzIsIGEsIHAgKyBUQVUgKiA1IC8gOCwgcCArIFRBVSAqIDMgLyA4LCB0cnVlKTtcclxuICAgIGN0eC5jbG9zZVBhdGgoKTtcclxuICAgIGN0eC5zdHJva2UoKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHJhaW4oY3R4LCB0LCBjeCwgY3ksIGN3LCBzLCBjb2xvcikge1xyXG4gICAgdCAvPSAxMzUwO1xyXG5cclxuICAgIHZhciBhID0gY3cgKiAwLjE2LFxyXG4gICAgICAgIGIgPSBUQVUgKiAxMSAvIDEyLFxyXG4gICAgICAgIGMgPSBUQVUgKiAgNyAvIDEyLFxyXG4gICAgICAgIGksIHAsIHgsIHk7XHJcblxyXG4gICAgY3R4LmZpbGxTdHlsZSA9IGNvbG9yO1xyXG5cclxuICAgIGZvcihpID0gNDsgaS0tOyApIHtcclxuICAgICAgcCA9ICh0ICsgaSAvIDQpICUgMTtcclxuICAgICAgeCA9IGN4ICsgKChpIC0gMS41KSAvIDEuNSkgKiAoaSA9PT0gMSB8fCBpID09PSAyID8gLTEgOiAxKSAqIGE7XHJcbiAgICAgIHkgPSBjeSArIHAgKiBwICogY3c7XHJcbiAgICAgIGN0eC5iZWdpblBhdGgoKTtcclxuICAgICAgY3R4Lm1vdmVUbyh4LCB5IC0gcyAqIDEuNSk7XHJcbiAgICAgIGN0eC5hcmMoeCwgeSwgcyAqIDAuNzUsIGIsIGMsIGZhbHNlKTtcclxuICAgICAgY3R4LmZpbGwoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHNsZWV0KGN0eCwgdCwgY3gsIGN5LCBjdywgcywgY29sb3IpIHtcclxuICAgIHQgLz0gNzUwO1xyXG5cclxuICAgIHZhciBhID0gY3cgKiAwLjE4NzUsXHJcbiAgICAgICAgYiA9IFRBVSAqIDExIC8gMTIsXHJcbiAgICAgICAgYyA9IFRBVSAqICA3IC8gMTIsXHJcbiAgICAgICAgaSwgcCwgeCwgeTtcclxuXHJcbiAgICBjdHguc3Ryb2tlU3R5bGUgPSBjb2xvcjtcclxuICAgIGN0eC5saW5lV2lkdGggPSBzICogMC41O1xyXG4gICAgY3R4LmxpbmVDYXAgPSBcInJvdW5kXCI7XHJcbiAgICBjdHgubGluZUpvaW4gPSBcInJvdW5kXCI7XHJcblxyXG4gICAgZm9yKGkgPSA0OyBpLS07ICkge1xyXG4gICAgICBwID0gKHQgKyBpIC8gNCkgJSAxO1xyXG4gICAgICB4ID0gTWF0aC5mbG9vcihjeCArICgoaSAtIDEuNSkgLyAxLjUpICogKGkgPT09IDEgfHwgaSA9PT0gMiA/IC0xIDogMSkgKiBhKSArIDAuNTtcclxuICAgICAgeSA9IGN5ICsgcCAqIGN3O1xyXG4gICAgICBsaW5lKGN0eCwgeCwgeSAtIHMgKiAxLjUsIHgsIHkgKyBzICogMS41KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHNub3coY3R4LCB0LCBjeCwgY3ksIGN3LCBzLCBjb2xvcikge1xyXG4gICAgdCAvPSAzMDAwO1xyXG5cclxuICAgIHZhciBhICA9IGN3ICogMC4xNixcclxuICAgICAgICBiICA9IHMgKiAwLjc1LFxyXG4gICAgICAgIHUgID0gdCAqIFRBVSAqIDAuNyxcclxuICAgICAgICB1eCA9IE1hdGguY29zKHUpICogYixcclxuICAgICAgICB1eSA9IE1hdGguc2luKHUpICogYixcclxuICAgICAgICB2ICA9IHUgKyBUQVUgLyAzLFxyXG4gICAgICAgIHZ4ID0gTWF0aC5jb3ModikgKiBiLFxyXG4gICAgICAgIHZ5ID0gTWF0aC5zaW4odikgKiBiLFxyXG4gICAgICAgIHcgID0gdSArIFRBVSAqIDIgLyAzLFxyXG4gICAgICAgIHd4ID0gTWF0aC5jb3ModykgKiBiLFxyXG4gICAgICAgIHd5ID0gTWF0aC5zaW4odykgKiBiLFxyXG4gICAgICAgIGksIHAsIHgsIHk7XHJcblxyXG4gICAgY3R4LnN0cm9rZVN0eWxlID0gY29sb3I7XHJcbiAgICBjdHgubGluZVdpZHRoID0gcyAqIDAuNTtcclxuICAgIGN0eC5saW5lQ2FwID0gXCJyb3VuZFwiO1xyXG4gICAgY3R4LmxpbmVKb2luID0gXCJyb3VuZFwiO1xyXG5cclxuICAgIGZvcihpID0gNDsgaS0tOyApIHtcclxuICAgICAgcCA9ICh0ICsgaSAvIDQpICUgMTtcclxuICAgICAgeCA9IGN4ICsgTWF0aC5zaW4oKHAgKyBpIC8gNCkgKiBUQVUpICogYTtcclxuICAgICAgeSA9IGN5ICsgcCAqIGN3O1xyXG5cclxuICAgICAgbGluZShjdHgsIHggLSB1eCwgeSAtIHV5LCB4ICsgdXgsIHkgKyB1eSk7XHJcbiAgICAgIGxpbmUoY3R4LCB4IC0gdngsIHkgLSB2eSwgeCArIHZ4LCB5ICsgdnkpO1xyXG4gICAgICBsaW5lKGN0eCwgeCAtIHd4LCB5IC0gd3ksIHggKyB3eCwgeSArIHd5KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGZvZ2JhbmsoY3R4LCB0LCBjeCwgY3ksIGN3LCBzLCBjb2xvcikge1xyXG4gICAgdCAvPSAzMDAwMDtcclxuXHJcbiAgICB2YXIgYSA9IGN3ICogMC4yMSxcclxuICAgICAgICBiID0gY3cgKiAwLjA2LFxyXG4gICAgICAgIGMgPSBjdyAqIDAuMjEsXHJcbiAgICAgICAgZCA9IGN3ICogMC4yODtcclxuXHJcbiAgICBjdHguZmlsbFN0eWxlID0gY29sb3I7XHJcbiAgICBwdWZmcyhjdHgsIHQsIGN4LCBjeSwgYSwgYiwgYywgZCk7XHJcblxyXG4gICAgY3R4Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9ICdkZXN0aW5hdGlvbi1vdXQnO1xyXG4gICAgcHVmZnMoY3R4LCB0LCBjeCwgY3ksIGEsIGIsIGMgLSBzLCBkIC0gcyk7XHJcbiAgICBjdHguZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gJ3NvdXJjZS1vdmVyJztcclxuICB9XHJcblxyXG4gIC8qXHJcbiAgdmFyIFdJTkRfUEFUSFMgPSBbXHJcbiAgICAgICAgZG93bnNhbXBsZSg2MywgdXBzYW1wbGUoOCwgW1xyXG4gICAgICAgICAgLTEuMDAsIC0wLjI4LFxyXG4gICAgICAgICAgLTAuNzUsIC0wLjE4LFxyXG4gICAgICAgICAgLTAuNTAsICAwLjEyLFxyXG4gICAgICAgICAgLTAuMjAsICAwLjEyLFxyXG4gICAgICAgICAgLTAuMDQsIC0wLjA0LFxyXG4gICAgICAgICAgLTAuMDcsIC0wLjE4LFxyXG4gICAgICAgICAgLTAuMTksIC0wLjE4LFxyXG4gICAgICAgICAgLTAuMjMsIC0wLjA1LFxyXG4gICAgICAgICAgLTAuMTIsICAwLjExLFxyXG4gICAgICAgICAgIDAuMDIsICAwLjE2LFxyXG4gICAgICAgICAgIDAuMjAsICAwLjE1LFxyXG4gICAgICAgICAgIDAuNTAsICAwLjA3LFxyXG4gICAgICAgICAgIDAuNzUsICAwLjE4LFxyXG4gICAgICAgICAgIDEuMDAsICAwLjI4XHJcbiAgICAgICAgXSkpLFxyXG4gICAgICAgIGRvd25zYW1wbGUoMzEsIHVwc2FtcGxlKDE2LCBbXHJcbiAgICAgICAgICAtMS4wMCwgLTAuMTAsXHJcbiAgICAgICAgICAtMC43NSwgIDAuMDAsXHJcbiAgICAgICAgICAtMC41MCwgIDAuMTAsXHJcbiAgICAgICAgICAtMC4yNSwgIDAuMTQsXHJcbiAgICAgICAgICAgMC4wMCwgIDAuMTAsXHJcbiAgICAgICAgICAgMC4yNSwgIDAuMDAsXHJcbiAgICAgICAgICAgMC41MCwgLTAuMTAsXHJcbiAgICAgICAgICAgMC43NSwgLTAuMTQsXHJcbiAgICAgICAgICAgMS4wMCwgLTAuMTBcclxuICAgICAgICBdKSlcclxuICAgICAgXTtcclxuICAqL1xyXG5cclxuICB2YXIgV0lORF9QQVRIUyA9IFtcclxuICAgICAgICBbXHJcbiAgICAgICAgICAtMC43NTAwLCAtMC4xODAwLCAtMC43MjE5LCAtMC4xNTI3LCAtMC42OTcxLCAtMC4xMjI1LFxyXG4gICAgICAgICAgLTAuNjczOSwgLTAuMDkxMCwgLTAuNjUxNiwgLTAuMDU4OCwgLTAuNjI5OCwgLTAuMDI2MixcclxuICAgICAgICAgIC0wLjYwODMsICAwLjAwNjUsIC0wLjU4NjgsICAwLjAzOTYsIC0wLjU2NDMsICAwLjA3MzEsXHJcbiAgICAgICAgICAtMC41MzcyLCAgMC4xMDQxLCAtMC41MDMzLCAgMC4xMjU5LCAtMC40NjYyLCAgMC4xNDA2LFxyXG4gICAgICAgICAgLTAuNDI3NSwgIDAuMTQ5MywgLTAuMzg4MSwgIDAuMTUzMCwgLTAuMzQ4NywgIDAuMTUyNixcclxuICAgICAgICAgIC0wLjMwOTUsICAwLjE0ODgsIC0wLjI3MDgsICAwLjE0MjEsIC0wLjIzMTksICAwLjEzNDIsXHJcbiAgICAgICAgICAtMC4xOTQzLCAgMC4xMjE3LCAtMC4xNjAwLCAgMC4xMDI1LCAtMC4xMjkwLCAgMC4wNzg1LFxyXG4gICAgICAgICAgLTAuMTAxMiwgIDAuMDUwOSwgLTAuMDc2NCwgIDAuMDIwNiwgLTAuMDU0NywgLTAuMDEyMCxcclxuICAgICAgICAgIC0wLjAzNzgsIC0wLjA0NzIsIC0wLjAzMjQsIC0wLjA4NTcsIC0wLjAzODksIC0wLjEyNDEsXHJcbiAgICAgICAgICAtMC4wNTQ2LCAtMC4xNTk5LCAtMC4wODE0LCAtMC4xODc2LCAtMC4xMTkzLCAtMC4xOTY0LFxyXG4gICAgICAgICAgLTAuMTU4MiwgLTAuMTkzNSwgLTAuMTkzMSwgLTAuMTc2OSwgLTAuMjE1NywgLTAuMTQ1MyxcclxuICAgICAgICAgIC0wLjIyOTAsIC0wLjEwODUsIC0wLjIzMjcsIC0wLjA2OTcsIC0wLjIyNDAsIC0wLjAzMTcsXHJcbiAgICAgICAgICAtMC4yMDY0LCAgMC4wMDMzLCAtMC4xODUzLCAgMC4wMzYyLCAtMC4xNjEzLCAgMC4wNjcyLFxyXG4gICAgICAgICAgLTAuMTM1MCwgIDAuMDk2MSwgLTAuMTA1MSwgIDAuMTIxMywgLTAuMDcwNiwgIDAuMTM5NyxcclxuICAgICAgICAgIC0wLjAzMzIsICAwLjE1MTIsICAwLjAwNTMsICAwLjE1ODAsICAwLjA0NDIsICAwLjE2MjQsXHJcbiAgICAgICAgICAgMC4wODMzLCAgMC4xNjM2LCAgMC4xMjI0LCAgMC4xNjE1LCAgMC4xNjEzLCAgMC4xNTY1LFxyXG4gICAgICAgICAgIDAuMTk5OSwgIDAuMTUwMCwgIDAuMjM3OCwgIDAuMTQwMiwgIDAuMjc0OSwgIDAuMTI3OSxcclxuICAgICAgICAgICAwLjMxMTgsICAwLjExNDcsICAwLjM0ODcsICAwLjEwMTUsICAwLjM4NTgsICAwLjA4OTIsXHJcbiAgICAgICAgICAgMC40MjM2LCAgMC4wNzg3LCAgMC40NjIxLCAgMC4wNzE1LCAgMC41MDEyLCAgMC4wNzAyLFxyXG4gICAgICAgICAgIDAuNTM5OCwgIDAuMDc2NiwgIDAuNTc2OCwgIDAuMDg5MCwgIDAuNjEyMywgIDAuMTA1NSxcclxuICAgICAgICAgICAwLjY0NjYsICAwLjEyNDQsICAwLjY4MDUsICAwLjE0NDAsICAwLjcxNDcsICAwLjE2MzAsXHJcbiAgICAgICAgICAgMC43NTAwLCAgMC4xODAwXHJcbiAgICAgICAgXSxcclxuICAgICAgICBbXHJcbiAgICAgICAgICAtMC43NTAwLCAgMC4wMDAwLCAtMC43MDMzLCAgMC4wMTk1LCAtMC42NTY5LCAgMC4wMzk5LFxyXG4gICAgICAgICAgLTAuNjEwNCwgIDAuMDYwMCwgLTAuNTYzNCwgIDAuMDc4OSwgLTAuNTE1NSwgIDAuMDk1NCxcclxuICAgICAgICAgIC0wLjQ2NjcsICAwLjEwODksIC0wLjQxNzQsICAwLjEyMDYsIC0wLjM2NzYsICAwLjEyOTksXHJcbiAgICAgICAgICAtMC4zMTc0LCAgMC4xMzY1LCAtMC4yNjY5LCAgMC4xMzk4LCAtMC4yMTYyLCAgMC4xMzkxLFxyXG4gICAgICAgICAgLTAuMTY1OCwgIDAuMTM0NywgLTAuMTE1NywgIDAuMTI3MSwgLTAuMDY2MSwgIDAuMTE2OSxcclxuICAgICAgICAgIC0wLjAxNzAsICAwLjEwNDYsICAwLjAzMTYsICAwLjA5MDMsICAwLjA3OTEsICAwLjA3MjgsXHJcbiAgICAgICAgICAgMC4xMjU5LCAgMC4wNTM0LCAgMC4xNzIzLCAgMC4wMzMxLCAgMC4yMTg4LCAgMC4wMTI5LFxyXG4gICAgICAgICAgIDAuMjY1NiwgLTAuMDA2NCwgIDAuMzEyMiwgLTAuMDI2MywgIDAuMzU4NiwgLTAuMDQ2NixcclxuICAgICAgICAgICAwLjQwNTIsIC0wLjA2NjUsICAwLjQ1MjUsIC0wLjA4NDcsICAwLjUwMDcsIC0wLjEwMDIsXHJcbiAgICAgICAgICAgMC41NDk3LCAtMC4xMTMwLCAgMC41OTkxLCAtMC4xMjQwLCAgMC42NDkxLCAtMC4xMzI1LFxyXG4gICAgICAgICAgIDAuNjk5NCwgLTAuMTM4MCwgIDAuNzUwMCwgLTAuMTQwMFxyXG4gICAgICAgIF1cclxuICAgICAgXSxcclxuICAgICAgV0lORF9PRkZTRVRTID0gW1xyXG4gICAgICAgIHtzdGFydDogMC4zNiwgZW5kOiAwLjExfSxcclxuICAgICAgICB7c3RhcnQ6IDAuNTYsIGVuZDogMC4xNn1cclxuICAgICAgXTtcclxuXHJcbiAgZnVuY3Rpb24gbGVhZihjdHgsIHQsIHgsIHksIGN3LCBzLCBjb2xvcikge1xyXG4gICAgdmFyIGEgPSBjdyAvIDgsXHJcbiAgICAgICAgYiA9IGEgLyAzLFxyXG4gICAgICAgIGMgPSAyICogYixcclxuICAgICAgICBkID0gKHQgJSAxKSAqIFRBVSxcclxuICAgICAgICBlID0gTWF0aC5jb3MoZCksXHJcbiAgICAgICAgZiA9IE1hdGguc2luKGQpO1xyXG5cclxuICAgIGN0eC5maWxsU3R5bGUgPSBjb2xvcjtcclxuICAgIGN0eC5zdHJva2VTdHlsZSA9IGNvbG9yO1xyXG4gICAgY3R4LmxpbmVXaWR0aCA9IHM7XHJcbiAgICBjdHgubGluZUNhcCA9IFwicm91bmRcIjtcclxuICAgIGN0eC5saW5lSm9pbiA9IFwicm91bmRcIjtcclxuXHJcbiAgICBjdHguYmVnaW5QYXRoKCk7XHJcbiAgICBjdHguYXJjKHggICAgICAgICwgeSAgICAgICAgLCBhLCBkICAgICAgICAgICwgZCArIE1hdGguUEksIGZhbHNlKTtcclxuICAgIGN0eC5hcmMoeCAtIGIgKiBlLCB5IC0gYiAqIGYsIGMsIGQgKyBNYXRoLlBJLCBkICAgICAgICAgICwgZmFsc2UpO1xyXG4gICAgY3R4LmFyYyh4ICsgYyAqIGUsIHkgKyBjICogZiwgYiwgZCArIE1hdGguUEksIGQgICAgICAgICAgLCB0cnVlICk7XHJcbiAgICBjdHguZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gJ2Rlc3RpbmF0aW9uLW91dCc7XHJcbiAgICBjdHguZmlsbCgpO1xyXG4gICAgY3R4Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9ICdzb3VyY2Utb3Zlcic7XHJcbiAgICBjdHguc3Ryb2tlKCk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBzd29vc2goY3R4LCB0LCBjeCwgY3ksIGN3LCBzLCBpbmRleCwgdG90YWwsIGNvbG9yKSB7XHJcbiAgICB0IC89IDI1MDA7XHJcblxyXG4gICAgdmFyIHBhdGggPSBXSU5EX1BBVEhTW2luZGV4XSxcclxuICAgICAgICBhID0gKHQgKyBpbmRleCAtIFdJTkRfT0ZGU0VUU1tpbmRleF0uc3RhcnQpICUgdG90YWwsXHJcbiAgICAgICAgYyA9ICh0ICsgaW5kZXggLSBXSU5EX09GRlNFVFNbaW5kZXhdLmVuZCAgKSAlIHRvdGFsLFxyXG4gICAgICAgIGUgPSAodCArIGluZGV4ICAgICAgICAgICAgICAgICAgICAgICAgICAgICkgJSB0b3RhbCxcclxuICAgICAgICBiLCBkLCBmLCBpO1xyXG5cclxuICAgIGN0eC5zdHJva2VTdHlsZSA9IGNvbG9yO1xyXG4gICAgY3R4LmxpbmVXaWR0aCA9IHM7XHJcbiAgICBjdHgubGluZUNhcCA9IFwicm91bmRcIjtcclxuICAgIGN0eC5saW5lSm9pbiA9IFwicm91bmRcIjtcclxuXHJcbiAgICBpZihhIDwgMSkge1xyXG4gICAgICBjdHguYmVnaW5QYXRoKCk7XHJcblxyXG4gICAgICBhICo9IHBhdGgubGVuZ3RoIC8gMiAtIDE7XHJcbiAgICAgIGIgID0gTWF0aC5mbG9vcihhKTtcclxuICAgICAgYSAtPSBiO1xyXG4gICAgICBiICo9IDI7XHJcbiAgICAgIGIgKz0gMjtcclxuXHJcbiAgICAgIGN0eC5tb3ZlVG8oXHJcbiAgICAgICAgY3ggKyAocGF0aFtiIC0gMl0gKiAoMSAtIGEpICsgcGF0aFtiICAgIF0gKiBhKSAqIGN3LFxyXG4gICAgICAgIGN5ICsgKHBhdGhbYiAtIDFdICogKDEgLSBhKSArIHBhdGhbYiArIDFdICogYSkgKiBjd1xyXG4gICAgICApO1xyXG5cclxuICAgICAgaWYoYyA8IDEpIHtcclxuICAgICAgICBjICo9IHBhdGgubGVuZ3RoIC8gMiAtIDE7XHJcbiAgICAgICAgZCAgPSBNYXRoLmZsb29yKGMpO1xyXG4gICAgICAgIGMgLT0gZDtcclxuICAgICAgICBkICo9IDI7XHJcbiAgICAgICAgZCArPSAyO1xyXG5cclxuICAgICAgICBmb3IoaSA9IGI7IGkgIT09IGQ7IGkgKz0gMilcclxuICAgICAgICAgIGN0eC5saW5lVG8oY3ggKyBwYXRoW2ldICogY3csIGN5ICsgcGF0aFtpICsgMV0gKiBjdyk7XHJcblxyXG4gICAgICAgIGN0eC5saW5lVG8oXHJcbiAgICAgICAgICBjeCArIChwYXRoW2QgLSAyXSAqICgxIC0gYykgKyBwYXRoW2QgICAgXSAqIGMpICogY3csXHJcbiAgICAgICAgICBjeSArIChwYXRoW2QgLSAxXSAqICgxIC0gYykgKyBwYXRoW2QgKyAxXSAqIGMpICogY3dcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBlbHNlXHJcbiAgICAgICAgZm9yKGkgPSBiOyBpICE9PSBwYXRoLmxlbmd0aDsgaSArPSAyKVxyXG4gICAgICAgICAgY3R4LmxpbmVUbyhjeCArIHBhdGhbaV0gKiBjdywgY3kgKyBwYXRoW2kgKyAxXSAqIGN3KTtcclxuXHJcbiAgICAgIGN0eC5zdHJva2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBlbHNlIGlmKGMgPCAxKSB7XHJcbiAgICAgIGN0eC5iZWdpblBhdGgoKTtcclxuXHJcbiAgICAgIGMgKj0gcGF0aC5sZW5ndGggLyAyIC0gMTtcclxuICAgICAgZCAgPSBNYXRoLmZsb29yKGMpO1xyXG4gICAgICBjIC09IGQ7XHJcbiAgICAgIGQgKj0gMjtcclxuICAgICAgZCArPSAyO1xyXG5cclxuICAgICAgY3R4Lm1vdmVUbyhjeCArIHBhdGhbMF0gKiBjdywgY3kgKyBwYXRoWzFdICogY3cpO1xyXG5cclxuICAgICAgZm9yKGkgPSAyOyBpICE9PSBkOyBpICs9IDIpXHJcbiAgICAgICAgY3R4LmxpbmVUbyhjeCArIHBhdGhbaV0gKiBjdywgY3kgKyBwYXRoW2kgKyAxXSAqIGN3KTtcclxuXHJcbiAgICAgIGN0eC5saW5lVG8oXHJcbiAgICAgICAgY3ggKyAocGF0aFtkIC0gMl0gKiAoMSAtIGMpICsgcGF0aFtkICAgIF0gKiBjKSAqIGN3LFxyXG4gICAgICAgIGN5ICsgKHBhdGhbZCAtIDFdICogKDEgLSBjKSArIHBhdGhbZCArIDFdICogYykgKiBjd1xyXG4gICAgICApO1xyXG5cclxuICAgICAgY3R4LnN0cm9rZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmKGUgPCAxKSB7XHJcbiAgICAgIGUgKj0gcGF0aC5sZW5ndGggLyAyIC0gMTtcclxuICAgICAgZiAgPSBNYXRoLmZsb29yKGUpO1xyXG4gICAgICBlIC09IGY7XHJcbiAgICAgIGYgKj0gMjtcclxuICAgICAgZiArPSAyO1xyXG5cclxuICAgICAgbGVhZihcclxuICAgICAgICBjdHgsXHJcbiAgICAgICAgdCxcclxuICAgICAgICBjeCArIChwYXRoW2YgLSAyXSAqICgxIC0gZSkgKyBwYXRoW2YgICAgXSAqIGUpICogY3csXHJcbiAgICAgICAgY3kgKyAocGF0aFtmIC0gMV0gKiAoMSAtIGUpICsgcGF0aFtmICsgMV0gKiBlKSAqIGN3LFxyXG4gICAgICAgIGN3LFxyXG4gICAgICAgIHMsXHJcbiAgICAgICAgY29sb3JcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHZhciBTa3ljb25zID0gZnVuY3Rpb24ob3B0cykge1xyXG4gICAgICAgIHRoaXMubGlzdCAgICAgICAgPSBbXTtcclxuICAgICAgICB0aGlzLmludGVydmFsICAgID0gbnVsbDtcclxuICAgICAgICB0aGlzLmNvbG9yICAgICAgID0gb3B0cyAmJiBvcHRzLmNvbG9yID8gb3B0cy5jb2xvciA6IFwiYmxhY2tcIjtcclxuICAgICAgICB0aGlzLnJlc2l6ZUNsZWFyID0gISEob3B0cyAmJiBvcHRzLnJlc2l6ZUNsZWFyKTtcclxuICAgICAgfTtcclxuXHJcbiAgU2t5Y29ucy5DTEVBUl9EQVkgPSBmdW5jdGlvbihjdHgsIHQsIGNvbG9yKSB7XHJcbiAgICB2YXIgdyA9IGN0eC5jYW52YXMud2lkdGgsXHJcbiAgICAgICAgaCA9IGN0eC5jYW52YXMuaGVpZ2h0LFxyXG4gICAgICAgIHMgPSBNYXRoLm1pbih3LCBoKTtcclxuXHJcbiAgICBzdW4oY3R4LCB0LCB3ICogMC41LCBoICogMC41LCBzLCBzICogU1RST0tFLCBjb2xvcik7XHJcbiAgfTtcclxuXHJcbiAgU2t5Y29ucy5DTEVBUl9OSUdIVCA9IGZ1bmN0aW9uKGN0eCwgdCwgY29sb3IpIHtcclxuICAgIHZhciB3ID0gY3R4LmNhbnZhcy53aWR0aCxcclxuICAgICAgICBoID0gY3R4LmNhbnZhcy5oZWlnaHQsXHJcbiAgICAgICAgcyA9IE1hdGgubWluKHcsIGgpO1xyXG5cclxuICAgIG1vb24oY3R4LCB0LCB3ICogMC41LCBoICogMC41LCBzLCBzICogU1RST0tFLCBjb2xvcik7XHJcbiAgfTtcclxuXHJcbiAgU2t5Y29ucy5QQVJUTFlfQ0xPVURZX0RBWSA9IGZ1bmN0aW9uKGN0eCwgdCwgY29sb3IpIHtcclxuICAgIHZhciB3ID0gY3R4LmNhbnZhcy53aWR0aCxcclxuICAgICAgICBoID0gY3R4LmNhbnZhcy5oZWlnaHQsXHJcbiAgICAgICAgcyA9IE1hdGgubWluKHcsIGgpO1xyXG5cclxuICAgIHN1bihjdHgsIHQsIHcgKiAwLjYyNSwgaCAqIDAuMzc1LCBzICogMC43NSwgcyAqIFNUUk9LRSwgY29sb3IpO1xyXG4gICAgY2xvdWQoY3R4LCB0LCB3ICogMC4zNzUsIGggKiAwLjYyNSwgcyAqIDAuNzUsIHMgKiBTVFJPS0UsIGNvbG9yKTtcclxuICB9O1xyXG5cclxuICBTa3ljb25zLlBBUlRMWV9DTE9VRFlfTklHSFQgPSBmdW5jdGlvbihjdHgsIHQsIGNvbG9yKSB7XHJcbiAgICB2YXIgdyA9IGN0eC5jYW52YXMud2lkdGgsXHJcbiAgICAgICAgaCA9IGN0eC5jYW52YXMuaGVpZ2h0LFxyXG4gICAgICAgIHMgPSBNYXRoLm1pbih3LCBoKTtcclxuXHJcbiAgICBtb29uKGN0eCwgdCwgdyAqIDAuNjY3LCBoICogMC4zNzUsIHMgKiAwLjc1LCBzICogU1RST0tFLCBjb2xvcik7XHJcbiAgICBjbG91ZChjdHgsIHQsIHcgKiAwLjM3NSwgaCAqIDAuNjI1LCBzICogMC43NSwgcyAqIFNUUk9LRSwgY29sb3IpO1xyXG4gIH07XHJcblxyXG4gIFNreWNvbnMuQ0xPVURZID0gZnVuY3Rpb24oY3R4LCB0LCBjb2xvcikge1xyXG4gICAgdmFyIHcgPSBjdHguY2FudmFzLndpZHRoLFxyXG4gICAgICAgIGggPSBjdHguY2FudmFzLmhlaWdodCxcclxuICAgICAgICBzID0gTWF0aC5taW4odywgaCk7XHJcblxyXG4gICAgY2xvdWQoY3R4LCB0LCB3ICogMC41LCBoICogMC41LCBzLCBzICogU1RST0tFLCBjb2xvcik7XHJcbiAgfTtcclxuXHJcbiAgU2t5Y29ucy5SQUlOID0gZnVuY3Rpb24oY3R4LCB0LCBjb2xvcikge1xyXG4gICAgdmFyIHcgPSBjdHguY2FudmFzLndpZHRoLFxyXG4gICAgICAgIGggPSBjdHguY2FudmFzLmhlaWdodCxcclxuICAgICAgICBzID0gTWF0aC5taW4odywgaCk7XHJcblxyXG4gICAgcmFpbihjdHgsIHQsIHcgKiAwLjUsIGggKiAwLjM3LCBzICogMC45LCBzICogU1RST0tFLCBjb2xvcik7XHJcbiAgICBjbG91ZChjdHgsIHQsIHcgKiAwLjUsIGggKiAwLjM3LCBzICogMC45LCBzICogU1RST0tFLCBjb2xvcik7XHJcbiAgfTtcclxuXHJcbiAgU2t5Y29ucy5TTEVFVCA9IGZ1bmN0aW9uKGN0eCwgdCwgY29sb3IpIHtcclxuICAgIHZhciB3ID0gY3R4LmNhbnZhcy53aWR0aCxcclxuICAgICAgICBoID0gY3R4LmNhbnZhcy5oZWlnaHQsXHJcbiAgICAgICAgcyA9IE1hdGgubWluKHcsIGgpO1xyXG5cclxuICAgIHNsZWV0KGN0eCwgdCwgdyAqIDAuNSwgaCAqIDAuMzcsIHMgKiAwLjksIHMgKiBTVFJPS0UsIGNvbG9yKTtcclxuICAgIGNsb3VkKGN0eCwgdCwgdyAqIDAuNSwgaCAqIDAuMzcsIHMgKiAwLjksIHMgKiBTVFJPS0UsIGNvbG9yKTtcclxuICB9O1xyXG5cclxuICBTa3ljb25zLlNOT1cgPSBmdW5jdGlvbihjdHgsIHQsIGNvbG9yKSB7XHJcbiAgICB2YXIgdyA9IGN0eC5jYW52YXMud2lkdGgsXHJcbiAgICAgICAgaCA9IGN0eC5jYW52YXMuaGVpZ2h0LFxyXG4gICAgICAgIHMgPSBNYXRoLm1pbih3LCBoKTtcclxuXHJcbiAgICBzbm93KGN0eCwgdCwgdyAqIDAuNSwgaCAqIDAuMzcsIHMgKiAwLjksIHMgKiBTVFJPS0UsIGNvbG9yKTtcclxuICAgIGNsb3VkKGN0eCwgdCwgdyAqIDAuNSwgaCAqIDAuMzcsIHMgKiAwLjksIHMgKiBTVFJPS0UsIGNvbG9yKTtcclxuICB9O1xyXG5cclxuICBTa3ljb25zLldJTkQgPSBmdW5jdGlvbihjdHgsIHQsIGNvbG9yKSB7XHJcbiAgICB2YXIgdyA9IGN0eC5jYW52YXMud2lkdGgsXHJcbiAgICAgICAgaCA9IGN0eC5jYW52YXMuaGVpZ2h0LFxyXG4gICAgICAgIHMgPSBNYXRoLm1pbih3LCBoKTtcclxuXHJcbiAgICBzd29vc2goY3R4LCB0LCB3ICogMC41LCBoICogMC41LCBzLCBzICogU1RST0tFLCAwLCAyLCBjb2xvcik7XHJcbiAgICBzd29vc2goY3R4LCB0LCB3ICogMC41LCBoICogMC41LCBzLCBzICogU1RST0tFLCAxLCAyLCBjb2xvcik7XHJcbiAgfTtcclxuXHJcbiAgU2t5Y29ucy5GT0cgPSBmdW5jdGlvbihjdHgsIHQsIGNvbG9yKSB7XHJcbiAgICB2YXIgdyA9IGN0eC5jYW52YXMud2lkdGgsXHJcbiAgICAgICAgaCA9IGN0eC5jYW52YXMuaGVpZ2h0LFxyXG4gICAgICAgIHMgPSBNYXRoLm1pbih3LCBoKSxcclxuICAgICAgICBrID0gcyAqIFNUUk9LRTtcclxuXHJcbiAgICBmb2diYW5rKGN0eCwgdCwgdyAqIDAuNSwgaCAqIDAuMzIsIHMgKiAwLjc1LCBrLCBjb2xvcik7XHJcblxyXG4gICAgdCAvPSA1MDAwO1xyXG5cclxuICAgIHZhciBhID0gTWF0aC5jb3MoKHQgICAgICAgKSAqIFRBVSkgKiBzICogMC4wMixcclxuICAgICAgICBiID0gTWF0aC5jb3MoKHQgKyAwLjI1KSAqIFRBVSkgKiBzICogMC4wMixcclxuICAgICAgICBjID0gTWF0aC5jb3MoKHQgKyAwLjUwKSAqIFRBVSkgKiBzICogMC4wMixcclxuICAgICAgICBkID0gTWF0aC5jb3MoKHQgKyAwLjc1KSAqIFRBVSkgKiBzICogMC4wMixcclxuICAgICAgICBuID0gaCAqIDAuOTM2LFxyXG4gICAgICAgIGUgPSBNYXRoLmZsb29yKG4gLSBrICogMC41KSArIDAuNSxcclxuICAgICAgICBmID0gTWF0aC5mbG9vcihuIC0gayAqIDIuNSkgKyAwLjU7XHJcblxyXG4gICAgY3R4LnN0cm9rZVN0eWxlID0gY29sb3I7XHJcbiAgICBjdHgubGluZVdpZHRoID0gaztcclxuICAgIGN0eC5saW5lQ2FwID0gXCJyb3VuZFwiO1xyXG4gICAgY3R4LmxpbmVKb2luID0gXCJyb3VuZFwiO1xyXG5cclxuICAgIGxpbmUoY3R4LCBhICsgdyAqIDAuMiArIGsgKiAwLjUsIGUsIGIgKyB3ICogMC44IC0gayAqIDAuNSwgZSk7XHJcbiAgICBsaW5lKGN0eCwgYyArIHcgKiAwLjIgKyBrICogMC41LCBmLCBkICsgdyAqIDAuOCAtIGsgKiAwLjUsIGYpO1xyXG4gIH07XHJcblxyXG4gIFNreWNvbnMucHJvdG90eXBlID0ge1xyXG4gICAgX2RldGVybWluZURyYXdpbmdGdW5jdGlvbjogZnVuY3Rpb24oZHJhdykge1xyXG4gICAgICBpZih0eXBlb2YgZHJhdyA9PT0gXCJzdHJpbmdcIilcclxuICAgICAgICBkcmF3ID0gU2t5Y29uc1tkcmF3LnRvVXBwZXJDYXNlKCkucmVwbGFjZSgvLS9nLCBcIl9cIildIHx8IG51bGw7XHJcblxyXG4gICAgICByZXR1cm4gZHJhdztcclxuICAgIH0sXHJcbiAgICBhZGQ6IGZ1bmN0aW9uKGVsLCBkcmF3KSB7XHJcbiAgICAgIHZhciBvYmo7XHJcblxyXG4gICAgICBpZih0eXBlb2YgZWwgPT09IFwic3RyaW5nXCIpXHJcbiAgICAgICAgZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbCk7XHJcblxyXG4gICAgICAvLyBEb2VzIG5vdGhpbmcgaWYgY2FudmFzIG5hbWUgZG9lc24ndCBleGlzdHNcclxuICAgICAgaWYoZWwgPT09IG51bGwpXHJcbiAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgZHJhdyA9IHRoaXMuX2RldGVybWluZURyYXdpbmdGdW5jdGlvbihkcmF3KTtcclxuXHJcbiAgICAgIC8vIERvZXMgbm90aGluZyBpZiB0aGUgZHJhdyBmdW5jdGlvbiBpc24ndCBhY3R1YWxseSBhIGZ1bmN0aW9uXHJcbiAgICAgIGlmKHR5cGVvZiBkcmF3ICE9PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgb2JqID0ge1xyXG4gICAgICAgIGVsZW1lbnQ6IGVsLFxyXG4gICAgICAgIGNvbnRleHQ6IGVsLmdldENvbnRleHQoXCIyZFwiKSxcclxuICAgICAgICBkcmF3aW5nOiBkcmF3XHJcbiAgICAgIH07XHJcblxyXG4gICAgICB0aGlzLmxpc3QucHVzaChvYmopO1xyXG4gICAgICB0aGlzLmRyYXcob2JqLCBLRVlGUkFNRSk7XHJcbiAgICB9LFxyXG4gICAgc2V0OiBmdW5jdGlvbihlbCwgZHJhdykge1xyXG4gICAgICB2YXIgaTtcclxuXHJcbiAgICAgIGlmKHR5cGVvZiBlbCA9PT0gXCJzdHJpbmdcIilcclxuICAgICAgICBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsKTtcclxuXHJcbiAgICAgIGZvcihpID0gdGhpcy5saXN0Lmxlbmd0aDsgaS0tOyApXHJcbiAgICAgICAgaWYodGhpcy5saXN0W2ldLmVsZW1lbnQgPT09IGVsKSB7XHJcbiAgICAgICAgICB0aGlzLmxpc3RbaV0uZHJhd2luZyA9IHRoaXMuX2RldGVybWluZURyYXdpbmdGdW5jdGlvbihkcmF3KTtcclxuICAgICAgICAgIHRoaXMuZHJhdyh0aGlzLmxpc3RbaV0sIEtFWUZSQU1FKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICB0aGlzLmFkZChlbCwgZHJhdyk7XHJcbiAgICB9LFxyXG4gICAgcmVtb3ZlOiBmdW5jdGlvbihlbCkge1xyXG4gICAgICB2YXIgaTtcclxuXHJcbiAgICAgIGlmKHR5cGVvZiBlbCA9PT0gXCJzdHJpbmdcIilcclxuICAgICAgICBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsKTtcclxuXHJcbiAgICAgIGZvcihpID0gdGhpcy5saXN0Lmxlbmd0aDsgaS0tOyApXHJcbiAgICAgICAgaWYodGhpcy5saXN0W2ldLmVsZW1lbnQgPT09IGVsKSB7XHJcbiAgICAgICAgICB0aGlzLmxpc3Quc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBkcmF3OiBmdW5jdGlvbihvYmosIHRpbWUpIHtcclxuICAgICAgdmFyIGNhbnZhcyA9IG9iai5jb250ZXh0LmNhbnZhcztcclxuXHJcbiAgICAgIGlmKHRoaXMucmVzaXplQ2xlYXIpXHJcbiAgICAgICAgY2FudmFzLndpZHRoID0gY2FudmFzLndpZHRoO1xyXG5cclxuICAgICAgZWxzZVxyXG4gICAgICAgIG9iai5jb250ZXh0LmNsZWFyUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xyXG5cclxuICAgICAgb2JqLmRyYXdpbmcob2JqLmNvbnRleHQsIHRpbWUsIHRoaXMuY29sb3IpO1xyXG4gICAgfSxcclxuICAgIHBsYXk6IGZ1bmN0aW9uKCkge1xyXG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgICB0aGlzLnBhdXNlKCk7XHJcbiAgICAgIHRoaXMuaW50ZXJ2YWwgPSByZXF1ZXN0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIG5vdyA9IERhdGUubm93KCksXHJcbiAgICAgICAgICAgIGk7XHJcblxyXG4gICAgICAgIGZvcihpID0gc2VsZi5saXN0Lmxlbmd0aDsgaS0tOyApXHJcbiAgICAgICAgICBzZWxmLmRyYXcoc2VsZi5saXN0W2ldLCBub3cpO1xyXG4gICAgICB9LCAxMDAwIC8gNjApO1xyXG4gICAgfSxcclxuICAgIHBhdXNlOiBmdW5jdGlvbigpIHtcclxuICAgICAgdmFyIGk7XHJcblxyXG4gICAgICBpZih0aGlzLmludGVydmFsKSB7XHJcbiAgICAgICAgY2FuY2VsSW50ZXJ2YWwodGhpcy5pbnRlcnZhbCk7XHJcbiAgICAgICAgdGhpcy5pbnRlcnZhbCA9IG51bGw7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9O1xyXG5cclxuICBnbG9iYWwuU2t5Y29ucyA9IFNreWNvbnM7XHJcbn0odGhpcykpO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=