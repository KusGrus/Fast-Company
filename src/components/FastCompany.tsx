import React, {useState} from 'react'
import {FastCompanyProps, FastCompanyState} from "./types"
import CompanyState from "./CompanyState"
import CompanyItem from "./CompanyItem"

const FastCompany = (props: FastCompanyProps) => {
    const [users, setUsers] = useState(props.users)

    const handleDelete = (id: string) => setUsers(users.filter(user => user._id !== id));
    const handleClick = () => setUsers(props.users);

    return (
        <React.Fragment>
            <div className="flex-container">
                <CompanyState count={users.length}/>
                <button onClick={() => handleClick()} type="button" className="btn btn-primary">Reset</button>
            </div>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">Имя</th>
                    <th scope="col">Качества</th>
                    <th scope="col">Профессия</th>
                    <th scope="col">Встретился (раз)</th>
                    <th scope="col">Оценка</th>
                    <th scope="col"></th>
                </tr>
                </thead>
                <tbody>
                {users.map(user => <CompanyItem key={user._id} user={user} onDelete={handleDelete}/>)}
                </tbody>
            </table>

        </React.Fragment>
    );
}

export default FastCompany
