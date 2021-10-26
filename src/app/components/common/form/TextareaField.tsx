import React, { ForwardedRef } from 'react'
import { TextAreaFormControl } from '../../types'

const TextareaField = ({ label, name, error, placeholder, value, onChange }: TextAreaFormControl) => {
    return (
        <div className="mb-4">
            <label htmlFor={name} className="form-label">{label}</label>
            <textarea className={error ? 'form-control is-invalid' : 'form-control'}
                id={name} name={name} value={value} onChange={onChange}
                placeholder={placeholder} />
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    )
}

export default TextareaField
