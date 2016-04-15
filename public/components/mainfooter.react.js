var React = require('react');

var MainFooter = React.createClass({
    render: function() {
        return (
            <footer className="main-footer">
                <div className="pull-right hidden-xs">
                  <b>Version</b> 0.0.1
                </div>
                <strong>Copyright &copy; 2016 <a href="javascript:void(0);">FortiCloud</a>.</strong> All rights reserved.
            </footer>
        );
    }
});

module.exports = MainFooter;
