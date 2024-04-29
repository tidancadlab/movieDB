import React, {useEffect} from 'react'
import {useLocation, withRouter, Redirect} from 'react-router-dom'

function useQuery() {
  const {search} = useLocation()
  return React.useMemo(() => new URLSearchParams(search), [search])
}

const RangeButton = ({items, queryParams, className, history}) => {
  const movie = useQuery().get('movie')
  if (items.totalPages <= 1) {
    return null
  }
  useEffect(() => {
    if (!movie) {
      history.push({
        search: `${movie ? `movie=${movie}&` : ''}page=1`,
      })
    }
  }, [])
  return (
    <div
      className={`flex gap-3 justify-center sm:justify-end items-center my-4 mx-10 text-white ${className}`}
    >
      <button
        aria-labelledby="btn"
        className="outline rounded p-2 hover:bg-white hover:text-black disabled:hover:bg-black disabled:hover:text-white disabled:opacity-15"
        type="button"
        disabled={items.page <= 1}
        onClick={() =>
          history.push({
            search: `${movie ? `movie=${movie}&` : ''}page=${items.page - 1}`,
          })
        }
      >
        Prev
      </button>
      <p aria-current={parseInt(queryParams) === items.page} className="px-2">
        {items.page}
      </p>
      <button
        aria-labelledby="btn"
        className="outline rounded p-2 hover:bg-white hover:text-black disabled:hover:bg-black disabled:hover:text-white disabled:opacity-15"
        type="button"
        disabled={
          items.page >= (items.totalPages > 500 ? 500 : items.totalPages)
        }
        onClick={() =>
          history.push({
            search: `${movie ? `movie=${movie}&` : ''}page=${items.page + 1}`,
          })
        }
      >
        Next
      </button>
    </div>
  )
}
export default withRouter(RangeButton)
