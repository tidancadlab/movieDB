import {BsStar} from 'react-icons/bs'
import DATA from '../../config'

const MovieDetail = ({movieData}) => (
  <div
    className='relative flex flex-col justify-end w-full sm:min-h-[calc(100vh+110px)] min-h-[calc(100vh)] sm:h-[62rem] bg-cover bg-center bg-black/50 bg-blend-overlay -mt-[150px]'
    style={{
      backgroundImage: `url("${
        DATA.images.secure_base_url +
        DATA.images.backdrop_sizes[3] +
        movieData.backdrop_path
      }")`,
    }}
  >
    <div className='bg-gradient-to-t from-black from-0% to-100% text-white px-10 pb-6'>
      <img
      className='w-44 sm:w-80'
        src={
          DATA.images.secure_base_url +
          DATA.images.poster_sizes[3] +
          movieData.poster_path
        }
        alt=''
      />
      <h1 className='text-3xl sm:text-5xl font-semibold '>{movieData.title}</h1>
      <h2 className='text-xl mb-2 line-clamp-1'>{movieData.tagline}</h2>
      {movieData.adult && <span>18+</span>}
      <p className='text-gray-100 mb-1 line-clamp-4'>{movieData.overview}</p>
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
)

export default MovieDetail
