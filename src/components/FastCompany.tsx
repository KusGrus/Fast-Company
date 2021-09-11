import React, { useState } from 'react'
import { FastCompanyProps } from './types'
import CompanyState from './CompanyState'
import CompanyList from './CompanyList'
import paginationContainer from './PaginationContainer'
import GroupList from './GroupList'
import api from '../api'

const FastCompany = (props: FastCompanyProps) => {
    const [users, setUsers] = useState(props.users)
    const [professions, setProfessions] = useState(api.professions.fetchAll())

    const handleDelete = (id: string) =>
        setUsers(users.filter((user) => user._id !== id))
    const handleReset = () =>
        setUsers(props.users.map((u) => ({ ...u, mark: false })))
    const handleMark = (id: string) => {
        const temp = [...users]
        const user = temp.find((user) => user._id === id)
        if (user) {
            user.mark = !user.mark
            setUsers(temp)
        }
    }
    const handleProfessionSelect = (params: any) => {
        console.log(params)
    }

    const CompanyListWithPaging = paginationContainer(CompanyList)

    return (
        <React.Fragment>
            <GroupList items={professions} onItemSelect={handleProfessionSelect}/>
            <div className="flex-container">
                <CompanyState count={users.length} />
                <button onClick={handleReset} type="button" className="btn btn-primary">
          Reset
                </button>
            </div>
            <CompanyListWithPaging
                users={users}
                onMark={handleMark}
                onDelete={handleDelete}
            />
        </React.Fragment>
    )
}

export default FastCompany
