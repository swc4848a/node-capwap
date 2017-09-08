import React from 'react'
import _ from 'lodash'
import ReactTable from 'react-table'
import {
    Route,
    Link,
    NavLink,
    withRouter
} from 'react-router-dom'

import { Input, CheckboxGroup, XSelect } from './editor.jsx'
import { inject, observer } from 'mobx-react'
import { Modal, Button } from 'react-bootstrap'

const columns = [{
    Header: 'Name',
    accessor: 'name'
}, {
    Header: 'Connecting From',
    accessor: 'connecting_from'
}, {
    Header: 'State',
    accessor: 'state'
}, {
    Header: 'Status',
    accessor: 'status'
}, {
    Header: 'VLAN ID',
    accessor: 'mgmt_vlanid'
}, {
    Header: 'Clients',
    accessor: 'clients'
}, {
    Header: 'Version',
    accessor: 'os_version'
}, {
    Header: 'Local IP',
    accessor: 'local_ipv4_addr'
}, {
    Header: 'Mac',
    accessor: 'board_mac'
}, {
    Header: 'Connection State',
    accessor: 'connection_state'
}, {
    Header: '',
    accessor: 'name',
    Cell: (props) => {
        return (
            <Link to={`/AccessPointForm/${props.value}`} >
                <i className="fa fa-pencil"></i>
            </Link>
        )
    }
}]

class Radio extends React.Component {
    render() {
        const listItems = this.props.radioInfo.map((info, index) => {
            return (<div key={index}><dt>{info.label}</dt><dd>{info.value}</dd></div>)
        })
        return (
            <div className={this.props.className}>
                <div className="box box-solid">
                    <div className="box-header with-border">
                        <h3 className="box-title">{this.props.title}</h3>
                    </div>
                    <div className="box-body">
                        <dl className="dl-horizontal">
                            {listItems}
                        </dl>
                    </div>
                </div>
            </div>
        )
    }
}

@inject('apStore')
@withRouter
@observer
class APForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }
    componentDidMount() {
        let self = this
        const sn = this.props.match.params.sn
        fetch('/AP').then(function(response) {
            response.json().then(function(json) {
                self.props.apStore.set(json.result[0].data)
            })
        })
    }
    isAccess(name) {
        return ('telnet' === name) || ('http' === name) || ('https' === name) || ('ssh' === name)
    }
    handleClick(e) {
        this.props.history.push('/AccessPointList')
    }
    handleChange(e, index) {
        const target = e.target
        const value = target.type === 'checkbox' ? target.checked : target.value
        const name = target.name
        const sn = this.props.match.params.sn
        if (target.type !== 'checkbox') {
            this.props.apStore.update(sn, name, value)
        } else {
            if (this.isAccess(name)) {
                this.props.apStore.updateAccess(sn, name, value)
            } else {
                this.props.apStore.updateTag(sn, name, value)
            }
        }
    }
    render() {
        const sn = this.props.match.params.sn
        let ap = this.props.apStore.apList.filter(ap => (sn === ap.serial))[0]

        if (!ap) {
            return <div>Loading ...</div>
        }

        const radioInfo1 = [
            { label: 'Band', value: '2.4GHz 802.11n/g/b' },
            { label: 'Channel', value: '1, 6, 11' },
            { label: 'TX Power', value: '100%' }
        ]
        const radioInfo2 = [
            { label: 'Mode', value: 'Disabled' }
        ]

        return (
            <div className="col-md-12">
                <div className="box box-primary">
                    <div className="box-header with-border">
                        <h3 className="box-title">Configure Access Point</h3>
                    </div>
                    <div className="form-horizontal">
                        <div className="box-body">
                            <Input 
                                name="serial"
                                type="text" 
                                label="Serial Number" 
                                value={ap.serial} 
                                left="col-sm-2" 
                                right="col-sm-10" 
                                disabled={true}
                            />
                            <Input 
                                name="name"
                                type="text" 
                                label="Name" 
                                value={ap.name} 
                                left="col-sm-2" 
                                right="col-sm-10" 
                                onChange={this.handleChange} 
                            />
                            <CheckboxGroup 
                                label="AP Tags"
                                left="col-sm-2" 
                                right="col-sm-10" 
                                labels={ap.tags} 
                                onChange={this.handleChange}
                            />
                            <XSelect 
                                left="col-sm-2"
                                right="col-sm-10"
                                label="Platform Profile"
                                name="platformProfile"
                                value=""
                            />
                            <Radio 
                                className="col-sm-offset-1 col-md-10"
                                title="Radio 1"
                                radioInfo={radioInfo1}
                            />
                            <Radio 
                                className="col-sm-offset-1 col-md-10"
                                title="Radio 2"
                                radioInfo={radioInfo2}
                            />
                            <CheckboxGroup 
                                label="Admin Access"
                                left="col-sm-2" 
                                right="col-sm-10" 
                                labels={ap.access} 
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="box-footer">
                            <div className="pull-right">
                                <button type="submit" className="btn btn-info" onClick={this.handleClick}>
                                    Apply
                                </button>
                                {' '}
                                <button type="submit" className="btn btn-default" onClick={this.handleClick}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

@inject('apStore')
@withRouter
@observer
class APTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = { showModal: false }
    }
    componentDidMount() {
        let self = this
        fetch('/AP').then(function(response) {
            response.json().then(function(json) {
                self.props.apStore.set(json.result[0].data)
            })
        })
    }
    render() {
        const {
            apList,
        } = this.props.apStore

        return (
            <div className="col-md-12">
                <div className="box">
                    <div className="box-header with-border">
                        <h3 className="box-title">Status View</h3>
                    </div>
                    <div className="box-body">
                        <ReactTable
                            data={apList}
                            columns={columns}
                            defaultPageSize={5}
                        />
                    </div>
                    <div className="box-footer clearfix"></div>
                </div>
            </div>
        )
    }
}

export function AccessPointList() {
    return (
        <section className="content">
            <div className="row">
                <APTable />
            </div>
        </section>
    )
}

export function AccessPointForm() {
    return (
        <section className="content">
            <div className="row">
                <APForm />
            </div>
        </section>
    )
}