import React from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';



@inject('ssidsStore')
@withRouter
@observer
export default class Article extends React.Component {
    constructor(props) {
        super(props)
        this.state = { step: 1 }

        this.prev = this.prev.bind(this)
        this.next = this.next.bind(this)
    }
    componentWillMount() {
        const slug = this.props.match.params.name
        this.props.ssidsStore.loadSSID(slug, { acceptCached: true });
    }
    componentDidMount() {

    }
    prev() {
        this.setState((prevState, props) => ({
            step: prevState.step - 1
        }))
    }
    next() {
        this.setState((prevState, props) => ({
            step: prevState.step + 1
        }))
    }
    render() {
        const slug = this.props.match.params.name
        const ssid = this.props.ssidsStore.getSSID(slug)

        let step = null
        switch (this.state.step) {
            case 1:
                step = (<div className="box-body">Step1</div>)
                break
            case 2:
                step = (<div className="box-body">Step2</div>)
                break
        }

        return (
            <section className="content">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="box box-primary">
                            <div className="box-header with-border">
                                <h3 className="box-title">Horizontal Form</h3>
                            </div>
                            <form className="form-horizontal">
                                {step}
                                <div className="box-footer">
                                    <button className="btn btn-default" onClick={this.prev}>Prev</button>
                                    <button className="btn btn-info pull-right" onClick={this.next}>Next>></button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}