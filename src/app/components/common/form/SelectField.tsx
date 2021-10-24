import React, { BaseSyntheticEvent, ForwardedRef } from 'react'
import { SelectFormControl } from '../../types'

const SelectField = React.forwardRef(({ items, label, name, error, value, onChange }: SelectFormControl, ref:ForwardedRef<any>) => {
    const handleChange = (event: BaseSyntheticEvent) => {
        onChange(event, items.find(item => item._id === event.target.value))
    }
    return (
        <div className="mb-4">
            <label htmlFor={name} className="form-label">{label}</label>
            <select className={error ? 'form-select is-invalid' : 'form-select'}
                name={name}
                id={name}
                ref={ref}
                value={value?._id}
                onChange={handleChange}>
                <option value="">Choose...</option>
                {items.map(item => <option key={item._id} value={item._id}>{item.name}</option>)}
            </select>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    )
})

export default SelectField
