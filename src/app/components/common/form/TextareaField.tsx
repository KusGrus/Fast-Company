import React, { ForwardedRef } from 'react'
import { TextAreaFormControl } from '../../types'

const TextareaField = React.forwardRef(({ label, name, error, placeholder, value, onChange }: TextAreaFormControl, ref:ForwardedRef<any>) => {
    return (
        <div className="mb-4">
            <label htmlFor={name} className="form-label">{label}</label>
            <textarea className={error ? 'form-control is-invalid' : 'form-control'}
                ref={ref} id={name} name={name} value={value} onChange={onChange}
                placeholder={placeholder} />
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    )
})

export default TextareaField
