import React from 'react'
import { TableHeaderProps } from './table-models'

const TableHeader = ({ columns, onSort }: TableHeaderProps) => {
    return (
        <thead>
            <tr>
                {columns.map(column => (
                    <th key={column.code}
                        onClick={column.sort && (() => onSort(column.code))}
                        role={column.sort && 'button'}
                        scope="col">
                        {column.title}
                    </th>
                ))}
            </tr>
        </thead>
    )
}

export default TableHeader
