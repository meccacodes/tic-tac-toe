import React from "react";
import styles from "./GameBoard.module.css";

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

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    location.reload();
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

    return eliminateCombos(wholeArray);
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
    if (board[index] !== null) return;

    const newBoard = updateBoard(board, index, playerTurn);

    const newWinningCombos = updateWinningCombos(
      winningCombos,
      index,
      playerTurn
    );
    setWinningCombos(newWinningCombos);

    // check for tie
    const isTie: boolean = checkTie(newWinningCombos);
    if (isTie === true) {
      setScores((prevScores) => ({
        ...prevScores,
        ties: prevScores.ties + 1,
      }));
      resetRound();
    }

    // check for win
    const isWin: boolean = checkWinner(newWinningCombos, playerTurn);
    if (isWin === true) {
      setScores((prevScores) => ({
        ...prevScores,
        [playerTurn]: prevScores[playerTurn] + 1,
      }));
      resetRound();
    } else setPlayerTurn((prev) => (prev === "X" ? "O" : "X"));
  };

  return (
    <div className={styles.container}>
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
          >
            {cell === "X" && (
              <img className={styles.x} src="/assets/icon-x.svg" alt="X" />
            )}
            {cell === "O" && (
              <img className={styles.o} src="/assets/icon-o.svg" alt="O" />
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
