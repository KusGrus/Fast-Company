import React from 'react'
import { GroupListProps } from './types'

const GroupList = (props: GroupListProps) => {
    return (
        <React.Fragment>
            <ul className="list-group">
                <li className="list-group-item">An item</li>
                <li className="list-group-item">A second item</li>
                <li className="list-group-item">A third item</li>
                <li className="list-group-item">A fourth item</li>
                <li className="list-group-item">And a fifth one</li>
            </ul>
        </React.Fragment>
    )
}

export default GroupList
