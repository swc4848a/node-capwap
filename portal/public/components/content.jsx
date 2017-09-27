import React from 'react'
import {
    Switch,
    Route,
    Link
} from 'react-router-dom'
import { AccessPointList, AccessPointForm } from './ap.jsx'
import SSIDList from './ssidlist.jsx'
import Network from './network.jsx'
import SSID from './ssid.jsx'

function NoMatch({ location }) {
    return (
        <section className="content">
            <div className="error-page">
                <h2 className="headline text-yellow"> 404</h2>
                <div className="error-content">
                    <h3><i className="fa fa-warning text-yellow"></i> Oops! {location.pathname} Page not found.</h3>
                    <p>
                        We could not find the page you were looking for.
                        Meanwhile, you may <a href="../../index.html">return to dashboard</a> or try using the search form.
                    </p>
                    <form className="search-form">
                        <div className="input-group">
                            <input type="text" name="search" className="form-control" placeholder="Search" />
                            <div className="input-group-btn">
                                <button type="submit" name="submit" className="btn btn-warning btn-flat"><i className="fa fa-search"></i>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default function Content() {
    return (
        <div className="content-wrapper" style={{minHeight: '901px'}}>
            <Switch>
                <Route path="/AccessPointList" component={AccessPointList} />
                <Route path="/AccessPointForm/:sn" component={AccessPointForm} />
                <Route path="/SSIDs" component={SSIDList} />
                <Route path="/SSID/:name" component={SSID} />
                <Route path="/Network" component={Network} />
            </Switch>
        </div>
    )
}