var React = require('react');

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
        ip: '',
        port: '',
        logEnable: false
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
    handlePortChange: function(event) {
        this.setState({
            port: event.target.value
        });
    },
    handleLogEnableChange: function(event) {
        this.setState({
            logEnable: !this.state.logEnable
        });
    },
    handleSubmit: function(event) {
        console.log(this.state);
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
                                <label for="ip">IP</label>
                                <input 
                                    type="text"
                                    className="form-control" 
                                    id="ip" 
                                    placeholder="Enter IP" 
                                    value={this.state.ip} 
                                    onChange={this.handleIpChange} 
                                />
                            </div>
                            <div className="form-group">
                                <label for="ip">PORT</label>
                                <input 
                                    type="text"
                                    className="form-control" 
                                    id="port" 
                                    placeholder="Enter PORT"
                                    value={this.state.port}
                                    onChange={this.handlePortChange}
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
