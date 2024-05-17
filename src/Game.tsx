import { useEffect, useState } from "react";
import HangmanDrawing from "./HangmanDrawing";
import HangmanWord from "./HangmanWord";
import Keyboard from "./Keyboard";
import "bootstrap/dist/css/bootstrap.min.css";
import Alert from "react-bootstrap/Alert";
import { useLocation, useNavigate } from "react-router-dom";
import wordCategories from "./wordList.tsx";
import backgroundImage from "./image2.jpg";
import "./Game.css";
import { Helmet, HelmetProvider } from "react-helmet-async";

// import Button from "react-bootstrap/Button";

type importedData = {
  category: string;
  difficulty: string;
  wordCategories: {};
};

type Letter = {
  letter1: string;
  letter2: string;
};

function getWord({ category, difficulty, wordCategories }: importedData) {
  let cat = (wordCategories as any)[category];

  if (difficulty === "easy") {
    cat = cat.filter((word: string) => word.length <= 5);
  } else if (difficulty === "difficult") {
    cat = cat.filter((word: string) => word.length > 5);
  }
  console.log(cat);

  const word = cat[Math.floor(Math.random() * cat.length)];
  if (word) {
    return word.replace(/\s+/g, "");
  }
}

function Game() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const category = location.state?.category;
  const difficulty = location.state?.difficulty;

  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  const [wordToGuess] = useState(
    getWord({ category, difficulty, wordCategories })
  );
  // console.log(wordToGuess);

  const incorrectLetters = guessedLetters.filter(
    (letter) => !wordToGuess.includes(letter)
  );

  const isLoser = incorrectLetters.length >= 6;

  const isWinner = wordToGuess
    .split("")
    .every((letter: string) => guessedLetters.includes(letter));

  // Add guessedLetters function
  const addGuessedLetter = (letter: string) => {
    console.log("Guessed letters", guessedLetters);
    if (guessedLetters.includes(letter) || isLoser || isWinner) return;
    setGuessedLetters((currentGuessedLetters) => [
      ...currentGuessedLetters,
      letter,
    ]);
  };

  // Loader
  useEffect(() => {
    if (isLoser || isWinner) {
      setLoading(true);
      console.log("Here", isLoser, isWinner);
      // Simulate a 10-second delay before redirecting
      setTimeout(() => {
        navigate("/");
      }, 10000); // 10 seconds
    }
  }, [isLoser, isWinner]);

  // Add guessed letter
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

  // Initial guesssing

  const initialGuessing = ({ letter1, letter2 }: Letter) => {
    addGuessedLetter(letter1);
    addGuessedLetter(letter2);
  };
  useEffect(() => {
    console.log(guessedLetters, wordToGuess);

    const getRandomLetters = () => {
      const randomIndex1 = Math.floor(Math.random() * wordToGuess.length);
      let randomIndex2 = Math.floor(Math.random() * wordToGuess.length);
      while (randomIndex2 === randomIndex1) {
        randomIndex2 = Math.floor(Math.random() * wordToGuess.length);
      }
      const letter1 = wordToGuess[randomIndex1];
      const letter2 = wordToGuess[randomIndex2];
      return { letter1, letter2 };
    };

    // Initialize guessing with two random letters
    const { letter1, letter2 } = getRandomLetters();
    initialGuessing({ letter1, letter2 });
  }, []);

  return (
    <HelmetProvider>
      <div
        style={{
          background: `url(${backgroundImage})`,
          backgroundSize: "cover",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          // justifyContent: "center",
          alignItems: "center",
          // padding: "2rem",
          color: "white",
          backgroundRepeat: "no-repeat",
          
        }}
      >
        <div
          style={{ fontSize: "1rem", textAlign: "center", marginTop: "2rem"}}
        >
          <Helmet>
            <link
              href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
              rel="stylesheet"
            />
          </Helmet>
          {isWinner && (
            <Alert
              key="success"
              variant="success"
              style={{ borderRadius: "5px 5px 5px 5px" }}
            >
              <b>
                You got the word, play again!!
              </b>
              {loading && (
                <div className="progress-container" style={{marginTop:"10px"}}>
                  <div className="progress">
                    <div className="color"></div>
                  </div>
                </div>
              )}
            </Alert>
          )}
          {isLoser && (
            <Alert key="dark" variant="dark">
              <b>You are out of trials, try again!!</b>
              {loading && (
                <div className="progress-container">
                  <div className="progress">
                    <div className="color"></div>
                  </div>
                </div>
              )}
            </Alert>
          )}
        </div>

        <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
        <HangmanWord
          reveal={isLoser}
          guessedLetters={guessedLetters}
          wordToGuess={wordToGuess}
        />
        <div style={{ alignSelf: "stretch",marginTop:"10px" }}>
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
    </HelmetProvider>
  );
}

export default Game;

// useEffect(() => {
//   const handler = (e: KeyboardEvent) => {
//     const key = e.key;
//     if (key !== "Enter") return;
//     e.preventDefault();
//     setWordToGuess(getWord({ category, difficulty, wordCategories }));
//     setGuessedLetters([]);
//   };
//   document.addEventListener("keypress", handler);
//   return () => {
//     document.removeEventListener("keypress", handler);
//   };
// }, []);
