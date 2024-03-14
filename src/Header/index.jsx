import {Link} from 'react-router-dom'
import {IoCartOutline} from 'react-icons/io5'

const Header = () => (
  <nav className="flex justify-between p-2 mx-auto border-b border-black">
    <h3 className="font-bold text-lg">UNI Resto Cafe</h3>
    <Link to="order" className="flex gap-2 items-center">
      <p className="text-sm">My Orders</p>
      <div className="relative">
        <IoCartOutline className="text-lg" />
        <span className="absolute -top-2.5 -right-1.5 flex justify-center items-center text-[10px] rounded-full bg-orange-400 px-1">
          0
        </span>
      </div>
    </Link>
  </nav>
)
export default Header
