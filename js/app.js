var app = angular.module('webApp', ['ngRoute']);

app.config(function($routeProvider) {
  $routeProvider
  .when("/", {
      controller : "authenticationController",
      templateUrl : "login.html"
  })
  .when("/register", {
      controller : "authenticationController",
      templateUrl : "register.html"
  })
  .when("/home", {
      controller : "authenticationController",
      templateUrl : "home.html"
  })
});

app.controller('authenticationController', function($scope, $http, $location, authService) {

  $scope.loginFormSubmitted = false;
  $scope.registerFormSubmitted = false;

  $scope.isLoggedIn = function() {
    return authService.isLoggedIn();
  }

  $scope.login = function(loginForm) {
  	$scope.loginFormSubmitted = true;
    $scope.authenticationError = false;

    if(loginForm.$valid) {
      $http.post("api/checkUser.php", {
        'userId' : loginForm.userId.$viewValue,
        'password' : loginForm.password.$viewValue
      }).success(function(status) {
          localStorage.setItem("userId", loginForm.userId.$viewValue);
          $location.path("/home");
      }).error(function(status) {
          $scope.authenticationError = true;
      });
    }
  };

  $scope.logout = function() {
    authService.setUser(null);
    localStorage.removeItem('userId');
    $location.path("/");
  }

  $scope.createUser = function(registerForm) {
  	$scope.registerFormSubmitted = true;

    if(registerForm.$valid) {
      $http.post("api/insert.php", {
        'fullname' : registerForm.fullname.$viewValue,
        'dateOfBirth' : registerForm.dateOfBirth.$viewValue,
        'sex' : registerForm.sex.$viewValue,
        'aboutYourself' : registerForm.aboutYourself.$viewValue,
        'userId' : registerForm.userId.$viewValue,
        'password' : registerForm.password.$viewValue
      }).success(function(status) {
          $location.path("/");
      });
    }
  };

  $scope.loadUserDetails = function() {
    var userId = localStorage.getItem("userId");
    if(userId === null) {
       $location.path('/');
    }

    $http.get("api/user.php?userId=" + userId).then(function(response) {
      authService.setUser(response.data.profile);
      $scope.user = authService.getUser();
    });
  }
});

app.service('authService', function() {
  var user;
  return {
    setUser : function(currentUser) {
      user = currentUser;
    },
    isLoggedIn : function() {
      return user ? true : false;
    },
    getUser : function() {
      return user ? user : false;
    }
  }
});