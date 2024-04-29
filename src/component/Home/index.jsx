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
  internetError: 'INTERNET_ERROR',
}
const Home = () => {
  const [items, setItems] = useState({results: [], totalPages: 0, page: 0})
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const queryParams = useQuery().get('page') || 1
  const onData = async () => {
    setApiStatus(apiStatusConstants.inProgress)

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=71463801e71b647594aee8224b542825&language=en-US&page=${queryParams}`,
      )
      if (response.ok) {
        const {results, total_pages: totalPages, page} = await response.json()
        setItems({results, totalPages, page})
        setApiStatus(apiStatusConstants.success)
      } else {
        setApiStatus(apiStatusConstants.failure)
      }
    } catch (error) {
      if (error.message === 'Failed to fetch') {
        setApiStatus(apiStatusConstants.internetError)
      } else {
        setApiStatus(apiStatusConstants.failure)
      }
    }
  }
  useEffect(onData, [queryParams])

  return (
    <CardContainer
      apiStatus={apiStatus}
      items={items}
      queryParams={queryParams}
    />
  )
}
export default Home
