import {Link} from 'react-router-dom/cjs/react-router-dom.min'
import {BsStar} from 'react-icons/bs'
import DATA from '../../config'

const Card = ({item}) => (
  <div
    className={`relative flex flex-col outline outline-white rounded-md aspect-[235/352]
    m-2 shadow w-full
    min-[380px]:w-[calc(100vw/2_-26px)] 
    sm:w-[calc(100vw/3_-22px)] 
    md:w-[calc(100vw/4_-22px)] 
    lg:w-[calc(1024px/5_-16px)]
    group`}
  >
    <img
      src={`${DATA.images.secure_base_url}${DATA.images.poster_sizes[4]}${item.poster_path}`}
      alt={item.title}
      className='group-hover:blur-sm ease-in-out duration-150 text-white'
    />
    <div
      className={`absolute bottom-0 group-hover:text-center rounded-b-lg
    bg-gradient-to-t from-black group-hover:h-full from-0% to-100% 
    text-white p-1 flex flex-col group-hover:items-center group-hover:justify-center w-full ease-in-out duration-200`}
    >
      <h1 className='font-bold line-clamp-1 group-hover:text-3xl group-hover:line-clamp-3 mx-1'>
        {item.title}
      </h1>
    </div>
    <button
      type='button'
      className='absolute hidden group-hover:flex group-hover:bottom-0 group-hover:w-full'
    >
      <Link
        to={`/movie-details/${item.id}`}
        className='py-1.5 rounded-b-md bg-blue-500 w-full'
      >
        View Details
      </Link>
    </button>
    <div className='absolute flex items-center gap-1 top-1 right-1 px-2 py-1 rounded bg-white/70 group-hover:bg-white text-black text-xs'>
      <BsStar /> <p>{item.vote_average?.toFixed(1)}</p>
    </div>
  </div>
)

export default Card
