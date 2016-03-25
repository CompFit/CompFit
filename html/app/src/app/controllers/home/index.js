import './style.styl';

export default function( $scope ) {
    'ngInject';

    $scope.greeting = 'oh haita';


}

if(module.hot) {
  module.hot.accept();
}
