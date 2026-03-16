import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const Wrapper = () => {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <Outlet />
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Wrapper;
