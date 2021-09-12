import React, { useEffect, useState } from 'react'
import { ExtraUserDTO, Pagination, PaginationController } from './types'
import CompanyState from './CompanyState'
import CompanyList from './CompanyList'
import paginationContainer from './PaginationContainer'
import GroupList from './GroupList'
import api from '../api'
import { ProfessionDTO } from '../api/fake.api/user.api.model'

const FastCompany = () => {
    const defaultPaging = { count: 3, page: 1 }
    const [allUsers, setAllUsers] = useState<ExtraUserDTO[]>([])
    const [users, setUsers] = useState<ExtraUserDTO[]>([])
    const [professions, setProfessions] = useState()
    const [selectedProfession, setSelectedProfession] = useState<ProfessionDTO>()
    const [pagination, setPagination] = useState<Pagination>(defaultPaging)

    useEffect(() => {
        api.professions.fetchAll().then((data: any) => setProfessions(data))
    }, [professions])

    useEffect(() => {
        api.users.fetchAll().then((data: any) => {
            data = data.map((d: any) => ({ ...d, mark: false }))
            setAllUsers(JSON.parse(JSON.stringify(data)))
            setUsers(data)
        })
    }, [])

    const handleDelete = (id: string) => setUsers(allUsers.filter((user) => user._id !== id))

    const handlePageChange: () => PaginationController = () => ({
        first: () => setPagination((prevState) => ({ count: prevState.count, page: 1 })),
        change: (page: number) => setPagination((prevState) => ({ count: prevState.count, page })),
        last: (page: number) => setPagination((prevState) => ({ count: prevState.count, page }))
    })

    const handleReset = () => {
        setPagination(defaultPaging)
        setUsers(allUsers)
        setSelectedProfession(undefined)
    }

    const handleMark = (id: string) => {
        const user = users.find((user) => user._id === id)
        if (user) {
            user.mark = !user.mark
            setUsers([...users])
        }
    }

    const handleProfessionSelect = (item: ProfessionDTO) => {
        setPagination(defaultPaging)
        setSelectedProfession(item)
        setUsers(allUsers.filter((user) => user.profession._id === item._id))
    }

    const CompanyListWithPaging = paginationContainer(CompanyList)

    return (
        <React.Fragment>
            <div className="flex-container">
                <aside>
                    <button onClick={handleReset} type="button" className="btn btn-primary">
                        Reset
                    </button>
                    {professions && <GroupList items={professions}
                        selectedItem={selectedProfession}
                        onItemSelect={handleProfessionSelect}/>}
                </aside>
                <main>
                    <CompanyState count={users.length}/>
                    <CompanyListWithPaging
                        users={users}
                        pageController={handlePageChange()}
                        paging={pagination}
                        onMark={handleMark}
                        onDelete={handleDelete}
                    />
                </main>
            </div>
        </React.Fragment>
    )
}

export default FastCompany
