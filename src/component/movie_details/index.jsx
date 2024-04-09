import {useLocation, useParams} from 'react-router-dom/cjs/react-router-dom'
import {BsStar} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import React, {useEffect, useState} from 'react'
import DATA from '../../config'

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
    <div className='grow bg-black'>
      <>
        {apiStatus === apiStatusConstants.success ? (
          <>
            <div
              className='relative flex flex-col justify-end w-full h-[48rem] bg-cover bg-center bg-black/50 bg-blend-overlay -mt-[150px]'
              style={{
                backgroundImage: `url("${
                  DATA.images.secure_base_url +
                  DATA.images.backdrop_sizes[2] +
                  movieData.backdrop_path
                }")`,
              }}
            >
              <div className='bg-gradient-to-t from-black from-0% to-100% text-white px-10 pb-6'>
                <img
                  src={
                    DATA.images.secure_base_url +
                    DATA.images.poster_sizes[1] +
                    movieData.poster_path
                  }
                  alt=''
                />
                <h1 className='text-4xl font-semibold '>{movieData.title}</h1>
                <h2 className='text-xl mb-2'>{movieData.tagline}</h2>
                {movieData.adult && <span>18+</span>}
                <p className='text-gray-100 mb-1 line-clamp-4'>
                  {movieData.overview}
                </p>
                <p className='text-sm text-gray-400'>
                  {movieData.genres?.map(v => v.name).join(', ')}
                </p>
                <p className='text-sm text-gray-400'>
                  {movieData.spoken_languages?.map(v => v.name).join(', ')}
                </p>
                <p className='flex gap-1.5 items-center text-sm text-gray-400'>
                  <BsStar /> {movieData.vote_average} ({movieData.vote_count})
                </p>
              </div>
            </div>
            <div className='text-white px-10'>
              <h1 className='text-2xl mb-4'>Cast</h1>
              <div className='flex flex-wrap justify-between gap-4'>
                {crewCast.cast.map((v, i) => (
                  <div className='flex flex-col text-center max-w-28 w-28'>
                    <img
                      style={{outlineColor: `${colors[i % 10]}`}}
                      className='rounded-full aspect-square outline'
                      src={
                        v.profile_path
                          ? DATA.images.secure_base_url +
                            DATA.images.profile_sizes[1] +
                            v.profile_path
                          : '/img/undraw_Pic_profile.png'
                      }
                      alt={v.original_name}
                    />
                    <p className='line-clamp-1'>{v.original_name}</p>
                    <p className='line-clamp-1 text-sm text-gray-300'>
                      {v.character}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className='text-white px-10 mt-10'>
              <h1 className='text-2xl mb-8'>Crew</h1>
              <div className='flex flex-wrap justify-between gap-4'>
                {crewCast.crew.map((v, i) => (
                  <div className='flex flex-col text-center max-w-28 w-28'>
                    <img
                      style={{outlineColor: `${colors[i % 10]}`}}
                      className='rounded-full aspect-square outline'
                      src={
                        v.profile_path
                          ? DATA.images.secure_base_url +
                            DATA.images.profile_sizes[1] +
                            v.profile_path
                          : '/img/undraw_Pic_profile.png'
                      }
                      alt={v.original_name}
                    />
                    <p className='line-clamp-1'>{v.original_name}</p>
                    <p className='line-clamp-1 text-sm text-gray-200'>
                      {v.job}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <GettingData />
        )}
      </>
    </div>
  )
}
export default MovieDetails
