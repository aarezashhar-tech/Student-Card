import { useRef, useEffect } from "react";
import { SearchIcon, CloseIcon, SortIcon, PlusIcon, HeartIcon } from "./Icons";
import "./SearchBar.css";

export default function SearchBar({
  query = "",
  onQueryChange = () => {},
  selectedDept = "All",
  onDeptChange = () => {},
  departments = [],
  sortBy = "cgpa",
  onSortChange = () => {},
  likedCount = 0,
  onOpenAddModal = () => {}
}) {
  const inputRef = useRef(null);

  // Keyboard shortcut '/' to focus search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "/" && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="search-dock">
      {/* Top Search, Sort & Add Row */}
      <div className="dock-top-row">
        <div className="search-field">
          <SearchIcon size={16} className="search-icon" />
          <input
            ref={inputRef}
            type="search"
            className="search-input"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search by student name, roll number, or department..."
            aria-label="Search student records"
          />
          {query ? (
            <button
              type="button"
              className="search-clear-btn"
              onClick={() => onQueryChange("")}
              aria-label="Clear search input"
              title="Clear search"
            >
              <CloseIcon size={14} />
            </button>
          ) : (
            <kbd className="search-kbd" title="Press '/' to quickly search">
              /
            </kbd>
          )}
        </div>

        {/* Sort Selector */}
        <div className="sort-box">
          <SortIcon size={14} className="sort-icon" />
          <select
            className="sort-select"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            aria-label="Sort student records"
          >
            <option value="cgpa">Top CGPA First</option>
            <option value="name">Name (A — Z)</option>
            <option value="roll">Roll Number</option>
          </select>
        </div>

        {/* Add Student Button */}
        <button
          type="button"
          className="add-student-btn"
          onClick={onOpenAddModal}
          title="Enroll new student record"
        >
          <PlusIcon size={14} />
          <span>Add Student</span>
        </button>
      </div>

      {/* Department & Favorites Filter Rail */}
      <div className="dept-filter-rail" role="tablist" aria-label="Filter by department or favorites">
        {departments &&
          departments.map((dept) => {
            const isSelected = selectedDept === dept;
            return (
              <button
                key={dept}
                type="button"
                role="tab"
                aria-selected={isSelected}
                className={`filter-chip ${isSelected ? "active" : ""}`}
                onClick={() => onDeptChange(dept)}
              >
                {dept}
              </button>
            );
          })}

        {/* Liked / Favorites Filter Chip */}
        <button
          type="button"
          role="tab"
          aria-selected={selectedDept === "Favorites"}
          className={`filter-chip favorites-chip ${selectedDept === "Favorites" ? "active" : ""}`}
          onClick={() => onDeptChange(selectedDept === "Favorites" ? "All" : "Favorites")}
          title="Filter only favorited student cards"
        >
          <HeartIcon size={13} filled={likedCount > 0} />
          <span>Favorites</span>
          {likedCount > 0 && <span className="chip-badge">{likedCount}</span>}
        </button>
      </div>
    </div>
  );
}
