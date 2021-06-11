import React from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticted } from '../auth/helper'
import Base from '../core/Base'

const AdminDashbosrd = () => {
  const { name, email, role } = isAuthenticted().user

  const userInfo = () => {
    console.log(isAuthenticted())
    return (
      <div className='card mb-4'>
        <h4 className='card-header'>User Information</h4>
        <ul className='list-group'>
          <li className='list-group-item'>
            <span className='badge badge-success mr-2'>Name :</span> {name}
          </li>
          <li className='list-group-item'>
            <span className='badge badge-success mr-2'>Email :</span> {email}
          </li>
          <li className='list-group-item'>
            <span className='badge badge-danger'>User Details</span>
          </li>
        </ul>
      </div>
    )
  }
  return (
    <Base
      title='Welcome to User Dashboard'
      description='User details'
      className='container bg-success p-4'
    >
      <div className='row'>
        <div className='col-12'>{userInfo()}</div>
      </div>
    </Base>
  )
}

export default AdminDashbosrd
