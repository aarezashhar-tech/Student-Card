import { GraduationCapIcon } from "./Icons";
import "./Header.css";

export default function Header({ totalCount = 0, filteredCount = 0 }) {
  return (
    <header className="site-header">
      <div className="brand-lockup">
        <div className="brand-logo-mark" aria-hidden="true">
          <GraduationCapIcon size={20} />
        </div>
        <div className="brand-text">
          <div className="brand-super">MOHAMED SATHAK A.J. COLLEGE OF ENGINEERING</div>
          <h1 className="brand-title">Student Card</h1>
        </div>
      </div>

      <div className="header-meta">
        <div className="live-status-pill">
          <span className="live-dot" />
          <span className="live-label">LIVE SYSTEM</span>
        </div>
        <div className="count-pill">
          <span className="count-num">{filteredCount}</span>
          <span className="count-slash">/</span>
          <span className="count-total">{totalCount}</span>
          <span className="count-desc">CARDS</span>
        </div>
      </div>
    </header>
  );
}
