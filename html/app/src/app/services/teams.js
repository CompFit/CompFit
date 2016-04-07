export default class {

    constructor($http) {
        this.$http = $http;
        var self = this;

        self.teams = [];
    }

    createTeam(team_name,captain_id,players,avatar="/img/team_avatars/default-avatar.png") {
        var data = {"team_name":team_name,"captain_id":captain_id,"players":players,"avatar":avatar};
        return this.$http.post("http://private-c84bfb-compfit.apiary-mock.com/team",data).then(function (response) {
            return response;
        });
    }

    getTeamById(team_id) {
        return this.$http({
              method: 'GET',
              url: 'http://private-c84bfb-compfit.apiary-mock.com/team/'+team_id
            }).then(function successCallback(response) {
                return response;
              }, function errorCallback(response) {
                return response;
            });
    }

    getTeamsForUser(user_id) {
        return this.$http({
              method: 'GET',
              url: 'http://private-c84bfb-compfit.apiary-mock.com/teams/'+user_id
            }).then(function successCallback(response) {
                self.teams = response.data;
                return response;
              }, function errorCallback(response) {
                return response;
            });
    }

    getTeams() {
        return self.teams;
    }

}
