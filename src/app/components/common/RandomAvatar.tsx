import React from 'react'

const RandomAvatar = ({ width = 150 }: {width?: number}) => (
    <img
        src={`https://avatars.dicebear.com/api/avataaars/${(
            Math.random() + 1
        )
            .toString(36)
            .substring(7)}.svg`}
        className="rounded-circle shadow-1-strong me-3"
        alt="avatar" width={width}
    />
)

export default RandomAvatar
