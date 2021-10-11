import React, { useEffect, useState } from 'react'
import Table from './table/Table'
import Bookmark from './Bookmark'
import CompanyState from './CompanyState'
import FiltersGroup from './FiltersGroup'
import QualitiesList from './table/QualitiesList'
import api from '../../api'
import { ObjectDTO, ProfessionDTO, UserDTO } from '../../api/fake.api/user.api.model'
import { Column, Paging, TableItem } from './table/table-models'
import { FilterMap, ItemForMark, TableItemWithQuality } from './types'
import Loader from './loader/Loader'
import { Link } from 'react-router-dom'
import useForm from '../hooks/useForm'

const FastCompany = () => {
    const [columns] = useState<Column[]>([
        {
            code: 'name',
            title: 'Имя',
            sort: 'default',
            componentFn: (item: { _id: string, name: string }) => (<Link to={`/users/${item._id}`}>{item.name}</Link>)
        },
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
    const { register, change, state } = useForm()
    const [users, setUsers] = useState<UserDTO[]>([])
    const [professions, setProfessions] = useState<ProfessionDTO[]>([])
    const [paging, setPaging] = useState<Paging>({ count: 5, page: 1 })
    const [filters, setFilters] = useState<FilterMap>({})

    const filterUsers = users
        .filter((user: { [key: string]: any }) =>
            Object.keys(filters).every(prop => user[prop]?._id === filters[prop]._id)
        )
        .filter(item => item?.name?.toLowerCase()?.trim().includes((state.search?.value || '').toLowerCase().trim()))

    useEffect(() => {
        api.users.fetchAll().then((data: any) => setUsers(data))
    }, [])

    useEffect(() => {
        api.professions.fetchAll().then((data: any) => setProfessions(data))
    }, [])

    useEffect(() => {
        setFilters({})
    }, [state.search?.value])


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
        state.search.patchValue('')
    }

    if (users.length) {
        return (
            <React.Fragment>
                <div className="flex-container">
                    <aside>
                        <button onClick={handleReset} type="button" className="btn btn-primary">Reset</button>
                        {professions?.length
                            ? <FiltersGroup code="profession" filters={professions} selected={filters.profession}
                                onSelect={handleFilterSelect}/>
                            : <Loader/>
                        }

                    </aside>
                    <main className="flex-column">
                        <CompanyState total={users.length}/>
                        <div className="input-group mb-3 mt-3">
                            <span className="input-group-text">Search</span>
                            <input type="text"
                                className="form-control"
                                name="search"
                                placeholder="Search"
                                ref={register()} onChange={change}/>
                        </div>
                        <Table items={filterUsers} columns={columns} paging={paging}
                            onChangePanging={pagingController()}/>
                    </main>
                </div>
            </React.Fragment>
        )
    } else {
        return <Loader fixed/>
    }
}

export default FastCompany
