export default function SearchBar({ value = "", onChange = () => {} }) {
  return (
    <div className="search-bar-box">
      <input
        type="search"
        className="search-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by name, roll number or department"
        aria-label="Search students"
      />
      {value && (
        <button
          type="button"
          className="search-clear-btn"
          onClick={() => onChange("")}
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  );
}
