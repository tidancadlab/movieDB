import DATA from '../../config'

const Cast = ({crewCast, colors}) => (
  <div className="text-white px-10">
    <h1 className="text-5xl font-bold mb-8">Cast</h1>
    <div className="grid grid-cols-[repeat(auto-fill,21.3%)] sm:grid-cols-[repeat(auto-fill,14%)] lg:grid-cols-[repeat(auto-fill,10%)] gap-4 justify-between">
      {crewCast.cast.map((v, i) => (
        <div key={v.credit_id} className="flex flex-col text-center">
          {v.profile_path ? (
            <img
              style={{outlineColor: `${colors[i % colors.length]}`}}
              className="rounded-full aspect-square outline"
              src={
                DATA.images.secure_base_url +
                DATA.images.profile_sizes[1] +
                v.profile_path
              }
              alt={v.original_name}
            />
          ) : (
            <h1
              style={{background: `${colors[i % colors.length]}`}}
              className="rounded-full text-7xl flex items-center justify-center aspect-square outline text-black font-bold"
            >
              {v.original_name?.slice(0, 1)}
            </h1>
          )}
          <p className="line-clamp-1 text-[100%]">{v.original_name}</p>
          <p className="line-clamp-1 text-[90%] text-gray-300">{v.character}</p>
        </div>
      ))}
    </div>
  </div>
)
export default Cast
