import React from "react";
import styles from "./home.module.css";
import { Link, useNavigate } from "react-router-dom";
import CustomButton from "../component/CustomButton";
import BootcampList from "../component/BootcampList";

function Home() {
  const navigate = useNavigate();
  const HandleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/Login");
  };

  const isAuthenticated = !!localStorage.getItem("authToken");

  return (
    <>
      <div className={styles.container}>
        {!isAuthenticated ? (
          <div className={styles.main}>
            <h1 className={styles.pagetitle}> Welcome! Na Project</h1>
            <div className={styles.loginsignup}>
              <div>
                <Link to="/Login">
                  <CustomButton label="Login" />
                </Link>{" "}
              </div>
              <div>
                <Link to="/Signup">
                  <CustomButton
                    label="Sign Up"
                    style={{ backgroundColor: "#fff", color: "#007bff" }}
                  />
                </Link>{" "}
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.submain}>
            <BootcampList />
            <button onClick={HandleLogout}>Logout</button>
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
