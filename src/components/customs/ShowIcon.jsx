import React from 'react'
import icons from '../../config/icons'

export default function ShowIcon(props) {
    const { name, size } = props
    if(!(name in icons)) {
        return null
    }
    
    const Icon = icons[name]
    return (
        <Icon size={size || 16} {...props} />
    )
}
