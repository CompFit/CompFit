import './style.styl';
import template from 'directives/exercises_sidebar/template.html';

export default function(Exercises, Users) {

    return {
        restrict: 'E',
        replace: true,
        link: function ($scope, $element, $attrs) {
            $scope.exercises = Exercises.getExercises();
            console.log($scope.exercises);
            $scope.scrollTo = Exercises.currentSidebarScrollPosition;
              if ($scope.scrollTo != null) {
                  $('#exerciselist').scrollTop($scope.scrollTo);
              }

            $scope.saveScrollPosition = function() {
              Exercises.currentSidebarScrollPosition = $('#exerciselist').scrollTop();
            };

            $('#exerciselist').css('max-height', (window.innerHeight-106)+'px');

            $(window).resize(function() {
              $('#exerciselist').css('max-height', (window.innerHeight-106)+'px');
            });

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
