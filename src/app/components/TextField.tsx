import React from 'react'
import { TextFormControl } from './types'

const TextField = ({ label, type, name, value, onChange }: TextFormControl) => {
    return (
        <div>
            <label htmlFor={name}>{label}</label>
            <input type={type}
                id={name}
                name={name}
                value={value}
                onChange={onChange}/>
        </div>
    )
}

export default TextField
