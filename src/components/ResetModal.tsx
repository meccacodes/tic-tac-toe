import React from "react";
import "../app/globals.css";
import styles from "./Modal.module.css";

type ResetModalProps = {
  onQuit: () => void;
  handleReset: () => void;
};

const ResetModal: React.FC<ResetModalProps> = ({ onQuit, handleReset }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.titleRow}>
          <h3 className="heading-l">RESTART GAME?</h3>
        </div>
        <div className={styles.buttons}>
          <button className="buttonPrimary silver" onClick={onQuit}>
            No, Cancel
          </button>
          <button className="buttonPrimary yellow" onClick={handleReset}>
            Yes, Restart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetModal;
