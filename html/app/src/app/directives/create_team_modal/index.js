import './style.styl';
import template from 'directives/create_team_modal/template.html';

export default function(Teams) {

    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        replace:true,
        scope:true,
        link: function (scope, element, attrs) {
            scope.title = attrs.title;

            scope.$watch(attrs.visible, function(value){
              if(value == true) {
                $(element).modal('show');
                console.log("Show");
              }
              else {
                $(element).modal('hide');
                console.log("Hide");
              }
            });

            $(element).on('shown.bs.modal', function(){
              scope.$apply(function(){
                scope.$parent[attrs.visible] = true;
              });
            });

            $(element).on('hidden.bs.modal', function(){
              scope.$apply(function(){
                scope.$parent[attrs.visible] = false;
              });
            });
        },
        templateUrl: template
    };
}
