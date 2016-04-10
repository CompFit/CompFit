export default class {

    constructor($http) {
        this.$http = $http;
        var self = this;

        self.teams = [];
        self.user_for_teams = 1;
    }

    createTeam(team_name,captain_id,players,avatar="/img/team_avatars/default-avatar.png") {
        var data = {"team_name":team_name,"captain_id":captain_id,"players":players,"avatar":avatar};
        console.log(data);
        return this.$http.post("http://localhost:9000/api/team",data).then(function (response) {
            return response;
        });
    }

    getTeamById(team_id) {
        return this.$http({
              method: 'GET',
              url: 'http://localhost:9000/api/team/'+team_id
            }).then(function successCallback(response) {
                return response;
              }, function errorCallback(response) {
                return response;
            });
    }

    getTeamsForUser(user_id) {
        return this.$http({
              method: 'GET',
              url: 'http://localhost:9000/api/teams/'+user_id
            }).then(function successCallback(response) {
                self.teams = response.data;
                self.user_for_teams = user_id;
                return response;
              }, function errorCallback(response) {
                return response;
            });
    }

    getTeams() {
        return self.teams;
    }

}
