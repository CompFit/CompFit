import './style.styl';
import template from 'directives/challenges_sidebar/template.html';

export default function(Challenges, Users, $timeout) {

    return {
        restrict: 'E',
        replace: true,
        link: function ($scope, $element, $attrs) {
              $scope.challenges = Challenges.getChallenges();
              $scope.past_challenges = Challenges.getPastChallenges();

              $scope.getDayDifference = function(date1_obj,date2_obj) {
                  var date2 = new Date(date2_obj);
                  var date1 = new Date(date1_obj);
                  var timeDiff = date2.getTime() - date1.getTime();
                  var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
                  return diffDays;
              };

              $scope.getDaysLeft = function(challenge) {
                  return $scope.getDayDifference(new Date(),challenge.end_date)+1;
              };

              $scope.getTeamProgress = function(challenge) {
                  if (challenge.task_type == 'Individual') {
                      return (100 * challenge.user_team.team_progress/challenge.repetitions/challenge.user_team.players.length).toFixed(0);
                  }
                  else {
                      return (100 * challenge.user_team.team_progress/challenge.repetitions).toFixed(0);
                  }

              };

              $scope.getOppoTeamProgress = function(challenge) {
                  if (challenge.task_type == 'Individual') {
                      return (100 * challenge.oppo_team.team_progress/challenge.repetitions/challenge.oppo_team.players.length).toFixed(0);
                  }
                  else {
                      return (100 * challenge.oppo_team.team_progress/challenge.repetitions).toFixed(0);
                  }
              };

              $scope.scrollTo = Challenges.currentSidebarScrollPosition;
              if ($scope.scrollTo != null) {
                  $timeout(function(){
                    //   $('#challengelist').animate({
                    //       scrollTop: $scope.scrollTo
                    //   });

                        $('#challengelist').scrollTop($scope.scrollTo);
                    }, 0);
              }

              $('#challengelist').css('max-height', (window.innerHeight-146)+'px');

              $(window).resize(function() {
                $('#challengelist').css('max-height', (window.innerHeight-146)+'px');
              });

              $scope.saveScrollPosition = function() {
                  Challenges.currentSidebarScrollPosition = $('#challengelist').scrollTop();
              };

              if (!$scope.challenges) {
                  Challenges.getChallengesForUser(Users.getCurrentUser()).then( function(response) {
                      console.log(response.data);
                      $scope.challenges = response.data;
                  });
              }

              if (!$scope.past_challenges) {
                  Challenges.getPastChallengesForUser(Users.getCurrentUser()).then( function(response) {
                      console.log(response.data);
                      $scope.past_challenges = response.data;
                  });
              }
        },
        templateUrl: template
    };
}
