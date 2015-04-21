
var app = angular.module('hypo', ['ionic', 'ui.bootstrap'])

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
 
// app.constant('ApiEndpoint', {
//   url: 'http://kevinnewman.ca/hypo/test'
// })

//--------Routing-------//

app.config(function($stateProvider, $urlRouterProvider, $httpProvider) {



  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $httpProvider.interceptors.push('TokenInterceptor');
  $stateProvider

  // setup an abstract state for the tabs directive
$stateProvider

  // setup an abstract state for the tabs directive
 .state('login', {
    url: "/login",
    templateUrl: "partials/login.html",
    controller:'LoginCtrl',
    access:{
      requiredLogin:false
    }
  })

  // Each tab has its own nav history stack:

  .state('tab-dash', {
    url: '/tab/dash',
        templateUrl: 'partials/tab-dash.html',
        controller: 'DashCtrl',
         access:{
          requiredLogin:true
        }
      
  });

  $urlRouterProvider.otherwise('/login');

});

app.run(function($rootScope, $window, $location, AuthenticationFactory) {
  // when the page refreshes, check if the user is already logged in
  AuthenticationFactory.check();

  $rootScope.$on("$stateChangeStart", function(event, nextRoute, currentRoute) {
    console.log(AuthenticationFactory.isLogged);
    if ((nextRoute.access && nextRoute.access.requiredLogin) && !AuthenticationFactory.isLogged) {
      $location.path("/login");
    } else {
      // check if user object exists else fetch it. This is incase of a page refresh
      if (!AuthenticationFactory.user) AuthenticationFactory.user = $window.sessionStorage.user;
    }
  });
 
  $rootScope.$on('$routeChangeSuccess', function(event, nextRoute, currentRoute) {
    $rootScope.showMenu = AuthenticationFactory.isLogged;
    // if the user is already logged in, take him to the home page
    if (AuthenticationFactory.isLogged == true && $location.path() == '/login') {
      console.log("signed in");
      $location.path('/tab/dash');
    }
  });
});