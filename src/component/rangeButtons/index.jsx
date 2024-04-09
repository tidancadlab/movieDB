import React from 'react'
import {BsFillCaretLeftFill, BsFillCaretRightFill} from 'react-icons/bs'
import {Link} from 'react-router-dom/cjs/react-router-dom'
import {useLocation} from 'react-router-dom/cjs/react-router-dom.min'

function useQuery() {
  const {search} = useLocation()

  return React.useMemo(() => new URLSearchParams(search), [search])
}

const RangeButton = ({items, queryParams, className}) => (
  <div
    className={`flex gap-3 justify-end items-center my-4 px-2 text-white ${className}`}
  >
    <button
      aria-labelledby='btn'
      className='flex justify-center items-center group'
      type='button'
      disabled={items.page <= 1}
    >
      <Link
        to={{
          search: `page=${items.page - 1}`,
        }}
        className='border-2 border-white rounded p-2 group-disabled:opacity-25 group-disabled:pointer-events-none'
      >
        <BsFillCaretLeftFill />
      </Link>
    </button>
    <p
      aria-current={parseInt(queryParams) === items.page}
      className='border-2 border-white rounded p-1 px-3 aria-[current=true]:bg-white aria-[current=true]:text-black'
    >
      {items.page}
    </p>
    <button
      aria-labelledby='btn'
      className='flex justify-center items-center group'
      type='button'
      disabled={items.page >= (items.totalPages > 500 ? 500 : items.totalPages)}
    >
      <Link
        to={{
          search: `${
            useQuery().get('movie') ? `movie=${  useQuery().get('movie')}&` : ''
          }page=${items.page + 1}`,
        }}
        className='border-2 border-white rounded p-2 group-disabled:opacity-25 group-disabled:pointer-events-none'
      >
        <BsFillCaretRightFill />
      </Link>
    </button>
  </div>
)
export default RangeButton
