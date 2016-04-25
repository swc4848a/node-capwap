var React = require('react');
const ReactHighcharts = require('react-highcharts');
const Highcharts = ReactHighcharts.Highcharts;

var LogGraph = React.createClass({
    getInitialState: function() {
        return {
            data: []
        };
    },
    componentDidMount: function() {
        var that = this;
        fetch('/Graph').then(function(response) {
            response.json().then(function(json) {
                that.setState({
                    data: json
                });
            });
        });
    },
    componentWillUnmount: function() {

    },
    render: function() {
        var config = {
            chart: {
                zoomType: 'x'
            },
            title: {
                text: 'Join Request Statistics over time'
            },
            subtitle: {
                text: document.ontouchstart === undefined ?
                    'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
            },
            xAxis: {
                type: 'datetime',
            },
            yAxis: {
                title: {
                    text: 'Exchange rate'
                }
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                area: {
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, Highcharts.getOptions().colors[0]],
                            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                        ]
                    },
                    marker: {
                        radius: 2
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                }
            },

            series: [{
                type: 'area',
                name: 'Join Request',
                data: this.state.data,
            }]
        };

        return (
            <div className="content-wrapper">
                <section className="content">
                    <ReactHighcharts config = {config}></ReactHighcharts>
                </section>
            </div>
        );
    }
});

module.exports = LogGraph;
