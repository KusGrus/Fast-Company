import React, {useState} from 'react'
import {FastCompanyProps} from "./types"
import CompanyState from "./CompanyState"
import CompanyList from "./CompanyList";

const FastCompany = (props: FastCompanyProps) => {
    const [users, setUsers] = useState(props.users)

    const handleDelete = (id: string) => setUsers(users.filter(user => user._id !== id))
    const handleReset = () => setUsers(props.users.map(u => ({...u, mark: false})))
    const handleMark = (id: string) => {
        const temp = [...users]
        const user = temp.find(user => user._id === id)
        if (user) {
            user.mark = !user.mark
            setUsers(temp)
        }
    }

    return (
        <React.Fragment>
            <div className="flex-container">
                <CompanyState count={users.length}/>
                <button onClick={handleReset} type="button" className="btn btn-primary">Reset</button>
            </div>
            <CompanyList users={users} onMark={handleMark} onDelete={handleDelete}/>
        </React.Fragment>
    );
}

export default FastCompany
