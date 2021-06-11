import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticted } from '../auth/helper'
import Base from '../core/Base'
import { createProduct, getCategories } from './helper/adminapicall'
import Axios from 'axios'
const AddProduct = () => {
  const { user, token } = isAuthenticted()
  const [values, setValues] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    productImage: '',
    categories: [],
    category: '',
    loading: false,
    error: '',
    createdProduct: '',
    getaRedirect: false,
    formData: '',
  })
  const {
    name,
    description,
    price,
    stock,
    productImage,
    categories,
    category,
    loading,
    error,
    createdProduct,
    getaRedirect,
    formData,
  } = values

  const preload = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.errors[0] })
      } else {
        setValues({ ...values, categories: data, formData: new FormData() })
      }
    })
  }

  useEffect(() => {
    preload()
  }, [])

  const onSubmit = (event) => {
    event.preventDefault()
    setValues({ ...values, error: '', loading: true })
    if (productImage) {
      createProduct(user._id, token, formData)
        .then((data) => {
          if (data.errors) {
            setValues({ ...values, error: data.errors.msg })
          } else {
            setValues({
              ...values,
              name: '',
              description: '',
              price: '',
              productImage: '',
              stock: '',
              loading: false,
              createdProduct: data.name,
            })
          }
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      setValues({ ...values, error: 'Upload Image' })
    }
  }
  const handleChange = (name) => (event) => {
    const value =
      name === 'productImage' ? event.target.files[0] : event.target.value
    formData.set(name, value)
    setValues({ ...values, [name]: value })
  }

  const successMessage = () => (
    <div
      className='alert alert-success mt-3'
      style={{ display: createdProduct ? '' : 'none' }}
    >
      <h4 className='text-success'>{createdProduct} created successfully</h4>
    </div>
  )

  const warningMeassage = () => (
    <div
      className='alert alert-danger mt-3'
      style={{ display: error ? '' : 'none' }}
    >
      <h4 className='text-danger'>{error}</h4>
    </div>
  )

  const createProductForm = () => (
    <form>
      <span>Post photo</span>
      <div className='form-group'>
        <label className='btn btn-block btn-success'>
          <input
            onChange={handleChange('productImage')}
            type='file'
            name='productImage'
            accept='.jpg'
            placeholder='choose a file'
          />
        </label>
      </div>
      <div className='form-group'>
        <input
          onChange={handleChange('name')}
          name='name'
          className='form-control'
          placeholder='Name'
          value={name}
        />
      </div>
      <div className='form-group'>
        <textarea
          onChange={handleChange('description')}
          name='description'
          className='form-control'
          placeholder='Description'
          value={description}
        />
      </div>
      <div className='form-group'>
        <input
          onChange={handleChange('price')}
          type='number'
          className='form-control'
          placeholder='Price'
          value={price}
        />
      </div>
      <div className='form-group'>
        <select
          onChange={handleChange('category')}
          className='form-control'
          placeholder='Category'
        >
          <option>Select</option>
          {categories &&
            categories.map((cate, index) => (
              <option key={index} value={cate._id}>
                {cate.name}
              </option>
            ))}
        </select>
      </div>
      <div className='form-group'>
        <input
          onChange={handleChange('stock')}
          type='number'
          className='form-control'
          placeholder='Quantity'
          value={stock}
        />
      </div>

      <button type='submit' onClick={onSubmit} className='btn btn-danger mb-2'>
        Create Product
      </button>
    </form>
  )
  return (
    <Base
      title='Add Product Here'
      description='Welcome To The Manufacture Store'
      className='container bg-success p-4'
    >
      <Link to='/admin/dashboard' className='btn btn-md btn-danger mb-3'>
        Admin Home
      </Link>
      <div className='row bg-dark text-white rounded'>
        <div className='col-md-8 offset-md-2'>
          {successMessage()}
          {warningMeassage()}
          {createProductForm()}
        </div>
      </div>
    </Base>
  )
}

export default AddProduct
