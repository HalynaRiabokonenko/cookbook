import "./App.css";
import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Recipes from "./components/Recipes/Recipes";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import RecipeDetails from "./components/RecipeDetails/RecipeDetails";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import { ModeProvider } from "./providers/mode";
import NotFound from "./components/NotFound/NotFound";

function App() {
    return (
        <ModeProvider>
            <BrowserRouter>
                <div className="App">
                    <Header />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/recipes" element={<Recipes />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/recipe/:recipeId" element={<RecipeDetails />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                    <Footer />
                </div>
            </BrowserRouter>
        </ModeProvider>
    );
}

export default App;
