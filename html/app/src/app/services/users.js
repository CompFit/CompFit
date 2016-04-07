export default class {

    constructor($http) {
        this.$http = $http;
        this.user_id = 1;
        var self = this;

    }
    createUser(newUser) {
        var data = newUser;
        return this.$http.post("http://private-c84bfb-compfit.apiary-mock.com/user",data).then(function (response) {
            return response;
        });
    }

    getUserById(user_id) {
        return this.$http({
              method: 'GET',
              url: 'http://private-c84bfb-compfit.apiary-mock.com/user/'+user_id
            }).then(function successCallback(response) {
                return response;
              }, function errorCallback(response) {
                return response;
            });
    }

    getUserByUsername(username) {
        return this.$http({
              method: 'GET',
              url: 'http://private-c84bfb-compfit.apiary-mock.com/username/'+username
            }).then(function successCallback(response) {
                return response;
              }, function errorCallback(response) {
                return response;
            });
    }

    getUsersForTeam(team_id) {
        return this.$http({
              method: 'GET',
              url: 'http://private-c84bfb-compfit.apiary-mock.com/users/'+team_id
            }).then(function successCallback(response) {
                // self.teams = response.data;
                return response;
              }, function errorCallback(response) {
                return response;
            });
    }

}
