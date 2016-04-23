export default class {

    constructor($http) {
        this.$http = $http;
        this.currentSidebarScrollPosition = null;
        var self = this;

        self.challenges = [];

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


}
