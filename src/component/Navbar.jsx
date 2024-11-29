import { Link, useNavigate } from "react-router-dom";
import styles from "./navbar.module.css";
import authContext from "../contexts/authContext";
import { useContext } from "react";

const Navbar = ({ isAuthenticated }) => {
  const { setAuth, auth } = useContext(authContext);

  const navigate = useNavigate();

  const HandleLogout = () => {
    setAuth(null);
    localStorage.removeItem("authToken");
    navigate("/Login");
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/">Na Project</Link>
      </div>
      <ul className={styles.navLinks}>
        {!auth ? (
          <>
            <li>
              <Link to="/Login">Login</Link>
            </li>
            <li>
              <Link to="/Signup">SignUp</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/BlogList">Blog</Link>
            </li>

            <button className={styles.btn} onClick={HandleLogout}>
              Logout
            </button>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
