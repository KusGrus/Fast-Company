import React from 'react'
import { Column, TableHeaderProps } from './table-models'

const TableHeader = ({ columns, onSort, activeSort }: TableHeaderProps) => {
    const sortArrow = (column: Column) => {
        if (activeSort?.code === column.code) {
            if (activeSort?.sort === 'asc') {
                return <i className="bi bi-caret-down-fill"/>
            } else if (activeSort?.sort === 'desc') {
                return <i className="bi bi-caret-up-fill"/>
            }
        } else {
            return false
        }
    }
    return (
        <thead>
            <tr>
                {columns.map(column => (
                    <th key={column.code}
                        onClick={column.sort && (() => onSort(column.code))}
                        role={column.sort && 'button'}
                        scope="col">
                        <span>{column.title}{sortArrow(column)}</span>
                    </th>
                ))}
            </tr>
        </thead>
    )
}

export default TableHeader
