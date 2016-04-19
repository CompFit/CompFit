import './style.styl';

export default function($scope, $stateParams, Challenges, Teams, Users) {
    'ngInject';

    $scope.new_challenge = {};
    $scope.toggleModal = function(){
          $('#createchallengemodal').modal('show');
    };

    $scope.challenge = {};
    $scope.my_team = {};
    $scope.opponent_team = {};

    $scope.days_left = 0;

    $scope.getDayDifference = function(date1_obj,date2_obj) {
        var date2 = new Date(date2_obj);
        var date1 = new Date(date1_obj);
        var timeDiff = Math.abs(date2.getTime() - date1.getTime());
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        return diffDays;
    };

    $scope.this_user_id = Users.getCurrentUser();

    if ($stateParams.id == '') {
        $scope.challenge_selected = false;

    }
    else {
        $scope.challenge_selected = true;

        // var container = $('div'),
        //     scrollTo = $('#row_8');
        //
        // container.scrollTop(
        //     scrollTo.offset().top - container.offset().top + container.scrollTop()
        // );

        Challenges.getChallengeById($stateParams.id).then(function(response){
            console.log(response);

            $scope.challenge = response.data[0];
            var team1_id = $scope.challenge.to_team_id;
            var team2_id = $scope.challenge.from_team_id;

            Teams.getTeamById(team1_id).then(function(response){
                var this_team = response.data;
                for (var index in this_team.players) {
                    var player = this_team.players[index];
                    console.log(player);
                    if (player.user_id == Users.getCurrentUser()) {
                        console.log("Player is in this team!", team1_id);
                        $scope.my_team = response.data;
                        return response;
                    }
                }

                console.log("Player not in this team", team1_id);
                $scope.opponent_team = response.data;
                return response;
            });

            Teams.getTeamById(team2_id).then(function(response){
                var this_team = response.data;
                for (var index in this_team.players) {
                    var player = this_team.players[index];
                    console.log(player);
                    if (player.user_id == Users.getCurrentUser()) {
                        console.log("Player is in this team!", team2_id);
                        $scope.my_team = response.data;
                        return response;
                    }
                }

                console.log("Player not in this team", team2_id);
                $scope.opponent_team = response.data;
                return response;
            });

            $scope.days_left = $scope.getDayDifference($scope.challenge.end_date,new Date())+1;



        });
    }




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
