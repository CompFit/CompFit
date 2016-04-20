import './style.styl';
import template from 'directives/exercises_sidebar/template.html';

export default function(Exercises, Users) {

    return {
        restrict: 'E',
        replace: true,
        link: function ($scope, $element, $attrs) {
            $scope.exercises = Exercises.getExercises();
            console.log($scope.exercises);
            if (!$scope.exercises) {
                Exercises.getExercisesForUser(Users.getCurrentUser()).then( function(response) {
                    console.log(response.data);
                    $scope.exercises = response.data;
                });
            }
        },
        templateUrl: template
    };
}
