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
            var chart = Highcharts.chart(element[0], scope.options);

            var destroyChart = function() {
                try{
                    chart.destroy();
                }catch(ex){
                    // fail silently as highcharts will throw exception if element doesn't exist
                }
            }

            var updateChart = function() {
                destroyChart();
                chart = Highcharts.chart(element[0], scope.options);
                // Challenges.setChartHeight(chart.yAxis[0].max);
                // chart.yAxis[0].update({
                //     max: Challenges.getChartHeight()
                // });
            };

            Challenges.registerObserverCallback(updateChart);
            updateChart();
        }
    };
}
