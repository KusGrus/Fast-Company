import React, { ForwardedRef } from 'react'
import { InputFormControl } from '../../types'

const InputField = React.forwardRef(({ label, type = 'text', name, error, value, onChange }: InputFormControl, ref:ForwardedRef<any>) => (
    <div className="mb-4">
        <label className="form-label"
            htmlFor={name}>
            {label}
        </label>
        <input className={error ? 'form-control is-invalid' : 'form-control'}
            ref={ref}
            type={type}
            id={name}
            name={name}
            value={value || ''}
            onChange={onChange}/>
        {error && <div className="invalid-feedback">{error}</div>}
    </div>
))

export default InputField
