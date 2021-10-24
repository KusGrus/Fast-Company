import React, { ForwardedRef } from 'react'
import { CheckBoxFormControl } from '../../types'

const CheckboxField = React.forwardRef(({ label, name, error, value = false, onChange }: CheckBoxFormControl, ref:ForwardedRef<any>) => {
    return (
        <div className="mb-4">
            <div className="form-check">
                <input className={error ? 'form-check-input is-invalid' : 'form-check-input'}
                    ref={ref}
                    name={name}
                    type="checkbox"
                    value=""
                    defaultChecked={value}
                    id={name}
                    onChange={onChange}/>
                <label className="form-check-label" htmlFor={name}>{label}</label>
                {error && <div className="invalid-feedback">{error}</div>}
            </div>
        </div>
    )
})

export default CheckboxField
