import StudentCard from "./StudentCard";
import { SearchIcon, RefreshIcon } from "./Icons";
import "./StudentList.css";

export default function StudentList({
  students = [],
  query = "",
  selectedDept = "All",
  likedIds = [],
  onToggleLike = () => {},
  onEdit = () => {},
  onDelete = () => {},
  onClear = () => {}
}) {
  if (students.length === 0) {
    const isLikedFilter = selectedDept === "Favorites";
    return (
      <div className="empty-state">
        <div className="empty-halo">
          <SearchIcon size={24} className="empty-icon" />
        </div>
        <h3 className="empty-title">
          {isLikedFilter ? "No favorited students yet" : "No student records found"}
        </h3>
        <p className="empty-text">
          {isLikedFilter
            ? "Click the heart icon on any student card to add them to your favorites."
            : query
            ? `No records matching "${query}" under ${selectedDept === "All" ? "any department" : selectedDept}.`
            : `No students currently registered under ${selectedDept}.`}
        </p>
        <button type="button" className="empty-reset-btn" onClick={onClear}>
          <RefreshIcon size={14} />
          <span>Reset Filters</span>
        </button>
      </div>
    );
  }

  const likedSet = new Set(likedIds);

  return (
    <section className="student-grid" aria-label="Student Identity Cards">
      {students.map((student) => {
        const key = student.id || student.roll;
        return (
          <StudentCard
            key={key}
            student={student}
            isLiked={likedSet.has(key)}
            onToggleLike={onToggleLike}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        );
      })}
    </section>
  );
}
