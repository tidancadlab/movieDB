import React from 'react'

const CartContext = React.createContext({
  cartItem: [],
  addCart: () => {},
})

export default CartContext
