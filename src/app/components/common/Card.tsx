import React, { PropsWithChildren } from 'react'

const Card = ({ children, center = true }: PropsWithChildren<{ center?: boolean }>) => (
    <div className="card mb-3" style={{ width: '100%', maxWidth: '700px' }}>
        <div className={center ? 'card-body d-flex flex-column justify-content-center text-center' : 'card-body'}>
            {children}
        </div>
    </div>
)

export default Card
