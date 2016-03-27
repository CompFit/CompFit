import './style.styl';

export default function($scope, $stateParams) {
    'ngInject';
    $scope.page_id = $stateParams.id;

}
