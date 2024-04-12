import { BsArrowRight } from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Card from '../Card'
import RangeButtons from '../rangeButtons'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const CardContainer = ({apiStatus, items, queryParams, history}) => {
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
              onClick={history.push('/')}
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
    <div className=''>
      <>
        {apiStatus === apiStatusConstants.success ? (
          <>
            <h1 className='text-2xl flex items-center gap-3 font-semibold mb-6 mt-4 mx-4 text-white'>
              Popular Movies and Shows <BsArrowRight />
            </h1>
            <div
              className='grid 
              grid-cols-[repeat(auto-fill,90%)] 
              min-[380px]:grid-cols-[repeat(auto-fill,45%)] 
              sm:grid-cols-[repeat(auto-fill,30%)] 
              md:grid-cols-[repeat(auto-fill,23%)] 
              lg:grid-cols-[repeat(auto-fill,18%)] 
              justify-center w-full m-auto gap-4'
            >
              {items.results.map(v => (
                <Card key={v.id} item={v} />
              ))}
            </div>
            <RangeButtons
              className='grow'
              items={items}
              queryParams={queryParams}
            />
          </>
        ) : (
          <GettingData />
        )}
      </>
    </div>
  )
}

export default CardContainer
