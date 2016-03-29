import './style.styl';

export default function( $scope, $http, Teams ) {
    'ngInject';

    $scope.greeting = 'oh haita';


    // $http({
    //       method: 'GET',
    //       url: 'http://private-c84bfb-compfit.apiary-mock.com/users/1'
    //     }).then(function successCallback(response) {
    //         console.log(response);
    //       }, function errorCallback(response) {}
    //   );



    // console.log(Teams.getTeamsForUser(1).data);

}
