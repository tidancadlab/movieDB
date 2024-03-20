import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import {AiFillCloseCircle} from 'react-icons/ai'

import CartContext from '../../Context'
import './index.css'

const CartItem = props => (
  <CartContext.Consumer>
    {value => {
      const {
        removeCartItem,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
      } = value
      const {cartItemDetails} = props
      const {
        dish_id: id,
        dish_name: title,
        dish_description: brand,
        quantity,
        dish_price: price,
        dish_image: imageUrl,
        dish_currency: currency,
      } = cartItemDetails
      const onRemoveCartItem = () => {
        removeCartItem(id)
      }
      // TODO: Update the functionality to increment and decrement quantity of the cart item

      return (
        <li className='cart-item border border-black !rounded-lg mx-4'>
          <img
            className='cart-product-image self-start'
            src={imageUrl}
            alt={title}
          />
          <div className='cart-item-details-container !items-center'>
            <div className='cart-product-title-brand-container'>
              <p className='cart-product-title !text-black'>{title}</p>
              <p className='cart-product-brand'>{brand}</p>
            </div>
            <div className='cart-quantity-container bg-green-400 h-fit my-2 gap-4 text-xs sm:text-base !inline-flex justify-between grow-0 rounded-full'>
              <button
                data-testid='minus'
                aria-label='Decrement CartItem Quantity'
                type='button'
                className='sm:h-8 h-6 rounded-l-full pl-4'
                onClick={() => decrementCartItemQuantity(id)}
              >
                <BsDashSquare />
              </button>
              <p className='cart-quantity text-black'>{quantity}</p>
              <button
                data-testid='plus'
                aria-label='Increment CartItem Quantity'
                type='button'
                className='sm:h-8 h-6 rounded-r-full pr-4'
                onClick={() => incrementCartItemQuantity(id)}
              >
                <BsPlusSquare />
              </button>
            </div>
            <div className='total-price-remove-container'>
              <p className='cart-total-price'>
                {currency} {price * quantity}/-
              </p>
              <button
                data-testid='remove'
                aria-label='Remove Cart Item'
                className='remove-button !bg-black !text-white px-3 py-1 rounded-lg'
                type='button'
                onClick={onRemoveCartItem}
              >
                Remove
              </button>
            </div>
          </div>
          <button
            aria-label='Remove Cart Item'
            className='delete-button'
            type='button'
            onClick={onRemoveCartItem}
          >
            <AiFillCloseCircle size={20} />
          </button>
        </li>
      )
    }}
  </CartContext.Consumer>
)

export default CartItem
