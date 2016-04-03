import './style.styl';

export default function($scope, $stateParams, Teams) {
    'ngInject';

    $scope.toggleModal = function(){
          $('#createteammodal').modal('show');
    };

    $scope.team_id = -1;
    $scope.avatar = "/img/team_avatars/default-avatar.png";
    $scope.players = [];
    $scope.players_dropdown = false;
    $scope.team_selected = false;


    if ($stateParams.id != "") {
        $scope.team_id = $stateParams.id;
        $scope.team_selected = true;

        Teams.getTeamById($scope.team_id).then(function(response){
            $scope.thisTeam = response.data;
            console.log(response.data);
            $scope.avatar = response.data.avatar;
            $scope.players = response.data.players;
        });
    }







}
