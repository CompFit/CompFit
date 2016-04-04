import './style.styl';
import template from 'directives/create_team_modal/template.html';

export default function(Teams, Users) {

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

            $scope.addPlayerForNewTeam = function() {
                Users.getUserByUsername($scope.test_player_name).then(function(response){
                    console.log(response.data);
                    $scope.new_team.players.push(response.data);
                });
            };

            $scope.removeProspectivePlayer = function(player) {
                var index = $scope.new_team.players.indexOf(player);
                $scope.new_team.players.splice(index,1);
            };

        },
        templateUrl: template
    };
}
