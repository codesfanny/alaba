import { useNavigate } from "react-router-dom";
import styles from "./blog.module.css";

const Blog = ({ title, body, id }) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/blog/${id}`);
  };
  return (
    <div className={styles.container}>
      <div>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.content}>{body}</p>
      </div>
      <button onClick={handleNavigate} className={styles.btn}>
        VIEW MORE
      </button>
    </div>
  );
};

export default Blog;
