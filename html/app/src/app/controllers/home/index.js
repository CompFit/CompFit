import './style.styl';

export default function( $scope, $http ) {
    'ngInject';

    $scope.greeting = 'oh haita';
    $http({
      method: 'GET',
      url: '../../api/index.php/users'
    }).then(function successCallback(response) {
        console.log(response);
      }, function errorCallback(response) {
        console.log("Error",response);
    });

    var loc = window.location.pathname;
    var dir = loc.substring(0, loc.lastIndexOf('/'));
    console.log(loc,dir);



}

if(module.hot) {
  module.hot.accept();
}
