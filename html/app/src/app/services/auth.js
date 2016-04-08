export default class {

    constructor($http) {
        this.$http = $http;
        this.loggedIn = false;
        this.email = "";
        this.password = "";
    }

    tryLogin(user) {
        // var data = {"email":email,"password":password};
        this.$http.post("/api/auth",user).then(function(response){
            console.log(response);
            if (response.data.error != undefined) {
                console.log("ERROR! in posting Auth", response.data.error);
            }
            else {
                alert("Logged in as " + String(response.data.username));
            }
        });
    }

    logIn() {
        this.loggedIn = true;
    }

    logOut() {
        this.loggedIn = false;
    }

}
