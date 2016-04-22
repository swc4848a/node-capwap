var React = require('react');
const ReactHighcharts = require('react-highcharts');
const Highcharts = ReactHighcharts.Highcharts;

function labelWithDash(ren, label, pos) {
    var colors = Highcharts.getOptions().colors;

    var top = 40;
    var bottom = 330;

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

function arrow(ren, text, start, end, y) {
    var colors = Highcharts.getOptions().colors;

    var leftArrow = ['M', start.x, y, 'L', end.x, y, 'M', end.x, y, 'L', end.x + 5, y + 5, 'M', end.x, y, 'L', end.x + 5, y - 5];
    var rightArrow = ['M', start.x, y, 'L', end.x, y, 'M', end.x, y, 'L', end.x - 5, y - 5, 'M', end.x, y, 'L', end.x - 5, y + 5]

    var arrow = (start.x > end.x) ? leftArrow : rightArrow;

    var ar = ren.path(arrow)
        .attr({
            'stroke-width': 2,
            stroke: colors[3]
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

}

function diagram() {
    var ren = this.renderer;

    var server = labelWithDash(ren, 'AP Server', 100);
    var ap = labelWithDash(ren, 'AP', 300);

    fetch('/Diagram').then(function(response) {
        response.json().then(function(json) {
            json.forEach(function(item, index) {
                if ('<== ws' === item.direction) {
                    arrow(ren, item.label, ap, server, 100 + index * 30);
                } else if ('==> ws' === item.direction) {
                    arrow(ren, item.label, server, ap, 100 + index * 30);
                }
            });
        });
    });
}

var LogGraph = React.createClass({
    render: function() {
        var config = {
            chart: {
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
                    <ReactHighcharts config = {config}></ReactHighcharts>
                </section>
            </div>
        );
    }
});

module.exports = LogGraph;
