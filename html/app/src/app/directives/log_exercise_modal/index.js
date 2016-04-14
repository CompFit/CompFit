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

            $scope.exerciseList = [];
            $scope.unitsForExercise = [];

            $scope.selected_exercise = null;
            $scope.selected_repetitions = null;
            $scope.selected_units = null;

            Exercises.getExerciseList().then(function(response){
                $scope.exerciseList = response.data;
            });

            $scope.submitLog = function() {
                if ($scope.selected_exercise == null || $scope.selected_repetitions == null || $scope.selected_units == null) {

                    //display errors
                    if ($scope.selected_exercise == null) {
                        //send error message
                        $scope.logFormError = "No exercise has been selected";
                        $timeout(function(){
                             $scope.logFormError = "";
                         }, 1500);
                    }
                    else if ($scope.selected_repetitions == null) {
                        //send error message
                        $scope.logFormError = "No amount for repetitions has been added";
                        $timeout(function(){
                             $scope.logFormError = "";
                         }, 1500);
                    }
                    else if ($scope.selected_units == null) {
                        //send error message
                        $scope.logFormError = "No units have been selected";
                        $timeout(function(){
                             $scope.logFormError = "";
                         }, 1500);
                    }

                }
                else {
                    $scope.new_log.user_id = Users.user_id;
                    var dateObj = new Date();
                    $scope.new_log.date = dateObj.getUTCFullYear() + "-" + (dateObj.getUTCMonth() + 1) + "-" + dateObj.getUTCDate();  
                    $scope.new_log.exercise_name = $scope.selected_exercise.exercise_name;
                    $scope.new_log.repetitions = $scope.selected_repetitions;
                    $scope.new_log.units = $scope.selected_units.unit_name;

                    Exercises.logExercise($scope.new_log).then(function (response) {
                        console.log(response.data);
                        $(element).modal('hide');

                        //update teams
                        Exercises.getExercisesForUser(Users.user_id);

                        // $timeout(function(){
                        //
                        // }, 500);
                    });
                }
            };

            $scope.updateUnits = function() {
                Exercises.getUnitsForExercise($scope.selected_exercise.exercise_list_id).then(function(response){
                    console.log(response);
                    $scope.unitsForExercise = response.data;
                });
            };

        },
        templateUrl: template
    };
}
