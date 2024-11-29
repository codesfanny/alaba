import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import customInstance from "../axiosInstance";
import styles from "./signup.module.css";
import authContext from "../contexts/authContext";

const Signup = () => {
  const navigate = useNavigate();
  const { setAuth } = useContext(authContext);
  return (
    <div className={styles.signuppage}>
      <h1>Signup</h1>
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          if (!values.password) {
            errors.password = "Required";
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          customInstance
            .post("/register", values)
            .then((res) => {
              const data = res.data;
              setAuth({
                id: data.user_id,
                email: data.email,
                token: data.token,
              });
              localStorage.setItem("authToken", data.token);
              alert("Account Created Successfully");
              // TODO: route to the next page
              navigate("/");
            })
            .catch((error) => {
              console.error(
                "Error response:",
                error.response?.data || error.message
              );
              alert(
                error.response?.data?.message ||
                  "Signup failed. Please try again."
              );
              setSubmitting(false);
            });
        }}
      >
        {({ isSubmitting }) => (
          <Form className={styles.mainform}>
            <Field type="email" name="email" placeholder="Email" />
            <ErrorMessage name="email" component="div" />
            <Field type="password" name="password" placeholder="Password" />
            <ErrorMessage name="password" component="div" />
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Signup;
