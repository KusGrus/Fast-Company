import React, { useState } from 'react'
import { SortFieldState, Sorting, TableProps } from './table-models'
import TableHeader from './TableHeader'
import TableBody from './TableBody'
import Pagination from './Pagination'
import _ from 'lodash'

const Table = ({ items, columns, paging, onChangePanging }: TableProps) => {
    const [sortField, setSortField] = useState<SortFieldState>()

    const handleSorting = (code: string) => {
        if (sortField?.code === code) {
            setSortField(prevState => {
                let sort: Sorting
                switch (prevState?.sort) {
                    case 'desc':
                        sort = 'default'
                        break
                    case 'asc':
                        sort = 'desc'
                        break
                    default:
                        sort = 'asc'
                        break
                }
                return { code, sort }
            })
        } else {
            setSortField({ code, sort: 'asc' })
        }
    }

    const determinateSort = () => {
        switch (sortField?.sort) {
            case 'desc':
                return _.sortBy(items, [sortField?.code], ['asc']).reverse()
            case 'asc':
                return _.sortBy(items, [sortField?.code], ['asc'])
            default:
                return items
        }
    }

    const sortingItems = determinateSort()
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
