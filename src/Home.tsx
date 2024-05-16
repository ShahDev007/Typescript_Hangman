import { useState } from "react";
import { useNavigate } from "react-router-dom";
import wordCategories from "./wordList.tsx";
import Form from "react-bootstrap/Form";
import { Badge, Button } from "react-bootstrap";
import backgroundImage from "./image.jpg";
import "bootstrap/dist/css/bootstrap.min.css";


const Home = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");

  const handleStartGame = () => {
    if (selectedCategory && selectedDifficulty) {
      navigate("/game", {
        state: {
          category: selectedCategory,
          difficulty: selectedDifficulty,
        },
      });
    } else {
      alert("Please select a category and difficulty level to start the game.");
    }
  };

  return (
    <div
      style={{
        background: `url(${backgroundImage})`,
        backgroundSize: "cover",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
        color: "white", // Text color
        backgroundRepeat: "no-repeat",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Hangman</h1>
      <div>
        <Form.Select
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{
            maxWidth: "300px",
            textAlign: "center",
            margin: "auto",
            marginBottom: "25px",
          }}
        >
          <option value="">-- Select Category --</option>
          {Object.keys(wordCategories).map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Form.Select>
      </div>
      <div>
        <Form.Select
          id="difficulty"
          value={selectedDifficulty}
          onChange={(e) => setSelectedDifficulty(e.target.value)}
          style={{ maxWidth: "300px", textAlign: "center", margin: "auto" }}
        >
          <option value="">-- Select Difficulty --</option>
          <option value="easy">Easy</option>
          <option value="difficult">Difficult</option>
        </Form.Select>
      </div>
      <Button
        onClick={handleStartGame}
        style={{
          marginTop: "1rem",
          background: "#007bff",
          border: "none",
          borderRadius: "4px",
          padding: "10px 20px",
          fontSize: "1rem",
          cursor: "pointer",
        }}
      >
        Start Game
      </Button>
    </div>
  );
};

export default Home;
