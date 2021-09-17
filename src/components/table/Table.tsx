import React, { useState } from 'react'
import { SortFieldState, TableItem, TableProps } from './table-models'
import TableHeader from './TableHeader'
import TableBody from './TableBody'
import Pagination from './Pagination'
import _ from 'lodash'

const Table = ({ items, columns, paging, onChangePanging }: TableProps) => {
    const [sortField, setSortField] = useState<SortFieldState>()

    const handleSorting = (code: string) => {
        if (sortField?.code === code) {
            setSortField(prevState => ({
                code: prevState?.code as string,
                sort: prevState?.sort === 'asc' ? 'desc' : 'asc'
            }))
        } else {
            setSortField({ code, sort: 'asc' })
        }
    }

    const sortingItems: TableItem[] = _.sortBy(items, [sortField?.code], [sortField?.sort])
    const startIndex = paging.count * (paging.page - 1)
    const pagingItems = sortingItems.slice(startIndex, startIndex + paging.count)
    if (!pagingItems.length && items.length) {
        onChangePanging.change(paging.page - 1)
    }

    return (
        <React.Fragment>
            <table className="table">
                <TableHeader columns={columns} onSort={handleSorting} activeSort={sortField}/>
                <TableBody columns={columns} items={pagingItems}/>
            </table>
            <Pagination total={items.length} paging={paging} controller={onChangePanging}/>
        </React.Fragment>
    )
}

export default Table
