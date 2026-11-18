import { useEffect, useState } from "react";
import { CloseIcon, ShieldCheckIcon, AwardIcon } from "../Components/Icons";
import "./StudentIdModal.css";

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

function getDeptBadge(dept) {
  switch (dept) {
    case "AI & ML":
      return { bg: "#f5f3ff", color: "#7c3aed", border: "#ddd6fe" };
    case "Computer Science":
      return { bg: "#eff6ff", color: "#2563eb", border: "#bfdbfe" };
    case "Data Science":
      return { bg: "#ecfeff", color: "#0891b2", border: "#a5f3fc" };
    case "Cyber Security":
      return { bg: "#fdf2f8", color: "#db2777", border: "#fbcfe8" };
    case "Electronics & Comm":
      return { bg: "#ecfdf5", color: "#059669", border: "#a7f3d0" };
    default:
      return { bg: "#eef2ff", color: "#4f46e5", border: "#c7d2fe" };
  }
}

export default function StudentIdModal({ student, onClose }) {
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!student) return null;

  const {
    name,
    roll,
    dept,
    year,
    cgpa,
    avatar,
    email,
    phone,
    bloodGroup,
    batch
  } = student;

  const numCgpa = parseFloat(cgpa) || 0;
  const isHonors = numCgpa >= 9.0;
  const deptStyle = getDeptBadge(dept);

  return (
    <div className="id-modal-overlay" onClick={onClose}>
      <div className="id-modal-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Simple Top Bar (No print option) */}
        <div className="id-modal-topbar">
          <div className="id-modal-title-group">
            <div className="id-modal-shield-wrap">
              <ShieldCheckIcon size={20} className="id-modal-shield" />
            </div>
            <div>
              <h2 className="id-modal-heading">Student Identity Pass</h2>
              <p className="id-modal-sub">Official Academic Credential • Academic Year 2026-2027</p>
            </div>
          </div>

          <button
            type="button"
            className="id-modal-close-btn"
            onClick={onClose}
            title="Close dialog (Esc)"
            aria-label="Close pass"
          >
            <CloseIcon size={20} />
          </button>
        </div>

        {/* Simple White Pass Card */}
        <div className="simple-pass-card">
          {/* Top Lanyard Slot */}
          <div className="pass-lanyard-slot" aria-hidden="true" />

          {/* Institution Header */}
          <div className="pass-header">
            <div className="pass-crest">🏛️</div>
            <div className="pass-institution-text">
              <h3>APEX INSTITUTE OF TECHNOLOGY</h3>
              <p>CAMPUS KNOWLEDGE HIGHWAY • AUTONOMOUS INSTITUTION</p>
            </div>
          </div>

          {/* Simple Status Ribbon */}
          <div className="pass-status-strip">
            <span className="pass-strip-label">VALID STUDENT IDENTITY PASS</span>
            {isHonors && (
              <span className="pass-honors-pill">
                <AwardIcon size={14} /> DEAN'S LIST SCHOLAR
              </span>
            )}
          </div>

          {/* Main Pass Body: Photo + Details */}
          <div className="pass-body">
            <div className="pass-photo-area">
              <div className="pass-photo-frame">
                {avatar && !imgError ? (
                  <img
                    src={avatar}
                    alt={name}
                    className="pass-photo-img"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div className="pass-photo-fallback">{initials(name)}</div>
                )}
              </div>
              <div className="pass-chip-mini" title="Smart Card Contactless Chip">
                <div className="pass-chip-core" />
              </div>
            </div>

            <div className="pass-details-area">
              <div className="pass-name-block">
                <span className="pass-label">STUDENT NAME</span>
                <h4 className="pass-name">{name}</h4>
              </div>

              <div className="pass-tags-row">
                <span
                  className="pass-dept-badge"
                  style={{
                    backgroundColor: deptStyle.bg,
                    color: deptStyle.color,
                    borderColor: deptStyle.border
                  }}
                >
                  {dept}
                </span>
                <span className="pass-year-badge">{year}</span>
              </div>

              {/* Clean Details Grid */}
              <div className="pass-grid">
                <div className="pass-grid-item">
                  <span className="pass-label">ROLL NO</span>
                  <code className="pass-val-roll">{roll}</code>
                </div>

                <div className="pass-grid-item">
                  <span className="pass-label">CGPA</span>
                  <span className="pass-val-cgpa">{numCgpa.toFixed(2)} / 10.0</span>
                </div>

                <div className="pass-grid-item">
                  <span className="pass-label">BLOOD GRP</span>
                  <span className="pass-val">{bloodGroup || "O+"}</span>
                </div>

                <div className="pass-grid-item">
                  <span className="pass-label">BATCH</span>
                  <span className="pass-val">{batch || "2024-2028"}</span>
                </div>

                <div className="pass-grid-item full-col">
                  <span className="pass-label">COLLEGE EMAIL</span>
                  <span className="pass-val pass-email">{email || `${roll.toLowerCase()}@apex.edu`}</span>
                </div>

                <div className="pass-grid-item full-col">
                  <span className="pass-label">PHONE</span>
                  <span className="pass-val">{phone || "+91 98401 23456"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Pass Footer with QR Code, Barcode & Signature */}
          <div className="pass-footer">
            <div className="pass-qr-group">
              <svg className="pass-qr-svg" viewBox="0 0 45 45" aria-label="Digital Verification QR">
                <rect width="45" height="45" fill="#f8fafc" rx="4" />
                <rect x="4" y="4" width="12" height="12" fill="#0f172a" rx="2" />
                <rect x="6" y="6" width="8" height="8" fill="#ffffff" />
                <rect x="8" y="8" width="4" height="4" fill="#0f172a" />
                
                <rect x="29" y="4" width="12" height="12" fill="#0f172a" rx="2" />
                <rect x="31" y="6" width="8" height="8" fill="#ffffff" />
                <rect x="33" y="8" width="4" height="4" fill="#0f172a" />

                <rect x="4" y="29" width="12" height="12" fill="#0f172a" rx="2" />
                <rect x="6" y="31" width="8" height="8" fill="#ffffff" />
                <rect x="8" y="33" width="4" height="4" fill="#0f172a" />

                <rect x="20" y="8" width="5" height="5" fill="#0f172a" />
                <rect x="20" y="16" width="7" height="4" fill="#0f172a" />
                <rect x="8" y="20" width="7" height="4" fill="#0f172a" />
                <rect x="20" y="24" width="5" height="5" fill="#0f172a" />
                <rect x="29" y="20" width="12" height="4" fill="#0f172a" />
                <rect x="28" y="28" width="5" height="12" fill="#0f172a" />
                <rect x="36" y="36" width="5" height="5" fill="#0f172a" />
              </svg>
              <div className="pass-qr-meta">
                <span>DIGITAL VERIFIED</span>
                <small>AUTH-APX-{roll.slice(-4)}</small>
              </div>
            </div>

            <div className="pass-barcode-group">
              <div className="pass-barcode-lines">
                {[2, 1, 3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 1, 2, 3, 1, 4, 2, 1, 2, 3, 1, 3].map((w, i) => (
                  <span key={i} style={{ width: `${w}px` }} />
                ))}
              </div>
              <small className="pass-barcode-text">*{roll}*</small>
            </div>

            <div className="pass-signature-group">
              <div className="pass-sign-cursive">S. K. Ramanathan</div>
              <span className="pass-sign-title">DEAN OF ACADEMICS</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
