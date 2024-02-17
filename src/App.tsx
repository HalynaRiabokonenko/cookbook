import "./App.css";
import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Recipes from "./components/Recipes/Recipes";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import RecipeDetails from "./components/Recipes/RecipeDetails/RecipeDetails";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/recipes" element={<Recipes />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/recipe/:recipeId" element={<RecipeDetails />} />
                </Routes>
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;
