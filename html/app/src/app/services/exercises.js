export default class {

    constructor($http) {
        this.$http = $http;
        var self = this;

        self.exercises = [];
    }

    logExercise(log) {
        console.log(log);
        return this.$http.post("/api/exercise",log).then(function (response) {
            return response;
        });
    }

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

    getExerciseList() {
        return this.$http({
              method: 'GET',
              url: '/api/exercise_list'
            }).then(function successCallback(response) {
                return response;
              }, function errorCallback(response) {
                return response;
            });
    }

    getUnitsForExercise(exercise_list_id) {
        return this.$http({
              method: 'GET',
              url: '/api/units/'+exercise_list_id
            }).then(function successCallback(response) {
                return response;
              }, function errorCallback(response) {
                return response;
            });
    }

    getExercises() {
        return self.exercise;
    }

}
