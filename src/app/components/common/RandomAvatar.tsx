import React from 'react'
import utils from '../../common/utils'

const RandomAvatar = React.memo(({ src, width = 150 }: {width?: number, src?: string}) => (
    <img
        src={src || utils.generateAvatar()}
        className="rounded-circle shadow-1-strong me-3"
        alt="avatar" width={width}
    />
))

export default RandomAvatar
