type HangWordProps = {
  wordToGuess: string;
  guessedLetters: string[];
  reveal?: boolean;
};

const HangmanWord = ({
  wordToGuess,
  guessedLetters,
  reveal = false,
}: HangWordProps) => {
  return (
    <div
      style={{
        textAlign: "center",
        display: "flex",
        gap: ".75rem",
        fontSize: "3rem",
        textTransform: "uppercase",
        fontFamily: "monospace",
        marginTop:"2rem",
      }}
    >
      {wordToGuess.split("").map((letter, index) => (
        <span
          style={{
            borderBottom: ".1em solid white",
            marginBottom: "50px",
            // textAlign: "center",
          }}
          key={index}
        >
          <span
            style={{
              visibility:
                guessedLetters.includes(letter) || reveal
                  ? "visible"
                  : "hidden",

              color:
                !guessedLetters.includes(letter) && reveal ? "red" : "white",
            }}
          >
            {letter}
          </span>
        </span>
      ))}
    </div>
  );
};

export default HangmanWord;
