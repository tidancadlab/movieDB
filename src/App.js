import {useState} from 'react'
import {
  Redirect,
  Route,
  Switch,
} from 'react-router-dom/cjs/react-router-dom.min'
import './index.css'
import Home from './component/Home'
import CartContext from './Context'
import Login from './component/Login'
import Cart from './component/Cart'
import NotFound from './component/NotFound'
import ProtectedRoute from './ProtectedRoute'

const App = () => {
  const [cartList, setCartList] = useState([])

  const addCartItem = product => {
    const isAlready = cartList.find(value => value.dish_id === product.dish_id)
    setCartList(prevState =>
      isAlready
        ? prevState.map(value => {
            if (value.dish_id === product.dish_id) {
              return {...value, quantity: value.quantity + product.quantity}
            }
            return value
          })
        : [...prevState, product],
    )
  }

  const removeAllCartItems = () => {
    setCartList([])
  }

  const removeCartItem = id => {
    setCartList(previous => previous.filter(value => id !== value.dish_id))
  }

  const incrementCartItemQuantity = id => {
    setCartList(prevState =>
      prevState.map(value => {
        if (value.dish_id === id) {
          return {...value, quantity: value.quantity + 1}
        }
        return value
      }),
    )
  }

  const decrementCartItemQuantity = id => {
    setCartList(prevState =>
      prevState.map(value => {
        if (value.dish_id === id) {
          if (value.quantity > 1) {
            return {...value, quantity: value.quantity - 1}
          }
          removeCartItem(id)
        }
        return value
      }),
    )
  }
  return (
    <CartContext.Provider
      value={{
        cartList,
        addCartItem,
        decrementCartItemQuantity,
        incrementCartItemQuantity,
        removeAllCartItems,
        removeCartItem,
      }}
    >
      <div className='max-w-7xl mx-auto min-h-screen flex flex-col'>
        <Switch>
          <Route exact path='/login' component={Login} />
          <ProtectedRoute exact path='/' component={Home} />
          <ProtectedRoute exact path='/cart' component={Cart} />
          <Route exact path='/not-found' component={NotFound} />
          <Redirect to='/not-found' />
        </Switch>
      </div>
    </CartContext.Provider>
  )
}

export default App
