var React = require('react');

var ContentHeader = React.createClass({
    render: function() {
        return (
            <section className="content-header">
                <h1>
                    Data Tables
                    <small>advanced tables</small>
                </h1>
                <ol className="breadcrumb">
                    <li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
                    <li><a href="#">Tables</a></li>
                    <li className="active">Data tables</li>
                </ol>
            </section>
        );
    }
});

var HeaderOptions = ['timestamp', 'daemon', 'thread', 'level', 'file', 'line', 'apnetwork', 'ap', 'sta', 'ssid', 'custom_string'];

var TableHeader = React.createClass({
    render: function() {
        var items = [];
        HeaderOptions.forEach(function(item, index) {
            items.push(<th key={index}>{item}</th>);
        });
        return (
            <thead>
                <tr>{items}</tr>
            </thead>
        );
    }
});

var Content = React.createClass({
    render: function() {
        return (
            <section className="content">
                <div className="row">
                    <div className="col-xs-12">
                        <div className="box">
                            <div className="box-header">
                                <h3 className="box-title">Hover Data Table</h3>
                            </div>
                            <div className="box-body">
                                <table id="example2" className="table table-bordered table-hover">
                                    <TableHeader />
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
});

var ContentWrapper = React.createClass({
    render: function() {
        return (
            <div className="content-wrapper">
                <ContentHeader />
                <Content />
            </div>
        );
    }
});

module.exports = ContentWrapper;
