import React from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'

class Table extends React.Component {
    render() {
        return (
            <BootstrapTable>
                <TableHeaderColumn dataField='id' isKey>Product ID</TableHeaderColumn>
                <TableHeaderColumn dataField='name'>Product Name</TableHeaderColumn>
                <TableHeaderColumn dataField='price'>Product Price</TableHeaderColumn>
            </BootstrapTable>
        );
    }
}

export default function AccessPoint() {
    return (
        <section className="content">
            <div className="row">

            </div>
        </section>
    )
}