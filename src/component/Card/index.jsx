import {withRouter} from 'react-router-dom/cjs/react-router-dom.min'
import {BsStar} from 'react-icons/bs'
import DATA from '../../config'

const Card = ({item, history}) => (
  <div
    className={`relative flex flex-col outline outline-white rounded-md aspect-[235/352] shadow
     group select-none`}
  >
    <img
      src={`${DATA.images.secure_base_url}${DATA.images.poster_sizes[4]}${item.poster_path}`}
      alt={item.title}
      className="group-hover:blur-sm ease-in-out duration-150 text-white"
    />
    <div
      className={`absolute bottom-0 group-hover:text-center rounded-b-lg
    bg-gradient-to-t from-black group-hover:h-full from-0% to-100% 
    text-white p-1 flex flex-col group-hover:items-center group-hover:justify-center w-full ease-in-out duration-200`}
    >
      <h1 className="font-bold sm:text-[120%] line-clamp-1 group-hover:text-3xl group-hover:line-clamp-3 mx-1">
        {item.title}
      </h1>
    </div>
    <div className="absolute hidden group-hover:flex group-hover:bottom-0 group-hover:w-full">
      <button
        onClick={() => history.push(`/movie-details/${item.id}`)}
        type="button"
        className="py-1.5 rounded-b-md bg-white hover:bg-blue-600 w-full text-[110%] font-bold"
      >
        View Details
      </button>
    </div>
    <div className="absolute flex items-center gap-1 top-1 right-1 px-2 py-1 rounded bg-white/70 group-hover:bg-white text-black text-xs">
      <BsStar /> <p>{item.vote_average?.toFixed(1)}</p>
    </div>
  </div>
)

export default withRouter(Card)
