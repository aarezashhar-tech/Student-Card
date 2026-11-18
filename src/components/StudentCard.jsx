import { useRef, useState } from "react";
import { CopyIcon, CheckIcon, AwardIcon, IdCardIcon, EditIcon, TrashIcon } from "./Icons";
import "./StudentCard.css";

function initials(name) {
  if (!name) return "ST";
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function getDeptTheme(dept) {
  switch (dept) {
    case "AI & ML":
      return { tag: "ai", color: "#8b5cf6", gradient: "linear-gradient(135deg, #7c3aed, #c084fc)" };
    case "Computer Science":
      return { tag: "cs", color: "#3b82f6", gradient: "linear-gradient(135deg, #2563eb, #60a5fa)" };
    case "Data Science":
      return { tag: "ds", color: "#06b6d4", gradient: "linear-gradient(135deg, #0891b2, #38bdf8)" };
    case "Cyber Security":
      return { tag: "cyber", color: "#ec4899", gradient: "linear-gradient(135deg, #db2777, #f472b6)" };
    case "Electronics & Comm":
      return { tag: "ece", color: "#10b981", gradient: "linear-gradient(135deg, #059669, #34d399)" };
    default:
      return { tag: "gen", color: "#6366f1", gradient: "linear-gradient(135deg, #4f46e5, #818cf8)" };
  }
}

export default function StudentCard({ student, onViewDetails, onEdit, onDelete, onCopyToast }) {
  const cardRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const [imageError, setImageError] = useState(false);

  const { name, roll, dept, year, cgpa, avatar, bloodGroup } = student;
  const numCgpa = parseFloat(cgpa) || 0;
  const isHonors = numCgpa >= 9.0;
  const deptTheme = getDeptTheme(dept);

  // CGPA circular meter calculation (radius 32, circumference ~201)
  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const percent = Math.min(Math.max(numCgpa / 10, 0), 1);
  const strokeOffset = circumference - percent * circumference;

  // 3D Parallax & Glare on pointer move
  const handlePointerMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = (x / rect.width - 0.5) * 16;
    const py = (y / rect.height - 0.5) * -16;

    el.style.setProperty("--rot-x", `${py}deg`);
    el.style.setProperty("--rot-y", `${px}deg`);
    el.style.setProperty("--glare-x", `${(x / rect.width) * 100}%`);
    el.style.setProperty("--glare-y", `${(y / rect.height) * 100}%`);
    el.style.setProperty("--glare-opacity", "1");
  };

  const handlePointerLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty("--rot-x", "0deg");
    el.style.setProperty("--rot-y", "0deg");
    el.style.setProperty("--glare-opacity", "0");
  };

  const handleCopyRoll = (e) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(roll);
    setCopied(true);
    if (onCopyToast) onCopyToast(`Copied roll number: ${roll}`);
    setTimeout(() => setCopied(false), 2000);
  };

  // Color code based on CGPA tier
  const cgpaColor = numCgpa >= 9.0 ? "#10b981" : numCgpa >= 8.0 ? "#06b6d4" : numCgpa >= 7.0 ? "#3b82f6" : "#f59e0b";

  return (
    <div
      className={`student-card-wrapper ${isHonors ? "is-honors" : ""}`}
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <article className="sc-badge">
        {/* Dynamic Glass Glare Layer */}
        <div className="sc-glare" aria-hidden="true" />

        {/* Lanyard Slot Cutout */}
        <div className="sc-lanyard" aria-hidden="true">
          <div className="sc-lanyard-slot" />
          <div className="sc-lanyard-clip" />
        </div>

        {/* Top Header Strip with University Emblem & Chip */}
        <div className="sc-header-strip">
          <div className="sc-chip" title="Smart RFID / NFC Enabled Badge">
            <div className="sc-chip-lines" />
          </div>

          <div className="sc-institution">
            <span className="sc-college-name">APEX INSTITUTE</span>
            <span className="sc-id-type">STUDENT IDENTIFICATION</span>
          </div>

          {isHonors && (
            <div className="sc-honor-badge" title="Dean's Honors Scholar">
              <AwardIcon size={14} />
              <span>DEAN'S LIST</span>
            </div>
          )}
        </div>

        {/* Avatar & Department Section */}
        <div className="sc-avatar-section">
          <div className="sc-avatar-halo" style={{ background: deptTheme.gradient }}>
            <div className="sc-avatar-frame">
              {avatar && !imageError ? (
                <img
                  src={avatar}
                  alt={name}
                  className="sc-avatar-img"
                  onError={() => setImageError(true)}
                  loading="lazy"
                />
              ) : (
                <div className="sc-avatar-initials" style={{ background: deptTheme.gradient }}>
                  {initials(name)}
                </div>
              )}
            </div>
          </div>

          <div className="sc-badge-tags">
            <span className="sc-dept-tag" style={{ borderColor: deptTheme.color, color: deptTheme.color }}>
              {dept}
            </span>
            <span className="sc-year-tag">{year}</span>
          </div>
        </div>

        {/* Student Primary Information */}
        <div className="sc-info">
          <h3 className="sc-student-name" title={name}>{name}</h3>
          
          <div className="sc-roll-container">
            <span className="sc-roll-label">ROLL NO:</span>
            <code className="sc-roll-number">{roll}</code>
            <button
              type="button"
              className={`sc-copy-btn ${copied ? "copied" : ""}`}
              onClick={handleCopyRoll}
              title="Copy Roll Number"
              aria-label="Copy roll number to clipboard"
            >
              {copied ? <CheckIcon size={14} /> : <CopyIcon size={14} />}
            </button>
          </div>
        </div>

        {/* Academic Performance & Meta Details */}
        <div className="sc-academic-row">
          <div className="sc-details-mini">
            <div className="sc-detail-col">
              <span className="sc-detail-title">BLOOD GRP</span>
              <span className="sc-detail-val">{bloodGroup || "O+"}</span>
            </div>
            <div className="sc-detail-col">
              <span className="sc-detail-title">STATUS</span>
              <span className="sc-detail-val sc-status-active">
                <span className="sc-status-dot" /> ACTIVE
              </span>
            </div>
          </div>

          {/* Radial CGPA Ring Gauge */}
          <div className="sc-cgpa-gauge" title={`Cumulative GPA: ${numCgpa.toFixed(2)} out of 10.0`}>
            <svg className="sc-gauge-svg" viewBox="0 0 76 76">
              <circle className="sc-gauge-bg" cx="38" cy="38" r={radius} />
              <circle
                className="sc-gauge-fill"
                cx="38"
                cy="38"
                r={radius}
                stroke={cgpaColor}
                strokeDasharray={circumference}
                strokeDashoffset={strokeOffset}
              />
            </svg>
            <div className="sc-gauge-text">
              <span className="sc-gauge-val">{numCgpa.toFixed(2)}</span>
              <span className="sc-gauge-caption">CGPA</span>
            </div>
          </div>
        </div>

        {/* Holographic Security Barcode Strip */}
        <div className="sc-security-barcode" aria-hidden="true">
          <div className="sc-barcode-lines">
            {[2, 1, 3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 1, 2, 3, 1, 4, 2, 1, 2, 3, 1, 3].map((w, i) => (
              <span key={i} style={{ width: `${w}px` }} />
            ))}
          </div>
          <span className="sc-barcode-text">AUTH-SEC-2026-APX-{roll.slice(-4)}</span>
        </div>

        {/* Quick Action Footer */}
        <div className="sc-actions-bar">
          <button
            type="button"
            className="sc-view-pass-btn"
            onClick={() => onViewDetails(student)}
            title="Inspect Official 3D Flippable Student Pass"
          >
            <IdCardIcon size={16} />
            <span>Digital Pass</span>
          </button>

          <div className="sc-admin-actions">
            <button
              type="button"
              className="sc-icon-action-btn edit"
              onClick={() => onEdit(student)}
              title="Edit Student Information"
              aria-label="Edit student"
            >
              <EditIcon size={15} />
            </button>
            <button
              type="button"
              className="sc-icon-action-btn delete"
              onClick={() => onDelete(student)}
              title="Remove Student Record"
              aria-label="Delete student"
            >
              <TrashIcon size={15} />
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}
