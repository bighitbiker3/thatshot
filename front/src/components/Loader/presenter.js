import React from 'react'

export default ({loader, header}) => {
  console.log('this is loadeerrrr', loader, header);
  return (
    // TODO: I don't like this double ternary
    <i style={ loader ? header.active ? {top: '10%', border: '.5em solid #FFF'} : {top: '10%'} : null } className='loader'></i>
  )
}
