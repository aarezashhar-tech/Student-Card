import { useState } from "react";
import { IdCardIcon, EditIcon, TrashIcon, AwardIcon, CopyIcon, CheckIcon } from "./Icons";
import "./StudentTable.css";

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

export default function StudentTable({ students, onViewDetails, onEdit, onDelete, onCopyToast }) {
  const [copiedRoll, setCopiedRoll] = useState(null);

  const handleCopy = (roll) => {
    navigator.clipboard?.writeText(roll);
    setCopiedRoll(roll);
    if (onCopyToast) onCopyToast(`Copied roll number: ${roll}`);
    setTimeout(() => setCopiedRoll(null), 2000);
  };

  return (
    <div className="table-wrapper">
      <table className="student-table">
        <thead>
          <tr>
            <th>STUDENT</th>
            <th>ROLL NO</th>
            <th>DEPARTMENT</th>
            <th>YEAR</th>
            <th>CGPA & TIER</th>
            <th>ATTENDANCE</th>
            <th>STATUS</th>
            <th className="th-actions">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => {
            const numCgpa = parseFloat(s.cgpa) || 0;
            const isHonors = numCgpa >= 9.0;
            const tierColor = numCgpa >= 9.0 ? "#10b981" : numCgpa >= 8.0 ? "#06b6d4" : "#f59e0b";

            return (
              <tr key={s.roll} className={isHonors ? "row-honors" : ""}>
                <td className="td-student">
                  <div className="table-avatar">
                    {s.avatar ? (
                      <img src={s.avatar} alt={s.name} />
                    ) : (
                      <div className="table-avatar-fallback">{initials(s.name)}</div>
                    )}
                  </div>
                  <div className="table-name-group">
                    <span className="table-name">{s.name}</span>
                    <span className="table-email">{s.email || `${s.roll.toLowerCase()}@apex.edu`}</span>
                  </div>
                </td>

                <td className="td-roll">
                  <div className="table-roll-box">
                    <code>{s.roll}</code>
                    <button
                      type="button"
                      className="table-copy-btn"
                      onClick={() => handleCopy(s.roll)}
                      title="Copy Roll Number"
                    >
                      {copiedRoll === s.roll ? <CheckIcon size={13} /> : <CopyIcon size={13} />}
                    </button>
                  </div>
                </td>

                <td>
                  <span className="table-dept-pill">{s.dept}</span>
                </td>

                <td className="td-year">{s.year}</td>

                <td>
                  <div className="table-cgpa-box">
                    <span className="table-cgpa-val" style={{ color: tierColor }}>
                      {numCgpa.toFixed(2)}
                    </span>
                    <div className="table-cgpa-bar">
                      <div
                        className="table-cgpa-bar-fill"
                        style={{ width: `${(numCgpa / 10) * 100}%`, background: tierColor }}
                      />
                    </div>
                  </div>
                </td>

                <td>
                  <span className="table-attendance">{s.attendance || 90}%</span>
                </td>

                <td>
                  {isHonors ? (
                    <span className="table-status-honors">
                      <AwardIcon size={13} /> Dean's List
                    </span>
                  ) : (
                    <span className="table-status-active">Active</span>
                  )}
                </td>

                <td className="td-actions">
                  <div className="table-actions-group">
                    <button
                      type="button"
                      className="table-action-btn pass"
                      onClick={() => onViewDetails(s)}
                      title="View Digital Smart Pass"
                    >
                      <IdCardIcon size={15} /> Pass
                    </button>
                    <button
                      type="button"
                      className="table-action-btn edit"
                      onClick={() => onEdit(s)}
                      title="Edit Student"
                    >
                      <EditIcon size={15} />
                    </button>
                    <button
                      type="button"
                      className="table-action-btn delete"
                      onClick={() => onDelete(s)}
                      title="Delete Student"
                    >
                      <TrashIcon size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
