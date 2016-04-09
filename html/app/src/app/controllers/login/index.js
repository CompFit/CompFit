export default function( $scope, $state, Authentication, Users ) {
    'ngInject';

    $scope.login = function() {
        Authentication.tryLogin($scope.user).then(function(response){
            if (response.data.error != undefined) {
                console.log("ERROR! in posting Auth", response.data.error);
            }
            else {
                Users.user_id = response.data.user_id;
                console.log("user id:",Users.user_id);
                Authentication.logIn();
                alert("Logged in as " + String(response.data.username));

                // Users.user_id = response.data.user_id;
                // console.log("user id:",Users.user_id);
                // Authentication.logIn();
                $state.go( 'app.my.profile' );
            }
        });


    };

    $scope.isLoggedIn = function() {
        return Authentication.loggedIn;
    };

}
