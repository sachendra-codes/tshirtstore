import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { signout, isAuthenticted } from '../auth/helper'
import MenuOption from './menuOption'

//if you will see we are not passing props manually to menu component when we are calling it from
//base.js the props is coming from withRouter().
// withRouter is a higher order component that will pass closest route's match,
// current location, and history props to the wrapped component whenever it renders.
const Menu = (props) => {
  return (
    <nav className='navbar navbar-expand-md bg-dark navbar-dark'>
      <button
        className='navbar-toggler'
        type='button'
        data-toggle='collapse'
        data-target='#collapsibleNavbar'
      >
        <span className='navbar-toggler-icon'></span>
      </button>
      <div className='collapse navbar-collapse ' id='collapsibleNavbar'>
        <ul className='bg-dark navbar-nav'>
          <MenuOption history={props.history} path='/' option='Home' />
          <MenuOption history={props.history} path='/cart' option='Cart' />
          <MenuOption
            history={props.history}
            path='/user/dashboard'
            option='Dashboard'
          />
          {isAuthenticted() && isAuthenticted().user.role === 1 && (
            <MenuOption
              history={props.history}
              path='/admin/dashboard'
              option='A.Dashboard'
            />
          )}

          {!isAuthenticted() && (
            <MenuOption
              history={props.history}
              path='/signup'
              option='Signup'
            />
          )}
          {!isAuthenticted() && (
            <MenuOption
              history={props.history}
              path='/signin'
              option='Signin'
            />
          )}
          {isAuthenticted() && (
            <li className='nav-item'>
              <span
                onClick={() => {
                  signout(() => {
                    props.history.push('/')
                  })
                }}
              >
                <Link className='nav-link' style={{ color: '#FFFFFF' }}>
                  Signout
                </Link>
              </span>
            </li>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default withRouter(Menu)
