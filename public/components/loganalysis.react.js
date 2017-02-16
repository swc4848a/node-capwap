import React from 'react'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'
import AppActions from '../actions/AppActions'

var appState = observable({
    data: ""
});

appState.query = action(function query() {
    fetch('/Analysis/data').then(function(response) {
        response.json().then(function(json) {
            appState.data = JSON.stringify(json);
        })
    });
});

class Header extends React.Component {
    render() {
        return (
            <section className="content-header">
                <h1>
                    AP Server
                    <small>Analysis</small>
                </h1>
                <ol className="breadcrumb">
                    <li><a href="javascript:void(0);"><i className="fa fa-dashboard"></i> Home</a></li>
                    <li><a href="javascript:void(0);">Log Graph</a></li>
                    <li className="active">Log Analysis</li>
                </ol>
            </section>
        )
    }
}

@observer
class Content extends React.Component {
    constructor(props) {
        super(props);
    }
    onClick() {
        this.props.appState.query();
    }
    render() {
        return (
            <section className="content">
                <div className="row">
                    <div className="col-md-12">
                        <div className="box box-primary">
                            <div className="box-header with-border">
                                <h3 className="box-title">Analysis Commands</h3>
                            </div>
                            <div className="box-body">
                                <div className="form-group">
                                    Query: {this.props.appState.data}
                                </div>
                            </div>
                            <div className="box-footer">
                                <button type="submit" className="btn btn-primary" onClick={this.onClick.bind(this)} >Query</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

class LogAnalysis extends React.Component {
    render() {
        return (
            <div className="content-wrapper">
                <Header />
                <Content appState={appState} />
            </div>
        )
    }
}

export default LogAnalysis
