import React, { useState, useEffect } from 'react'
import { isAuthenticted } from '../auth/helper'
import { API } from '../backend'
import '../style.css'
import Base from './Base'
import Card from './Card'
import { loadCart } from './helper/cartHelper'
import { getProducts } from './helper/coreapicalls'
import StripeCheckout from './StripeCheckout'

const Cart = () => {
  const [products, setProducts] = useState([])
  const [reload, setReload] = useState(false)

  useEffect(() => {
    setProducts(loadCart())
  }, [reload])

  return (
    <Base title='Cart Page' description='Ready to checkout'>
      <div className='row text-center'>
        <div className='col-sm-12'>
          <div className='row'>
            {products.map((product, index) => {
              return (
                <div
                  key={index}
                  className='col-md-4 col-sm-6 d-flex align-items-stretch mb-4'
                >
                  <Card
                    key={index}
                    product={product}
                    addtoCart={false}
                    removeFromCart={true}
                    setReload={setReload}
                    reload={reload}
                  />
                </div>
              )
            })}
          </div>
        </div>

        <div className='col'>
          <StripeCheckout products={products} setReload={setReload} />
        </div>
      </div>
    </Base>
  )
}
export default Cart
