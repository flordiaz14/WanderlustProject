import React from 'react'

const ProductImgGallery = ({images}) => {
  return (
    <div className='product--gallery'>
        {images?.map(e=><img className='product--gallery__img' key={e.id} src={e.url} alt={e.title}/>)}
    </div>
  )
}

export default ProductImgGallery