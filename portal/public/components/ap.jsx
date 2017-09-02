import React from 'react'
import _ from 'lodash'
import ReactTable from 'react-table'
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

import { Form, FormGroup, Col, Checkbox, Button, FormControl } from 'react-bootstrap'
import { Input, Text } from './editor.jsx'

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
            <Link to={
                {
                    pathname: `AccessPointForm`, 
                    search: `?sn=${props.value}`
                }
            }>
                <i className="fa fa-pencil"></i>
            </Link>
        )
    }
}]

class APForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleSerialNumberChange = this.handleSerialNumberChange.bind(this)
        this.state = {
            data: {}
        }
    }
    componentDidMount() {
        let self = this
        fetch('/AP' + this.props.location.search).then(function(response) {
            response.json().then(function(json) {
                self.handleSerialNumberChange(json.result[0].data[0].serial)
            })
        });
    }
    handleSerialNumberChange(serial) {
        this.setState({
            data: {
                serial: serial
            }
        })
    }
    render() {
        const serial = this.state.data.serial
        return (
            <div className="col-md-6">
                <div className="box box-primary">
                    <div className="box-header with-border">
                        <h3 className="box-title">Configure Access Point</h3>
                    </div>
                    <div className="form-horizontal">
                        <div className="box-body">
                            <Input left="col-sm-2" 
                                label="Serial Number" 
                                right="col-sm-10" 
                                type="text" 
                                value={serial} 
                                onInputChange={this.handleSerialNumberChange} 
                            />
                        </div>
                        <div className="box-footer">
                            <button type="submit" className="btn btn-default">Cancel</button>
                            <button type="submit" className="btn btn-info pull-right">Apply</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

class APTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: [] };
    }
    componentDidMount() {
        let self = this
        fetch('/AP').then(function(response) {
            response.json().then(function(json) {
                self.setState({
                    data: json.result[0].data
                })
            })
        });
    }
    render() {
        return (
            <div className="col-md-12">
                <div className="box">
                    <div className="box-header with-border">
                        <h3 className="box-title">Status View</h3>
                    </div>
                    <div className="box-body">
                        <ReactTable
                            data={this.state.data}
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

export function AccessPointForm({ location }) {
    return (
        <section className="content">
            <div className="row">
                <APForm location ={ location } />
            </div>
        </section>
    )
}