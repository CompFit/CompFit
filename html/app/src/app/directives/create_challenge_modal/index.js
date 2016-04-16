import './style.styl';
import template from 'directives/create_challenge_modal/template.html';

export default function(Teams, Users, Challenges, Exercises, $timeout) {

    return {
        restrict: 'E',
        replace:true,
        scope:true,
        // transclude:true,
        link: function postLink($scope, element, attrs) {
            $scope.title = attrs.title;

            $scope.new_challenge.to_team_id = null;
            $scope.new_challenge.from_team_id = null;

            $scope.selected_team = null;

            $scope.selected_units = {};
            $scope.selected_units.unit_name = "Amount";

            $scope.exerciseList = [];

            $scope.selected_exercise = null;

            $scope.unitsForExercise = [];

            Exercises.getExerciseList().then(function(response){
                $scope.exerciseList = response.data;
            });

            Teams.getTeamsByCaptianId(Users.getCurrentUser()).then(function(response) {
                $scope.usersTeams = response.data;
                $scope.selected_team = $scope.usersTeams[0];
            });

            Teams.getAllOpponentTeams(Users.getCurrentUser()).then(function(response) {
                $scope.all_teams = response.data;
            })



            //correct for timezone
            Date.prototype.toDateInputValue = (function() {
                var local = new Date(this);
                local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
                return local.toJSON().slice(0,10);
            });

            $(document).ready( function() {
                $scope.new_challenge.start_date = new Date();
                $scope.minChallengeStartDate = new Date().toDateInputValue();
                $scope.minChallengeEndDate = new Date().toDateInputValue();
            });

            $scope.updateStartDate = function() {
                $scope.minChallengeEndDate = $scope.new_challenge.start_date.toDateInputValue();
            };

            $scope.submitChallenge = function() {
                if ($scope.selected_team == null || $scope.selected_opponent == null) {
                    if($scope.selected_opponent == null) {
                        $scope.opponentSelectedFormError = "Please select an opponent team.";
                        $timeout(function(){
                             $scope.opponentSelectedFormError = "";
                         }, 1500);
                     }
                     
                }
                else {
                    // var team_id = $scope.new_challenge.from_team_id;
                    // console.log($scope.selected_team, $scope.selected_opponent);
                    $scope.new_challenge.from_team_id = $scope.selected_team.team_id;
                    $scope.new_challenge.to_team_id = $scope.selected_opponent.team_id;
                    $scope.new_challenge.task_name = $scope.selected_exercise.exercise_name;
                    $scope.new_challenge.units = $scope.selected_units.unit_name;
                    $scope.new_challenge.task_type = "Group";

                    console.log($scope.new_challenge);
                    Challenges.createChallenge($scope.new_challenge).then(function (response) {
                        console.log(response);



                        Challenges.getChallengesForUser(Users.getCurrentUser());

                        $(element).modal('hide');

                    });
                }
            };

            $scope.selectOpponent = function(team) {
                $scope.selected_opponent = team;
                $scope.query = team.team_name;
            };
            $scope.clearOpponent = function() {
                $scope.selected_opponent = null;
                $scope.query = '';
                document.getElementById("teamsearch").disabled=false;
                document.getElementById("teamsearch").focus();
            };

            $scope.showQuery = function() {
                return $scope.query && !$scope.selected_opponent;
            };

            $scope.updateUnits = function() {
                Exercises.getUnitsForExercise($scope.selected_exercise.exercise_list_id).then(function(response){
                    // console.log(response);
                    $scope.unitsForExercise = response.data;
                    $scope.selected_units = $scope.unitsForExercise[0];
                });
            };

        },
        templateUrl: template
    };
}
