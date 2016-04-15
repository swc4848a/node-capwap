var React = require('react');
var MainHeader = require('./mainheader.react');

// <MainSidebar />
// <ContentWrapper />
// <MainFooter />

var Main = React.createClass({
    render: function() {
        return (
            <div>
            	<MainHeader />
        	</div>
        );
    }
});

module.exports = Main;
