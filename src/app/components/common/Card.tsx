import React, { PropsWithChildren } from 'react'

const Card = ({ children }: PropsWithChildren<unknown>) => (
    <div className="card mb-3" style={{ width: '100%' }}>
        <div className="card-body d-flex flex-column justify-content-center text-center">
            {children}
        </div>
    </div>
)

export default Card
