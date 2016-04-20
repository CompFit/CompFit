import './style.styl';
import template from 'directives/challenges_sidebar/template.html';

export default function(Challenges, Users, $timeout) {

    return {
        restrict: 'E',
        replace: true,
        link: function ($scope, $element, $attrs) {
              $scope.challenges = Challenges.getChallenges();


              $scope.scrollTo = Challenges.currentSidebarScrollPosition;
              if ($scope.scrollTo != null) {
                  $timeout(function(){
                      $('#challengelist').animate({
                          scrollTop: $scope.scrollTo
                      });
                  }, 0);
              }

              $scope.saveScrollPosition = function() {
                  Challenges.currentSidebarScrollPosition = $('#challengelist').scrollTop();
              };

              if (!$scope.challenges) {
                  Challenges.getChallengesForUser(Users.getCurrentUser()).then( function(response) {
                      console.log(response.data);
                      $scope.challenges = response.data;
                  });
              }
        },
        templateUrl: template
    };
}
