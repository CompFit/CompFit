import angular from 'angular';

import teams_sidebar from './teams_sidebar';
import challenges_sidebar from './challenges_sidebar';
import navbar from './navbar';
import logbutton from './logbutton';

export default angular
    .module( 'app.directives', [] )
    .directive( 'seedSidebar', ['Teams', teams_sidebar] )
    .directive( 'challengesSidebar', ['Challenges', challenges_sidebar] )
    .directive( 'seedNavbar', navbar )
    .directive( 'seedLogbutton', logbutton )
    .name;
