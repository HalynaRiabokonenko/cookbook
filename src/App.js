import "./styles/App.css";
import Home from "./components/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Recipes from "./components/RecipesPage";
import About from "./components/AboutPage";
import Contact from "./components/ContactPage";

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
