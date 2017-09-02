import React from 'react'
import Select from 'react-select'
import { Dropdown, MenuItem, FormControl } from 'react-bootstrap'
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

class Treeview extends React.Component {
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
        const menuClass = "treeview" + (this.state.display ? " menu-open" : "")
        const treeviewStyle = { display: this.state.display ? "block" : "none" }
        const listItems = this.props.nodes.map((module, index) =>
            <li key={index}><Link to={module.to}><i className="fa fa-circle-o"></i> {module.name}</Link></li>
        )
        let link = null
        if (this.props.nodes && this.props.nodes.length) {
            const angle = <span className="pull-right-container"><i className="fa fa-angle-left pull-right"></i></span>
            link = (
                <a href="javascript:void(0);" onClick={this.handleClick}>
                    <i className={"fa fa-" + this.props.icon}></i> <span>{this.props.root}</span>
                    {angle}
                </a>
            )
        } else {
            link = (
                <Link to={this.props.to ? (this.props.to) : (null)} >
                    <i className={"fa fa-" + this.props.icon}></i> <span>{this.props.root}</span>
                </Link>
            )
        }
        return (
            <li className={menuClass}>
                {link}
                <ul className="treeview-menu" style={treeviewStyle}>
                    {listItems}
                </ul>
            </li>
        )
    }
}

class Menu extends React.Component {
    render() {
        const configureNodes = [
            { name: "SSIDs", to: "SSID" },
            { name: "Platform Profile", to: "Platform" },
            { name: "AP Tags", to: "Tags" },
            { name: "QoS Profile", to: "Qos" },
            { name: "FortiCloud User/Group", to: "UserGroup" },
            { name: "My RADIUS Server", to: "Radius" },
            { name: "Network", to: "Network" },
            { name: "Bonjour Relay", to: "Bonjour" },
            { name: "FortiPresence", to: "FortiPresence" }
        ]
        return (
            <ul className="sidebar-menu tree" data-widget="tree">
                <Treeview icon="desktop" root="Monitor" nodes={[]} to="Monitor" />
                <Treeview icon="wifi" root="Access Points" nodes={[]} to="AccessPointList" />
                <Treeview icon="cog" root="Configure" nodes={configureNodes} />
                <Treeview icon="line-chart" root="Logs" nodes={[]} to="Log" />
                <Treeview icon="pie-chart" root="Reports" nodes={[]} to="Report" />
                <Treeview icon="signal" root="Deploy APs" nodes={[]} to="Deploy" />
            </ul>
        )
    }
}

class APNetwork extends React.Component {
    render() {
        return (
            <form action="#" method="get" className="sidebar-form">
                <div className="input-group">
                    <input type="text" name="q" className="form-control" placeholder="Search APNetwork..." />
                    <span className="input-group-btn">
                        <button type="submit" name="search" id="search-btn" className="btn btn-flat"><i className="fa fa-search"></i>
                        </button>
                    </span>
                </div>
            </form>
        )
    }
}

export default function Sidebar() {
    return (
        <aside className="main-sidebar">
            <section className="sidebar" style={{Height: 'auto'}}>
                <APNetwork />
                <Menu />
            </section>
        </aside>
    )
}