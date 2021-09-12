import React from 'react'
import { GroupListProps } from './types'
import { ProfessionDTO, ProfessionMap, Professions } from '../api/fake.api/user.api.model'

const GroupList = ({ items, onItemSelect, selectedItem }: GroupListProps) => {
    const isArray = Array.isArray(items)
    let list

    if (isArray) {
        list = items && (items as ProfessionDTO[]).map(item =>
            <li className={'list-group-item ' + (item === selectedItem ? 'active' : '')}
                key={item._id}
                onClick={() => onItemSelect(item)}
                role="button">
                {item.name}
            </li>)
    } else {
        const typedItems = items as ProfessionMap<ProfessionDTO>
        list = items && (Object.keys(items) as Professions[]).map(prof =>
            <li className={'list-group-item ' + ((typedItems[prof]) === selectedItem ? 'active' : '')}
                key={typedItems[prof]._id}
                onClick={() => onItemSelect(typedItems[prof])}
                role="button">
                {typedItems[prof].name}
            </li>)
    }
    return (
        <React.Fragment>
            <ul className="list-group">{list}</ul>
        </React.Fragment>
    )
}

export default GroupList
