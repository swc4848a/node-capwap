var React = require('react');

var MainHeaderLogo = React.createClass({
    render: function() {
        return (
            <a href="javascript:void(0);" className="logo">
                <span className="logo-lg"><i className="fa fa-cloud" aria-hidden="true"></i> FortiCloud Monitor</span>
            </a>
        );
    }
});

var MainHeaderNavbar = React.createClass({
    render: function() {
        return (
            <nav className="navbar navbar-static-top" role="navigation">
            </nav>
        );
    }
});

var MainHeader = React.createClass({
    render: function() {
        return (
            <header className="main-header">
                <MainHeaderLogo />
                <MainHeaderNavbar />
            </header>
        );
    }
});

module.exports = MainHeader;
