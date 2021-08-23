import React, {ReactNode} from 'react'
import {FastCompanyProps, FastCompanyState} from "./types"
import {CompanyState} from "./CompanyState"
import {CompanyItem} from "./CompanyItem"

export class FastCompany extends React.Component<FastCompanyProps, FastCompanyState> {

    constructor(props: any) {
        super(props)
        this.state = {users: this.props.users}
        this.handleDelete = this.handleDelete.bind(this)
    }

    handleDelete(id: string): any {
        this.setState({users: this.state.users.filter(user => user._id !== id)});
    }

    handleClick(): any {
        this.setState({users: this.props.users});
    }

    render(): ReactNode {
        const users = this.state.users;
        return (
            <React.Fragment>
                <div className="flex-container">
                    <CompanyState count={users.length}/>
                    <button onClick={() => this.handleClick()} type="button" className="btn btn-primary">Reset</button>
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
                    {users.map(user => <CompanyItem key={user._id} user={user} onDelete={this.handleDelete}/>)}
                    </tbody>
                </table>

            </React.Fragment>
        );
    }
}
