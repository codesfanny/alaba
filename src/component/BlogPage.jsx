import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import BlogAPI from "../../api/blog";
import Loading from "./Loading";
import ErrorPage from "./ErrorPage";
import Blog404 from "./Blog404";
import styles from "./blogpage.module.css";

const BlogPage = () => {
  const { id: blogID } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isPending, error, data } = useQuery({
    queryFn: () => BlogAPI().getSinglePost(blogID),
    queryKey: ["fetch-single-blog-post", blogID],
    retry: 1,
  });

  const mutation = useMutation({
    mutationFn: () => BlogAPI().deleteSinglePost(blogID),
    mutationKey: ["delete-single-blog-post", blogID],
    onSuccess: () => {
      queryClient.invalidateQueries(["fetch-single-blog-post", blogID]);
    },
  });

  const routeToEdit = () => {
    navigate(`/blog/${blogID}/edit`);
  };

  const handleDelete = () => {
    mutation.mutate();
    navigate(`/bloglist`);
  };

  if (isPending) return <Loading />;

  if (error) {
    console.log("error: ", error);
    if (error.status === 404) return <Blog404 />;
    return <ErrorPage />;
  }

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.titleBody}>
          <h1 className={styles.title}>{data.title}</h1>
          <p className={styles.content}>{data.body}</p>
        </div>
        <div className={styles.theBtns}>
          <button className={styles.btn} onClick={routeToEdit}>
            EDIT
          </button>
          <button className={styles.btntwo} onClick={handleDelete}>
            DELETE
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
