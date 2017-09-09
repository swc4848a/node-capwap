import React from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import Select from 'react-select'

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
                    <div className="col-md-12">
                        <div className="box box-primary">
                            <form role="form">
                                <div className="box-body">
                                    <h4>AP Network Info</h4>
                                    <div className="form-inline">
                                        <div className="form-group">
                                            <span>Time Zone:</span>{' '}
                                        </div>
                                        <div className="form-group">
                                            <Select 
                                                name="timezone" 
                                                value={values.timezone}
                                                options={timezoneOptions.peek()}
                                                onChange={this.handleTimezoneChange}
                                            />
                                        </div>
                                    </div>
                                    <h4>AP Network Alert</h4>
                                    <div className="form-group">
                                        <span>Send alerts via email to</span>{' '}
                                        <input 
                                            type="text" 
                                            name="emailTo"
                                            value={values.emailTo}
                                            onChange={this.handleEmailToChange}
                                        />{' '}
                                        <a href="">Use Account Email</a>
                                    </div>
                                    <h4>Radio Scan</h4>
                                    <div className="form-group">
                                        <span>Background scan every</span>{' '}<input type="text" />{' '}<span>seconds</span>
                                    </div>
                                    <div className="form-group">
                                        <div className="checkbox">
                                            <label>
                                                <input type="checkbox"/>
                                                Disable Background Scan during Specified Time
                                            </label>
                                        </div>
                                        <div className="checkbox">
                                            <label>
                                                <input type="checkbox"/>
                                                Enable Passive Scan Mode (No Probe)
                                            </label>
                                        </div>
                                    </div>
                                    <span>The above setting will be used when Automatic TX Power Control or Radio Resource Provision or Rogue AP Scan is enabled.</span>
                                    <h4>Timeout</h4>
                                    <div className="form-group">
                                        <span>Captive Portal User Authentication Timeout</span>{' '}
                                    </div>
                                    <div className="form-group">
                                        <span>Client Idle Timeout</span>{' '}
                                    </div>
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