import styles from "./home.module.css";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className={styles.allmain}>
      <div className={styles.container}>
        <h1 className={styles.text}>Welcome</h1>
      </div>
    </div>
  );
}

export default Home;
