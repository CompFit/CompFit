import './style.styl';

export default function($scope, $stateParams, Challenges, Teams, Users, $timeout, $state,$filter) {
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

    Date.prototype.addDays = function(days) {
        var dat = new Date(this.valueOf())
        dat.setDate(dat.getDate() + days);
        return dat;
    }

    $scope.getDayDifference = function(date1_obj,date2_obj) {
        var date2 = new Date(date2_obj);
        var date1 = new Date(date1_obj);
        var timeDiff = date2.getTime() - date1.getTime();
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        return diffDays;
    };

    $scope.getDays = function(startDate, stopDate) {
        var date_start = new Date(startDate).addDays(1);
        var date_end = new Date(stopDate).addDays(1);
        var dateArray = [];
        var currentDate = date_start;
        while (currentDate <= date_end) {
            dateArray.push( $filter('date')(currentDate, "M/dd") );
            currentDate = currentDate.addDays(1);
        }
        return dateArray;
    }

    $scope.updateProgress = function () {
        var trs = document.querySelectorAll('.table-body tr');
        for (var i=0; i<trs.length; i++) {
            var tr = trs[i];
            var pr = tr.querySelector('.player-progress');

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
                return String(Math.round(10*parseFloat($scope.my_team.players[index].user_progress))/10)+"/"+String($scope.challenge.repetitions);
            }
            else {
                return String(Math.round(10*parseFloat($scope.my_team.players[index].user_progress))/10)+"/"+String(($scope.challenge.repetitions/$scope.my_team.players.length).toFixed(1));
            }
        }
        else if (team == 'opponent_team')
        {
            if( $scope.challenge.task_type == 'Individual') {
                return String(Math.round(10*parseFloat($scope.opponent_team.players[index].user_progress))/10)+"/"+String($scope.challenge.repetitions);
            }
            else {
                return String(Math.round(10*parseFloat($scope.opponent_team.players[index].user_progress))/10)+"/"+String(($scope.challenge.repetitions/$scope.opponent_team.players.length).toFixed(1));
            }
        }
        else if (team == 'all_my_team')
        {
            if ($scope.challenge.task_type == 'Individual') {
                return String(Math.round(10*parseFloat($scope.my_team.team_progress))/10)+"/"+String($scope.challenge.repetitions*$scope.my_team.players.length);
            }
            else {
                return String(Math.round(10*parseFloat($scope.my_team.team_progress))/10)+"/"+String(($scope.challenge.repetitions));
            }
        }
        else
        {
            if ($scope.challenge.task_type == 'Individual') {
                return String(Math.round(10*parseFloat($scope.opponent_team.team_progress))/10)+"/"+String($scope.challenge.repetitions*$scope.opponent_team.players.length);
            }
            else {
                return String(Math.round(10*parseFloat($scope.opponent_team.team_progress))/10)+"/"+String($scope.challenge.repetitions);
            }
        }
    };

    $scope.getProgress = function(team,index=0) {
        if (team == 'my_team')
        {
            if( $scope.challenge.task_type == 'Individual') {
                return (100 * $scope.my_team.players[index].user_progress/$scope.challenge.repetitions).toFixed(0);
            }
            else {
                return (100 * $scope.my_team.players[index].user_progress/$scope.challenge.repetitions*$scope.my_team.players.length).toFixed(0);
            }
        }
        else if (team == 'opponent_team')
        {
            if( $scope.challenge.task_type == 'Individual') {
                return (100 * $scope.opponent_team.players[index].user_progress/$scope.challenge.repetitions).toFixed(0);
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

        Challenges.getChallengesForUser($scope.this_user_id).then(function(response){
            var challenges = response.data;
            if (challenges !== undefined) {
                if (challenges[0] !== undefined) {
                    $state.go('app.challenge', {'id': challenges[0].challenge_id});
                }
            }
        });



    }
    else {
        $scope.challenge_selected = true;

        Challenges.getChallengeById($stateParams.id).then(function(response){
            console.log(response);
            $scope.challenge = response.data[0];
            $scope.days_left = $scope.getDayDifference(new Date(),$scope.challenge.end_date)+1;

            $scope.myTeamChartData.tooltip.valueSuffix = ' ' + $scope.challenge.units;
            $scope.myTeamChartData.yAxis.title.text = $filter('capitalize')($scope.challenge.units);

            $scope.opponentTeamChartData.tooltip.valueSuffix = ' ' + $scope.challenge.units;
            $scope.opponentTeamChartData.yAxis.title.text = $filter('capitalize')($scope.challenge.units);





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

                $scope.myTeamChartData.series = [];
                $scope.opponentTeamChartData.series = [];
                $scope.myTeamChartData.title.text = 'Cumulative Player Contribution by Day for ' + $scope.my_team.team_name;
                $scope.opponentTeamChartData.title.text = 'Cumulative Player Contribution by Day for ' + $scope.opponent_team.team_name;
                var dateList = $scope.getDays(new Date($scope.challenge.start_date),new Date());

                $scope.myTeamChartData.xAxis.categories = dateList;
                $scope.opponentTeamChartData.xAxis.categories = dateList;

                var maxYaxis = Math.max($scope.my_team.team_progress,$scope.opponent_team.team_progress)
                // $scope.myTeamChartData.yAxis.max = maxYaxis;
                // $scope.opponentTeamChartData.yAxis.max = maxYaxis;


                for (var i = 0; i < $scope.my_team.players.length; i++) {
                    var seriesData = {
                        name: $scope.my_team.players[i].username,
                        data: new Array(dateList.length)
                    }
                    var total = 0;
                    for(var d = 0; d < dateList.length; d++) {
                        var amountForDay = 0;
                        for(var j = 0; j <$scope.my_team.players[i].user_exercises.length; j++) {
                            var date_logged = $filter('date')(new Date($scope.my_team.players[i].user_exercises[j].date_completed),'M/dd');
                            if (date_logged==dateList[d]) {
                                amountForDay += parseInt($scope.my_team.players[i].user_exercises[j].repetitions);
                            }
                        }
                        total += amountForDay;
                        seriesData.data[d] = total;
                    }

                    $scope.myTeamChartData.series.push(seriesData);
                }

                for (var i = 0; i < $scope.opponent_team.players.length; i++) {
                    var seriesData = {
                        name: $scope.opponent_team.players[i].username,
                        data: new Array(dateList.length)
                    }
                    var total = 0;
                    for(var d = 0; d < dateList.length; d++) {
                        var amountForDay = 0;
                        for(var j = 0; j <$scope.opponent_team.players[i].user_exercises.length; j++) {
                            var date_logged = $filter('date')(new Date($scope.opponent_team.players[i].user_exercises[j].date_completed),'M/dd');
                            if (date_logged==dateList[d]) {
                                amountForDay += parseInt($scope.opponent_team.players[i].user_exercises[j].repetitions);
                            }
                        }
                        total += amountForDay;
                        seriesData.data[d] = total;
                    }

                    $scope.opponentTeamChartData.series.push(seriesData);
                }


                // yAxis: {min: 0, max: 100}
                Challenges.resetChartAxis();
                Challenges.notifyObservers();
            });
        });
    }

    $scope.goToMyTeam = function() {
        $state.go('app.team', {'id': $scope.my_team.team_id});
    };



    $scope.myTeamChartData = {
        chart: {
            type: 'area'
        },
        title: {
            text: 'Cumulative Player Contribution by Day'
        },
        // subtitle: {
        //     text: 'Source: Wikipedia.org'
        // },
        xAxis: {
            categories: [],
            tickmarkPlacement: 'on',
            title: {
                enabled: false
            }
        },
        yAxis: {
            title: {
                text: 'Miles'
            },
            labels: {
                formatter: function () {
                    return this.value;
                }
            }
        },
        tooltip: {
            shared: true,
            valueSuffix: ' miles'
        },
        plotOptions: {
            area: {
                stacking: 'normal',
                lineColor: '#666666',
                lineWidth: 1,
                marker: {
                    lineWidth: 1,
                    lineColor: '#666666'
                }
            }
        },
        series: []
    };

    $scope.opponentTeamChartData = {
        chart: {
            type: 'area'
        },
        title: {
            text: 'Cumulative Player Contribution by Day'
        },
        // subtitle: {
        //     text: 'Source: Wikipedia.org'
        // },
        xAxis: {
            categories: [],
            tickmarkPlacement: 'on',
            title: {
                enabled: false
            }
        },
        yAxis: {
            title: {
                text: 'Miles'
            },
            labels: {
                formatter: function () {
                    return this.value;
                }
            }
        },
        tooltip: {
            shared: true,
            valueSuffix: ' miles'
        },
        plotOptions: {
            area: {
                stacking: 'normal',
                lineColor: '#666666',
                lineWidth: 1,
                marker: {
                    lineWidth: 1,
                    lineColor: '#666666'
                }
            }
        },
        series: []
    };
}
