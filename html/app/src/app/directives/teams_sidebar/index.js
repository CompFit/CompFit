import './style.styl';
import template from 'directives/teams_sidebar/template.html';

export default function(Teams) {

    return {
        restrict: 'E',
        replace: true,
        link: function ($scope, $element, $attrs) {
            $scope.teams = Teams.getTeams();
            console.log($scope.teams);
            if (!$scope.teams) {
                Teams.getTeamsForUser(1).then( function(response) {
                    console.log(response.data);
                    $scope.teams = response.data;
                });
            }
        },
        templateUrl: template
    };
}
