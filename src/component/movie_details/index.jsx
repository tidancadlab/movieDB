import {useLocation, useParams} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import React, {useEffect, useState} from 'react'
import Crew from './crew'
import Cast from './cast'
import MovieDetail from './details'

const colors = [
  '#FF5733',
  '#33FF57',
  '#5733FF',
  '#FFFF33',
  '#33FFFF',
  '#FF33FF',
  '#FF5733',
  '#33FF57',
  '#5733FF',
  '#ff3399',
  '#FFFF33',
]

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
const MovieDetails = () => {
  const {id} = useParams()
  const [movieData, setMovieData] = useState({})
  const [crewCast, setCrewCast] = useState({})
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const queryParams = useQuery().get('page') || 1
  const onData = async () => {
    setApiStatus(apiStatusConstants.inProgress)
    const API_KEY = '71463801e71b647594aee8224b542825'
    try {
      const response = await Promise.all([
        fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`,
        ),
        fetch(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`,
        ),
      ])
      // eslint-disable-next-line consistent-return
      const [movieDetails, crewAndCast] = await Promise.all(
        response.map(v => v.json()),
      )
      setMovieData(movieDetails)
      setCrewCast(crewAndCast)
      setApiStatus(apiStatusConstants.success)
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
              Home
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
    <div className='grow bg-black'>
      {apiStatus === apiStatusConstants.success ? (
        <>
          <MovieDetail movieData={movieData} />
          <Cast colors={colors} crewCast={crewCast} />
          <Crew colors={colors} crewCast={crewCast} />
        </>
      ) : (
        <GettingData />
      )}
    </div>
  )
}
export default MovieDetails
