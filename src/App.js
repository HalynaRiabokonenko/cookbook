import "./styles/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Recipes from "./components/Recipes/Recipes.tsx";
import About from "./components/AboutPage";
import Contact from "./components/ContactPage";
import RecipeDetails from "./components/Recipes/RecipeDetails/RecipeDetails.tsx";
import MainContent from "./components/MainContent";
import Home from "./components/Home/Home.tsx";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainContent />}>
            <Route path="/" element={<Home />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/recipe/:recipeId" element={<RecipeDetails />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
