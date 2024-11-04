import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import customInstance from "../axiosInstance";
import styles from "./signup.module.css";

const Signup = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.signuppage}>
      <h1>Signup</h1>
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
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
              "/api/v1/auth/register",
              values
            );
            console.log(response.data);
            setTimeout(() => {
              alert("Account Created Successfully");
              setSubmitting(false);
            }, 400);
            navigate("/");
          } catch (error) {
            console.error(
              "Error response:",
              error.response?.data || error.message
            );
            alert(
              error.response?.data?.message ||
                "Signup failed. Please try again."
            );
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className={styles.mainform}>
            <Field type="username" name="name" placeholder="Username" />
            <ErrorMessage name="name" component="div" />
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
