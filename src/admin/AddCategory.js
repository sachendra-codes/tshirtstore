import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticted } from '../auth/helper'
import Base from '../core/Base'
import { createCategory } from './helper/adminapicall'

const AddCategory = () => {
  const [name, setName] = useState('')
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)

  const { user, token } = isAuthenticted()
  const handleChange = (event) => {
    setError('')
    setName(event.target.value)
  }
  const onSubmit = (event) => {
    event.preventDefault()
    setError('')
    setSuccess(false)
    //Backend Request
    createCategory(user._id, token, { name }).then((data) => {
      if (data.errors) {
        setError(true)
      } else {
        setError('')
        setSuccess(true)
        setName('')
      }
    })
  }
  const successMessage = () => {
    if (success) {
      return <h4 className='text-success p-2'>Category created successfully</h4>
    }
  }

  const warningMessage = () => {
    if (error) {
      return <h4 className=' text-info'>Failed to create category</h4>
    }
  }

  const myCategoryForm = () => (
    <form>
      <div className='form-group'>
        <p className='lead'>Enter the category</p>
        <input
          type='text'
          onChange={handleChange}
          value={name}
          className='form-control my-3'
          autoFocus
          required
          placeholder='For Ex. Summer'
        />
        <div className='text-left'>
          <button onClick={onSubmit} className='btn btn-success'>
            Create Category
          </button>
          <Link className='btn btn-danger ml-2' to='/admin/dashboard'>
            Back
          </Link>
        </div>
      </div>
    </form>
  )
  return (
    <Base
      title='Create a category'
      description='Add a new category for new tshirts'
      className='container bg-success p-4'
    >
      <div className='row bg-white rounded'>
        <div className='col-md-8 offset-md-2'>
          {successMessage()}
          {warningMessage()}
          {myCategoryForm()}
        </div>
      </div>
    </Base>
  )
}

export default AddCategory
