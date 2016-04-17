var React = require('react');
var ReactTable = require('Reactable').Table;

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

var options = [
    { Name: 'Griffin Smith', Age: 18, Position: 'Vancouver' },
    { Name: 'Lee Salminen', Age: 23, Position: 'Burnaby' },
    { Name: 'Tomas', Age: 28, Position: 'Developer' },
    { Name: 'Griffin Smith', Age: 18, Position: 'Vancouver' },
    { Name: 'Lee Salminen', Age: 23, Position: 'Burnaby' },
    { Name: 'Tomas', Age: 28, Position: 'Developer' },
    { Name: 'Griffin Smith', Age: 18, Position: 'Vancouver' },
    { Name: 'Lee Salminen', Age: 23, Position: 'Burnaby' },
    { Name: 'Tomas', Age: 28, Position: 'Developer' },
    { Name: 'Griffin Smith', Age: 18, Position: 'Vancouver' },
    { Name: 'Lee Salminen', Age: 23, Position: 'Burnaby' },
    { Name: 'Tomas', Age: 28, Position: 'Developer' }
];

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
                                <ReactTable 
                                    className="table" 
                                    data={options} 
                                    sortable={true} 
                                    itemsPerPage={4} 
                                    filterable={['Age', 'Name']}
                                />
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
