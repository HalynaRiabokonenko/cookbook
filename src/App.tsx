import React, { useState } from "react";
import { Routes, Route, HashRouter } from "react-router-dom";
import "./App.css";
import Recipes from "./components/pages/Recipes/Recipes";
import About from "./components/pages/About/About";
import Contact from "./components/pages/Contact/Contact";
import RecipeDetails from "./components/pages/RecipeDetails/RecipeDetails";
import Header from "./components/share_structures/Header/Header";
import Footer from "./components/share_structures/Footer/Footer";
import Home from "./components/pages/Home/Home";
import { ModeProvider } from "./providers/mode";
import NotFound from "./components/pages/NotFound/NotFound";
import Login from "./components/pages/Login/Login";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../src/api/firebaseConfig";
import { User } from "firebase/auth";
import SignUp from "./components/pages/SignUp/SignUp";
import { UpButton } from "./components/share_atomic/UpButton/UppButton";
import { Account } from "./components/pages/Account/Account";
import { RecipesContent } from "./components/share_structures/Recipes/RecipesContent/RecipesContent";

function App() {
    const [user, setUser] = useState<User | null>(null);
    onAuthStateChanged(auth, (res) => {
        setUser(res);
    });

    return (
        <ModeProvider>
            <HashRouter>
                <div className="App">
                    <Header user={user} />
                    <Routes>
                        {user ? (
                            <>
                                <Route path="/account" element={<Account />} />
                            </>
                        ) : (
                            <>
                                <Route path="/sign-up" element={<SignUp />} />
                                <Route path="/login" element={<Login />} />
                            </>
                        )}
                        <Route path="/recipes" element={<Recipes />} >
                            <Route path=":option" element={<RecipesContent />} />
                        </Route>
                        <Route path="/recipes/:option/:recipeId" element={<RecipeDetails />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/" element={<Home />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                    <Footer user={user} />
                    <UpButton />
                </div>
            </HashRouter>
        </ModeProvider>
    );
}

export default App;
