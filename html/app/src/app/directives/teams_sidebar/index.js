import './style.styl';
import template from 'directives/teams_sidebar/template.html';

export default function(Teams, Users) {

    return {
        restrict: 'E',
        replace: true,
        link: function ($scope, $element, $attrs) {
            $scope.teams = Teams.getTeams();
            // console.log($scope.teams);
            if (!$scope.teams || Teams.user_for_teams != Users.getCurrentUser()) {
                Teams.getTeamsForUser(Users.getCurrentUser()).then( function(response) {
                    // console.log(response.data);
                    $scope.teams = response.data;
                });
            }
        },
        templateUrl: template
    };
}
