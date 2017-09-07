import React from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import { Input, CheckboxGroup, CSelect } from './editor.jsx'


@inject('networkStore')
@withRouter
@observer
export default class Network extends React.Component {
    handleTimezoneChange = e => this.props.networkStore.setTimezone(e.target.value)
    render() {
        const { values, timezoneOptions } = this.props.networkStore

        return (
            <section className="content">
                <div className="row">
                    <div className="col-md-12">
                        <div className="box box-primary">
                            <div className="box-header">
                                <h3 className="box-title">AP Network Info</h3>
                            </div>
                            <div className="form-horizontal">
                                <div className="box-body">
                                    <CSelect 
                                        left="col-sm-2"
                                        right="col-sm-10"
                                        label="Timezone:"
                                        name="timezone"
                                        value={values.timezone}
                                        options={[]}
                                        onChange={this.handleTimezoneChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}