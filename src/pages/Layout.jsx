import { Outlet } from "react-router-dom";
import Navbar from "../component/Navbar";
import { useEffect, useState } from "react";

const Layout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("authToken")
  );

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem("authToken"));
  }, []);

  return (
    <div>
      <Navbar isAuthenticated={isAuthenticated} />
      <Outlet />
    </div>
  );
};

export default Layout;
