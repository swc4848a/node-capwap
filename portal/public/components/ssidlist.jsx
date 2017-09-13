import React from 'react';
import { inject, observer } from 'mobx-react';
import ReactTable from 'react-table'
import { withRouter } from 'react-router-dom'

const columns = [{
    Header: 'SSID',
    accessor: 'ssid'
}, {
    Header: 'Authentication',
    accessor: 'authentication'
}, {
    Header: 'Sign on Method',
    accessor: 'signOnMethod'
}, {
    Header: 'IP Assignment',
    accessor: 'ipAssignment'
}, {
    Header: 'Security',
    accessor: 'security'
}, {
    Header: 'Available to APs with following AP Tags',
    accessor: 'apTags'
}, {
    Header: 'Radio Availability',
    accessor: 'radioAvailability'
}, {
    Header: 'Schedule',
    accessor: 'schedule'
}, {
    Header: '',
    accessor: 'name',
    Cell: (props) => {
        return (
            <Link to={`/SSID/${props.value}`} >
                <i className="fa fa-pencil"></i>
            </Link>
        )
    }
}]

@inject('ssidsStore')
@withRouter
@observer
export default class SSIDList extends React.Component {
    render() {
        return (
            <section className="content">
                <div className="row">
                    <div className="col-md-12">
                        <div className="box">
                            <div className="box-header with-border">
                                <h3 className="box-title">Status View</h3>
                            </div>
                            <div className="box-body">
                                <ReactTable
                                    data={[]}
                                    columns={columns}
                                    defaultPageSize={5}
                                />
                            </div>
                            <div className="box-footer clearfix"></div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}