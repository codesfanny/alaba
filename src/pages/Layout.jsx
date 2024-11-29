import { Outlet } from "react-router-dom";
import Navbar from "../component/Navbar";

const Layout = () => {
  const isAuthenticated = !!localStorage.getItem("authToken");
  return (
    <div>
      <Navbar isAuthenticated={isAuthenticated} />
      <Outlet />
    </div>
  );
};

export default Layout;
