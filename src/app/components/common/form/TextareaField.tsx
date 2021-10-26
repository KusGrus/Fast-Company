import React, { BaseSyntheticEvent } from 'react'
import { TextAreaFormControl } from '../../types'

const TextareaField = ({ label, name, error, placeholder, value, onChange }: TextAreaFormControl) => {
    const defValue = value || ''
    const handleInput = (event: BaseSyntheticEvent) => onChange(event.target.value)
    return (
        <div className="mb-4">
            <label htmlFor={name} className="form-label">{label}</label>
            <textarea className={error ? 'form-control is-invalid' : 'form-control'}
                id={name} name={name} value={defValue} onChange={handleInput}
                placeholder={placeholder} />
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    )
}

export default TextareaField
