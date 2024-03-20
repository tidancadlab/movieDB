const NotFound = ({history}) => (
  <main className='grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8'>
    <div className='text-center'>
      <p className='text-7xl font-semibold text-indigo-600'>404</p>
      <h1 className='mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl'>
        Page not found
      </h1>
      <p className='mt-6 text-base leading-7 text-gray-600'>
        Sorry, we couldn’t find the page you’re looking for.
      </p>
      <button
        type='button'
        onClick={() => history.replace('/')}
        className='mt-4 bg-[rgb(79_70_229)] text-white px-4 py-1.5 rounded-lg text-xl active:bg-[rgb(79_70_229/.5)]'
      >
        Home
      </button>
    </div>
  </main>
)

export default NotFound
