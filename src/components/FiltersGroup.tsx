import React from 'react'
import { FiltersGroupProps } from './types'
import { ObjectDTO } from '../api/fake.api/user.api.model'

const FiltersGroup = ({ code, filters, selected, onSelect }: FiltersGroupProps) => {
    const isArray = Array.isArray(filters)
    let list
    if (isArray) {
        list = filters && (filters as ObjectDTO[]).map(item =>
            <li className={'list-group-item ' + (item._id === selected?._id ? 'active' : '')}
                key={item._id}
                onClick={() => onSelect(code, item)}
                role="button">
                {item.name}
            </li>)
    } else {
        const typedItems = filters as { [key: string]: ObjectDTO }
        list = filters && (Object.keys(filters) as string[]).map(prof =>
            <li className={'list-group-item ' + (typedItems[prof]._id === selected?._id ? 'active' : '')}
                key={typedItems[prof]._id}
                onClick={() => onSelect(code, typedItems[prof])}
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

export default FiltersGroup
