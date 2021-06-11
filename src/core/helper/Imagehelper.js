import React from 'react'
import { API } from '../../backend'

const Imagehelper = ({ product }) => {
  const imageurl = product
    ? `${API}/product/photo/${product._id}`
    : 'https://assets.prestashop2.com/sites/default/files/styles/blog_750x320/public/blog/2019/10/banner_error_404.jpg?itok=eAS4swln'
  return (
    <div className='rounded border border-success p-2'>
      <img
        src={imageurl}
        alt='photo'
        style={{ maxHeight: '100%', maxWidth: '100%' }}
        className='mb-3 rounded'
      />
    </div>
  )
}

export default Imagehelper
