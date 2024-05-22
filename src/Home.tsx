import { useState } from "react";
import { useNavigate } from "react-router-dom";
import wordCategories from "./wordList.tsx";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import backgroundImage from "../public/image2.jpg";
import hangman from "../public/image3.png";
// import hangman from "../public/image.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
import { Helmet } from "react-helmet";

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
    <>
      <div
        style={{
          background: `url(${backgroundImage})`,
          backgroundSize: "cover",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          //   justifyContent: "center",
          alignItems: "center",
          padding: "2rem",
          color: "white",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Helmet>
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
            rel="stylesheet"
          />
        </Helmet>

        <div style={{ position: "relative", textAlign: "center" }}>
          <img src={hangman} alt="Nothing" style={{}} />
          <h1
            style={{
              position: "absolute",
              top: "15%",
              left: "50%",
              fontSize: "300%",
              transform: "translate(-50%, -50%)",
              fontFamily: "Montserrat, sans-serif",
            }}
          >
            HANGMAN
          </h1>
        </div>

        {/* <div style={{ border:"2px solid white" }}> */}
        <div
          style={{
            position: "absolute",
            top: "17rem",
            transform: "translateY(-50%)",
          }}
        >
          <Form.Select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              //   margin: "auto",
              marginBottom: "25px",
              maxWidth: "200px",
              color: "white",
              backgroundColor: "green",
              border: "2px solid white",
            }}
          >
            <option value="" style={{ maxWidth: "10px" }}>
              Select Category
            </option>
            {Object.keys(wordCategories).map((category) => (
              <option
                key={category}
                value={category}
                style={{ maxWidth: "10px", color: "white" }}
              >
                {category}
              </option>
            ))}
          </Form.Select>
        </div>
        <div
          style={{
            position: "absolute",
            top: "20rem",
            transform: "translateY(-50%)",
          }}
        >
          <Form.Select
            id="difficulty"
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            style={{
              maxWidth: "200px",
              //   margin: "auto"
              color: "white",
              backgroundColor: "green",
              border: "2px solid white",
            }}
          >
            <option value="">Select Difficulty</option>
            <option value="easy">Easy</option>
            <option value="difficult">Difficult</option>
          </Form.Select>
        </div>
        <Button
          onClick={handleStartGame}
          className="btn"
          style={{
            marginTop: "1rem",
            background: "#007bff",
            border: "none",
            borderRadius: "4px",
            padding: "10px 20px",
            fontSize: "1rem",
            cursor: "pointer",
            backgroundColor: "#333333",
            position: "absolute",
            top: "24rem",
            transform: "translateY(-50%)",
          }}
        >
          Start Game
        </Button>
        {/* </div> */}
        <div style={{ fontSize: "17px", marginTop: "18rem" }}>
          Guess the word and Save the man
        </div>
        <div style={{ textAlign: "center", fontSize: "25px", color: "red" }}>
          Don't let the man hang!!
          {/* <img src="./hanging_man.png" alt="" /> */}
          {/* man hang!! */}
        </div>
      </div>
    </>
  );
};

export default Home;
