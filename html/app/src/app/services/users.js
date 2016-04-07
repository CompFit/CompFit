export default class {

    constructor($http) {
        this.$http = $http;
        this.user_id = 1;
        var self = this;

    }
    createUser(newUser) {
        var data = newUser;
        return this.$http.post("http://localhost:9000/api/user",data).then(function (response) {
            return response;
        });
    }

    getUserById(user_id) {
        return this.$http({
              method: 'GET',
              url: 'http://localhost:9000/api/user/'+user_id
            }).then(function successCallback(response) {
                return response;
              }, function errorCallback(response) {
                return response;
            });
    }

    getUserByUsername(username) {
        return this.$http({
              method: 'GET',
              url: 'http://localhost:9000/api/username/'+username
            }).then(function successCallback(response) {
                return response;
              }, function errorCallback(response) {
                return response;
            });
    }

    getUsersForTeam(team_id) {
        return this.$http({
              method: 'GET',
              url: 'http://localhost:9000/api/users/'+team_id
            }).then(function successCallback(response) {
                // self.teams = response.data;
                return response;
              }, function errorCallback(response) {
                return response;
            });
    }

}
