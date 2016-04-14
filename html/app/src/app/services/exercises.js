export default class {

    constructor($http) {
        this.$http = $http;
        var self = this;

        self.exercises = [];
    }

    logExercise(user_id,date,exercise_name,repetitions,units) {
        var data = {"user_id":user_id,"date":date,"exercise_name":exercise_name,"repetitions":repetitions,"units":units};
        console.log(data);
        return this.$http.post("/api/exercise",data).then(function (response) {
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
