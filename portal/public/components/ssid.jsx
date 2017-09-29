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

        function Content({ step }) {
            return (
                <div className="step-content body current" 
                    id="wizard-p-0" 
                    role="tabpanel" 
                    aria-labelledby="wizard-h-0" 
                    aria-hidden="false"
                >
                        <div className="text-center m-t-md">
                            <h2>Hello in Step {step}</h2>
                            <p>
                                This is the {step} content.
                            </p>
                        </div>
                </div>
            )
        }

        return (
            <section className="content">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="box box-primary">
                            <div className="box-header with-border">
                            </div>
                            <form className="form-horizontal">
                                <div className="wizard clearfix">
                                    <div className="steps clearfix">
                                        <ul role="tablist">
                                            <li role="tab" className={(1 === this.state.step) ? "first current" : "first disabled"}>
                                                <a href="javascript:void(0);">
                                                    {(1 === this.state.step) && <span className="current-info audible">current step: </span>}
                                                    <span className="">1.</span> First Step
                                                </a>
                                            </li>
                                            <li role="tab" className={(2 === this.state.step) ? "current" : "disabled"}>
                                                <a href="javascript:void(0);">
                                                    {(2 === this.state.step) && <span className="current-info audible">current step: </span>}
                                                    <span className="">2.</span> Second Step
                                                </a>
                                            </li>
                                            <li role="tab" className={(3 === this.state.step) ? "last current" : "last disabled"}>
                                                <a href="javascript:void(0);">
                                                    {(3 === this.state.step) && <span className="current-info audible">current step: </span>}
                                                    <span className="">3.</span> Third Step
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="content clearfix">
                                        <Content step={this.state.step} />
                                    </div>
                                    <div className="actions clearfix">
                                        <ul role="menu" aria-label="Pagination">
                                            <li className="disabled" aria-disabled="true">
                                                <a href="javascript:void(0);" role="menuitem" onClick={this.prev}>Previous</a>
                                            </li>
                                            <li aria-hidden="false" aria-disabled="false">
                                                <a href="javascript:void(0);" role="menuitem" onClick={this.next}>Next</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}