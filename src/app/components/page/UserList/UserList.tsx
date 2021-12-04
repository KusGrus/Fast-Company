import React, { useState } from 'react'
import Bookmark from '../../common/Bookmark'
import Table from '../../common/table'
import CompanyState from '../../common/CompanyState'
import FiltersGroup from '../../common/FiltersGroup'
import QualitiesList from '../../common/QualitiesList'
import { ObjectDTO } from '../../../../api/fake.api/api.model'
import { Column, Paging, TableItem } from '../../common/table/table-models'
import { FilterMap, ItemForMark, TableItemWithQuality } from '../../types'
import Loader from '../../common/loader/Loader'
import { Link } from 'react-router-dom'
import { useUser } from '../../../hooks/useUser'
import { useProfession } from '../../../hooks/useProfession'
import Profession from '../../ui/Profession'


const UserList = () => {
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
        { code: 'profession', title: 'Профессия', sort: 'default', componentFn: (item: TableItem) => (<Profession id={item.profession}/>) },
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
    const { users } = useUser()
    const { professions } = useProfession()
    const [paging, setPaging] = useState<Paging>({ count: 5, page: 1 })
    const [filters, setFilters] = useState<FilterMap>({})

    const filterUsers = users
        .filter((user: { [key: string]: any }) =>
            Object.keys(filters).every(prop => user[prop]?._id === filters[prop]._id)
        )

    const handleDelete = (id: string) => console.log('delete')

    const handleMark = (user: ItemForMark) => console.log('mark')

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
                                placeholder="Search"/>
                        </div>
                        <Table items={filterUsers}
                            columns={columns}
                            paging={paging}
                            onChangePanging={pagingController()}/>
                    </main>
                </div>
            </React.Fragment>
        )
    } else {
        return <Loader fixed/>
    }
}

export default UserList
