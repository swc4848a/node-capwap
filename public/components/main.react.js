var React = require('react');

var MainHeader = require('./mainheader.react');
var MainRouter = require('./mainrouter.react');
var MainFooter = require('./mainfooter.react');

var Main = React.createClass({
    render: function() {
        return (
            <div>
                <MainHeader />
                <MainRouter />
                <MainFooter />
            </div>
        );
    }
});

module.exports = Main;
