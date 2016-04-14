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

            $scope.new_log.name = "";
            $scope.new_log.repetitions = "";
            $scope.new_log.units = "";

            $scope.exerciseList = [];
            $scope.selected_exercise = null;
            $scope.selected_units = null;
            $scope.unitsForExercise = [];

            Exercises.getExerciseList().then(function(response){
                $scope.exerciseList = response.data;
            });

            $scope.submitLog = function() {
                if ($scope.selected_exercise == null || $scope.new_log.repetitions == "" || $scope.selected_units == "") {

                    //display errors
                    if ($scope.selected_exercise == null) {
                        //send error message
                        $scope.logFormError = "No exercise has been selected";
                        $timeout(function(){
                             $scope.logFormError = "";
                         }, 1500);
                    }
                    else if ($scope.new_log.repetitions == "") {
                        //send error message
                        $scope.logFormError = "No amount for repetitions has been added";
                        $timeout(function(){
                             $scope.logFormError = "";
                         }, 1500);
                    }
                    else if ($scope.new_log.units == "") {
                        //send error message
                        $scope.logFormError = "No units have been selected";
                        $timeout(function(){
                             $scope.logFormError = "";
                         }, 1500);
                    }

                }
                else {
                    var user_id = Users.user_id;
                    var dateObj = new Date();
                    var date = dateObj.getUTCFullYear() + "-" + (dateObj.getUTCMonth() + 1) + "-" + dateObj.getUTCDate();
                    
                    $scope.new_log.name = $scope.selected_exercise.exercise_name;
                    $scope.new_log.units = $scope.selected_units.unit_name;

                    Exercises.logExercise(user_id,date,$scope.new_log.name,$scope.new_log.repetitions,$scope.new_log.units).then(function (response) {
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
