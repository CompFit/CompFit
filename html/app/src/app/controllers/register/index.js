import './style.styl';

export default function($scope, $stateParams, Users) {
    'ngInject';
    $scope.team_id = $stateParams.id;
    $scope.avatar = "/img/user_avatars/default-avatar.png";


//    Teams.getTeamById($scope.team_id).then(function(response){
//        $scope.thisTeam = response.data;
//        console.log(response.data);
//        $scope.avatar = response.data.avatar;
//    });
    $scope.submit = function(newUser) {
        console.log(newUser);
        Users.createUser(newUser).then(function(response) {
            console.log(response);
        });
    }


}
