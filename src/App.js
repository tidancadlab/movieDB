import {Redirect, Route, Switch} from 'react-router-dom'
import Home from './component/Home'
import NotFound from './component/NotFound'
import ProtectedRoute from './ProtectedRoute'
import TopRated from './component/top_rated'
import Upcoming from './component/upcoming'
import SearchedMovies from './component/searchedMovie'
import MovieDetails from './component/movie_details'
import './index.css'

const App = () => (
  <div className='relative bg-black max-w-5xl mx-auto min-h-screen flex flex-col'>
    <Switch>
      <ProtectedRoute exact path='/' component={Home} />
      <ProtectedRoute exact path='/top-rated' component={TopRated} />
      <ProtectedRoute exact path='/upcoming' component={Upcoming} />
      <ProtectedRoute exact path='/search' component={SearchedMovies} />
      <ProtectedRoute
        exact
        path='/movie-details/:id'
        component={MovieDetails}
      />
      <Route exact path='/not-found' component={NotFound} />
      <Redirect to='/not-found' />
    </Switch>
  </div>
)

export default App
