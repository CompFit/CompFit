import './style.styl';
import template from 'directives/logbutton/template.html';

export default function() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: template
    };
}
