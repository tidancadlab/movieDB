import Loader from 'react-loader-spinner'
import {useEffect, useState} from 'react'
import Menu from '../Menu'
import Card from '../Card'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
const Home = () => {
  const [items, setItems] = useState([])
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const [category, setCategory] = useState(0)

  const onCategory = i => {
    setCategory(i)
  }
  const onData = async () => {
    setApiStatus(apiStatusConstants.inProgress)
    try {
      const response = await fetch(
        'https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc',
      )
      if (response.ok) {
        const data = await response.json()
        setItems(data)
        setApiStatus(apiStatusConstants.success)
      } else {
        setApiStatus(apiStatusConstants.failure)
      }
    } catch (error) {
      setApiStatus(apiStatusConstants.failure)
      console.error(error)
    }
  }
  useEffect(onData, [])

  const GettingData = () =>
    apiStatus === apiStatusConstants.inProgress ? (
      <div className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <Loader color="orange" type="TailSpin" />
      </div>
    ) : (
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-7xl font-semibold text-indigo-600">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Data not found
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
            Sorry, we couldn’t find the data you’re looking for.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <button
              onClick={onData}
              type="button"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Reload
            </button>
          </div>
        </div>
      </main>
    )

  return (
    <div>
      {items.length > 0 ? (
        <>
          <Menu
            items={items[0].table_menu_list}
            onCategory={onCategory}
            category={category}
          />
          <div>
            {items[0].table_menu_list[category].category_dishes.map(v => (
              <Card key={v.dish_id} item={v} />
            ))}
          </div>
        </>
      ) : (
        <GettingData />
      )}
    </div>
  )
}
export default Home
