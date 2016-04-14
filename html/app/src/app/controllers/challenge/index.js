import './style.styl';

export default function($scope, $stateParams, Challenges) {
    'ngInject';

    $scope.new_challenge = {};
    $scope.toggleModal = function(){
        console.log($scope.new_challenge);
          $('#createchallengemodal').modal('show');
    };

    $scope.challenge_selected = false;


    // if ($stateParams.id != "") {
    //     $scope.team_id = $stateParams.id;
    //     $scope.team_selected = true;
    //
    //     Teams.getTeamById($scope.team_id).then(function(response){
    //         $scope.thisTeam = response.data;
    //         console.log(response.data);
    //         $scope.avatar = response.data.avatar;
    //         $scope.players = response.data.players;
    //     });
    // }







}
