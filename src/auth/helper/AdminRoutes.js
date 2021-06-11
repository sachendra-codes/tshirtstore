import react from 'react'
import { Route, Redirect } from 'react-router-dom'
import { isAuthenticted } from '.'
const AdminRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticted() && isAuthenticted().user.role === 1 ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/signin',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  )
}
export default AdminRoute
