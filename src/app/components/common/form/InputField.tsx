import React, { BaseSyntheticEvent } from 'react'
import { InputFormControl } from '../../types'

const InputField = ({ label, type = 'text', name, error, value, onChange }: InputFormControl) => {
    const handleInput = (event: BaseSyntheticEvent) => onChange(event.target.value)
    return (
        <div className="mb-4">
            <label className="form-label"
                htmlFor={name}>
                {label}
            </label>
            <input className={error ? 'form-control is-invalid' : 'form-control'}
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={handleInput}/>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    )
}

export default InputField
