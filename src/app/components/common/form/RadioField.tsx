import React, { useEffect } from 'react'
import { RadioFormControl } from '../../types'

const RadioField = ({ items, label, name, value, onChange, registry }: RadioFormControl) => {
    useEffect(() => {
        if (registry) {
            registry(name)
        }
    }, [])

    return (
        <div className="mb-4" >
            <label className="form-label" style={{ display: 'block' }}>{label}</label>
            {items.map((item, idx) => (
                <div className="form-check form-check-inline" key={item._id}>
                    <input className="form-check-input"
                        type="radio"
                        name={name}
                        id={item._id}
                        checked={value ? item._id === value : idx === 0}
                        value={item._id}
                        onChange={(e) => onChange(e, item._id)}/>
                    <label className="form-check-label" htmlFor={item._id}>{item.name}</label>
                </div>
            ))}
        </div>
    )
}

export default RadioField
