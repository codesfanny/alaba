import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import styles from "./login.module.css";
import AuthenticationAPI from "../../api/authentication";
import { h } from "../../libs/helpers";

const api = AuthenticationAPI();

const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 8) {
    errors.password = "Your password needs to be at least 8 characters long";
  }
  return errors;
};

const Login = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    onSubmit: async (values) => {
      api
        .login(values)
        .then((res) => {
          console.log(res);
          localStorage.setItem("authToken", res.data.token);
          navigate("/");
        })
        .catch((e) => {
          if (e.response.status == "401") {
            alert("Login failed. Please check your credentials.");
          } else {
            alert("An error occured. Try again later");
          }
        });
    },
    validate: validate,
  });
  return (
    <div className={styles.signinpage}>
      <h1>Login</h1>
      <form className={styles.mainform} onSubmit={formik.handleSubmit}>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Email"
          {...formik.getFieldProps("email")}
        />
        <div className="email-error">
          {formik.errors.email && formik.touched.email && formik.errors.email}{" "}
        </div>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="Password"
          {...formik.getFieldProps("password")}
        />
        <div className="password-error">
          {formik.errors.password &&
            formik.touched.password &&
            formik.errors.password}{" "}
        </div>
        <button type="submit" disabled={formik.isSubmitting}>
          Submit
        </button>
      </form>

      <Link to="/Signup">Signup</Link>
    </div>
  );
};

export default Login;
