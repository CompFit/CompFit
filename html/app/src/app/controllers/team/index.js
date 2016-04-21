import './style.styl';

export default function($scope, $stateParams, Teams, Users, $state) {
    'ngInject';

    $scope.toggleModal = function(){
        console.log($scope.new_team);
          $('#createteammodal').modal('show');
    };
    $scope.team_id = -1;
    $scope.team_name = "";
    $scope.avatar = "/img/team_avatars/default-avatar.png";
    $scope.players = [];
    $scope.players_dropdown = false;
    $scope.team_selected = false;

    $scope.new_team = {};



    if ($stateParams.id == "") {
        Teams.getTeamsForUser(Users.getCurrentUser()).then(function(response){
            var teams = response.data;
            if (teams !== undefined) {
                if (teams[0] !== undefined) {
                    $state.go('app.team', {'id': teams[0].team_id});
                }
            }
        });
    }
    else {
        $scope.team_id = $stateParams.id;
        $scope.team_selected = true;
        Teams.getTeamById($scope.team_id).then(function(response){
            $scope.thisTeam = response.data;
            console.log(response.data);
            $scope.avatar = response.data.avatar;
            $scope.players = response.data.players;
            $scope.team_name = response.data.team_name;
        });
    }
}
