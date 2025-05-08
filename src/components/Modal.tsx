import React from "react";
import styles from "./Modal.module.css";

type ModalProps = {
  winner: "X" | "O" | null;
  onQuit: () => void;
  onNextRound: () => void;
  player1Mark: "X" | "O";
  gameMode: "CPU" | "PLAYER2";
};

const Modal: React.FC<ModalProps> = ({
  winner,
  onQuit,
  onNextRound,
  player1Mark,
  gameMode,
}) => {
  let title = "";
  let subtext = "";
  let icon = null;
  let iconClass = "";

  if (winner === "X" || winner === "O") {
    title = `TAKES THE ROUND`;
    icon = (
      <img
        src={winner === "X" ? "/assets/icon-x.svg" : "/assets/icon-o.svg"}
        alt={winner}
        className={winner === "X" ? styles.x : styles.o}
      />
    );
    if (gameMode === "CPU") {
      subtext = winner === player1Mark ? "YOU WIN!" : "COMPUTER WINS!";
    } else if (gameMode === "PLAYER2") {
      subtext = winner === player1Mark ? "YOU WIN!" : "PLAYER 2 WINS!";
    }
  } else {
    title = "ROUND TIED";
    subtext = "";
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {winner !== null && <div className={styles.subtext}>{subtext}</div>}
        <div className={styles.titleRow}>
          {winner !== null && <span className={styles.icon}>{icon}</span>}
          <span
            className={
              winner === "X"
                ? `${styles.title} ${styles.titleX}`
                : winner === "O"
                ? `${styles.title} ${styles.titleO}`
                : styles.title
            }
          >
            {title}
          </span>
        </div>
        <div className={styles.buttons}>
          <button className={styles.quit} onClick={onQuit}>
            QUIT
          </button>
          <button className={styles.nextRound} onClick={onNextRound}>
            NEXT ROUND
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
