import { useState } from "react";
import { CloseIcon, SparklesIcon } from "./Icons";
import { DEPARTMENTS, YEARS, BLOOD_GROUPS } from "../data/students";
import "./StudentFormModal.css";

const PRESET_AVATARS = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80"
];

function getInitialForm(studentToEdit) {
  if (studentToEdit) {
    return {
      name: studentToEdit.name || "",
      roll: studentToEdit.roll || "",
      dept: studentToEdit.dept || "AI & ML",
      year: studentToEdit.year || "3rd Year",
      cgpa: studentToEdit.cgpa !== undefined ? String(studentToEdit.cgpa) : "8.50",
      email: studentToEdit.email || "",
      phone: studentToEdit.phone || "",
      bloodGroup: studentToEdit.bloodGroup || "O+",
      avatar: studentToEdit.avatar || PRESET_AVATARS[0]
    };
  }
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return {
    name: "",
    roll: `31182410${randomSuffix}`,
    dept: "AI & ML",
    year: "3rd Year",
    cgpa: "8.75",
    email: "",
    phone: "+91 98401 12345",
    bloodGroup: "O+",
    avatar: PRESET_AVATARS[Math.floor(Math.random() * PRESET_AVATARS.length)]
  };
}

export default function StudentFormModal({ studentToEdit, isOpen, onClose, onSave }) {
  const isEditing = Boolean(studentToEdit);

  const [formData, setFormData] = useState(() => getInitialForm(studentToEdit));
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Student name is required";
    if (!formData.roll.trim()) errs.roll = "Roll number is required";
    const num = parseFloat(formData.cgpa);
    if (isNaN(num) || num < 0 || num > 10) {
      errs.cgpa = "CGPA must be between 0.0 and 10.0";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      ...formData,
      id: formData.roll,
      cgpa: parseFloat(formData.cgpa) || 0,
      email: formData.email.trim() || `${formData.name.toLowerCase().replace(/\s+/g, ".")}@apex.edu`,
      status: parseFloat(formData.cgpa) >= 9.0 ? "Honors" : "Active"
    };

    onSave(payload);
    onClose();
  };

  return (
    <div className="form-modal-overlay" onClick={onClose}>
      <div className="form-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="form-modal-header">
          <div className="form-modal-title">
            <SparklesIcon size={22} className="sparkle-icon" />
            <div>
              <h3>{isEditing ? "Edit Student Profile" : "Enroll New Student"}</h3>
              <p>Configure student credentials and generate real-time smart card</p>
            </div>
          </div>
          <button type="button" className="form-close-btn" onClick={onClose}>
            <CloseIcon size={20} />
          </button>
        </div>

        {/* Modal Layout: Form Inputs + Live Preview */}
        <div className="form-modal-body">
          <form className="student-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group flex-2">
                <label>Full Student Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Maya Krishnan"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={errors.name ? "input-err" : ""}
                  autoFocus
                />
                {errors.name && <span className="field-err">{errors.name}</span>}
              </div>

              <div className="form-group flex-1">
                <label>Roll Number *</label>
                <input
                  type="text"
                  placeholder="311824103009"
                  value={formData.roll}
                  onChange={(e) => setFormData({ ...formData, roll: e.target.value })}
                  className={errors.roll ? "input-err" : ""}
                />
                {errors.roll && <span className="field-err">{errors.roll}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group flex-1">
                <label>Department *</label>
                <select
                  value={formData.dept}
                  onChange={(e) => setFormData({ ...formData, dept: e.target.value })}
                >
                  {DEPARTMENTS.filter((d) => d !== "All Departments").map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group flex-1">
                <label>Academic Year</label>
                <select
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                >
                  {YEARS.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group flex-1">
                <label>CGPA (0.0 - 10.0) *</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="10"
                  placeholder="8.75"
                  value={formData.cgpa}
                  onChange={(e) => setFormData({ ...formData, cgpa: e.target.value })}
                  className={errors.cgpa ? "input-err" : ""}
                />
                {errors.cgpa && <span className="field-err">{errors.cgpa}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group flex-1">
                <label>Blood Group</label>
                <select
                  value={formData.bloodGroup}
                  onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                >
                  {BLOOD_GROUPS.map((bg) => (
                    <option key={bg} value={bg}>
                      {bg}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group flex-2">
                <label>Contact Phone</label>
                <input
                  type="text"
                  placeholder="+91 98401 23456"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>

            {/* Avatar Selection */}
            <div className="form-group">
              <label>Select Profile Picture</label>
              <div className="avatar-presets-row">
                {PRESET_AVATARS.map((av, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`avatar-preset-btn ${formData.avatar === av ? "selected" : ""}`}
                    onClick={() => setFormData({ ...formData, avatar: av })}
                  >
                    <img src={av} alt={`Preset ${idx + 1}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Avatar URL option */}
            <div className="form-group">
              <label>Or Custom Photo URL (Optional)</label>
              <input
                type="url"
                placeholder="https://example.com/photo.jpg"
                value={formData.avatar}
                onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
              />
            </div>

            <div className="form-actions-row">
              <button type="button" className="btn-cancel" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn-submit">
                {isEditing ? "Update Student" : "Create Student Badge"}
              </button>
            </div>
          </form>

          {/* Live Preview Side Box */}
          <div className="form-live-preview">
            <span className="live-preview-label">LIVE BADGE PREVIEW</span>
            <div className="live-preview-card">
              <div className="preview-chip" />
              <div className="preview-avatar-box">
                <img
                  src={formData.avatar || PRESET_AVATARS[0]}
                  alt="Preview"
                  className="preview-img"
                  onError={(e) => {
                    e.target.src = PRESET_AVATARS[0];
                  }}
                />
              </div>
              <h4 className="preview-name">{formData.name || "Student Full Name"}</h4>
              <span className="preview-dept">{formData.dept}</span>
              <div className="preview-meta-row">
                <div>
                  <span>ROLL NO</span>
                  <strong>{formData.roll || "31182410XXXX"}</strong>
                </div>
                <div>
                  <span>CGPA</span>
                  <strong className="preview-cgpa">
                    {parseFloat(formData.cgpa) ? parseFloat(formData.cgpa).toFixed(2) : "0.00"}
                  </strong>
                </div>
              </div>
              <div className="preview-barcode" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
