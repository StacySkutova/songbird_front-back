import React from "react";
import "react-router";
import { Formik } from "formik";
import * as yup from "yup";
import { createBrowserHistory } from "history";

import styles from "src/components/Signup.module.scss";

const Signin = () => {
  const history = createBrowserHistory();

  const validationsSchema = yup.object().shape({
    email: yup.string().email("Enter the correct E-mail").required("Required"),
    password: yup.string().typeError("Should be a string").required("Required"),
  });

  return (
    <div>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validateOnBlur
        onSubmit={(values) => {
          localStorage.setItem("values", JSON.stringify(values));
          history.push("/profile");
          window.location.reload(true);
        }}
        validationSchema={validationsSchema}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          isValid,
          handleSubmit,
          dirty,
        }) => (
          <div className={styles.signForm}>
            <p>
              <div>
                <label htmlFor="email">E-mail</label>
              </div>
              <div>
                <input
                  className={styles.field}
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
              </div>
            </p>
            {touched.email && errors.email && <p>{errors.email}</p>}
            <p>
              <div>
                <label htmlFor="password">Password</label>
              </div>
              <div>
                <input
                  className={styles.field}
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
              </div>
            </p>
            {touched.password && errors.password && <p>{errors.password}</p>}
            <button
              className={styles.submitButton}
              disabled={!isValid || !dirty}
              onClick={handleSubmit}
              type="submit"
            >
              Submit
            </button>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default Signin;
