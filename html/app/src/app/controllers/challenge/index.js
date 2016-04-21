import './style.styl';

export default function($scope, $stateParams, Challenges, Teams, Users, $timeout, $state) {
    'ngInject';

    $scope.new_challenge = {};
    $scope.toggleModal = function(){
          $('#createchallengemodal').modal('show');
    };

    $scope.challenge = {};
    $scope.my_team = {"players":[],"team_id":null};
    $scope.opponent_team = {"players":[]};

    $scope.current_user_id = Users.getCurrentUser();

    $scope.days_left = 0;

    $scope.getDayDifference = function(date1_obj,date2_obj) {
        var date2 = new Date(date2_obj);
        var date1 = new Date(date1_obj);
        var timeDiff = date2.getTime() - date1.getTime();
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        return diffDays;
    };

    $scope.updateProgress = function () {
        var trs = document.querySelectorAll('.table-body tr');
        for (var i=0; i<trs.length; i++) {
            var tr = trs[i];
            var pr = tr.querySelector('.progress');

            if (tr.dataset.progress > 100) {
                pr.style.left = (0)+'%';
            }
            else if(tr.dataset.progress <= 0) {
                pr.style.left = (-98)+'%';
            }
            else {
                pr.style.left = (tr.dataset.progress - 100)+'%';
            }

            if(tr.dataset.progress < 30) {
                pr.style.background = "#D7575D";
            }
            else if(tr.dataset.progress < 70) {
                pr.style.background = "#FFCC00";
            }
            else if(tr.dataset.progress < 100){
                pr.style.background = "#8F8";
            }
            else {
                pr.style.background = "#239DF0";
            }

            pr.style.height = tr.clientHeight + 'px';
        }
    };

    $scope.getProgressFraction = function(team, index=0) {
        if (team == 'my_team')
        {
            if( $scope.challenge.task_type == 'Individual') {
                return String($scope.my_team.players[index].user_progress)+"/"+String($scope.challenge.repetitions);
            }
            else {
                return String($scope.my_team.players[index].user_progress)+"/"+String(($scope.challenge.repetitions/$scope.my_team.players.length).toFixed(1));
            }
        }
        else if (team == 'opponent_team')
        {
            if( $scope.challenge.task_type == 'Individual') {
                return String($scope.opponent_team.players[index].user_progress)+"/"+String($scope.challenge.repetitions);
            }
            else {
                return String($scope.opponent_team.players[index].user_progress)+"/"+String(($scope.challenge.repetitions/$scope.opponent_team.players.length).toFixed(1));
            }
        }
        else if (team == 'all_my_team')
        {
            if ($scope.challenge.task_type == 'Individual') {
                return String($scope.my_team.team_progress)+"/"+String($scope.challenge.repetitions*$scope.my_team.players.length);
            }
            else {
                return String($scope.my_team.team_progress)+"/"+String(($scope.challenge.repetitions));
            }
        }
        else
        {
            if ($scope.challenge.task_type == 'Individual') {
                return String($scope.opponent_team.team_progress)+"/"+String($scope.challenge.repetitions*$scope.opponent_team.players.length);
            }
            else {
                return String($scope.opponent_team.team_progress)+"/"+String($scope.challenge.repetitions);
            }
        }
    };

    $scope.getProgress = function(team,index=0) {
        if (team == 'my_team')
        {
            if( $scope.challenge.task_type == 'Individual') {
                return 100 * $scope.my_team.players[index].user_progress/$scope.challenge.repetitions;
            }
            else {
                return (100 * $scope.my_team.players[index].user_progress/$scope.challenge.repetitions*$scope.my_team.players.length).toFixed(0);
            }
        }
        else if (team == 'opponent_team')
        {
            if( $scope.challenge.task_type == 'Individual') {
                return 100 * $scope.opponent_team.players[index].user_progress/$scope.challenge.repetitions;
            }
            else {
                return (100 * $scope.opponent_team.players[index].user_progress/$scope.challenge.repetitions*$scope.opponent_team.players.length).toFixed(0);
            }
        }
        else if (team == 'all_my_team')
        {
            if ($scope.challenge.task_type == 'Individual') {
                return (100 * $scope.my_team.team_progress/$scope.challenge.repetitions/$scope.my_team.players.length).toFixed(0);
            }
            else {
                return (100 * $scope.my_team.team_progress/$scope.challenge.repetitions).toFixed(0);
            }
        }
        else
        {
            if ($scope.challenge.task_type == 'Individual') {
                return (100 * $scope.opponent_team.team_progress/$scope.challenge.repetitions/$scope.opponent_team.players.length).toFixed(0);
            }
            else {
                return (100 * $scope.opponent_team.team_progress/$scope.challenge.repetitions).toFixed(0);
            }
        }
    };

    $scope.isCaptain = function(team,index) {
        // if (team == 'my_team') {
        //     return $scope.my_team.captain_id
        // }
    };

    $timeout(function () {
        $scope.updateProgress();
    }, 700);


    $scope.this_user_id = Users.getCurrentUser();

    if ($stateParams.id == '') {
        $scope.challenge_selected = false;

        var challenges = Challenges.getChallenges();
        if (challenges != undefined) {
            if (challenges[0] != undefined) {
                $state.go('app.challenge', {'id': challenges.challenge_id});
            }
        }


    }
    else {
        $scope.challenge_selected = true;

        // var container = $('div'),
        //     scrollTo = $('#row_8');
        //
        // container.scrollTop(
        //     scrollTo.offset().top - container.offset().top + container.scrollTop()
        // );

        Challenges.getChallengeProgress($stateParams.id).then(function(response){
            console.log(response);

            var team1 = response.data.oppo_team;
            var team2 = response.data.user_team;

            var found = false;
            for (var index in team1.players) {
                var player = team1.players[index];
                if (player.user_id == Users.getCurrentUser()) {
                    $scope.my_team = team1;
                    found = true;
                }
            }

            if (found){
                $scope.opponent_team = team2;
            }
            else {
                $scope.opponent_team = team1;
                $scope.my_team = team2;
            }
        });



        Challenges.getChallengeById($stateParams.id).then(function(response){
            console.log(response);
            $scope.challenge = response.data[0];
            $scope.days_left = $scope.getDayDifference(new Date(),$scope.challenge.end_date)+1;
        });
    }

    $scope.goToMyTeam = function() {
        $state.go('app.team', {'id': $scope.my_team.team_id});
    };


}
