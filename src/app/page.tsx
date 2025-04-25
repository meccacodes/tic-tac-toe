"use client";

import { useState } from "react";
import NewGameMenu from "@/components/NewGameMenu";
import GameBoard from "@/components/GameBoard";
import styles from "./page.module.css";

export default function Home() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameConfig, setGameConfig] = useState<{
    playerMark: "X" | "O";
    gameMode: "CPU" | "PLAYER";
  } | null>(null);

  const handleGameStart = (
    playerMark: "X" | "O",
    gameMode: "CPU" | "PLAYER"
  ) => {
    setGameConfig({ playerMark, gameMode });
    setGameStarted(true);
  };

  return (
    <main className={styles.main}>
      {!gameStarted || !gameConfig ? (
        <NewGameMenu onGameStart={handleGameStart} />
      ) : (
        <GameBoard
          playerMark={gameConfig.playerMark}
          gameMode={gameConfig.gameMode}
        />
      )}
    </main>
  );
}
