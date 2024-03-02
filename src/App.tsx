import "./App.css";
import React from "react";
import { Routes, Route, BrowserRouter, HashRouter } from "react-router-dom";
import Recipes from "./components/pages/Recipes/Recipes";
import About from "./components/pages/About/About";
import Contact from "./components/pages/Contact/Contact";
import RecipeDetails from "./components/pages/RecipeDetails/RecipeDetails";
import Header from "./components/share_structures/Header/Header";
import Footer from "./components/share_structures/Footer/Footer";
import Home from "./components/pages/Home/Home";
import { ModeProvider } from "./providers/mode";
import NotFound from "./components/pages/NotFound/NotFound";
import Registration from "./components/pages/Authentication/Registration";
import Login from "./components/pages/Authentication/Login";

function App() {
    return (
        <ModeProvider>
            <HashRouter>
                <div className="App">
                    <Header />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/recipes" element={<Recipes />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/recipe/:recipeId" element={<RecipeDetails />} />
                        <Route path="/auth/registration" element={<Registration />} />
                        <Route path="/auth/login" element={<Login />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                    <Footer />
                </div>
            </HashRouter>

        </ModeProvider>
    );
}

export default App;
