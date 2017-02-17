import React from 'react'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'
import AppActions from '../actions/AppActions'

const ReactHighcharts = require('react-highcharts');
const Highcharts = ReactHighcharts.Highcharts;

// react highchart can't render config series using mobx
// so just pass const config to highchart and render series later

var appState = observable({

});

let config = {
    chart: {
        zoomType: 'x'
    },
    title: {
        text: 'USD to EUR exchange rate over time'
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

appState.query = action(function query(chart) {
    fetch('/Analysis/data').then(function(response) {
        response.json().then(function(json) {
            // appState.data = JSON.stringify(json);

            chart.addSeries({
                type: 'area',
                name: 'USD to EUR',
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

@observer
class Content extends React.Component {
    constructor(props) {
        super(props);
    }
    onClick() {
        let chart = this.refs.chart.getChart();
        this.props.appState.query(chart);
    }
    render() {
        return (
            <section className="content">
                <div className="row">
                    <div className="col-md-12">
                        <div className="box box-primary">
                            <div className="box-header with-border">
                                <h3 className="box-title">Analysis Commands</h3>
                            </div>
                            <div className="box-body">
                                <ReactHighcharts config={config} ref="chart" ></ReactHighcharts>
                            </div>
                            <div className="box-footer">
                                <button type="submit" className="btn btn-primary" onClick={this.onClick.bind(this)} >Query</button>
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
