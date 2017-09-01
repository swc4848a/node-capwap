import React from 'react'
import _ from 'lodash'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'

class APTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: [] };
    }
    componentDidMount() {
        let self = this
        fetch('/AP')
            .then(function(response) {
                return response.json();
            })
            .then(function(json) {
                self.setState({
                    data: json.result[0].data
                })
            })
            .catch(function(error) {
                console.log(error);
            })
    }
    render() {
        const columns = [
            'Name',
            'Status',
            'Clients',
            'Connected Via IP',
            'TX Bandwidth',
            'RX Bandwidth',
            'Interfering APs',
            'Join Time',
            'Operating Channel',
            'Subscription',
            'Operating TX Power',
            'Local IP',
            'Security Version'
        ].map(
            (item, index) => {
                return (
                    <TableHeaderColumn 
                        key={index} 
                        dataField={_.camelCase(item)} 
                        width='150'
                        isKey={item==='Name'}
                    >{item}</TableHeaderColumn>
                )
            }
        )

        return (
            <BootstrapTable data={this.state.data}>
                {columns}
            </BootstrapTable>
        );
    }
}

export default function AccessPoint() {
    return (
        <section className="content">
            <div className="row">
                <div className="col-md-12">
                    <div className="box">
                        <div className="box-header with-border">
                            <h3 className="box-title">Status View</h3>
                        </div>
                        <div className="box-body">
                            <APTable />
                        </div>
                        <div className="box-footer clearfix"></div>
                    </div>
                </div>
            </div>
        </section>
    )
}