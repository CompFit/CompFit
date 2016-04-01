import angular from 'angular';

import auth from './auth';
import teams from './teams';
import challenges from './challenges';
import exercises from './exercises';

export default angular
    .module( 'app.services', [] )
    .service( 'Authentication', auth )
    .service( 'Teams', ['$http',teams] )
    .service( 'Challenges', ['$http',challenges] )
    .service( 'Exercises', ['$http',exercises] )
    .name;
