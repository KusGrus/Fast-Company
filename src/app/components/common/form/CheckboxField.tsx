import React, { BaseSyntheticEvent } from 'react'
import { CheckBoxFormControl } from '../../types'

const CheckboxField = ({ label, name, error, value = false, onChange }: CheckBoxFormControl) => {
    const handleCheck = (event: BaseSyntheticEvent) => onChange(event.target.checked)
    return (
        <div className="mb-4">
            <div className="form-check">
                <input className={error ? 'form-check-input is-invalid' : 'form-check-input'}
                    name={name}
                    type="checkbox"
                    value=""
                    defaultChecked={value}
                    id={name}
                    onChange={handleCheck}/>
                <label className="form-check-label" htmlFor={name}>{label}</label>
                {error && <div className="invalid-feedback">{error}</div>}
            </div>
        </div>
    )
}

export default CheckboxField
