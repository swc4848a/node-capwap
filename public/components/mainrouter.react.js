import React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'

import LogTable from './logtable.react'
import LogGraph from './loggraph.react'
import LogDiagram from './logdiagram.react'
import Dummy from './dummy.react'

var MainSidebar = require('./mainsidebar.react');

var MainRouter = React.createClass({
    render: function() {
        return (
            <Router history={hashHistory}>
                <Route path="/" component={MainSidebar} >
                    <Route path="/LogTable" component={LogTable} />
                    <Route path="/LogGraph" component={LogGraph} />
                    <Route path="/LogDiagram" component={LogDiagram} />
                    <Route path="/*" component={Dummy} />
                </Route>
            </Router>
        );
    }
});

module.exports = MainRouter;
