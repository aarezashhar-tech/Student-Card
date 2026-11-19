import { useEffect } from "react";
import { TrashIcon, CloseIcon } from "./Icons";
import "./DeleteModal.css";

export default function DeleteModal({
  isOpen = false,
  student = null,
  onClose = () => {},
  onConfirm = () => {}
}) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !student) return null;

  return (
    <div className="delete-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="delete-container" onClick={(e) => e.stopPropagation()}>
        <div className="delete-icon-box">
          <TrashIcon size={24} className="delete-icon" />
        </div>

        <div className="delete-content">
          <h3 className="delete-title">Delete Student Record?</h3>
          <p className="delete-desc">
            Are you sure you want to remove <strong>{student.name}</strong> (Roll:{" "}
            <code>{student.roll}</code>) from the registry? This action cannot be undone.
          </p>
        </div>

        <div className="delete-actions">
          <button
            type="button"
            className="delete-btn cancel"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="delete-btn confirm"
            onClick={() => onConfirm(student.id || student.roll)}
          >
            <TrashIcon size={14} />
            <span>Delete Record</span>
          </button>
        </div>

        <button
          type="button"
          className="delete-close-corner"
          onClick={onClose}
          aria-label="Close"
        >
          <CloseIcon size={14} />
        </button>
      </div>
    </div>
  );
}
