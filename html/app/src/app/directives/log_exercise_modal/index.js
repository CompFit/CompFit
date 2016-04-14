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

            $scope.submitLog = function() {
                if ($scope.new_log.name == "" || $scope.new_log.repetitions == "" || $scope.new_log.units == "") {

                    //display errors
                    if ($scope.new_log.name == "") {
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

                    Exercises.logExercise(user_id,date,$scope.new_log.name,$scope.new_log.repetitions,$scope.new_log.units).then(function (response) {
                        console.log(response.data);
                        // alert("Team_id =",response.data["team_id"]);
                        $(element).modal('hide');

                        //update teams
                        Exercises.getExercisesForUser(Users.user_id);

                        // $timeout(function(){
                        //
                        // }, 500);
                    });
                }
            };

        },
        templateUrl: template
    };
}
