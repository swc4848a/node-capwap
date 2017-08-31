import React from 'react'
import { Dropdown, MenuItem, FormControl } from 'react-bootstrap'

class Menu extends React.Component {
    constructor(props) {
        super(props)
        this.state = { display: false }
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(e) {
        this.setState((prevState, props) => ({
            display: !prevState.display
        }))
    }
    render() {
        return (
            <ul className="sidebar-menu tree" data-widget="tree">
                <li className="header">MAIN NAVIGATION</li>
                <li className="active treeview">
                    <a href="#" onClick={this.handleClick}>
                        <i className="fa fa-dashboard"></i> <span>Dashboard</span>
                        <span className="pull-right-container">
                            <i className="fa fa-angle-left pull-right"></i>
                        </span>
                    </a>
                    <ul className="treeview-menu" style={{display: this.state.display ? '' : 'none'}}>
                        <li><a href="index.html"><i className="fa fa-circle-o"></i> Dashboard v1</a></li>
                        <li className="active"><a href="index2.html"><i className="fa fa-circle-o"></i> Dashboard v2</a></li>
                    </ul>
                </li>
            </ul>
        )
    }
}

export default function Sidebar() {
    return (
        <aside className="main-sidebar">
            <section className="sidebar" style={{Height: 'auto'}}>
                <Menu />
            </section>
        </aside>
    )
}