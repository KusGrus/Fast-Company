import React, { ForwardedRef, useEffect } from 'react'
import { RadioFormControl } from '../../types'

const RadioField = React.forwardRef(({ items, label, name, value, onChange, instance }: RadioFormControl, ref:ForwardedRef<any>) => {
    useEffect(() => {
        if (instance) {
            onChange('gender', value || items[0])
        }
    }, [])
    return (
        <div className="mb-4" ref={ref}>
            <label className="form-label" style={{ display: 'block' }}>{label}</label>
            {items.map((item, idx) => (
                <div className="form-check form-check-inline" key={item._id}>
                    <input className="form-check-input"
                        type="radio"
                        name={name}
                        id={item._id}
                        defaultChecked={value ? item._id === value._id : idx === 0}
                        value={item._id}
                        onChange={(e) => onChange(e, item._id)}/>
                    <label className="form-check-label" htmlFor={item._id}>{item.name}</label>
                </div>
            ))}
        </div>
    )
})

export default RadioField
