import { useCallback, useEffect, useRef, useState } from "react";
import HangmanDrawing from "./HangmanDrawing";
import HangmanWord from "./HangmanWord";
import Keyboard from "./Keyboard";
import "bootstrap/dist/css/bootstrap.min.css";
import Alert from "react-bootstrap/Alert";
import { useLocation } from "react-router-dom";
import wordCategories from "./wordList.tsx";
// import Button from "react-bootstrap/Button";

type importedData = {
  category: string;
  difficulty: string;
  wordCategories: {};
};

function getWord({ category, difficulty, wordCategories }: importedData) {
  let cat = (wordCategories as any)[category];

  if (difficulty === "easy") {
    cat = cat.filter((word: string) => word.length <= 5);
  } else if (difficulty === "difficult") {
    cat = cat.filter((word: string) => word.length > 5);
  }
  console.log(cat);

  return cat[Math.floor(Math.random() * cat.length)];
}

function Game() {
  const location = useLocation();
  const category = location.state?.category;
  const difficulty = location.state?.difficulty;

  const [wordToGuess, setWordToGuess] = useState(
    getWord({ category, difficulty, wordCategories })
  );
  console.log(wordToGuess);

  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  const incorrectLetters = guessedLetters.filter(
    (letter) => !wordToGuess.includes(letter)
  );

  const isLoser = incorrectLetters.length >= 10;

  const isWinner = wordToGuess
    .split("")
    .every((letter: string) => guessedLetters.includes(letter));

  const addGuessedLetter = (letter: string) => {
    console.log("Guessed letters", guessedLetters);
    if (guessedLetters.includes(letter) || isLoser || isWinner) return;
    setGuessedLetters((currentGuessedLetters) => [
      ...currentGuessedLetters,
      letter,
    ]);
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      if (!key.match(/^[a-z]$/)) {
        console.log("Inside useEffect");
        return;
      }
      e.preventDefault();
      console.log("Key is", key);
      addGuessedLetter(key);
    };
    document.addEventListener("keypress", handler);
    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, [guessedLetters]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      if (key !== "Enter") return;
      e.preventDefault();
      setWordToGuess(getWord({ category, difficulty, wordCategories }));
      setGuessedLetters([]);
    };
    document.addEventListener("keypress", handler);
    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, []);

  return (
    <div
      style={{
        maxWidth: "800px",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        margin: "0 auto",
        alignItems: "center",
        backgroundColor: "#ffe5c8"
      }}
    >
      <div style={{ fontSize: "1rem", textAlign: "center", paddingTop: "5px" }}>
        {isWinner && (
          <Alert key="primary" variant="primary">
            You got the word, play again!!
          </Alert>
        )}
        {isLoser && (
          <Alert key="danger" variant="danger">
            You are out of trials, try again!
          </Alert>
        )}
      </div>

      <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
      <HangmanWord
        reveal={isLoser}
        guessedLetters={guessedLetters}
        wordToGuess={wordToGuess}
      />
      <div style={{ alignSelf: "stretch" }}>
        <Keyboard
          disabled={isWinner || isLoser}
          activeLetters={guessedLetters.filter((letter) =>
            wordToGuess.includes(letter)
          )}
          inactiveLetters={incorrectLetters}
          addGuessedLetter={addGuessedLetter}
        />
      </div>
    </div>
  );
}

export default Game;
