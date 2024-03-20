import {Link} from 'react-router-dom/cjs/react-router-dom.min'
import CartContext from '../../Context'
import CartItem from '../CartItem'

const Cart = props => {
  console.log(props)
  return (
    <CartContext.Consumer>
      {value => {
        const {cartList, removeAllCartItems} = value
        const showEmptyView = cartList.length === 0
        return showEmptyView ? (
          <div className='grow flex flex-col items-center justify-center gap-4'>
            <img
              src='https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png'
              className='w-1/2 max-w-72'
              alt='cart empty'
            />
            <h1 className='cart-empty-heading'>Your Cart Is Empty</h1>
            <Link to='/'>
              <button
                type='button'
                className='bg-blue-500 text-white px-4 py-1 rounded-lg'
              >
                Shop Now
              </button>
            </Link>
          </div>
        ) : (
          <>
            <div className='flex justify-between px-4 py-2'>
              <h1 className='font-bold'>My Cart</h1>
              <button
                type='button'
                onClick={removeAllCartItems}
                className='text-sm text-white bg-blue-600 px-4 py-2 rounded-lg'
              >
                Remove All
              </button>
            </div>
            <ul className='grow'>
              {cartList.map(v => (
                <CartItem cartItemDetails={v} key={v.dish_id} />
              ))}
            </ul>
          </>
        )
      }}
    </CartContext.Consumer>
  )
}
export default Cart
