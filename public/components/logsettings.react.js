var React = require('react');
var Select = require('react-select');
var Settings = require('./logsettings.react');
var AppActions = require('../actions/AppActions');

var CustomSelect = React.createClass({
    updateValue: function(newValue) {
        if ('apnetwork' === this.props.name) {
            AppActions.updateApnetwork(newValue.label, newValue.value);
            AppActions.updateSeletctOptions('ap');
        } else if ('ap' === this.props.name) {
            AppActions.updateAp(newValue.label, newValue.value);
        } else if ('messageType' === this.props.name) {
            AppActions.updateMessageType(newValue.label, newValue.value);
        }
        AppActions.updateGraphData();
    },
    componentDidMount: function() {
        AppActions.updateSeletctOptions(this.props.name);
    },
    render: function() {
        return (
            <div className="form-group">
                <label>{this.props.label}</label>
                <Select 
                    name={this.props.name}
                    value={this.props.options.value}
                    options={this.props.options.options}
                    searchable={true}
                    onChange={this.updateValue}
                />
            </div>
        );
    }
});

var SettingsHeader = React.createClass({
    render: function() {
        return (
            <div className="box-header with-border">
                <h3 className="box-title">Settings</h3>
                <div className="box-tools pull-right">
                    <button type="button" className="btn btn-box-tool" data-widget="collapse"><i className="fa fa-minus"></i></button>
                    <button type="button" className="btn btn-box-tool" data-widget="remove"><i className="fa fa-remove"></i></button>
                </div>
            </div>
        );
    }
});

var SettingsBody = React.createClass({
    render: function() {
        var messageTypeSelect;
        if (this.props.messageType) {
            messageTypeSelect = <div className="col-md-2"><CustomSelect label="Message Type" options={this.props.messageType} name="messageType" /></div>;
        }

        var apnetworkSelect;
        if (this.props.apnetwork) {
            apnetworkSelect = <div className="col-md-2"><CustomSelect label="AP Network" options={this.props.apnetwork} name="apnetwork" /></div>;
        }

        var apSelect;
        if (this.props.ap) {
            apSelect = <div className="col-md-2"><CustomSelect label="AP Network" options={this.props.ap} name="apnetwork" /></div>;
        }

        return (
            <div className="box-body">
                <div className="row">
                    {apnetworkSelect}
                    {apSelect}
                    {messageTypeSelect}
                </div>
            </div>
        );
    }
});

var Settings = React.createClass({
    render: function() {
        return (
            <div className="box box-default">
                <SettingsHeader />
                <SettingsBody messageType={this.props.messageType} apnetwork={this.props.apnetwork} ap={this.props.ap} />
            </div>
        );
    }
});

module.exports = Settings;
