var React = require('react');
var AppStore = require('../stores/AppStore');
var AppActions = require('../actions/AppActions');
var ReactTable = require('Reactable').Table;
var Filter = require('./filter.react');

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
        select: AppStore.getSelect(),
        input: AppStore.getInput(),
        list: AppStore.getList()
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
    render: function() {
        return (
            <section className="content">
                <div className="row">
                    <div className="col-xs-12">
                        <div className="box">
                            <Filter 
                                select={this.state.select} 
                                input={this.state.input} 
                                list={this.state.list}
                            />
                            <div className="box-body">
                                <div className="table-responsive">
                                    <ReactTable 
                                        className="table table-hover table-bordered" 
                                        data={this.state.collections} 
                                        sortable={true} 
                                        itemsPerPage={10} 
                                        filterable={['oid']}
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
