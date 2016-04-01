export default class {

    constructor($http) {
        this.$http = $http;
        var self = this;

        self.challenges = [];
    }

    getChallengeById(challenge_id) {
        return this.$http({
              method: 'GET',
              url: 'http://private-c84bfb-compfit.apiary-mock.com/team/'+team_id
            }).then(function successCallback(response) {
                return response;
              }, function errorCallback(response) {
                return response;
            });
    }

    getChallengesForUser(user_id) {
        return this.$http({
              method: 'GET',
              url: 'http://private-c84bfb-compfit.apiary-mock.com/teams/'+user_id
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
