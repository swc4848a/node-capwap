import React from 'react'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'
import AppActions from '../actions/AppActions'
import Select from 'react-select';

const ReactHighcharts = require('react-highcharts');
const Highcharts = ReactHighcharts.Highcharts;

// react highchart can't render config series using mobx
// so just pass const config to highchart and render series later

var appState = observable({
    time: '24'
});

let config = {
    chart: {
        zoomType: 'x'
    },
    title: {
        text: 'AP Log Event over time'
    },
    subtitle: {
        text: document.ontouchstart === undefined ?
            'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
    },
    xAxis: {
        type: 'datetime'
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
    series: []
};

appState.query = action(function query(chart, time) {
    let params = time ? '?time=' + time : '';
    console.log(chart);
    fetch('/Analysis/data' + params).then(function(response) {
        response.json().then(function(json) {
            console.log(chart);
            chart.addSeries({
                type: 'area',
                name: 'AP Log Events',
                data: json
            });
        })
    });
});

class Header extends React.Component {
    render() {
        return (
            <section className="content-header">
                <h1>
                    AP Server
                    <small>Analysis</small>
                </h1>
                <ol className="breadcrumb">
                    <li><a href="javascript:void(0);"><i className="fa fa-dashboard"></i> Home</a></li>
                    <li><a href="javascript:void(0);">Log Graph</a></li>
                    <li className="active">Log Analysis</li>
                </ol>
            </section>
        )
    }
}

const timeOptions = [
    { label: 'Last 24 Hours', value: '24' },
    { label: 'Last 7 Days', value: '7' },
    { label: 'Last 31 Days', value: '31' },
    { label: 'Specify', value: 'specify' },
];

@observer
class Content extends React.Component {
    constructor(props) {
        super(props);
    }
    onClick() {
        let chart = this.refs.chart.getChart();
        this.props.appState.query(chart);
    }
    onChange(val) {
        this.props.appState.time = val.value;
        let chart = this.refs.chart.getChart();
        console.log(chart);
        this.props.appState.query(chart, val.value);
    }
    render() {
        return (
            <section className="content">
                <div className="row">
                    <div className="col-md-12">
                        <div className="box box-primary">
                            <div className="box-body">
                                <div className="row">
                                    <Select name="Time" 
                                            value={this.props.appState.time} 
                                            className="col-md-2" 
                                            options={timeOptions} 
                                            onChange={this.onChange.bind(this)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="box box-primary">
                            <div className="box-header with-border">
                                <h3 className="box-title">Events Over Time</h3>
                            </div>
                            <div className="box-body">
                                <ReactHighcharts config={config} ref="chart" ></ReactHighcharts>
                            </div>
                            <div className="box-footer">
                                <button type="submit" 
                                        className="btn btn-primary" 
                                        onClick={this.onClick.bind(this)} 
                                >
                                    Query
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

class LogAnalysis extends React.Component {
    render() {
        return (
            <div className="content-wrapper">
                <Header />
                <Content appState={appState} />
            </div>
        )
    }
}

export default LogAnalysis
