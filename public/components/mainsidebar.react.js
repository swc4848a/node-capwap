var React = require('react');
var SidebarMenu = require('./sidebarmenu.react');

var MainSidebar = React.createClass({
    render: function() {
        return (
            <div className="main-content">
                <aside className="main-sidebar">
                    <section className="sidebar">
                        <SidebarMenu />
                    </section>
                </aside>
                {/* other router */}
                {this.props.children}
            </div>
        );
    }
});

module.exports = MainSidebar;
