import React from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import { YInput, YSelect } from './editor.jsx'

@inject('networkStore')
@withRouter
@observer
export default class Network extends React.Component {
    componentWillMount() {
        this.props.networkStore.loadTimezoneOptions()
        this.props.networkStore.setTimezone('PST')
    }
    handleTimezoneChange = timezone => this.props.networkStore.setTimezone(timezone.value)
    handleEmailToChange = e => this.props.networkStore.setEmailTo(e.target.value)
    render() {
        const { values, timezoneOptions } = this.props.networkStore
        return (
            <section className="content">
                <div className="row">
                    <div className="col-md-6">
                        <div className="box box-primary">
                            <form role="form">
                                <div className="box-body">
                                    <h4>AP Network Info</h4>
                                    <YSelect 
                                        label="Time Zone:"
                                        name="timezone"
                                        value={values.timezone}
                                        options={timezoneOptions.peek()}
                                        onChange={this.handleTimezoneChange}
                                    />
                                    <h4>AP Network Alert</h4>
                                    <YInput 
                                        label="Send alerts via email to"
                                        name="emailTo"
                                        type="email"
                                        value={values.emailTo}
                                        onChange={this.handleEmailToChange}
                                        buttonLabel="Use Account Email"
                                    />
                                    <h4>Radio Scan</h4>
                                    <h4>Timeout</h4>
                                </div>
                                <div className="box-footer">
                                    <button type="submit" className="btn btn-info pull-right">Apply</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}