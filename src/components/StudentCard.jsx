import { useState, useRef } from "react";
import { CopyIcon, CheckIcon, SparklesIcon, HeartIcon, EditIcon, TrashIcon } from "./Icons";
import "./StudentCard.css";

function getInitials(name) {
  if (!name) return "ST";
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function getDeptConfig(dept) {
  switch (dept) {
    case "AI & ML":
      return { label: "AI & ML", color: "#a78bfa", rgb: "167, 139, 250" };
    case "Computer Science":
      return { label: "CS", color: "#38bdf8", rgb: "56, 189, 248" };
    case "Data Science":
      return { label: "Data Science", color: "#34d399", rgb: "52, 211, 153" };
    case "Cyber Security":
      return { label: "Cyber Sec", color: "#f472b6", rgb: "244, 114, 182" };
    case "Electronics & Comm":
      return { label: "ECE", color: "#fbbf24", rgb: "251, 191, 36" };
    default:
      return { label: dept || "General", color: "#818cf8", rgb: "129, 140, 248" };
  }
}

export default function StudentCard({
  student,
  isLiked = false,
  onToggleLike = () => {},
  onEdit = () => {},
  onDelete = () => {}
}) {
  const [copied, setCopied] = useState(false);
  const [imgError, setImgError] = useState(false);
  const cardRef = useRef(null);

  const { id, name, roll, dept, year, cgpa, avatar, bloodGroup } = student;
  const numCgpa = parseFloat(cgpa) || 0;
  const isHonors = numCgpa >= 9.0;
  const deptConfig = getDeptConfig(dept);
  const studentKey = id || roll;

  // Micro cursor reflection on individual card
  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--card-x", `${x}px`);
    card.style.setProperty("--card-y", `${y}px`);
  };

  const handleCopyRoll = (e) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(roll);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  // Progress percentage (out of 10)
  const cgpaPercent = Math.min(Math.max((numCgpa / 10) * 100, 0), 100);

  return (
    <article
      ref={cardRef}
      className={`student-card ${isHonors ? "is-honors" : ""} ${isLiked ? "is-liked" : ""}`}
      onMouseMove={handleMouseMove}
      style={{
        "--accent-color": deptConfig.color,
        "--accent-rgb": deptConfig.rgb
      }}
    >
      {/* Subtle Inner Glass Sheen */}
      <div className="card-sheen" aria-hidden="true" />

      {/* Top Capsule Row */}
      <div className="card-top">
        <div className="dept-badge">
          <span className="dept-dot" />
          <span className="dept-name">{dept}</span>
        </div>

        <div className="top-tags">
          <span className="year-pill">{year}</span>
          {isHonors && (
            <span className="honors-badge" title="Academic Honors Scholar (CGPA ≥ 9.0)">
              <SparklesIcon size={12} />
              <span>HONORS</span>
            </span>
          )}
          {/* Like / Favorite Button */}
          <button
            type="button"
            className={`card-like-btn ${isLiked ? "active" : ""}`}
            onClick={() => onToggleLike(studentKey)}
            title={isLiked ? "Remove from favorites" : "Add to favorites"}
            aria-label={isLiked ? "Unlike student" : "Like student"}
          >
            <HeartIcon size={15} filled={isLiked} />
          </button>
        </div>
      </div>

      {/* Student Identity Core */}
      <div className="card-body">
        <div className="avatar-ring">
          {avatar && !imgError ? (
            <img
              src={avatar}
              alt={name}
              className="student-avatar"
              onError={() => setImgError(true)}
              loading="lazy"
            />
          ) : (
            <div className="avatar-fallback">{getInitials(name)}</div>
          )}
        </div>

        <h3 className="student-name" title={name}>
          {name}
        </h3>

        {/* 1-Click Interactive Roll Copy Pill */}
        <button
          type="button"
          className={`roll-pill ${copied ? "copied" : ""}`}
          onClick={handleCopyRoll}
          title="Click to copy roll number"
          aria-label={`Copy roll number: ${roll}`}
        >
          <span className="roll-label">ROLL</span>
          <span className="roll-value">{roll}</span>
          <span className="roll-icon">
            {copied ? <CheckIcon size={12} /> : <CopyIcon size={12} />}
          </span>
          {copied && <span className="copied-toast">COPIED</span>}
        </button>
      </div>

      {/* Understated Performance & Spec Rail */}
      <div className="card-footer">
        <div className="metric-row">
          <div className="metric-header">
            <span className="metric-label">CUMULATIVE GPA</span>
            <div className="metric-value">
              <span className="cgpa-number">{numCgpa.toFixed(2)}</span>
              <span className="cgpa-scale">/ 10</span>
            </div>
          </div>

          {/* Minimal Precision Progress Bar */}
          <div className="progress-track" aria-hidden="true">
            <div
              className="progress-fill"
              style={{ width: `${cgpaPercent}%` }}
            />
          </div>
        </div>

        <div className="meta-row">
          <div className="meta-item">
            <span className="meta-key">BLOOD</span>
            <span className="meta-val">{bloodGroup || "—"}</span>
          </div>

          <div className="meta-item">
            <span className="meta-key">STATUS</span>
            <span className="meta-status">
              <span className="status-indicator-dot" /> ACTIVE
            </span>
          </div>
        </div>

        {/* Edit and Delete Actions Strip */}
        <div className="card-actions-strip">
          <button
            type="button"
            className="card-action-btn edit"
            onClick={() => onEdit(student)}
            title={`Edit ${name}'s details`}
            aria-label={`Edit ${name}`}
          >
            <EditIcon size={13} />
            <span>Edit</span>
          </button>

          <button
            type="button"
            className="card-action-btn delete"
            onClick={() => onDelete(student)}
            title={`Delete ${name}'s card`}
            aria-label={`Delete ${name}`}
          >
            <TrashIcon size={13} />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </article>
  );
}
