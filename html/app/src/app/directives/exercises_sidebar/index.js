import './style.styl';
import template from 'directives/exercises_sidebar/template.html';

export default function(Exercises) {

    return {
        restrict: 'E',
        replace: true,
        link: function ($scope, $element, $attrs) {

        },
        templateUrl: template
    };
}
