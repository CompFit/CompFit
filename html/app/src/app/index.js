require( 'assets/main.css' );

import angular from 'angular';
import angularUIRouter from 'angular-ui-router';

import routes from './routes';

import controllers from './controllers';
import directives from './directives';
import services from './services';

export default angular
    .module( 'app', [
        'mgcrea.ngStrap',
        angularUIRouter,

        controllers,
        directives,
        services
    ] )
    .config( routes );



    // var sideEffectNode = document.createElement('div');
    // sideEffectNode.textContent = 'Side Effect';
    // document.body.appendChild(sideEffectNode);
    //
    // // Remove the most recently-added <div> so that when the code runs again and
    // // adds a new <div>, we don't end up with duplicate divs.
    // if (module.hot) {
    //   module.hot.dispose(function() {
    //     sideEffectNode.parentNode.removeChild(sideEffectNode);
    //   });
    // }