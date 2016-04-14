import './style.styl';
import template from 'directives/create_challenge_modal/template.html';

export default function(Teams, Users, Challenges, $timeout) {

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

            Teams.getTeamsByCaptianId(Users.getCurrentUser()).then(function(response) {
                console.log(response);
                $scope.usersTeams = response.data;
            });

            Teams.getAllTeams().then(function(response) {
                console.log(response);
                $scope.all_teams = response.data;
            })



            //correct for timezone
            Date.prototype.toDateInputValue = (function() {
                var local = new Date(this);
                local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
                return local.toJSON().slice(0,10);
            });

            $(document).ready( function() {
                $('#startDatePicker').val(new Date().toDateInputValue());
                $scope.minChallengeDate = new Date().toDateInputValue();
            });

            $scope.submitChallenge = function() {
                console.log($scope.selected_team);
                if ($scope.new_challenge.team == null) {

                }
                else {
                    // var team_id = $scope.new_challenge.from_team_id;


                    Challenges.createChallenge($scope.new_challenge).then(function (response) {
                        console.log(response.data);

                        $(element).modal('hide');

                    });
                }
            };

            $scope.selectOpponent = function(team) {
                $scope.selected_opponent = team;
                $scope.query = '';
            };
            $scope.clearOpponent = function() {
                $scope.selected_opponent = null;
                document.getElementById("teamsearch").focus();
            }

        },
        templateUrl: template
    };
}
