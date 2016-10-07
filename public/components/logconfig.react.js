var React = require('react');
var AppStore = require('../stores/AppStore');
var AppActions = require('../actions/AppActions');
var Select = require('react-select');
var debug = require('debug')('node-capwap::public::components::logconfig');

var Header = React.createClass({
    render: function() {
        return (
            <section className="content-header">
                <h1>
                    AP Server
                    <small>Config</small>
                </h1>
                <ol className="breadcrumb">
                    <li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
                    <li><a href="#">Log Settings</a></li>
                    <li className="active">Log Config</li>
                </ol>
            </section>
        );
    }
});

function getConfigStore() {
    return {
        ip: AppStore.getAPServerIp(),
        logEnable: AppStore.getAPServerLogStatue()
    };
};

var Content = React.createClass({
    getInitialState: function() {
        return getConfigStore();
    },
    handleIpChange: function(event) {
        this.setState({
            ip: event.target.value
        });
    },
    handleLogEnableChange: function(event) {
        this.setState({
            logEnable: !this.state.logEnable
        });
    },
    handleSubmit: function(event) {
        AppActions.updateLogConfig(this.state.ip, this.state.logEnable);
    },
    render: function() {
        return (
            <section className="content">
                <div className="row">
                    <div className="col-md-6">
                        <div className="box box-primary">
                            <div className="box-header with-border">
                                <h3 className="box-title">Server Config</h3>
                            </div>
                            <div className="box-body">
                            <div className="form-group">
                                <label>IP</label>
                                <input 
                                    type="text"
                                    className="form-control" 
                                    id="ip" 
                                    placeholder="Enter IP" 
                                    value={this.state.ip} 
                                    onChange={this.handleIpChange} 
                                />
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input 
                                        type="checkbox" 
                                        checked={this.state.logEnable}
                                        onChange={this.handleLogEnableChange}
                                    /> Enable Log
                                </label>
                            </div>
                            </div>
                            <div className="box-footer">
                                <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="box box-primary">
                            <div className="box-header with-border">
                                <h3 className="box-title">Source Config</h3>
                            </div>
                            <div className="box-body">
                                <div className="form-group">
                                    <label>Data Source</label>
                                    <Select 
                                        name="data-source"
                                        value="logfile"
                                        options={[
                                            { value: 'apserver', label: 'APServer' },
                                            { value: 'logfile', label: 'LogFile' }
                                        ]}
                                        searchable={true}
                                        onChange={(datasource) => {
                                            debug("onChange: ", datasource);
                                            this.state.dataSource = datasource;
                                        }}
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

var LogConfig = React.createClass({
    render: function() {
        return (
            <div className="content-wrapper">
                <Header />
                <Content />
            </div>
        );
    }
});

module.exports = LogConfig;
