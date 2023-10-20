import "./styles/App.css";
import Header from "../src/components/Header";
import Main from "../src/components/Main";
import Footer from "../src/components/Footer";
import { BrowserRouter as Router } from "react-router-dom";

import AppRouter from "./components/AppRouter"; // Правильный импорт компонента маршрутизатора

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        {/* <div className="content">
          <AppRouter />
        </div> */}
        <Main />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
