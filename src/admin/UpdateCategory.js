import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticted } from '../auth/helper'
import Base from '../core/Base'
import { getCategory, updateCategory } from './helper/adminapicall'

const UpdateCategory = ({ match }) => {
  const [name, setName] = useState('')
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)

  const { user, token } = isAuthenticted()
  const handleChange = (event) => {
    setError('')
    // console.log(event.target.value)
    setName(event.target.value)
  }
  const preload = (categoryId) => {
    getCategory(categoryId).then((data) => {
      if (data.error) {
        setError(true)
      } else {
        setName(data.name)
      }
    })
  }
  useEffect(() => {
    preload(match.params.categoryId)
  }, [])
  const onSubmit = (event) => {
    event.preventDefault()
    setError('')
    setSuccess(false)
    //Backend Request
    console.log(name)
    updateCategory(match.params.categoryId, user._id, token, { name }).then(
      (data) => {
        if (data.errors) {
          setError(true)
        } else {
          setError('')
          setSuccess(true)
          setName('')
        }
      }
    )
  }
  const successMessage = () => {
    if (success) {
      return <h4 className='text-success p-2'>Category updated successfully</h4>
    }
  }

  const warningMessage = () => {
    if (error) {
      return <h4 className=' text-info'>Failed to update category</h4>
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
            Update Category
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

export default UpdateCategory
