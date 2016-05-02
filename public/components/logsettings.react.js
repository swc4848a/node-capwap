var React = require('react');
var Select = require('react-select');
var DateTimeField = require('react-bootstrap-datetimepicker');
var Settings = require('./logsettings.react');
var AppActions = require('../actions/AppActions');

var CustomSelect = React.createClass({
    updateValue: function(newValue) {
        if ('apnetwork' === this.props.name) {
            if (newValue) {
                AppActions.updateApnetwork(newValue.label, newValue.value);
            } else {
                AppActions.updateApnetwork(undefined, undefined);
            }
            AppActions.updateSeletctOptions('ap');
        } else if ('ap' === this.props.name) {
            if (newValue) {
                AppActions.updateAp(newValue.label, newValue.value);
            } else {
                AppActions.updateAp(undefined, undefined);
            }
        } else if ('messageType' === this.props.name) {
            if (newValue) {
                AppActions.updateMessageType(newValue.label, newValue.value);
            } else {
                AppActions.updateMessageType(undefined, undefined);
            }
        }
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
    handleStartChange: function(newDate) {
        AppActions.updateStartTime(newDate);
    },
    handleEndChange: function(newDate) {
        AppActions.updateEndTime(newDate);
    },
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
            apSelect = <div className="col-md-2"><CustomSelect label="AP" options={this.props.ap} name="ap" /></div>;
        }

        var startTime;
        var endTime;
        var button;

        if (this.props.start && this.props.end) {
            var StartDateTime = <DateTimeField onChange={this.handleStartChange} dateTime={this.props.start.value} />;
            var EndDateTime = <DateTimeField onChange={this.handleEndChange} dateTime={this.props.end.value} />;
            var buttonCore = <button type="button" className="btn btn-default refresh" onClick={this.props.handleClick}>Refresh</button>;

            startTime = <div className="col-md-2"><label>Start DateTime</label>{StartDateTime}</div>;
            endTime = <div className="col-md-2"><label>End DateTime</label>{EndDateTime}</div>;
            button = <div className="col-md-2"><label>Control</label><div>{buttonCore}</div></div>
        }

        return (
            <div className="box-body">
                <div className="row">
                    {apnetworkSelect}
                    {apSelect}
                    {messageTypeSelect}
                    {startTime}
                    {endTime}
                    {button}
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
                <SettingsBody 
                    messageType={this.props.messageType} 
                    apnetwork={this.props.apnetwork} 
                    ap={this.props.ap} 
                    start={this.props.start} 
                    end={this.props.end} 
                    handleClick={this.props.handleClick}
                />
            </div>
        );
    }
});

module.exports = Settings;
