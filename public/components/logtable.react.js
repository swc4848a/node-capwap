var React = require('react');
var _ = require('underscore');
var AppStore = require('../stores/AppStore');
var AppActions = require('../actions/AppActions');
var ReactTable = require('reactable').Table;
var Settings = require('./logsettings.react');

var ContentHeader = React.createClass({
    render: function() {
        return (
            <section className="content-header">
                <h1>
                    Log Tables
                    <small>detailed logs</small>
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

function getAppStore() {
    return {
        collections: AppStore.getCollections(),
        start: AppStore.getStartTime(),
        end: AppStore.getEndTime()
    };
}

var Content = React.createClass({
    getInitialState: function() {
        return getAppStore();
    },
    componentDidMount: function() {
        AppStore.addChangeListener(this._onChange);
        AppActions.updateCollections();
    },
    componentWillUnmount: function() {
        AppStore.removeChangeListener(this._onChange);
        AppActions.serverAbort();
    },
    _onChange: function() {
        this.setState(getAppStore());
    },
    handleClick: function() {
        AppActions.updateCollections();
    },
    render: function() {
        var total = this.state.collections.length;
        var filter = _.keys(this.state.collections[0]);
        return (
            <section className="content">
                <Settings 
                    start={this.state.start} 
                    end={this.state.end}
                    handleClick={this.handleClick}
                />
                <div className="row">
                    <div className="col-xs-12">
                        <div className="box">
                            <div className="box-header with-border">
                                <h3 className="box-title">Raw Logs Table</h3>
                            </div>
                            <div className="box-body">
                                <div className="table-responsive">
                                    <ReactTable 
                                        className="table table-hover table-bordered" 
                                        data={this.state.collections} 
                                        sortable={true} 
                                        itemsPerPage={15} 
                                        filterable={filter} 
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
});

var LogTable = React.createClass({
    render: function() {
        return (
            <div className="content-wrapper">
                <ContentHeader />
                <Content />
            </div>
        );
    }
});

module.exports = LogTable;
