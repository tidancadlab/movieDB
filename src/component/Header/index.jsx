import React, {useEffect, useState} from 'react'
import {BsSearch} from 'react-icons/bs'
import {Link, withRouter, matchPath} from 'react-router-dom'
import {useLocation} from 'react-router-dom/cjs/react-router-dom.min'

function useQuery() {
  const {search} = useLocation()

  return React.useMemo(() => new URLSearchParams(search), [search])
}

const tabes = [
  {
    id: 1,
    title: 'Popular',
    url: '/',
  },
  {
    id: 2,
    title: 'Top Rated',
    url: '/top-rated',
  },
  {
    id: 3,
    title: 'Upcoming',
    url: '/upcoming',
  },
]

const Header = ({history}) => {
  const queryParams = useQuery()
  const search = queryParams.get('movie') || ''
  const [movieName, setMovieName] = useState(search)
  const isCurrentTab = path =>
    matchPath(history.location.pathname, {
      path,
      exact: true,
      strict: true,
    })?.isExact
  const onSearchMovie = e => {
    setMovieName(e.target.value)
  }
  useEffect(() => {
    setMovieName(search)
  }, [search])
  return (
    <nav className='flex flex-wrap min-[380px]:flex-row justify-between p-2 text-white w-full gap-4 z-50'>
      <h3 className='font-bold text-3xl text-start min-[380px]:text-center'>
        <Link className='font-mono px-6 py-2' to='/'>
          movieDB
        </Link>
      </h3>
      <div className=' order-3 sm:order-2 grow flex justify-evenly sm:justify-end gap-8 *:font-semibold *:text-gray-400'>
        {tabes.map(v => (
          <button
            key={v.id}
            type='button'
            aria-current={isCurrentTab(v.url)}
            className='hover:text-white aria-[current=true]:text-white'
          >
            <Link to={v.url} className='flex gap-2 items-center'>
              {v.title}
            </Link>
          </button>
        ))}
      </div>
      <form
        onSubmit={e => {
          e.preventDefault()
        }}
        className='outline outline-black outline-2 rounded-md flex sm:order-3 grow'
      >
        <input
          type='text'
          placeholder='Search'
          className='outline-none py-1 px-3 bg-gray-900 grow'
          spellCheck={false}
          onChange={onSearchMovie}
          value={movieName}
        />
        <button
          aria-labelledby='search'
          disabled={movieName.length <= 0}
          type='submit'
          className='bg-black px-4 text-white flex items-center justify-center group'
          onClick={() => history.push(`/search?movie=${movieName}`)}
        >
          <BsSearch />
        </button>
      </form>
    </nav>
  )
}
export default withRouter(Header)
