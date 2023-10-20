import "./styles/App.css";
import Home from "../src/components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Recipes from "../src/components/Recipes";
import About from "../src/components/About";
import Contact from "../src/components/Contact";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
