var React = require('react');
var AppActions = require('../actions/AppActions');

var Select = React.createClass({
    render: function() {
        var items = [];
        this.props.options.forEach(function(item, index) {
            items.push(<option key={index}>{item}</option>);
        });
        return (
            <select className="form-control">
                {items}
            </select>
        );
    }
});

var Filter = React.createClass({
    handleClick: function(event) {

    },
    render: function() {
        return (
            <div className="box-header">
                <h3 className="box-title">
                    <form className="form-inline">
                        <div className="form-group">
                            <a href="javascript:void(0);" onClick={this.handleClick}>
                                <i className="fa fa-plus-circle" aria-hidden="true"></i> Add Filter
                            </a>
                        </div>
                        &nbsp;
                        <div className="form-group">
                            <Select options={this.props.selectOptions} />
                        </div>
                    </form>
                </h3>
            </div>
        );
    }
});

module.exports = Filter;
