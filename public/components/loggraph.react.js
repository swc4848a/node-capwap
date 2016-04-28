var React = require('react');
const ReactHighcharts = require('react-highcharts');
const Highcharts = ReactHighcharts.Highcharts;
var AppStore = require('../stores/AppStore');
var Settings = require('./logsettings.react');

function getGraphStore() {
    return {
        messageType: AppStore.getMessageType(),
        ap: AppStore.getAp(),
        apnetwork: AppStore.getApnetwork(),
        data: AppStore.getGraphData()
    };
};

var LogGraph = React.createClass({
    getInitialState: function() {
        return getGraphStore();
    },
    componentDidMount: function() {
        AppStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function() {
        AppStore.removeChangeListener(this._onChange);
    },
    _onChange: function() {
        this.setState(getGraphStore());
    },
    render: function() {
        var config = {
            chart: {
                zoomType: 'x'
            },
            title: {
                text: this.state.messageType.label + ' Statistics over time'
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
                name: this.state.messageType.label,
                data: this.state.data,
            }]
        };

        return (
            <div className="content-wrapper">
                <section className="content">
                    <Settings messageType={this.state.messageType} apnetwork={this.state.apnetwork} ap={this.state.ap} />
                    <ReactHighcharts config = {config}></ReactHighcharts>
                </section>
            </div>
        );
    }
});

module.exports = LogGraph;
