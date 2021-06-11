//https://betterprogramming.pub/stripe-api-tutorial-with-react-and-node-js-1c8f2020a825
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticted } from '../auth/helper'
import { cartEmpty, loadCart } from './helper/cartHelper'
import StripeCheckoutButton from 'react-stripe-checkout'
import { createOrder } from './helper/orderHelper'
import { API } from '../backend'

const StripeCheckout = ({
  products,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    error: '',
    address: '',
  })

  const token = isAuthenticted() && isAuthenticted().token
  const userId = isAuthenticted() && isAuthenticted().user._id

  const getFinalAmount = () => {
    let amount = 0
    products.map((p) => {
      amount = amount + p.price
    })
    return amount
  }
  const makePayment = (token) => {
    console.log('hii')
    console.log(token)
    const body = {
      token,
      products,
    }
    const headers = {
      'Content-Type': 'application/json',
    }
    return fetch(`${API}/stripepayment`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log(response)
      })
      .catch((err) => console.log(err))
  }
  const showStripeButton = () => {
    return isAuthenticted() ? (
      <StripeCheckoutButton
        stripeKey={process.env.REACT_APP_PUBLIC_KEY}
        token={makePayment}
        amount={getFinalAmount() * 100}
        name='Buy tshirts'
        shippingAddress
        billingAddress
      >
        <button className='btn btn-success'>Pay with stripe</button>
      </StripeCheckoutButton>
    ) : (
      <Link to='/signin'>
        <button className='btn btn-warning'>Signin</button>
      </Link>
    )
  }
  return (
    <div>
      <h3 className='text-white'>Stripe Checkout ${getFinalAmount()}</h3>
      {showStripeButton()}
    </div>
  )
}

export default StripeCheckout
