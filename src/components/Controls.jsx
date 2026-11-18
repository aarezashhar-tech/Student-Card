import { useRef, useEffect } from "react";
import { SearchIcon, CloseIcon, GridIcon, ListIcon } from "./Icons";
import { DEPARTMENTS } from "../data/students";
import "./Controls.css";

export default function Controls({
  searchQuery,
  onSearchChange,
  selectedDept,
  onDeptChange,
  selectedTier,
  onTierChange,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  students,
  onResetFilters
}) {
  const searchInputRef = useRef(null);

  // Keyboard shortcut '/' to focus search input
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "/" && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Department counts
  const getDeptCount = (dept) => {
    if (dept === "All Departments") return students.length;
    return students.filter((s) => s.dept === dept).length;
  };

  const hasActiveFilters = searchQuery.trim() !== "" || selectedDept !== "All Departments" || selectedTier !== "all";

  return (
    <div className="controls-wrapper">
      {/* Top Search & Layout Toggle Bar */}
      <div className="controls-main-bar">
        {/* Search Bar Input */}
        <div className="search-bar-box">
          <SearchIcon size={18} className="search-icon" />
          <input
            ref={searchInputRef}
            type="text"
            className="search-input"
            placeholder="Search by student name, roll number, or department..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Search students"
          />
          {searchQuery ? (
            <button
              type="button"
              className="search-clear-btn"
              onClick={() => onSearchChange("")}
              title="Clear search"
            >
              <CloseIcon size={16} />
            </button>
          ) : (
            <div className="search-shortcut" title="Press / on keyboard to focus search">
              <kbd>/</kbd>
            </div>
          )}
        </div>

        {/* Sort & Performance Filters */}
        <div className="controls-filters-group">
          {/* CGPA Performance Tier */}
          <div className="select-wrap">
            <select
              value={selectedTier}
              onChange={(e) => onTierChange(e.target.value)}
              aria-label="Filter by CGPA Tier"
              className="custom-select"
            >
              <option value="all">All Academic Grades</option>
              <option value="honors">Dean's List (≥ 9.0)</option>
              <option value="distinction">Distinction (≥ 8.0)</option>
              <option value="first">First Class (≥ 7.0)</option>
            </select>
          </div>

          {/* Sort Selector */}
          <div className="select-wrap">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              aria-label="Sort students"
              className="custom-select"
            >
              <option value="cgpa-desc">CGPA: Highest First</option>
              <option value="cgpa-asc">CGPA: Lowest First</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="roll-asc">Roll No: Ascending</option>
            </select>
          </div>

          {/* View Mode Toggle (Grid vs Table) */}
          <div className="view-toggle-wrap">
            <button
              type="button"
              className={`view-toggle-btn ${viewMode === "grid" ? "active" : ""}`}
              onClick={() => onViewModeChange("grid")}
              title="Interactive 3D ID Cards Grid View"
            >
              <GridIcon size={17} />
              <span>Cards</span>
            </button>
            <button
              type="button"
              className={`view-toggle-btn ${viewMode === "table" ? "active" : ""}`}
              onClick={() => onViewModeChange("table")}
              title="Administrative Table View"
            >
              <ListIcon size={17} />
              <span>Table</span>
            </button>
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              className="btn-clear-filters"
              onClick={onResetFilters}
              title="Reset all active filters and search"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Department Filter Pills */}
      <div className="dept-pills-row">
        {DEPARTMENTS.map((dept) => {
          const count = getDeptCount(dept);
          const isSelected = selectedDept === dept;
          return (
            <button
              key={dept}
              type="button"
              className={`dept-pill-btn ${isSelected ? "active" : ""}`}
              onClick={() => onDeptChange(dept)}
            >
              <span>{dept}</span>
              <span className="dept-pill-count">{count}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
