import angular from 'angular';

import auth from './auth';
import teams from './teams';

export default angular
    .module( 'app.services', [] )
    .service( 'Authentication', auth )
    .service( 'Teams', ['$http',teams] )
    .name;
