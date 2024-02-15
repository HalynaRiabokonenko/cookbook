import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

function MainContent() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default MainContent;
