import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'
import {IoCartOutline} from 'react-icons/io5'
import {HiLogout} from 'react-icons/hi'
import context from '../../Context'

const Header = ({history}) => {
  const onLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <context.Consumer>
      {data => {
        const {cartList} = data
        const total = cartList.length
        return (
          <nav className='flex justify-between p-2 mx-auto border-b border-black w-full gap-4'>
            <h3 className='font-bold text-lg grow'>
              <Link to='/'>UNI Resto Cafe</Link>
            </h3>
            <button type='button' data-testid='cart'>
              <Link to='/cart' className='flex gap-2 items-center'>
                <p className='text-sm hidden sm:inline'>My Orders</p>
                <div className='relative'>
                  <IoCartOutline className='text-xl' />
                  <p className='absolute -top-2.5 -right-1.5 px-1 flex justify-center items-center text-[12px] rounded-full bg-orange-600 text-white leading-4'>
                    {total}
                  </p>
                </div>
              </Link>
            </button>
            <button
              onClick={onLogout}
              type='button'
              aria-labelledby='logout'
              className='text-xl sm:hidden'
            >
              <HiLogout />
            </button>
            <button
              onClick={onLogout}
              type='button'
              aria-labelledby='logout'
              className='bg-black text-sm px-2 py-0.5 rounded-md text-white hidden sm:inline'
            >
              Logout
            </button>
          </nav>
        )
      }}
    </context.Consumer>
  )
}
export default withRouter(Header)
