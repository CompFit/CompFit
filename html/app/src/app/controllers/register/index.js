import './style.styl';

export default function($scope, $stateParams, Users) {
    'ngInject';
    $scope.team_id = $stateParams.id;
    $scope.avatar = "/img/user_avatars/default-avatar.png";

    $scope.submit = function(newUser) {
        console.log(newUser);
        Users.createUser(newUser).then(function(response) {
            console.log(response);
        });
    }
}