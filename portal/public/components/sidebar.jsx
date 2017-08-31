import React from 'react'
import Select from 'react-select'
import { Dropdown, MenuItem, FormControl } from 'react-bootstrap'

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
            <li key={index}><a href="javascript:void(0);"><i className="fa fa-circle-o"></i> {module}</a></li>
        )
        return (
            <li className={menuClass}>
                <a href="#" onClick={this.handleClick}>
                    <i className={"fa fa-" + this.props.icon}></i> <span>{this.props.root}</span>
                    <span className="pull-right-container">
                        <i className="fa fa-angle-left pull-right"></i>
                    </span>
                </a>
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
            "SSIDs",
            "Platform Profile",
            "AP Tags",
            "QoS Profile",
            "FortiCloud User/Group",
            "My RADIUS Server",
            "Network",
            "Bonjour Relay",
            "FortiPresence"
        ]
        return (
            <ul className="sidebar-menu tree" data-widget="tree">
                <Treeview icon="desktop" root="Monitor" nodes={[]} />
                <Treeview icon="wifi" root="Access Points" nodes={[]} />
                <Treeview icon="cog" root="Configure" nodes={configureNodes} />
                <Treeview icon="line-chart" root="Logs" nodes={[]} />
                <Treeview icon="pie-chart" root="Reports" nodes={[]} />
                <Treeview icon="signal" root="Deploy APs" nodes={[]} />
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