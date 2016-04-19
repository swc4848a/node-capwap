var React = require('react');
var AppActions = require('../actions/AppActions');

var ENTER_KEY_CODE = 13;

var Select = React.createClass({
    handleChange: function(event) {
        AppActions.updateFilterInput(event.target.value, true);
    },
    render: function() {
        var items = [];
        this.props.options.options.forEach(function(item, index) {
            items.push(<option value={item} key={index}>{item}</option>);
        });

        var status = this.props.options.status ? "show" : "hidden";
        return (
            <select className={"form-control " + status} onChange={this.handleChange}>
                {items}
            </select>
        );
    }
});

var Input = React.createClass({
    handleKeyDown: function(event) {
        if (ENTER_KEY_CODE === event.keyCode) {
            AppActions.addFilter(this.props.options.label, event.target.value);
            AppActions.toggleFilterSelect();
            AppActions.updateFilterInput("", false);
        }
    },
    render: function() {
        return (
            <div className={"form-group filter-input" + (this.props.options.status ? "" : " hidden")} >
                <i className="fa fa-times" aria-hidden="true"></i>&nbsp;
                <label for="filterInput">{this.props.options.label + ":"}</label>&nbsp;
                <input type="text" 
                       className="form-control" 
                       id="filterInput" 
                       onKeyDown={this.handleKeyDown}
                       autoFocus={true} 
                />
            </div>
        );
    }
});

var ListItem = React.createClass({
    render: function() {
        return (
            <span className="filter-item">
                <i className="fa fa-times" aria-hidden="true"></i>{this.props.options.key + ":" + this.props.options.condition}
            </span>
        );
    }
});

var FilterList = React.createClass({
    render: function() {
        var items = [];
        this.props.options.forEach(function(item, index) {
            items.push(<ListItem options={item} key={index} />);
        });

        return (
            <div className="form-group filter-list">
                {items}
            </div>
        );
    }
});

var Filter = React.createClass({
    handleClick: function(event) {
        AppActions.toggleFilterSelect();
    },
    render: function() {
        return (
            <div className="box-header">
                <h3 className="box-title">
                    <div className="form-inline">
                        <FilterList options={this.props.list} />
                        <Input options={this.props.input}/>
                        &nbsp;
                        <div className="form-group filter-button">
                            <a href="javascript:void(0);" onClick={this.handleClick}>
                                <i className="fa fa-plus-circle" aria-hidden="true"></i> Add Filter
                            </a>
                        </div>
                        &nbsp;
                        <div className="form-group filter-select">
                            <Select options={this.props.select}/>
                        </div>
                    </div>
                </h3>
            </div>
        );
    }
});

module.exports = Filter;
