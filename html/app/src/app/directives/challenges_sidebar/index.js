import './style.styl';
import template from 'directives/challenges_sidebar/template.html';

export default function(Challenges, Users) {

    return {
        restrict: 'E',
        replace: true,
        link: function ($scope, $element, $attrs) {
            // var updateChallenges = function(){
            //     // Challenges.getChallengesForUser(Users.getCurrentUser()).then( function(response) {
            //     //     console.log(response.data);
            //     //     $scope.challenges = response.data;
            //     // });
            //     console.log("update challenges");
            //     $scope.challenges = Challenges.getChallenges();
            //   };

              $scope.challenges = Challenges.getChallenges();
              if (!$scope.challenges) {
                  Challenges.getChallengesForUser(Users.getCurrentUser()).then( function(response) {
                      console.log(response.data);
                      $scope.challenges = response.data;
                  });
              }

            // Challenges.registerObserverCallback(updateChallenges);
        },
        templateUrl: template
    };
}
