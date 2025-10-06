import type { ReactNode } from "react";
import "./modal.css";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
};

export default function Modal({ isOpen, onClose, title, children }: Props) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {title && <h2 className="modal-title">{title}</h2>}
        <div className="modal-body">{children}</div>
        <button
          className="modal-close-button"
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>
      </div>
    </div>
  );
}
