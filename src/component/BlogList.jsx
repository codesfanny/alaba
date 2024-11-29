import { useQuery } from "@tanstack/react-query";
import Loading from "./Loading";
import ErrorPage from "./ErrorPage";
import Blog from "./Blog";
import BlogAPI from "../../api/blog";
import styles from "./bloglist.module.css";
import { useNavigate } from "react-router-dom";

const BlogList = () => {
  const navigate = useNavigate();
  const { isPending, error, data } = useQuery({
    queryFn: () => BlogAPI().fetchAllPosts(),
    queryKey: ["fetch-blog-list"],
  });

  if (isPending) {
    return <Loading />;
  }

  if (error) {
    return <ErrorPage />;
  }

  const handleNavigate = () => {
    navigate("/createblogpost");
  };

  return (
    <div className={styles.container}>
      <div className={styles.headbtn}>
        <h1>My blogs</h1>
        <button className={styles.btn} onClick={handleNavigate}>
          + Create Post
        </button>
      </div>
      <div className={styles.grid}>
        {data.map((value) => (
          <Blog {...value} key={value.id} />
        ))}
      </div>
    </div>
  );
};

export default BlogList;
