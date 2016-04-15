var React = require('react');
var MainHeader = require('./mainheader.react');
var MainSidebar = require('./mainsidebar.react');
var ContentWrapper = require('./contentwrapper.react');
var MainFooter = require('./mainfooter.react');

var Main = React.createClass({
    render: function() {
        return (
            <div>
                <MainHeader />
            	<MainSidebar />
                <ContentWrapper />
                <MainFooter />
        	</div>
        );
    }
});

module.exports = Main;
