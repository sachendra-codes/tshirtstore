import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router'
import { addItemToCart, removeItemFromCart } from './helper/cartHelper'
import Imagehelper from './helper/Imagehelper'

const Card = ({
  product,
  addtoCart = true,
  removeFromCart = false,
  setReload = (f) => f,
  //function(f) {return f}
  reload = undefined,
}) => {
  const [redirect, setRedirect] = useState(false)
  const cartTitle = product ? product.name : 'Not Available'
  const cartDescription = product
    ? product.description
    : 'Currently not in stock'
  const cartPrice = product ? product.price : '0.00'

  const addToCart = () => {
    addItemToCart(product, () => setRedirect(true))
  }
  const getARedirect = (redirect) => {
    if (redirect) {
      return <Redirect to='/cart' />
    }
  }
  const showAddToCart = (addtoCart) => {
    return (
      addtoCart && (
        <div className='col-12'>
          <button
            onClick={addToCart}
            className='btn btn-block btn-outline-success mt-2 mb-2'
          >
            Add to Cart
          </button>
        </div>
      )
    )
  }
  const showRemoveFromCart = (removeFromCart) => {
    return (
      removeFromCart && (
        <div className='col-12'>
          <button
            onClick={() => {
              removeItemFromCart(product._id)
              setReload(!reload)
            }}
            className='btn btn-block btn-outline-danger mt-2 mb-2'
          >
            Remove from cart
          </button>
        </div>
      )
    )
  }
  return (
    <div className='card text-white bg-dark border border-info '>
      <div className='card-header lead'>{cartTitle}</div>
      <div className='card-body'>
        {getARedirect(redirect)}
        <Imagehelper product={product} />
        <p className='lead bg-success font-weight-normal text-wrap'>
          {cartDescription}
        </p>
        <p className='btn btn-success rounded  btn-sm px-4'> ${cartPrice}</p>
        <div className='row'>
          {showAddToCart(addtoCart)}
          {showRemoveFromCart(removeFromCart)}
        </div>
      </div>
    </div>
  )
}

export default Card
