import React, { BaseSyntheticEvent } from 'react'
import { SelectFormControl } from '../../types'

const SelectField = ({ items, label, name, error, value, onChange }: SelectFormControl) => {
    const defValue = value?._id || ''
    const handleChange = (event: BaseSyntheticEvent) => onChange(items.find(item => item._id === event.target.value))
    return (
        <div className="mb-4">
            <label htmlFor={name} className="form-label">{label}</label>
            <select className={error ? 'form-select is-invalid' : 'form-select'}
                name={name}
                id={name}
                value={defValue}
                onChange={handleChange}>
                <option value="">Choose...</option>
                {items.map(item => <option key={item._id} value={item._id}>{item.name}</option>)}
            </select>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    )
}

export default SelectField
