import {Route, Switch} from 'react-router-dom/cjs/react-router-dom.min'
import Header from './Header'
import './index.css'
import Home from './Home'

const App = () => (
  <div className="max-w-7xl mx-auto">
    <Header />
    <Switch>
      <Route exact path="/*" component={Home} />
    </Switch>
  </div>
)

export default App
