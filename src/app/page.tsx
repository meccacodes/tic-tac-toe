"use client";

import { useState } from "react";
import NewGameMenu from "@/components/NewGameMenu";
import GameBoard from "@/components/GameBoard";
import styles from "./page.module.css";

export default function Home() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameConfig, setGameConfig] = useState<{
    player1Mark: "X" | "O";
    gameMode: "CPU" | "PLAYER2";
  } | null>(null);

  const handleGameStart = (
    player1Mark: "X" | "O",
    gameMode: "CPU" | "PLAYER2"
  ) => {
    setGameConfig({ player1Mark, gameMode });
    setGameStarted(true);
  };

  return (
    <main className={styles.main}>
      {!gameStarted || !gameConfig ? (
        <NewGameMenu onGameStart={handleGameStart} />
      ) : (
        <GameBoard
          player1Mark={gameConfig.player1Mark}
          gameMode={gameConfig.gameMode}
        />
      )}
    </main>
  );
}
