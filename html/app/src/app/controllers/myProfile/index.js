import './style.styl';
import ngImg from './images/angular.png';

export default function( $scope, $state, Authentication ) {
    'ngInject';

    $scope.ngImg = ngImg;

    if (!Authentication.loggedIn) {
        $state.go( 'app.login' );
    }

    $scope.logout = function() {
        Authentication.logOut();
        $state.go( 'app.home' );
    };

}
