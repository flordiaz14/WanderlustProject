import React from 'react'

const Map = ({url, data}) => {
  return (
    <div className='map'>
        <iframe title='hola' src={url}   loading="lazy" ></iframe>
    </div>
  )
}

export default Map