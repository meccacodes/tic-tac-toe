"use client";

import NewGameMenu from "@/components/NewGameMenu";
import styles from "./page.module.css";

export default function Home() {
  const handleGameStart = (
    playerMark: "X" | "O",
    gameMode: "CPU" | "PLAYER"
  ) => {
    console.log(`Game started with ${playerMark} vs ${gameMode}`);
  };

  return (
    <main className={styles.main}>
      <NewGameMenu onGameStart={handleGameStart} />
    </main>
  );
}
