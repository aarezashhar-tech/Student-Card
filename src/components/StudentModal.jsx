import { useState, useEffect } from "react";
import { CloseIcon, CheckIcon, PlusIcon } from "./Icons";
import { DEPARTMENTS, YEARS, BLOOD_GROUPS } from "../data/students";
import "./StudentModal.css";

const availableDepts = (DEPARTMENTS || []).filter((d) => d !== "All Departments" && d !== "All");

function StudentModalForm({ student, onClose, onSave }) {
  const isEditing = Boolean(student && (student.id || student.roll));

  const [formData, setFormData] = useState(() => {
    if (student) {
      return {
        name: student.name || "",
        roll: student.roll || student.id || "",
        dept: student.dept || availableDepts[0] || "AI & ML",
        year: student.year || "3rd Year",
        cgpa: student.cgpa !== undefined ? String(student.cgpa) : "8.50",
        bloodGroup: student.bloodGroup || "O+",
        avatar: student.avatar || ""
      };
    }
    return {
      name: "",
      roll: `31182410300${Math.floor(Math.random() * 90) + 10}`,
      dept: availableDepts[0] || "AI & ML",
      year: "3rd Year",
      cgpa: "8.50",
      bloodGroup: "O+",
      avatar: ""
    };
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, val) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Student name is required";
    if (!formData.roll.trim()) newErrors.roll = "Roll number is required";

    const cgpaNum = parseFloat(formData.cgpa);
    if (isNaN(cgpaNum) || cgpaNum < 0 || cgpaNum > 10) {
      newErrors.cgpa = "CGPA must be between 0.00 and 10.00";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave({
      id: student?.id || formData.roll,
      ...formData,
      cgpa: parseFloat(cgpaNum.toFixed(2))
    });
  };

  return (
    <div className="modal-container" onClick={(e) => e.stopPropagation()} tabIndex="-1">
      {/* Modal Header */}
      <div className="modal-header">
        <div className="modal-title-group">
          <h2 className="modal-title">
            {isEditing ? "Edit Student Record" : "Enroll New Student"}
          </h2>
          <p className="modal-subtitle">
            {isEditing
              ? "Update student academic credentials and identity details"
              : "Register student profile into the central directory"}
          </p>
        </div>
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close dialog"
        >
          <CloseIcon size={16} />
        </button>
      </div>

      {/* Modal Form */}
      <form onSubmit={handleSubmit} className="modal-form">
        <div className="form-grid">
          {/* Student Name */}
          <div className="form-group span-2">
            <label htmlFor="student-name" className="form-label">
              FULL NAME <span className="req">*</span>
            </label>
            <input
              id="student-name"
              type="text"
              className={`form-input ${errors.name ? "has-error" : ""}`}
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="e.g. Aarez Ashhar"
              autoFocus
            />
            {errors.name && <span className="field-error">{errors.name}</span>}
          </div>

          {/* Roll Number */}
          <div className="form-group">
            <label htmlFor="student-roll" className="form-label">
              ROLL NUMBER <span className="req">*</span>
            </label>
            <input
              id="student-roll"
              type="text"
              className={`form-input font-mono ${errors.roll ? "has-error" : ""}`}
              value={formData.roll}
              onChange={(e) => handleChange("roll", e.target.value)}
              placeholder="e.g. 311824103001"
            />
            {errors.roll && <span className="field-error">{errors.roll}</span>}
          </div>

          {/* Department */}
          <div className="form-group">
            <label htmlFor="student-dept" className="form-label">
              DEPARTMENT <span className="req">*</span>
            </label>
            <select
              id="student-dept"
              className="form-select"
              value={formData.dept}
              onChange={(e) => handleChange("dept", e.target.value)}
            >
              {availableDepts.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          {/* Academic Year */}
          <div className="form-group">
            <label htmlFor="student-year" className="form-label">
              ACADEMIC YEAR
            </label>
            <select
              id="student-year"
              className="form-select"
              value={formData.year}
              onChange={(e) => handleChange("year", e.target.value)}
            >
              {(YEARS || ["1st Year", "2nd Year", "3rd Year", "4th Year"]).map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>

          {/* CGPA */}
          <div className="form-group">
            <label htmlFor="student-cgpa" className="form-label">
              CGPA (0.0 — 10.0) <span className="req">*</span>
            </label>
            <input
              id="student-cgpa"
              type="number"
              step="0.01"
              min="0"
              max="10"
              className={`form-input font-mono ${errors.cgpa ? "has-error" : ""}`}
              value={formData.cgpa}
              onChange={(e) => handleChange("cgpa", e.target.value)}
              placeholder="e.g. 9.42"
            />
            {errors.cgpa && <span className="field-error">{errors.cgpa}</span>}
          </div>

          {/* Blood Group */}
          <div className="form-group">
            <label htmlFor="student-blood" className="form-label">
              BLOOD GROUP
            </label>
            <select
              id="student-blood"
              className="form-select"
              value={formData.bloodGroup}
              onChange={(e) => handleChange("bloodGroup", e.target.value)}
            >
              {(BLOOD_GROUPS || ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]).map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          {/* Avatar URL */}
          <div className="form-group">
            <label htmlFor="student-avatar" className="form-label">
              AVATAR PHOTO URL (OPTIONAL)
            </label>
            <input
              id="student-avatar"
              type="url"
              className="form-input"
              value={formData.avatar}
              onChange={(e) => handleChange("avatar", e.target.value)}
              placeholder="https://images.unsplash.com/..."
            />
          </div>
        </div>

        {/* Modal Actions */}
        <div className="modal-actions">
          <button
            type="button"
            className="modal-btn secondary"
            onClick={onClose}
          >
            Cancel
          </button>
          <button type="submit" className="modal-btn primary">
            {isEditing ? <CheckIcon size={14} /> : <PlusIcon size={14} />}
            <span>{isEditing ? "Save Record" : "Enroll Student"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default function StudentModal({
  isOpen = false,
  student = null,
  onClose = () => {},
  onSave = () => {}
}) {
  // Handle Escape key to close
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <StudentModalForm
        key={student ? (student.id || student.roll) : "new"}
        student={student}
        onClose={onClose}
        onSave={onSave}
      />
    </div>
  );
}
