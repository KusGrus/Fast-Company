import React, { useEffect, useState } from 'react'
import Table from './table/Table'
import Bookmark from './Bookmark'
import CompanyState from './CompanyState'
import FiltersGroup from './FiltersGroup'
import QualitiesList from './table/QualitiesList'
import api from '../api'
import { ObjectDTO, ProfessionDTO, UserDTO } from '../api/fake.api/user.api.model'
import { Column, Paging, TableItem } from './table/table-models'
import { FilterMap, ItemForMark, TableItemWithQuality } from './types'

const FastCompany = () => {
    const [columns] = useState<Column[]>([
        { code: 'name', title: 'Имя', path: 'name', sort: 'default' },
        {
            code: 'qualities',
            title: 'Качества',
            componentFn: (item: TableItemWithQuality) => (<QualitiesList qualities={item.qualities}/>)
        },
        { code: 'profession', title: 'Профессия', path: 'profession.name', sort: 'default' },
        { code: 'completedMeetings', title: 'Встретился (раз)', path: 'completedMeetings', sort: 'default' },
        {
            code: 'bookmark',
            title: 'Избранное',
            sort: 'default',
            componentFn: (item: TableItem) => (<Bookmark user={item} onMark={handleMark}/>)
        },
        { code: 'rate', title: 'Оценка', path: 'rate', sort: 'default' },
        {
            code: 'action',
            title: '',
            componentFn: (item: TableItem) => (<button
                onClick={() => handleDelete(item._id)}
                type="button"
                className="btn btn-danger"
            >
                Delete
            </button>)
        }
    ])
    const [users, setUsers] = useState<UserDTO[]>([])
    const [professions, setProfessions] = useState<ProfessionDTO[]>([])
    const [paging, setPaging] = useState<Paging>({ count: 5, page: 1 })
    const [filters, setFilters] = useState<FilterMap>({})

    useEffect(() => {
        api.users.fetchAll().then((data: any) => setUsers(data))
    }, [])

    useEffect(() => {
        api.professions.fetchAll().then((data: any) => setProfessions(data))
    }, [])

    const handleDelete = (id: string) => setUsers(prevState => prevState.filter((user) => user._id !== id))
    const handleMark = (user: ItemForMark) => setUsers(prevState => {
        const tempUser: UserDTO = { ...user as UserDTO, bookmark: !user.bookmark }
        const idx = prevState.findIndex(state => state._id === user._id)
        if (idx >= 0) {
            return prevState.map(u => {
                if (u._id === user._id) {
                    return tempUser
                } else {
                    return u
                }
            })
        }
        return prevState
    })
    const pagingController = () => ({
        first: () => setPaging((prevState) => ({ count: prevState.count, page: 1 })),
        change: (page: number) => setPaging((prevState) => ({ count: prevState.count, page })),
        last: (page: number) => setPaging((prevState) => ({ count: prevState.count, page }))
    })
    const handleFilterSelect = (code: string, filter: ObjectDTO) => {
        setFilters(prevState => {
            if (prevState[code] && prevState[code]._id === filter._id) {
                return Object.keys(prevState).reduce((acc, cur) => {
                    if (cur !== code) {
                        return { ...acc, [cur]: prevState[cur] }
                    } else {
                        return acc
                    }
                }, {})
            } else {
                return { ...prevState, [code]: filter }
            }
        })
    }
    const handleReset = () => {
        setFilters({})
        setPaging({ count: 5, page: 1 })
    }

    const filterUsers = users.filter((user: { [key: string]: any }) =>
        Object.keys(filters).every(prop => user[prop]?._id === filters[prop]._id)
    )

    return (
        <React.Fragment>
            <div className="flex-container">
                <aside>
                    <button onClick={handleReset} type="button" className="btn btn-primary">Reset</button>
                    <FiltersGroup code='profession' filters={professions} selected={filters.profession}
                        onSelect={handleFilterSelect}/>
                </aside>
                <main className="flex-column">
                    <CompanyState total={users.length}/>
                    <Table items={filterUsers} columns={columns} paging={paging} onChangePanging={pagingController()}/>
                </main>
            </div>
        </React.Fragment>
    )
}

export default FastCompany
