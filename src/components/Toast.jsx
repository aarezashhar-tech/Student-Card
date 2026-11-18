import { CheckIcon, CloseIcon } from "./Icons";
import "./Toast.css";

export default function Toast({ message, onClose }) {
  if (!message) return null;

  return (
    <div className="toast-notification" role="status" aria-live="polite">
      <div className="toast-icon">
        <CheckIcon size={16} />
      </div>
      <span className="toast-text">{message}</span>
      <button type="button" className="toast-close" onClick={onClose} aria-label="Dismiss toast">
        <CloseIcon size={14} />
      </button>
    </div>
  );
}
