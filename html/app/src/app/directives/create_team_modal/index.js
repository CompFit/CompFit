import './style.styl';
import template from 'directives/create_team_modal/template.html';

export default function(Teams, Users, $timeout) {

    return {
        restrict: 'E',
        replace:true,
        scope:true,
        // transclude:true,
        link: function postLink($scope, element, attrs) {
            $scope.title = attrs.title;

            $scope.new_team.name = "";
            $scope.new_team.players = [];

            $scope.test_player_name = "";

            $scope.addPlayerFormError = "";

            $scope.addPlayerForNewTeam = function() {
                $scope.addPlayerFormError = "";

                var test_player_name = $scope.test_player_name;
                $scope.test_player_name = "";
                var spot = -1;

                //check if the player entered is in the players list
                for(var i = 0; i<$scope.new_team.players.length; i++) {
                    if ($scope.new_team.players[i].username == test_player_name) {
                        spot = i;
                        break;
                    }
                }

                if (spot == -1) {
                    Users.getUserByUsername(test_player_name).then(function(response){
                        console.log(response.data);

                        if (response.data.error != undefined) {
                            console.log("ERROR! in getting userbyusername in create_team_modal", response.data.error);
                        }
                        else {
                            $scope.new_team.players.push(response.data);
                        }
                    });
                }
                else {
                    //send error message
                    $scope.addPlayerFormError = "That player is already added.";
                    $timeout(function(){
                         $scope.addPlayerFormError = "";
                     }, 1500);
                }
            };

            $scope.removeProspectivePlayer = function(player) {
                var index = $scope.new_team.players.indexOf(player);
                $scope.new_team.players.splice(index,1);
            };


            $scope.submitTeam = function() {
                if ($scope.new_team.name == "" || $scope.new_team.players.length < 1) {

                    //display errors
                    if ($scope.new_team.name == "") {
                        //send error message
                        $scope.teamNameFormError = "That player is already added.";
                        $timeout(function(){
                             $scope.teamNameFormError = "";
                         }, 1500);
                    }

                }
                else {
                    var captain_id = Users.user_id;

                    var players = [];
                    for(var i = 0; i < $scope.new_team.players.length; i++) {
                      players.push($scope.new_team.players[i].user_id);
                    }

                    // $scope.new_team.players.push(captain_id);
                    Teams.createTeam($scope.new_team.name,captain_id,players).then(function (response) {
                        console.log(response.data);
                        // alert("Team_id =",response.data["team_id"]);
                        $(element).modal('hide');

                        //update teams
                        Teams.getTeamsForUser(Users.user_id);

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
