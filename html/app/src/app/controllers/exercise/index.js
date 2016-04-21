import './style.styl';

export default function($scope, $stateParams, Exercises) {
    'ngInject';

    $scope.toggleModal = function(){
        console.log($scope.new_log);
          $('#logexercisemodal').modal('show');
    };

    $scope.exercise_id = -1;
    $scope.exercise_selected = false;

    $scope.exercises = [];

    $scope.new_log = {};

    if ($stateParams.id != "") {
        $scope.exercise_id = $stateParams.id;
        $scope.exercise_selected = true;

        // Exercises.getTeamById($scope.team_id).then(function(response){
        //     $scope.thisTeam = response.data;
        //     console.log(response.data);
        //     $scope.avatar = response.data.avatar;
        //     $scope.players = response.data.players;
        //     $scope.team_name = response.data.team_name;
        // });
    }

}
