import { useFormik } from "formik";
import styles from "./createblogpost.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import BlogAPI from "../../api/blog";
import { useNavigate } from "react-router-dom";

const CreateBlogPost = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationKey: ["create-new-blog-post"],
    mutationFn: (values) => BlogAPI().createNewPost(values),
    onSuccess: () => {
      queryClient.invalidateQueries(["fetch-blog-list"]).then(() => {
        navigate("/bloglist");
      });
    },
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      body: "",
    },
    onSubmit: async (values) => {
      mutation.mutate(values);
    },
  });
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Create Post</h1>
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
          {mutation.isLoading ? "POSTING" : "POST"}
        </button>
      </form>
    </div>
  );
};

export default CreateBlogPost;
