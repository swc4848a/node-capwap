var React = require('react');
var Select = require('react-select');
var Settings = require('./logsettings.react');
var AppStore = require('../stores/AppStore');
const ReactHighcharts = require('react-highcharts');
const Highcharts = ReactHighcharts.Highcharts;

function labelWithDash(ren, label, pos, bottom) {
    var colors = Highcharts.getOptions().colors;

    var top = 40;

    var label = ren.label(label, pos, top)
        .attr({
            fill: colors[0],
            stroke: 'white',
            'stroke-width': 2,
            padding: 5,
            r: 5
        })
        .css({
            color: 'white'
        })
        .add()
        .shadow(true);

    var box = label.getBBox();

    ren.path(['M', pos + box.width / 2, top + box.height, 'L', pos + box.width / 2, bottom])
        .attr({
            'stroke-width': 2,
            stroke: 'silver',
            dashstyle: 'dash'
        })
        .add();

    return {
        x: pos + box.width / 2
    };
}

function arrow(ren, time, text, start, end, y) {
    var colors = Highcharts.getOptions().colors;

    var leftArrow = ['M', start.x, y, 'L', end.x, y, 'M', end.x, y, 'L', end.x + 5, y + 5, 'M', end.x, y, 'L', end.x + 5, y - 5];
    var rightArrow = ['M', start.x, y, 'L', end.x, y, 'M', end.x, y, 'L', end.x - 5, y - 5, 'M', end.x, y, 'L', end.x - 5, y + 5]

    var arrowPath = (start.x > end.x) ? leftArrow : rightArrow;
    var pathColor = (start.x > end.x) ? colors[3] : colors[2];

    var ar = ren.path(arrowPath)
        .attr({
            'stroke-width': 2,
            stroke: pathColor
        })
        .add();

    var pos = (start.x < end.x) ? start.x : end.x;

    var offset = (Math.abs(start.x - end.x) - text.length * 5.6) / 2;

    ren.label(text, pos + offset, y - ar.getBBox().height * 2)
        .css({
            fontSize: '10px',
            color: colors[3]
        })
        .add();

    ren.label(time, pos - 160, y - 10)
        .css({
            fontSize: '10px',
            color: colors[1]
        })
        .add();
}

var chart;

function typeToString(type) {
    switch (type) {
        case 1:
            return 'Discover Request';
        case 2:
            return 'Discover Response';
        case 3:
            return 'Join Request';
        case 4:
            return 'Join Response';
        case 5:
            return 'Configuration Status Request';
        case 6:
            return 'Configuration Status Response';
        case 7:
            return 'Configuration Update Request';
        case 8:
            return 'Configuration Update Response';
        case 9:
            return 'Wtp Event Request';
        case 10:
            return 'Wtp Event Response';
        case 11:
            return 'Change State Request';
        case 12:
            return 'Change State Response';
        case 13:
            return 'Echo Request';
        case 14:
            return 'Echo Response';
        case 15:
            return 'Image Data Request';
        case 16:
            return 'Image Data Response';
        case 17:
            return 'Reset Request';
        case 18:
            return 'Reset Response';
        case 19:
            return 'Primary Discovery Request';
        case 20:
            return 'Primary Discovery Response';
        case 21:
            return 'Data Transfer Request';
        case 22:
            return 'Data Transfer Response';
        case 23:
            return 'Clear Configuration Request';
        case 24:
            return 'Clear Configuration Response';
        case 25:
            return 'Configuration Status Request';
        case 26:
            return 'Configuration Status Response';
        case 27:
            return 'Keep Alive';
        case 28:
            return 'Association Request';
        case 29:
            return 'Association Response';
        case 65535:
            return 'Keep Alive Request';
        case 65536:
            return 'Keep Alive Response';
        case 65538:
            return 'Association Request';
        case 65539:
            return 'Association Response';
        case 65540:
            return 'Reassociation Request';
        case 65541:
            return 'Reassociation Response';
        case 65542:
            return 'Probe Request';
        case 65543:
            return 'Probe Response';
        case 65546:
            return 'Beacon';
        case 65547:
            return 'Atim';
        case 65548:
            return 'Disassociate';
        case 65549:
            return 'Auth';
        case 65550:
            return 'Deauth';
        case 65551:
            return 'Action';
        case 3398913:
            return 'WLAN Configuration Request';
        case 3398914:
            return 'WLAN Configuration Response';
        default:
            return 'Unknown Type ' + type;
    }
}

function diagram() {
    chart = this;

    var left = chart.containerWidth / 2 - 150;
    var right = chart.containerWidth / 2 + 150;

    var serverLabel = labelWithDash(chart.renderer, 'AP Server', left, 850);
    var apLabel = labelWithDash(chart.renderer, 'AP', right, 850);

    var apnetwork = AppStore.getApnetwork().value;
    var ap = AppStore.getAp().value;
    var start = AppStore.getStartTime().value;
    var end = AppStore.getEndTime().value;

    if (apnetwork && ap && start && end) {
        var url = '/Diagram?apnetwork=' + apnetwork +
            '&ap=' + ap +
            '&start=' + start +
            '&end=' + end;

        fetch(url).then(function(response) {
            response.json().then(function(json) {
                json.forEach(function(item, index) {
                    if (0 === item.direction) {
                        arrow(chart.renderer, item.time, typeToString(item.label), apLabel, serverLabel, 100 + index * 30);
                    } else if (1 === item.direction) {
                        arrow(chart.renderer, item.time, typeToString(item.label), serverLabel, apLabel, 100 + index * 30);
                    }

                    labelWithDash(chart.renderer, 'AP Server', left, json.length * 30 + 80);
                    labelWithDash(chart.renderer, 'AP', right, json.length * 30 + 80);
                    chart.setSize(chart.containerWidth, json.length * 30 + 100);
                });
            });
        });
    }
}

function getDiagramStore() {
    return {
        ap: AppStore.getAp(),
        apnetwork: AppStore.getApnetwork(),
        start: AppStore.getStartTime(),
        end: AppStore.getEndTime(),
    };
};

var LogGraph = React.createClass({
    getInitialState: function() {
        return getDiagramStore();
    },
    componentDidMount: function() {
        AppStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function() {
        AppStore.removeChangeListener(this._onChange);
    },
    _onChange: function() {
        this.setState(getDiagramStore());
    },
    render: function() {
        var config = {
            chart: {
                height: 912,
                backgroundColor: 'white',
                events: {
                    load: diagram
                }
            },
            title: {
                text: 'CAPWAP Diagram Overview',
                style: {
                    color: 'black'
                }
            }
        };

        return (
            <div className="content-wrapper">
                <section className="content">
                    <Settings 
                        apnetwork={this.state.apnetwork} 
                        ap={this.state.ap} 
                        start={this.state.start}
                        end={this.state.end}
                    />
                    <ReactHighcharts config = {config} ref="chart"></ReactHighcharts>
                </section>
            </div>
        );
    }
});

module.exports = LogGraph;
