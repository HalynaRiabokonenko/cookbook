import "./styles/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Recipes from "./components/RecipesPage";
import About from "./components/AboutPage";
import Contact from "./components/ContactPage";
import RecipeDetails from "./components/RecipeDetailsPage";
import MainContent from "./components/MainContent";
import HomeContent from "./components/Home/Home";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainContent />}>
            <Route path="/" element={<HomeContent />} />
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
