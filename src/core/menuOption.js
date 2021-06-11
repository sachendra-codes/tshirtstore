import React from 'react'
import { Link } from 'react-router-dom'
const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: '#2ecc72' }
  } else {
    return { color: '#FFFFFF' }
  }
}
const MenuOption = (props) => {
  return (
    <li className='nav-item'>
      <Link
        style={currentTab(props.history, props.path)}
        className='nav-link'
        to={props.path}
      >
        {props.option}
      </Link>
    </li>
  )
}

export default MenuOption
