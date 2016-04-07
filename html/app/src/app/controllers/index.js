import angular from 'angular';

import ApplicationController from './application';

import AuthenticationController from './authentication';
import HomeController from './home';
import LoginController from './login';
import MyProfileController from './myProfile';
import AboutController from './about';
import RegisterController from './register';
import TeamController from './team';

export default angular
    .module( 'app.controllers', [] )
    .controller( 'ApplicationController', ApplicationController )
    .controller( 'AuthenticationController', AuthenticationController )
    .controller( 'HomeController', HomeController )
    .controller( 'LoginController', LoginController )
    .controller( 'MyProfileController', MyProfileController )
    .controller( 'AboutController', AboutController )
    .controller( 'RegisterController', RegisterController )
    .controller( 'TeamController', TeamController )
    .name;
