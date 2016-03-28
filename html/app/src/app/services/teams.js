export default class {

    constructor($http) {
        this.$http = $http;
    }

    getTeamsForUser(user_id) {
        return this.$http({
              method: 'GET',
              url: 'http://private-c84bfb-compfit.apiary-mock.com/teams/'+user_id
            }).then(function successCallback(response) {
                return response;
              }, function errorCallback(response) {
                // console.log(response);
                return response;
            });
    }

}
