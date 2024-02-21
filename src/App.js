import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Recipes from "./components/Recipes/Recipes.tsx";
import About from "./components/About/About.tsx";
import Contact from "./components/Contact/Contact.tsx";
import RecipeDetails from "./components/Recipes/RecipeDetails/RecipeDetails.tsx";
import Main from "./components/Main/Main.tsx";
import Home from "./components/Home/Home.tsx";
import { ModeProvider } from "./providers/mode.tsx";

function App() {
  return (
    <ModeProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Main />}>
              <Route path="/" element={<Home />} />
              <Route path="/recipes" element={<Recipes />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/recipe/:recipeId" element={<RecipeDetails />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </ModeProvider>
  );
}

export default App;
