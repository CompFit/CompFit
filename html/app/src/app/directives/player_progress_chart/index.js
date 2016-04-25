import './style.styl';
import template from 'directives/player_progress_chart/template.html';

export default function(Challenges) {
    return {
        restrict: 'E',
        template: '<div></div>',
        scope: {
            options: '='
        },
        link: function (scope, element) {
            var updateChart = function() {
                Highcharts.chart(element[0], scope.options);
            };

            Challenges.registerObserverCallback(updateChart);
            updateChart();
        }
    };
}
