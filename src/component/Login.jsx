import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import customInstance from "../axiosInstance";
import { Link, useNavigate } from "react-router-dom";
import styles from "./login.module.css";

const Login = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.signinpage}>
      <h1>Login</h1>
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
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const response = await customInstance.post(
              "/api/v1/auth/login",
              values
            );
            localStorage.setItem("authToken", response.data.token);
            navigate("/");
          } catch (error) {
            console.error("Login failed:", error);
            alert("Login failed. Please check your credentials.");
          }
          setSubmitting(false);
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

      <Link to="/Signup">Signup</Link>
    </div>
  );
};

export default Login;
