import {Link} from 'react-router-dom'
import {IoCartOutline} from 'react-icons/io5'
import context from '../Context'

const Header = () => (
  <context.Consumer>
    {data => {
      const {cartItem} = data
      const total = cartItem
        .map(v => v.quantity)
        .reduce((t, value) => t + value, 0)
      return (
        <nav className="flex justify-between p-2 mx-auto border-b border-black">
          <h3 className="font-bold text-lg">UNI Resto Cafe</h3>
          <Link to="order" className="flex gap-2 items-center">
            <p className="text-sm">My Orders</p>
            <div className="relative">
              <IoCartOutline className="text-lg" />
              <p className="absolute -top-2.5 -right-1.5 flex justify-center items-center text-[10px] rounded-full bg-orange-300 px-1">
                {total}
              </p>
            </div>
          </Link>
        </nav>
      )
    }}
  </context.Consumer>
)
export default Header
