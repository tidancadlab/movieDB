import React, {useEffect, useState} from 'react'
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
    <nav className='flex flex-wrap min-[380px]:flex-row justify-between p-2 text-white w-full gap-2 z-50'>
      <h3 className='font-bold text-xl md:text-3xl text-start min-[380px]:text-center'>
        <Link className='font-mono pr-1 py-2' to='/'>
          movieDB
        </Link>
      </h3>
      <div className=' order-3 sm:order-2 grow justify-evenly sm:justify-end gap-1 font-bold flex *:px-2 md:*:px-4 *:py-1.5'>
        {tabes.map(v => (
          <button
            key={v.id}
            type='button'
            aria-current={isCurrentTab(v.url)}
            onClick={() => history.push(v.url)}
            className=' hover:text-black hover:bg-white/50 text-white aria-[current=true]:bg-white aria-[current=true]:text-black rounded'
          >
            {v.title}
          </button>
        ))}
      </div>
      <form
        onSubmit={e => {
          e.preventDefault()
        }}
        className='outline outline-black outline-2 rounded-md flex order-2 md:grow'
      >
        <input
          type='text'
          placeholder='Search'
          className='outline-none py-1 px-3 bg-gray-900 md:grow w-48 sm:w-40'
          spellCheck={false}
          onChange={onSearchMovie}
          value={movieName}
        />
        <button
          aria-labelledby='search'
          disabled={movieName.length <= 0}
          type='submit'
          className='bg-orange-300 disabled:bg-orange-500/50 px-4 text-black flex items-center justify-center group'
          onClick={() => history.push(`/search?movie=${movieName}`)}
        >
          Search
        </button>
      </form>
    </nav>
  )
}
export default withRouter(Header)
