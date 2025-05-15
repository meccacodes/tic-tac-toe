import React from "react";
import styles from "./GameBoard.module.css";
import Modal from "./Modal";
import ResetModal from "./ResetModal";

type GameBoardProps = {
  player1Mark: "X" | "O";
  gameMode: "CPU" | "PLAYER2";
};

type Mark = "X" | "O";
type Cell = "X" | "O" | null;
type Space = "X" | "O" | number;
type InnerArray = [Space, Space, Space];
type ArrayOfArrays = InnerArray[];

const GameBoard: React.FC<GameBoardProps> = ({ player1Mark, gameMode }) => {
  const [playerTurn, setPlayerTurn] = React.useState<Mark>("X");
  const [board, setBoard] = React.useState<Cell[]>(Array(9).fill(null));
  const [hoveredCell, setHoveredCell] = React.useState<number | null>(null);

  const [winningCombos, setWinningCombos] = React.useState<ArrayOfArrays>([
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]);

  const [scores, setScores] = React.useState({
    X: 0,
    ties: 0,
    O: 0,
  });

  const [modalOpen, setModalOpen] = React.useState(false);
  const [winner, setWinner] = React.useState<"X" | "O" | null>(null);
  const [resetModalOpen, setResetModalOpen] = React.useState(false);

  const handleReset = () => {
    setResetModalOpen(true);
  };

  const handleConfirmReset = () => {
    setBoard(Array(9).fill(null));
    // TODO: Consider a less disruptive way to reset, e.g., navigating to main menu
    location.reload();
    setResetModalOpen(false);
  };

  const handleCancelReset = () => {
    setResetModalOpen(false);
  };

  function updateBoard(oldBoard: Array<Cell>, index: number, mark: Mark) {
    const newBoard = [...oldBoard];
    newBoard[index] = mark;
    setBoard(newBoard);
    return newBoard;
  }

  function eliminateCombos(wholeArray: ArrayOfArrays) {
    return wholeArray.filter((innerArray) => {
      return !(innerArray.includes("X") && innerArray.includes("O"));
    });
  }

  function updateWinningCombos(
    wholeArray: ArrayOfArrays,
    newSpace: number,
    mark: Mark
  ) {
    wholeArray.forEach((innerArray, index) => {
      innerArray.forEach((num, i) => {
        if (num === newSpace) {
          wholeArray[index][i] = mark;
        }
      });
    });
    const newCombos = eliminateCombos(wholeArray);
    setWinningCombos(newCombos);
    return newCombos;
  }

  function checkTie(wholeArray: ArrayOfArrays) {
    if (wholeArray.length === 0) {
      return true;
    } else return false;
  }

  function checkWinner(wholeArray: ArrayOfArrays, mark: Mark) {
    for (let i = 0; i < wholeArray.length; i++) {
      let innerArray = wholeArray[i];
      if (
        innerArray[0] === mark &&
        innerArray[1] === mark &&
        innerArray[2] === mark
      )
        return true;
    }
    return false;
  }

  function resetRound() {
    console.log(" resetRound() - New Round Starting");
    setBoard(Array(9).fill(null));
    setWinningCombos([
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]);
    setPlayerTurn("X");
    return;
  }

  const handleCellClick = (index: number) => {
    if (board[index] !== null || modalOpen) return;

    updateBoard(board, index, playerTurn);

    const newWinningCombos = updateWinningCombos(
      winningCombos,
      index,
      playerTurn
    );

    // check for tie
    const isTie: boolean = checkTie(newWinningCombos);
    if (isTie === true) {
      setScores((prevScores) => ({
        ...prevScores,
        ties: prevScores.ties + 1,
      }));
      setWinner(null);
      setModalOpen(true);
      resetRound();
    }

    // check for win
    const isWin: boolean = checkWinner(newWinningCombos, playerTurn);
    if (isWin === true) {
      setScores((prevScores) => ({
        ...prevScores,
        [playerTurn]: prevScores[playerTurn] + 1,
      }));
      setWinner(playerTurn);
      setModalOpen(true);
      return;
    }

    setPlayerTurn(playerTurn === "X" ? "O" : "X");
  };

  const handleQuit = () => {
    setModalOpen(false);
    handleReset();
  };

  const handleNextRound = () => {
    setModalOpen(false);
    setWinner(null);
    resetRound();
  };

  return (
    <div className={styles.container}>
      {modalOpen && (
        <Modal
          winner={winner}
          onQuit={handleQuit}
          onNextRound={handleNextRound}
          player1Mark={player1Mark}
          gameMode={gameMode}
        />
      )}
      {resetModalOpen && (
        <ResetModal
          onQuit={handleCancelReset}
          handleReset={handleConfirmReset}
        />
      )}
      <div className={styles.header}>
        <div className={styles.marks}>
          <div className={styles.logo}>
            <img src="/assets/logo.svg" alt="XO Logo" />
          </div>
        </div>
        <div className={styles.turn}>
          <span>{playerTurn}'s TURN</span>
        </div>
        <button className={styles.reset} onClick={handleReset}>
          <img src="/assets/icon-restart.svg" alt="Reset" />
        </button>
      </div>

      <div className={styles.board}>
        {board.map((cell, index) => (
          <button
            key={index}
            className={styles.cell}
            onClick={() => handleCellClick(index)}
            disabled={modalOpen}
            onMouseEnter={() => setHoveredCell(index)}
            onMouseLeave={() => setHoveredCell(null)}
          >
            {cell === "X" && (
              <img className={styles.x} src="/assets/icon-x.svg" alt="X" />
            )}
            {cell === "O" && (
              <img className={styles.o} src="/assets/icon-o.svg" alt="O" />
            )}
            {cell === null && hoveredCell === index && (
              <img
                className={styles.outline}
                src={
                  playerTurn === "X"
                    ? "/assets/icon-x-outline.svg"
                    : "/assets/icon-o-outline.svg"
                }
                alt={`${playerTurn} outline`}
              />
            )}
          </button>
        ))}
      </div>

      <div className={styles.scores}>
        <div className={styles.score}>
          <div className={styles.label}>
            X ({player1Mark === "X" ? "You" : gameMode})
          </div>
          <div className={styles.value}>{scores.X}</div>
        </div>
        <div className={styles.score}>
          <div className={styles.label}>TIES</div>
          <div className={styles.value}>{scores.ties}</div>
        </div>
        <div className={styles.score}>
          <div className={styles.label}>
            O ({player1Mark === "O" ? "YOU" : gameMode})
          </div>
          <div className={styles.value}>{scores.O}</div>
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
