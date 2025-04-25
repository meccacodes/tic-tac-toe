import React from "react";
import styles from "./GameBoard.module.css";

type GameBoardProps = {
  playerMark: "X" | "O";
  gameMode: "CPU" | "PLAYER";
};

const GameBoard: React.FC<GameBoardProps> = ({ playerMark, gameMode }) => {
  const [playerTurn, setPlayerTurn] = React.useState<string>(playerMark);
  console.log(playerTurn);
  const [board, setBoard] = React.useState<(string | null)[]>(
    Array(9).fill(null)
  );

  const [scores, setScores] = React.useState({
    x: 3,
    ties: 8,
    o: 5,
  });

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    location.reload();
  };

  const handleCellClick = (index: number) => {
    console.log(board[index]);
    if (board[index] !== null) return;
    const newBoard = [...board];
    newBoard[index] = playerTurn;
    console.log(`playerMark before turn: ${playerTurn}`);
    if (playerTurn === "X") {
      setPlayerTurn("O");
    } else {
      setPlayerTurn("X");
    }
    console.log(`playerTurn after turn: ${playerTurn}`);
    setBoard(newBoard);
    console.log(newBoard);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.marks}>
          <div className={styles.logo}>
            <img src="./assets/logo.svg" alt="XO Logo" />
          </div>
        </div>
        <div className={styles.turn}>
          <span>{playerTurn}'s TURN</span>
        </div>
        <button className={styles.reset} onClick={handleReset}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6s-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8s-3.58-8-8-8z"
            />
          </svg>
        </button>
      </div>

      <div className={styles.board}>
        {board.map((cell, index) => (
          <button
            key={index}
            className={styles.cell}
            onClick={() => handleCellClick(index)}
          >
            {cell === "X" && <span className={styles.x}>X</span>}
            {cell === "O" && <span className={styles.o}>O</span>}
          </button>
        ))}
      </div>

      <div className={styles.scores}>
        <div className={styles.score}>
          <div className={styles.label}>
            X ({gameMode === "CPU" ? "You" : "Player 1"})
          </div>
          <div className={styles.value}>{scores.x}</div>
        </div>
        <div className={styles.score}>
          <div className={styles.label}>TIES</div>
          <div className={styles.value}>{scores.ties}</div>
        </div>
        <div className={styles.score}>
          <div className={styles.label}>
            O ({gameMode === "CPU" ? "CPU" : "Player 2"})
          </div>
          <div className={styles.value}>{scores.o}</div>
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
