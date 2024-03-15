import {useState} from 'react'
import Header from './Header'
import './index.css'
import Home from './Home'
import CartContext from './Context'

const App = () => {
  const [cart, setCart] = useState([])
  const addCart = data => {
    const isItemAvailable = cart.find(v => v.dish_id === data.dish_id)
    if (typeof isItemAvailable === 'object') {
      setCart(previous =>
        previous.map(v =>
          v.dish_id === data.dish_id ? {...v, quantity: data.quantity} : {...v},
        ),
      )
    } else {
      setCart(previous => [...previous, data])
    }
  }
  return (
    <CartContext.Provider value={{cartItem: cart, addCart}}>
      <div className="max-w-7xl mx-auto">
        <Header />
        <Home />
      </div>
    </CartContext.Provider>
  )
}

export default App
