const Menu = ({items, onCategory, category}) => (
  <div className="border-b">
    <ul
      role="radiogroup"
      aria-required
      aria-labelledby="abc"
      className="flex gap-2 overflow-y-auto scrollbar no-scrollbar"
    >
      {items.map((v, i) => (
        <button
          key={v.menu_category_id}
          type="button"
          onClick={() => onCategory(i)}
        >
          <li
            data-active={i === category}
            className="px-4 py-2 data-[active=true]:text-secondary border-b-2 border-transparent data-[active=true]:border-secondary hover:text-secondary/60"
          >
            <p
              htmlFor={v.menu_category_id}
              className="text-nowrap peer-checked:border-b-2 peer-checked:text-primary"
            >
              {v.menu_category}
            </p>
          </li>
        </button>
      ))}
    </ul>
  </div>
)
export default Menu
