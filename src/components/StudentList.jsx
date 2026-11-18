import StudentCard from "../Components/StudentCard";
import StudentTable from "./StudentTable";
import { SearchIcon, RefreshIcon } from "../Components/Icons";
import "./StudentList.css";

export default function StudentList({
  students = [],
  query = "",
  selectedDept = "All Departments",
  viewMode = "grid",
  onViewDetails,
  onEdit,
  onDelete,
  onClear,
  onCopyToast
}) {
  if (students.length === 0) {
    return (
      <div className="empty-state-card">
        <div className="empty-icon-halo">
          <SearchIcon size={36} className="empty-search-icon" />
        </div>
        <h3 className="empty-title">No matching student records found</h3>
        <p className="empty-desc">
          {query
            ? `We couldn't find any students matching "${query}" in ${selectedDept}.`
            : `There are currently no students registered under ${selectedDept}.`}
        </p>
        <button type="button" className="btn-empty-reset" onClick={onClear}>
          <RefreshIcon size={16} />
          <span>Clear Search & Filters</span>
        </button>
      </div>
    );
  }

  if (viewMode === "table") {
    return (
      <StudentTable
        students={students}
        onViewDetails={onViewDetails}
        onEdit={onEdit}
        onDelete={onDelete}
        onCopyToast={onCopyToast}
      />
    );
  }

  return (
    <section className="student-cards-grid" aria-label="Student Identity Cards">
      {students.map((student) => (
        <StudentCard
          key={student.roll}
          student={student}
          onViewDetails={onViewDetails}
          onEdit={onEdit}
          onDelete={onDelete}
          onCopyToast={onCopyToast}
        />
      ))}
    </section>
  );
}
