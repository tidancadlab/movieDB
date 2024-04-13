import {useLocation} from 'react-router-dom'
import React, {useEffect, useState} from 'react'
import CardContainer from '../subComponent/cardContainer'

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
const SearchedMovies = () => {
  const [items, setItems] = useState({results: [], totalPages: 0, page: 0})
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const queryParams = useQuery()
  const movieName = queryParams.get('movie') || ''
  const pageNo = queryParams.get('page') || 1
  const onData = async () => {
    setApiStatus(apiStatusConstants.inProgress)
    const API_KEY = '71463801e71b647594aee8224b542825'
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${movieName}&page=${pageNo}`,
      )
      if (response.ok) {
        const {results, total_pages: totalPages, page} = await response.json()
        setItems({results, totalPages, page})
        setApiStatus(apiStatusConstants.success)
      } else {
        setApiStatus(apiStatusConstants.failure)
      }
    } catch (error) {
      setApiStatus(apiStatusConstants.failure)
    }
  }
  useEffect(onData, [movieName, pageNo])

  return (
    <CardContainer
      apiStatus={apiStatus}
      items={items}
      queryParams={queryParams}
    />
  )
}
export default SearchedMovies
