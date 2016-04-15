var React = require('react');
var SidebarMenu = require('./sidebarmenu.react');

var MainSidebar = React.createClass({
    render: function() {
        return (
            <aside className="main-sidebar">
                <section className="sidebar">
                    <SidebarMenu />
                </section>
            </aside>
        );
    }
});

module.exports = MainSidebar;
