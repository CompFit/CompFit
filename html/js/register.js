alert("Working!");
angular.module('registerForm', [])
.controller("registerController", ['$scope', function($scope) {
    $scope.master = {};

    $scope.submit = function(user) {
      var newUser = $scope.newUser;
      console.log(newUser);
      $http.post(url,data);
    };

    $scope.reset = function() {
      $scope.user = angular.copy($scope.master);
    };

    $scope.reset();
    }]);
