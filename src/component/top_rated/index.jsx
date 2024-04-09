import {useLocation} from 'react-router-dom/cjs/react-router-dom'
import Loader from 'react-loader-spinner'
import React, {useEffect, useState} from 'react'
import RangeButton from '../rangeButtons'
import Card from '../Card'

function useQuery() {
  const {search} = useLocation()

  return React.useMemo(() => new URLSearchParams(search), [search])
}

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
const TopRated = () => {
  const [items, setItems] = useState({results: [], totalPages: 0, page: 0})
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const queryParams = useQuery().get('page') || 1
  const onData = async () => {
    setApiStatus(apiStatusConstants.inProgress)

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=71463801e71b647594aee8224b542825&language=en-US&page=${queryParams}`,
      )
      console.log(response)
      if (response.ok) {
        const {results, total_pages: totalPages, page} = await response.json()
        setItems({results, totalPages, page})
        setApiStatus(apiStatusConstants.success)
      } else {
        setApiStatus(apiStatusConstants.failure)
      }
    } catch (error) {
      setApiStatus(apiStatusConstants.failure)
      console.error(error)
    }
  }
  useEffect(onData, [queryParams])

  const GettingData = () =>
    apiStatus === apiStatusConstants.failure ? (
      <main className='grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8'>
        <div className='text-center'>
          <p className='text-7xl font-semibold text-indigo-600'>404</p>
          <h1 className='mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl'>
            Data not found
          </h1>
          <p className='mt-6 text-base leading-7 text-gray-200'>
            Sorry, we couldn’t find the data you’re looking for.
          </p>
          <div className='mt-10 flex items-center justify-center gap-x-6'>
            <button
              onClick={onData}
              type='button'
              className='rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            >
              Reload
            </button>
          </div>
        </div>
      </main>
    ) : (
      <div className='grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8'>
        <Loader color='white' type='Grid' />
      </div>
    )

  return (
    <div className='m-auto'>
      <>
        {items.results.length > 0 ? (
          <>
            <h1 className='text-2xl font-semibold my-2'>
              Top Rated Movies and Shows
            </h1>
            <div className='flex flex-wrap mx-auto w-fit'>
              {items.results.map(v => (
                <Card key={v.id} item={v} />
              ))}
              <RangeButton
                className='grow'
                items={items}
                queryParams={queryParams}
              />
            </div>
          </>
        ) : (
          <GettingData />
        )}
      </>
    </div>
  )
}
export default TopRated
