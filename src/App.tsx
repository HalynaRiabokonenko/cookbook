import "./App.css";
import React, { useState } from "react";
import { Routes, Route, HashRouter } from "react-router-dom";
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
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../src/api/firebaseConfig";

function App() {
    const [user, setUser] = useState(null);
    onAuthStateChanged(auth, (res) => {
        setUser(res);
    });

    return (
        <ModeProvider>
            <HashRouter>
                <div className="App">
                    <Header user={user} />
                    <Routes>
                        {user ? (<>
                            <Route path="/recipes" element={<Recipes />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/recipe/:recipeId" element={<RecipeDetails />} />
                        </>) : (<>
                            <Route path="/sign-up" element={<Registration />} />
                            <Route path="/login" element={<Login />} />
                        </>)}
                        <Route path="*" element={<NotFound />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/" element={<Home user={user} />} />
                    </Routes>
                    <Footer />
                </div>
            </HashRouter>

        </ModeProvider>
    );
}

export default App;
