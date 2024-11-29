import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import BlogAPI from "../../api/blog";
import Loading from "./Loading";
import ErrorPage from "./ErrorPage";
import { useEffect } from "react";
import styles from "./blogedit.module.css";

const BlogEdit = () => {
  const { id: blogID } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isPending, error, data } = useQuery({
    queryFn: () => BlogAPI().getSinglePost(blogID),
    queryKey: ["fetch-single-blog-post", blogID],
  });

  const mutation = useMutation({
    mutationKey: ["edit-single-post", blogID],
    mutationFn: (values) => BlogAPI().editSinglePost(blogID, values),
    onSuccess: () => {
      queryClient
        .invalidateQueries(["fetch-single-blog-post", blogID])
        .then(() => {
          navigate(`/blog/${blogID}/`);
        });
    },
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      body: "",
    },
    onSubmit: async (values) => {
      mutation.mutate({
        title: values.title,
        content: values.body,
      });
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    if (data === undefined) return;
    formik.setValues({
      title: data.title,
      body: data.body,
    });
  }, [data]);

  if (isPending) return <Loading />;
  if (error) return <ErrorPage />;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Edit Post</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className={styles.formgroup}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            {...formik.getFieldProps("title")}
          />
        </div>

        <div className={styles.formgroup}>
          <label htmlFor="body">Body</label>
          <textarea
            type="text"
            name="body"
            id="body"
            {...formik.getFieldProps("body")}
          />
        </div>
        <button className={styles.btn} type="submit">
          {mutation.isLoading ? "UPDATING" : "UPDATE"}
        </button>
      </form>
    </div>
  );
};

export default BlogEdit;
