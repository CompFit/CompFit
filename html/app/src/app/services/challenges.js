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
                self.challenges = response.data;
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
