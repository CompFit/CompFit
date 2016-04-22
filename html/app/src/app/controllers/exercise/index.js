import './style.styl';

export default function($scope, $stateParams, Exercises, Users, Challenges, Teams, $state) {
    'ngInject';

    $scope.toggleModal = function(){
        console.log($scope.new_log);
          $('#logexercisemodal').modal('show');
    };

    $scope.exercise_id = -1;
    $scope.exercise_selected = false;

    $scope.exercises = [];

    $scope.exercise = {};


    $scope.new_log = {};

    if ($stateParams.id == "") {
        Exercises.getExercisesForUser(Users.getCurrentUser()).then(function(response){
            var exercises = response.data;
            if (exercises !== undefined) {
                if (exercises[0] !== undefined) {

                    $state.go('app.exercise', {'id': exercises[0].exercise_id});
                }
            }
        });
    }
    else  {
        $scope.exercise_id = $stateParams.id;
        $scope.exercise_selected = true;

        Exercises.getExerciseById($scope.exercise_id).then(function(response) {
            console.log("exercise",response);
            $scope.exercise = response.data;
        });

        Challenges.getChallengesForExercise($scope.exercise_id).then(function(response){
            console.log("challenges:",response);
            $scope.challenges = response.data;
        });
    }

    $scope.getTeamProgress = function(challenge) {
        if (challenge.task_type == 'Individual') {
            return (100 * challenge.user_team.team_progress/challenge.repetitions/challenge.user_team.num_members).toFixed(0);
        }
        else {
            return (100 * challenge.user_team.team_progress/challenge.repetitions).toFixed(0);
        }
    };
    $scope.getUserProgress = function(challenge) {
        if (challenge.task_type == 'Individual') {
            return (100 * challenge.user_progress/challenge.repetitions).toFixed(0);
        }
        else {
            return (100 * challenge.user_progress/challenge.repetitions/challenge.user_team.num_members).toFixed(0);
        }
    };

}
