import angular from 'angular';

import auth from './auth';
import teams from './teams';
import challenges from './challenges';

export default angular
    .module( 'app.services', [] )
    .service( 'Authentication', auth )
    .service( 'Teams', ['$http',teams] )
    .service( 'Challenges', ['$http',challenges] )
    .name;
