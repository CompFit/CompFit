import './style.styl';
import template from 'directives/sidebar/template.html';

export default function(Teams) {

    return {
        restrict: 'E',
        replace: true,
        link: function (scope, element, attrs) {
            Teams.getTeamsForUser(1).then( function(response) {
                console.log(response.data);
                scope.teams = response.data;
            });
            // scope.name = ;
        },
        templateUrl: template
    };
}
