import './style.styl';
import template from 'directives/navbar/template.html';

export default function(Authentication) {
    return {
        restrict: 'E',
        link: function ($scope, $element, $attrs) {
            $scope.loggedIn = Authentication.loggedIn;
            $scope.loggedInTest = true;
            var updateLoggedIn = function(){
                $scope.loggedIn = Authentication.loggedIn;
              };

            Authentication.registerObserverCallback(updateLoggedIn);
        },
        templateUrl: template
    };
}
