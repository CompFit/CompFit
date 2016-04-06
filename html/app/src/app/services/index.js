import angular from 'angular';

import auth from './auth';
import teams from './teams';
<<<<<<< HEAD
=======
import challenges from './challenges';
import exercises from './exercises';
import users from './users';
>>>>>>> master

export default angular
    .module( 'app.services', [] )
    .service( 'Authentication', auth )
    .service( 'Teams', ['$http',teams] )
<<<<<<< HEAD
=======
    .service( 'Challenges', ['$http',challenges] )
    .service( 'Exercises', ['$http',exercises] )
    .service( 'Users', ['$http',users] )
>>>>>>> master
    .name;
