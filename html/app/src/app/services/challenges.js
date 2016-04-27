export default class {

    constructor($http) {
        this.$http = $http;
        this.currentSidebarScrollPosition = null;
        this.observerCallbacks = [];

        this.observeToDestroy = [];

        this.maxYaxis = 0;
        var self = this;

        self.challenges = [];

    }

    resetChartAxis() {
        this.maxYaxis = 0;
    }

    getChartHeight() {
        return this.maxYaxis;
    }

    setChartHeight(num) {
        if (num > this.maxYaxis) {
            this.maxYaxis = num;
            this.notifyObservers();
        }
        // return this.maxYaxis;
    }

    createChallenge(challenge) {
        return this.$http.post("/api/challenge",challenge).then(function(response){
            return response;
        });
    }

    getChallengeById(challenge_id) {
        return this.$http({
              method: 'GET',
              url: '/api/challenge/'+challenge_id
            }).then(function successCallback(response) {
                return response;
              }, function errorCallback(response) {
                return response;
            });
    }

    getChallengeProgress(challenge_id) {
        return this.$http({
              method: 'GET',
              url: '/api/challenge_progress/'+challenge_id
            }).then(function successCallback(response) {
                return response;
              }, function errorCallback(response) {
                return response;
            });
    }

    getChallengesForUser(user_id) {
        return this.$http({
              method: 'GET',
              url: '/api/challenges/user_id/'+user_id
            }).then(function successCallback(response) {
                var challenges = response.data;
                var getProgressLongFraction = function(challenge, team) {
                    if (team == 'my_team')
                    {
                        if (challenge.task_type == 'Individual') {
                            return String(Math.round(10*parseFloat(challenge.user_team.team_progress))/10)+" / "+String(challenge.repetitions*challenge.user_team.players.length);
                        }
                        else if(challenge.task_type == 'Group') {
                            return String(Math.round(10*parseFloat(challenge.user_team.team_progress))/10)+" / "+String((challenge.repetitions));
                        }
                    }
                    else
                    {
                        if (challenge.task_type == 'Individual') {
                            return String(Math.round(10*parseFloat(challenge.oppo_team.team_progress))/10)+" / "+String(challenge.repetitions*challenge.oppo_team.players.length);
                        }
                        else if(challenge.task_type == 'Group') {
                            return String(Math.round(10*parseFloat(challenge.oppo_team.team_progress))/10)+" / "+String(challenge.repetitions);
                        }
                    }
                }

                for (var i = 0; i < challenges.length; i++) {
                    challenges[i].user_team.fraction_team_progress = getProgressLongFraction(challenges[i],'my_team');
                    challenges[i].oppo_team.fraction_team_progress = getProgressLongFraction(challenges[i],'opponent_team');
                }
                console.log("All the challenges",challenges)

                self.challenges = challenges;
                return response;
              }, function errorCallback(response) {
                return response;
            });
    }

    getChallengesForExercise(exercise_id) {
        return this.$http({
              method: 'GET',
              url: '/api/challenges/exercise_id/'+exercise_id
            }).then(function successCallback(response) {
                return response;
              }, function errorCallback(response) {
                return response;
            });
    }

    getChallengesForTeam(team_id) {
        return this.$http({
              method: 'GET',
              url: '/api/team_challenges/'+team_id
            }).then(function successCallback(response) {
                return response;
              }, function errorCallback(response) {
                return response;
            });
    }

    getChallenges() {
        return self.challenges;
    }



    //register an observer
   registerObserverCallback(callback){

      this.observerCallbacks.push(callback);
      if (this.observerCallbacks.length > 2) {
          this.observerCallbacks = this.observerCallbacks.slice(-2);
      }
    }

    notifyObservers(){
       angular.forEach(this.observerCallbacks, function(callback){
         callback();
       });
    }



}
