import angular from 'angular';

import sidebar from './sidebar';
import navbar from './navbar';

export default angular
    .module( 'app.directives', [] )
    .directive( 'seedSidebar', sidebar )
    .directive( 'seedNavbar', navbar )
    .name;
