import React from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticted } from '../auth/helper'
import Base from '../core/Base'

const AdminDashbosrd = () => {
  const { name, email, role } = isAuthenticted().user
  const adminLeftSide = () => {
    return (
      <div className='card'>
        <h4 className='card-header bg-dark text-white'>Admin Navigation</h4>
        <ul className='list-group'>
          <li className='list-group-item'>
            <Link to='/admin/create/category' className='nav-link text-success'>
              Create Category
            </Link>
          </li>
          <li className='list-group-item'>
            <Link to='/admin/categories' className='nav-link text-success'>
              Manage Category
            </Link>
          </li>
          <li className='list-group-item'>
            <Link to='/admin/create/product' className='nav-link text-success'>
              Create Products
            </Link>
          </li>
          <li className='list-group-item'>
            <Link to='/admin/products' className='nav-link text-success'>
              Manage Products
            </Link>
          </li>
          <li className='list-group-item'>
            <Link to='/admin/orders' className='nav-link text-success'>
              Manage Orders
            </Link>
          </li>
        </ul>
      </div>
    )
  }
  const adminRightSide = () => {
    return (
      <div className='card mb-4'>
        <h4 className='card-header'>Admin Information</h4>
        <ul className='list-group'>
          <li className='list-group-item'>
            <span className='badge badge-success mr-2'>Name :</span> {name}
          </li>
          <li className='list-group-item'>
            <span className='badge badge-success mr-2'>Email :</span> {email}
          </li>
          <li className='list-group-item'>
            <span className='badge badge-danger'>Admin Area</span>
          </li>
        </ul>
      </div>
    )
  }
  return (
    <Base
      title='Welcome to Admin Area'
      description='Manage all products'
      className='container bg-success p-4'
    >
      <div className='row'>
        <div className='col-sm-6 col-md-6 col-3'>{adminLeftSide()}</div>
        <div className='col'>{adminRightSide()}</div>
      </div>
    </Base>
  )
}

export default AdminDashbosrd
