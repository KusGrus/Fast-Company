import React, { ForwardedRef, BaseSyntheticEvent } from 'react'
import { SelectFormControl } from '../../types'

const SelectField = React.forwardRef(({ items, label, name, error, value, onChange }: SelectFormControl, ref:ForwardedRef<any>) => (
    <div className="mb-4">
        <label htmlFor={name} className="form-label">{label}</label>
        <select className={error ? 'form-select is-invalid' : 'form-select'}
            name={name}
            id={name}
            ref={ref}
            value={value?._id}
            onChange={onChange}>
            <option value="">Choose...</option>
            {items.map(item => <option key={item._id} value={item._id}>{item.name}</option>)}
        </select>
        {error && <div className="invalid-feedback">{error}</div>}
    </div>
))

export default SelectField
