import './style.styl';
import template from 'directives/challenges_sidebar/template.html';

export default function(Challenges) {

    return {
        restrict: 'E',
        replace: true,
        link: function ($scope, $element, $attrs) {
            // $scope.challenges = Challenges.getChallenges();
            // console.log($scope.challenges);
            // if (!$scope.challenges) {
            //     Challenges.getChallengesForUser(1).then( function(response) {
            //         console.log(response.data);
            //         $scope.challenges = response.data;
            //     });
            // }
        },
        templateUrl: template
    };
}
