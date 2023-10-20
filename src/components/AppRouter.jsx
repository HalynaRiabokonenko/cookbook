import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import App from "../App";
import Recipes from "./Recipes";
import About from "./About";
import Contact from "./Contact";

const AppRouter = () => {
  return (
    <Router>
      <div>
        <Route exact path="/" component={App} />
        <Route path="/recipes" component={Recipes} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
      </div>
    </Router>
  );
};

export default AppRouter;
