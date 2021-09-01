import React from 'react'
import CompanyItem from './CompanyItem'
import { CompanyListProps, ExtraUserDTO } from './types'

const CompanyList = ({ users, ...rest }: CompanyListProps) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">Имя</th>
                    <th scope="col">Качества</th>
                    <th scope="col">Профессия</th>
                    <th scope="col">Встретился (раз)</th>
                    <th scope="col">Избранное</th>
                    <th scope="col">Оценка</th>
                    <th scope="col" />
                </tr>
            </thead>
            <tbody>
                {users.map((user: ExtraUserDTO) => (
                    <CompanyItem key={user._id} user={user} {...rest} />
                ))}
            </tbody>
        </table>
    )
}

export default CompanyList
