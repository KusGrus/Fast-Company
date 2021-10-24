import React, { PropsWithChildren } from 'react'

const Form = ({ children, title }: PropsWithChildren<{ title: string }>) => (
    <div className="container mt-5">
        <div className="row">
            <div className="col-md-6 offset-md-3 shadow p-4">
                <h3 className="mb-4">{title}</h3>
                {children}
            </div>
        </div>
    </div>
)

export default Form
