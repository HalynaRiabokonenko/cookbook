import React, { useState } from "react";
import "./App.css";
import { Routes, Route, HashRouter } from "react-router-dom";
import { Recipes } from "./components/pages/Recipes/Recipes";
import { Contact } from "./components/pages/Contact/Contact";
import { RecipeDetails } from "./components/pages/RecipeDetails/RecipeDetails";
import { Header } from "./components/structures/Header/Header";
import { Footer } from "./components/structures/Footer/Footer";
import { Home } from "./components/pages/Home/Home";
import { ModeProvider } from "./providers/mode";
import { NotFound } from "./components/pages/NotFound/NotFound";
import { Login } from "./components/pages/Login/Login";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../src/api/firebaseConfig";
import { User } from "firebase/auth";
import { SignUp } from "./components/pages/SignUp/SignUp";
import { UpButton } from "./components/atomic/UpButton/UppButton";
import { Account } from "./components/pages/Account/Account";
import { RecipesContent } from "./components/structures/Recipes/RecipesContent/RecipesContent";
import { ChangePassword } from "./components/pages/ChangePassword/ChangePassword";
import { DeleteAccount } from "./components/pages/DeleteAccount/DeleteAccount";
import { AccountDeleted } from "./components/pages/AccountDeleted/AccountDeleted";
import { ResetPassword } from "./components/pages/ResetPassword/ResetPassword";
import { ScrollToTop } from "./components/utils/ScrollToTop";
import { Favorites } from "./components/pages/Favorites/Favorites";

export const App = () => {
    const [user, setUser] = useState<User | null>(null);
    onAuthStateChanged(auth, (res) => {
        setUser(res);
    });

    return (
        <ModeProvider>
            <HashRouter>
                <div className="App">
                    <Header user={user} />
                    <ScrollToTop>
                        <Routes>
                            {user ? (
                                <>
                                    <Route path="/favorites" element={<Favorites user={user} />} />
                                    <Route path="/account" element={<Account user={user} />} />
                                    <Route path="/change-password" element={<ChangePassword user={user} />} />
                                    <Route path="/contact" element={<Contact user={user} />} />
                                    <Route path="/delete-account" element={<DeleteAccount user={user} />} />
                                </>
                            ) : (
                                <>
                                    <Route path="/sign-up" element={<SignUp />} />
                                    <Route path="/login" element={<Login />} />
                                    <Route path="/reset-password" element={<ResetPassword />} />
                                </>
                            )}
                            <Route path="/recipes" element={<Recipes user={user} />} >
                                <Route path=":option" element={<RecipesContent user={user} />} />
                            </Route>
                            <Route path="/recipes/:option/:recipeId" element={<RecipeDetails user={user} />} />
                            <Route path="/" element={<Home />} />
                            <Route path="*" element={<NotFound />} />
                            <Route path="/account-deleted" element={<AccountDeleted />} />
                        </Routes>
                    </ScrollToTop>
                    <Footer user={user} />
                    <UpButton />
                </div>
            </HashRouter>
        </ModeProvider>
    );
}