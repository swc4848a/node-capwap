import React from 'react'

class Header extends React.Component {
    render() {
        return (
            <section className="content-header">
                <h1>
                    AP Server
                    <small>Analysis</small>
                </h1>
                <ol className="breadcrumb">
                    <li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
                    <li><a href="#">Log Graph</a></li>
                    <li className="active">Log Analysis</li>
                </ol>
            </section>
        )
    }
}

class Content extends React.Component {
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
                                    <label>Commands:</label>
                                    <textarea className="form-control" rows="3" placeholder="Enter ..."></textarea>
                                </div>
                            </div>
                            <div className="box-footer">
                                <button type="submit" className="btn btn-primary">Submit</button>
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
                <Content />
            </div>
        )
    }
}

export default LogAnalysis
