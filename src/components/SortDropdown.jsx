function SortDropdown({ sortBy, onSortChange }) {
  return (
    <div className="sort-dropdown">
      <label htmlFor="sort-select">Sort by: </label>
      <select
        id="sort-select"
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        className="sort-select"
      >
        <option value="default">Default</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
        <option value="rating">Highest Rating</option>
        <option value="name">Name: A to Z</option>
      </select>
    </div>
  );
}

export default SortDropdown;
