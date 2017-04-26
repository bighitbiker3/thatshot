import React from 'react'

// TODO Check out CSS modules

const getStyle = (loader, header, style) => {
  if (style) return style
  if (loader) {
    if (header.active) {
      return { top: '10%', border: '.5em solid #FFF' }
    }
    return { top: '10%' }
  }
  return null
}

export default ({loader, header, style}) => {
  return (
    // TODO: I don't like this double ternary
    <i style={getStyle(loader, header, style)} className='loader'></i>
  )
}
