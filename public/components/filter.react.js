var React = require('react');
var AppActions = require('../actions/AppActions');

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
    render: function() {
        return (
            <div className={"form-group" + (this.props.options.status ? "" : " hidden")} >
                <i className="fa fa-times" aria-hidden="true"></i>&nbsp;
                <label for="filterInput">{this.props.options.label + ":"}</label>&nbsp;
                <input type="text" className="form-control" id="filterInput" />
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
                    <form className="form-inline">
                        <Input options={this.props.input}/>
                        &nbsp;
                        <div className="form-group">
                            <a href="javascript:void(0);" onClick={this.handleClick}>
                                <i className="fa fa-plus-circle" aria-hidden="true"></i> Add Filter
                            </a>
                        </div>
                        &nbsp;
                        <div className="form-group">
                            <Select options={this.props.select}/>
                        </div>
                    </form>
                </h3>
            </div>
        );
    }
});

module.exports = Filter;
