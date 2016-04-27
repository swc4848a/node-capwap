var React = require('react');
const ReactHighcharts = require('react-highcharts');
const Highcharts = ReactHighcharts.Highcharts;
var Select = require('react-select');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');

var CustomSelect = React.createClass({
    updateValue: function(newValue) {
        console.log(newValue);
        if ('apnetwork' === this.props.name) {
            AppActions.updateApnetwork(newValue.label, newValue.VALUE);
        } else if ('ap' === this.props.name) {
            AppActions.updateAp(newValue.label, newValue.VALUE);
        } else if ('messageType' === this.props.name) {
            AppActions.updateMessageType(newValue.label, newValue.value);
        }
        AppActions.updateGraphData();
    },
    getOptions: function(input, callback) {
        fetch('/Options/' + this.props.name).then(function(response) {
            response.json().then(function(json) {
                callback(null, {
                    options: json,
                    complete: true
                });
            });
        });
    },
    render: function() {
        return (
            <div className="form-group">
                <label>{this.props.label}</label>
                <Select.Async 
                    name={this.props.name}
                    loadOptions={this.getOptions}
                    value={this.props.value}
                    searchable={true}
                    onChange={this.updateValue}
                />
            </div>
        );
    }
});

var SettingsHeader = React.createClass({
    render: function() {
        return (
            <div className="box-header with-border">
                <h3 className="box-title">Settings</h3>
                <div className="box-tools pull-right">
                    <button type="button" className="btn btn-box-tool" data-widget="collapse"><i className="fa fa-minus"></i></button>
                    <button type="button" className="btn btn-box-tool" data-widget="remove"><i className="fa fa-remove"></i></button>
                </div>
            </div>
        );
    }
});

var SettingsBody = React.createClass({
    render: function() {
        return (
            <div className="box-body">
                <div className="row">
                    <div className="col-md-2">
                        <CustomSelect label="AP Network" value={this.props.apnetwork} name="apnetwork" />
                    </div>
                    <div className="col-md-2">
                        <CustomSelect label="AP" value={this.props.ap} name="ap" />
                    </div>
                    <div className="col-md-2">
                        <CustomSelect label="Message Type" value={this.props.messageType} name="messageType" />
                    </div>
                </div>
            </div>
        );
    }
});

var Settings = React.createClass({
    render: function() {
        return (
            <div className="box box-default">
                <SettingsHeader />
                <SettingsBody messageType={this.props.messageType} apnetwork={this.props.apnetwork} ap={this.props.ap} />
            </div>
        );
    }
});

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
                text: this.state.messageType + ' Statistics over time'
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
                name: this.state.messageType,
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
