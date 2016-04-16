export default class {

    constructor($http) {
        this.$http = $http;
        // this.observerCallbacks = [];
        var self = this;

        // self.notifyObservers = function(){
        //    angular.forEach(this.observerCallbacks, function(callback){
        //      callback();
        //    });
        //  };


        self.challenges = [];
    }

    createChallenge(challenge) {
        return this.$http.post("/api/challenge",challenge).then(function(response){
            return response;
        });
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
        // self.notifyObservers = function(){
        //    angular.forEach(this.observerCallbacks, function(callback){
        //      callback();
        //    });
        //  };
        // var notify = this.notifyObservers;
        return this.$http({
              method: 'GET',
              url: '/api/challenges/user_id/'+user_id
            }).then(function successCallback(response) {
                self.challenges = response.data;
                // console.log(self);
                // self.notifyObservers();
                // notify();
                return response;
              }, function errorCallback(response) {
                return response;
            });
    }

    getChallenges() {
        return self.challenges;
    }




   //  //register an observer
   // registerObserverCallback(callback){
   //    self.observerCallbacks.push(callback);
   //  }
   //
   //  notifyObservers(){
   //     angular.forEach(self.observerCallbacks, function(callback){
   //       callback();
   //     });
   //   };


}
