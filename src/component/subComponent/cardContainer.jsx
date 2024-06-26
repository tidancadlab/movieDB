import {withRouter} from 'react-router-dom/cjs/react-router-dom.min'
import {BsArrowRight} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Card from '../Card'
import RangeButtons from '../rangeButtons'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',

  internetError: 'INTERNET_ERROR',
}

const CardContainer = ({apiStatus, items, queryParams, history}) => {
  const GettingData = ({condition}) =>
    condition ? (
      <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-7xl font-semibold text-indigo-600">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
            Data not found
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-200">
            Sorry, we couldn’t find the data you’re looking for.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <button
              onClick={() => history.push('/')}
              type="button"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Home
            </button>
          </div>
        </div>
      </main>
    ) : (
      <div>
        {apiStatus === apiStatusConstants.internetError ? (
          <div className="min-h-[calc(100vh-52px)]  flex justify-center items-center">
            <div className="max-w-md bg-white shadow-md rounded p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                DNS Server Error
              </h2>
              <p className="text-gray-600">
                Sorry, we couldn&apos;t connect to the DNS server. Please Please
                set your DNS on &apos;8.8.8.8 or 8.8.4.4&apos; and try again.
              </p>
            </div>
          </div>
        ) : (
          <div className="min-h-[calc(100vh-52px)]  flex justify-center items-center place-items-center px-6 py-24 sm:py-32 lg:px-8">
            <Loader color="white" type="Grid" />
          </div>
        )}
      </div>
    )

  return (
    <div className="">
      <>
        {apiStatus === apiStatusConstants.success ? (
          items.results?.length > 0 ? (
            <>
              <h1 className="text-2xl flex items-center gap-3 font-semibold mb-6 mt-4 mx-4 text-white">
                Movies and Shows <BsArrowRight />
              </h1>
              <div
                className="grid 
              grid-cols-[repeat(auto-fill,90%)] 
              min-[380px]:grid-cols-[repeat(auto-fill,45%)] 
              sm:grid-cols-[repeat(auto-fill,30%)] 
              md:grid-cols-[repeat(auto-fill,23%)] 
              lg:grid-cols-[repeat(auto-fill,18%)] 
              justify-center w-full m-auto gap-4"
              >
                {items.results.map(v => (
                  <Card key={v.id} item={v} />
                ))}
              </div>
              <RangeButtons
                className="grow"
                items={items}
                queryParams={queryParams}
              />
            </>
          ) : (
            <GettingData condition={items.results?.length <= 0} />
          )
        ) : (
          <GettingData condition={apiStatus === apiStatusConstants.failure} />
        )}
      </>
    </div>
  )
}

export default withRouter(CardContainer)
