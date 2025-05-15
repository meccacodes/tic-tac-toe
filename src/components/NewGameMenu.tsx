"use client";

import React, { useState } from "react";
import styles from "./NewGameMenu.module.css";
import "../app/globals.css";

interface NewGameMenuProps {
  onGameStart: (playerMark1: "X" | "O", gameMode: "CPU" | "PLAYER2") => void;
}

export default function NewGameMenu({ onGameStart }: NewGameMenuProps) {
  const [selectedMark, setSelectedMark] = useState<"X" | "O">("X");

  const handleGameStart = (gameMode: "CPU" | "PLAYER2") => {
    onGameStart(selectedMark, gameMode);
  };

  return (
    <main className={styles.newGameMenu}>
      <div className={styles.logo}>
        <img src="./assets/logo.svg" alt="XO Logo" />
      </div>

      <div className={styles.pickPlayerMark}>
        <p className="heading-s">PICK PLAYER 1'S MARK</p>
        <div className={styles.markSelector}>
          <button
            className={selectedMark === "X" ? styles.active : ""}
            onClick={() => setSelectedMark("X")}
            aria-label="Choose X"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 64 64"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z" />
            </svg>
          </button>
          <button
            className={selectedMark === "O" ? styles.active : ""}
            onClick={() => setSelectedMark("O")}
            aria-label="Choose O"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 64 64"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z" />
            </svg>
          </button>
        </div>
        <p className="heading-xs">REMEMBER : X GOES FIRST</p>
      </div>

      <div className={styles.newGameButtons}>
        <button
          className="buttonPrimary yellow"
          onClick={() => handleGameStart("CPU")}
        >
          NEW GAME (VS CPU)
        </button>
        <button
          className="buttonPrimary turquoise"
          onClick={() => handleGameStart("PLAYER2")}
        >
          NEW GAME (VS PLAYER)
        </button>
      </div>
    </main>
  );
}
