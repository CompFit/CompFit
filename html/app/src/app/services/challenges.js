export default class {

    constructor($http) {
        this.$http = $http;
        var self = this;

        self.challenges = [];
    }

    getChallengeById(challenge_id) {
        return this.$http({
              method: 'GET',
              url: '/api/team/'+team_id
            }).then(function successCallback(response) {
                return response;
              }, function errorCallback(response) {
                return response;
            });
    }

    getChallengesForUser(user_id) {
        return this.$http({
              method: 'GET',
              url: '/api/teams/'+user_id
            }).then(function successCallback(response) {
                self.challenges = response.data;
                return response;
              }, function errorCallback(response) {
                return response;
            });
    }

    getChallenges() {
        return self.challenges;
    }

}
