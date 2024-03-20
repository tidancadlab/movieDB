import Cookies from 'js-cookie'
import {Route, Redirect} from 'react-router-dom'
import Header from './component/Header'

const ProtectedRoute = props => {
  const token = Cookies.get('jwt_token')
  if (!token) {
    return <Redirect to='/login' />
  }
  return (
    <>
      <Header />
      <Route {...props} />
    </>
  )
}

export default ProtectedRoute
