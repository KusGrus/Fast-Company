import React from 'react'
import { Column, TableBodyProps, TableItem } from './table-models'
import _ from 'lodash'

const TableBody = ({ items, columns }: TableBodyProps) => {
    const renderContent = (item: TableItem, column: Column) => {
        if (column.componentFn) {
            return column.componentFn(item)
        } else if (column.path) {
            return _.get(item, column.path)
        } else {
            return ''
        }
    }

    return (
        <tbody>
            {items.map(item => (
                <tr key={item._id}>
                    {columns.map(column => (<td key={column.code} scope="col">{renderContent(item, column)}</td>))}
                </tr>
            ))}
        </tbody>
    )
}

export default TableBody
