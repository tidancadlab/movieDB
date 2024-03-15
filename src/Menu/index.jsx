const Menu = ({items, onCategory, category}) => (
  <div className="border-b">
    <div
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
          data-active={i === category}
          className="px-4 py-2 data-[active=true]:text-secondary border-b-2 border-transparent data-[active=true]:border-secondary text-nowrap"
        >
          {v.menu_category}
        </button>
      ))}
    </div>
  </div>
)
export default Menu
