export default class {

    constructor($http) {
        this.$http = $http;
        var self = this;

        self.exercises = [];
    }

    /*
    logExercise() {
        var data = {};
        console.log(data);
        return this.$http.post("http://localhost:9000/api/team",data).then(function (response) {
            return response;
        });
    }
    */

    getExerciseById(challenge_id) {
        return this.$http({
              method: 'GET',
              url: '/api/team/'+team_id
            }).then(function successCallback(response) {
                return response;
              }, function errorCallback(response) {
                return response;
            });
    }

    getExercisesForUser(user_id) {
        return this.$http({
              method: 'GET',
              url: '/api/teams/'+user_id
            }).then(function successCallback(response) {
                self.exercises = response.data;
                return response;
              }, function errorCallback(response) {
                return response;
            });
    }

    getExercises() {
        return self.exercise;
    }

}
