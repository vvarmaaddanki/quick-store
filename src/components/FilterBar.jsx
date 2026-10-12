export default function FilterBar({
  categories,
  category,
  onCategory,
  sort,
  onSort,
}) {
  return (
    <div className="filter-bar">
      <select
        value={category}
        onChange={(e) => onCategory(e.target.value)}
      >
        <option value="">All categories</option>
        {categories.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <select
        value={sort}
        onChange={(e) => onSort(e.target.value)}
      >
        <option value="">Default order</option>
        <option value="price-asc">Price: low to high</option>
        <option value="price-desc">Price: high to low</option>
        <option value="rating-desc">Rating: high to low</option>
      </select>
    </div>
  );
}