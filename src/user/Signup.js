import React, { useState } from 'react'
import Base from '../core/Base'
import { Link } from 'react-router-dom'
import { signup } from '../auth/helper'
const Signup = () => {
  const [values, setvalues] = useState({
    name: '',
    email: '',
    password: '',
    error: '',
    success: false,
  })
  const { name, email, password, error, success } = values
  //handleChange() is an higher order function that  will return a function. Suppose we pass 'name' as key
  //then it will return a function :
  // (event) =>{
  //   setValuse({...values, error: false, name : event.target.value})
  // }
  //Note that key is replaced with name

  //Note that to onChange attribute we give a function, we just write name of function,
  //so when we are calling handleChange function(onChange = handleChange) it will return a function
  //and that function will be assigned to on change
  const handleChange = (key) => (event) => {
    setvalues({ ...values, error: false, [key]: event.target.value })
  }

  const onSubmit = (event) => {
    console.log(event)
    //This will stop you from moving to different page
    event.preventDefault()
    setvalues({ ...values, error: false })
    //Check by printing the data
    signup({ name, email, password })
      .then((data) => {
        console.log(data)
        if (data.errors) {
          setvalues({ ...values, error: data.errors, success: false })
        } else {
          setvalues({
            ...values,
            name: '',
            email: '',
            password: '',
            error: '',
            success: true,
          })
        }
      })
      .catch(console.log('Error in signup'))
  }
  const signUpForm = () => {
    return (
      <div className='row'>
        <div className='col-md-6 offset-sm-3 text-left'>
          <form>
            <div className='form-group'>
              <label className='text-light'>Name</label>
              <input
                className='form-control'
                onChange={handleChange('name')}
                type='text'
                value={name}
              />
            </div>
            <div className='form-group'>
              <label className='text-light'>Email</label>
              <input
                className='form-control'
                onChange={handleChange('email')}
                type='email'
                value={email}
              />
            </div>
            <div className='form-group'>
              <label className='text-light'>Password</label>
              <input
                className='form-control'
                onChange={handleChange('password')}
                type='password'
                value={password}
              />
            </div>
            <button onClick={onSubmit} className='btn btn-success btn-block'>
              Submit
            </button>
          </form>
        </div>
      </div>
    )
  }
  const successMessage = () => {
    return (
      <div className='row'>
        <div className='col-md-6 offset-sm-3 text-left'>
          <div
            className='alert alert-success'
            style={{ display: success ? '' : 'none' }}
          >
            New account was created Successfully. Please{' '}
            <Link to='/signin'>Login Here</Link>
          </div>
        </div>
      </div>
    )
  }

  const errorMessage = () => {
    return (
      <div className='row'>
        <div className='col-md-6 offset-sm-3 text-left'>
          <div
            className='alert alert-danger'
            style={{ display: error ? '' : 'none' }}
          >
            {error}
          </div>
        </div>
      </div>
    )
  }
  return (
    <Base title='Sign Up page' description='A page for user signup!'>
      {successMessage()}
      {errorMessage()}
      {signUpForm()}
      {/* <p className='text-white text-center'>{JSON.stringify(values)}</p> */}
    </Base>
  )
}

export default Signup
