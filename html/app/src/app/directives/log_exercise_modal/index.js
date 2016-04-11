import './style.styl';
import template from 'directives/log_exercise_modal/template.html';

export default function(Exercises, Users, $timeout) {

    return {
        restrict: 'E',
        replace:true,
        scope:true,
        // transclude:true,
        link: function postLink($scope, element, attrs) {
            $scope.title = attrs.title;

            $scope.submitLog = function() {
            };

        },
        templateUrl: template
    };
}
