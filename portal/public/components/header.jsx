import React from 'react'

class Notifications extends React.Component {
    render() {
        return (
            <li className="dropdown notifications-menu">
                <a href="javascript:void(0);" className="dropdown-toggle" data-toggle="dropdown">
                    <i className="fa fa-bell-o"></i>
                    <span className="label label-warning">1</span>
                </a>
            </li>
        )
    }
}

class User extends React.Component {
    render() {
        return (
            <li className="dropdown user user-menu">
                <a href="javascript:void(0);" className="dropdown-toggle" data-toggle="dropdown">
                    <img src="" className="user-image" alt="" />
                    <span className="hidden-xs">Admin</span>
                </a>
            </li>
        )
    }
}

class Control extends React.Component {
    render() {
        return (
            <li>
                <a href="javascript:void(0);" data-toggle="control-sidebar"><i className="fa fa-gears"></i></a>
            </li>
        )
    }
}

export default function Header() {
    return (
        <header className="main-header">
            <a href="javascript:void(0);" className="logo">
                <span className="logo-lg"><b>AWS</b>FortiCloud</span>
            </a>
            <nav className="navbar navbar-static-top">
                <div className="navbar-custom-menu">
                    <ul className="nav navbar-nav">
                        <Notifications />
                        <User />
                        <Control />
                    </ul>
                </div>
            </nav>
        </header>
    )
}