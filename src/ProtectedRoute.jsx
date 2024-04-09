import {Route} from 'react-router-dom'
import Header from './component/Header'

const ProtectedRoute = props => (
  <>
    <Header />
    <Route {...props} />
  </>
)

export default ProtectedRoute
