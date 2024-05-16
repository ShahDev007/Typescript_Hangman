import { Route, Routes } from "react-router-dom";
import Game from "./Game";
import Home from "./Home";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/game" element={<Game/>} />
    </Routes>
  );
};

export default App;
