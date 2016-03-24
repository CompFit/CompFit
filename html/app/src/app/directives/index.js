import angular from 'angular';

import sidebar from './sidebar';
import navbar from './navbar';
import logbutton from './logbutton';

export default angular
    .module( 'app.directives', [] )
    .directive( 'seedSidebar', sidebar )
    .directive( 'seedNavbar', navbar )
    .directive( 'seedLogbutton', logbutton )
    .name;
