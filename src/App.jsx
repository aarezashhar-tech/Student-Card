import { useState, useMemo, useEffect, useCallback } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import StudentList from "./components/StudentList";
import Footer from "./components/Footer";
import StudentModal from "./components/StudentModal";
import DeleteModal from "./components/DeleteModal";
import initialStudents, { DEPARTMENTS } from "./data/students";
import "./App.css";

const STORAGE_KEY_STUDENTS = "msajce_students_v1";
const STORAGE_KEY_LIKED = "msajce_liked_students_v1";

export default function App() {
  // Load persisted students or fallback to initial dataset
  const [students, setStudents] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_STUDENTS) || localStorage.getItem("apex_students_v1");
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return initialStudents;
  });

  // Load persisted liked student IDs
  const [likedIds, setLikedIds] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_LIKED) || localStorage.getItem("apex_liked_students_v1");
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return ["311824103001"]; // Aarez Ashhar liked by default
  });

  const [query, setQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState("All");
  const [sortBy, setSortBy] = useState("cgpa");

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  // Sync state to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_STUDENTS, JSON.stringify(students));
    } catch {
      // Ignore storage errors
    }
  }, [students]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_LIKED, JSON.stringify(likedIds));
    } catch {
      // Ignore storage errors
    }
  }, [likedIds]);

  // Track cursor position for the interactive ambient backdrop illumination
  const handlePointerMove = useCallback((e) => {
    document.documentElement.style.setProperty("--mouse-x", `${e.clientX}px`);
    document.documentElement.style.setProperty("--mouse-y", `${e.clientY}px`);
  }, []);

  useEffect(() => {
    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [handlePointerMove]);

  // Prepared department filter list
  const departments = useMemo(() => {
    const list = DEPARTMENTS ? [...DEPARTMENTS] : [];
    const normalized = list.map((d) => (d === "All Departments" ? "All" : d));
    return normalized.includes("All") ? normalized : ["All", ...normalized];
  }, []);

  // Filter & Sort calculation
  const filteredStudents = useMemo(() => {
    const q = query.trim().toLowerCase();
    const likedSet = new Set(likedIds);

    const filtered = students.filter((student) => {
      const studentKey = student.id || student.roll;

      if (selectedDept === "Favorites") {
        if (!likedSet.has(studentKey)) return false;
      } else if (selectedDept !== "All" && selectedDept !== "All Departments") {
        if (student.dept !== selectedDept) return false;
      }

      if (!q) return true;

      return (
        student.name?.toLowerCase().includes(q) ||
        student.roll?.toLowerCase().includes(q) ||
        student.dept?.toLowerCase().includes(q) ||
        student.year?.toLowerCase().includes(q)
      );
    });

    return filtered.sort((a, b) => {
      if (sortBy === "cgpa") {
        return (parseFloat(b.cgpa) || 0) - (parseFloat(a.cgpa) || 0);
      }
      if (sortBy === "name") {
        return (a.name || "").localeCompare(b.name || "");
      }
      if (sortBy === "roll") {
        return (a.roll || "").localeCompare(b.roll || "");
      }
      return 0;
    });
  }, [students, query, selectedDept, sortBy, likedIds]);

  // Handlers for Like, Add, Edit, Delete
  const handleToggleLike = useCallback((studentId) => {
    setLikedIds((prev) => {
      const exists = prev.includes(studentId);
      return exists ? prev.filter((id) => id !== studentId) : [...prev, studentId];
    });
  }, []);

  const handleOpenAddModal = useCallback(() => {
    setEditingStudent(null);
    setIsModalOpen(true);
  }, []);

  const handleOpenEditModal = useCallback((student) => {
    setEditingStudent(student);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setEditingStudent(null);
  }, []);

  const handleSaveStudent = useCallback(
    (studentData) => {
      if (editingStudent) {
        // Update existing record
        setStudents((prev) =>
          prev.map((s) => {
            const matchKey = (s.id || s.roll) === (editingStudent.id || editingStudent.roll);
            return matchKey ? { ...s, ...studentData } : s;
          })
        );
      } else {
        // Add new record at front of list
        setStudents((prev) => [studentData, ...prev]);
      }
      handleCloseModal();
    },
    [editingStudent, handleCloseModal]
  );

  const handleOpenDeleteModal = useCallback((student) => {
    setDeleteTarget(student);
  }, []);

  const handleCloseDeleteModal = useCallback(() => {
    setDeleteTarget(null);
  }, []);

  const handleConfirmDelete = useCallback((studentKey) => {
    setStudents((prev) => prev.filter((s) => (s.id || s.roll) !== studentKey));
    setLikedIds((prev) => prev.filter((id) => id !== studentKey));
    setDeleteTarget(null);
  }, []);

  const handleReset = useCallback(() => {
    setQuery("");
    setSelectedDept("All");
  }, []);

  return (
    <div className="canvas-root">
      {/* Underrated Ambient Reactive Aurora Canvas Layers */}
      <div className="ambient-spotlight" aria-hidden="true" />
      <div className="matrix-grid-overlay" aria-hidden="true" />
      <div className="ambient-drift-orb drift-1" aria-hidden="true" />
      <div className="ambient-drift-orb drift-2" aria-hidden="true" />

      {/* Main Responsive Viewport */}
      <div className="viewport">
        <Header
          totalCount={students.length}
          filteredCount={filteredStudents.length}
        />

        <main className="main-content">
          <SearchBar
            query={query}
            onQueryChange={setQuery}
            selectedDept={selectedDept}
            onDeptChange={setSelectedDept}
            departments={departments}
            sortBy={sortBy}
            onSortChange={setSortBy}
            likedCount={likedIds.length}
            onOpenAddModal={handleOpenAddModal}
          />

          <StudentList
            students={filteredStudents}
            query={query}
            selectedDept={selectedDept}
            likedIds={likedIds}
            onToggleLike={handleToggleLike}
            onEdit={handleOpenEditModal}
            onDelete={handleOpenDeleteModal}
            onClear={handleReset}
          />
        </main>

        <Footer />
      </div>

      {/* Add / Edit Student Dialog */}
      <StudentModal
        isOpen={isModalOpen}
        student={editingStudent}
        onClose={handleCloseModal}
        onSave={handleSaveStudent}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteModal
        isOpen={Boolean(deleteTarget)}
        student={deleteTarget}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
