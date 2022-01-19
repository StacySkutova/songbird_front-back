import React, { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";

import ModalSignup from "src/components/Modals/ModalSignup";

import styles from "src/components/Signup.module.scss";

const Signup = () => {
  const [modalActive, setModalActive] = useState(false);
  const [responseStatus, setResponseStatus] = useState(null);

  const registerHandler = async (values, { setSubmitting }) => {
    const payload = {
      username: values.name,
      email: values.email,
      password: values.password,
    };
    try {
      const response = await axios.post("/api/auth/registration", payload);
      console.log(response.data);
    } catch (err) {
      setResponseStatus(err.response.status);
      console.log(err.response.status);
    } finally {
      setSubmitting(false);
    }
    setModalActive(true);
  };

  const validationsSchema = yup.object().shape({
    name: yup.string().typeError("Should be a string").required("Required"),
    email: yup.string().email("Enter the correct e-mail").required("Required"),
    password: yup
      .string()
      .typeError("Should be a string")
      .min(5, "Password must be at least 5 characters")
      .max(10, "Password must be max 10 characters")
      .required("Required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords are not the same")
      .required("Required"),
    checkbox: yup.boolean().oneOf([true], "Must accept Terms and Conditions"),
  });

  return (
    <div>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          checkbox: false,
        }}
        validateOnBlur
        onSubmit={registerHandler}
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
                <label htmlFor="name">Username</label>
              </div>
              <div>
                <input
                  className={styles.field}
                  type="text"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                />
              </div>
            </p>
            {touched.name && errors.name && (
              <p className={styles.warning}>{errors.name}</p>
            )}
            <p>
              <div>
                <label htmlFor="email">Email</label>
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
            {touched.email && errors.email && (
              <p className={styles.warning}>{errors.email}</p>
            )}
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
            {touched.password && errors.password && (
              <p className={styles.warning}>{errors.password}</p>
            )}
            <p>
              <div>
                <label htmlFor="confirmPassword">
                  Please confirm the password
                </label>
              </div>
              <div>
                <input
                  className={styles.field}
                  type="password"
                  name="confirmPassword"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.confirmPassword}
                />
              </div>
            </p>
            {touched.confirmPassword && errors.confirmPassword && (
              <p className={styles.warning}>{errors.confirmPassword}</p>
            )}
            <p>
              <input
                className={styles.checkboxItem}
                type="checkbox"
                name="checkbox"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.checkbox}
              />

              <label htmlFor="checkbox">
                I accept the Terms and Conditions.
              </label>
            </p>
            {errors.checkbox && <p>{errors.checkbox}</p>}
            <button
              className={styles.submitButton}
              disabled={!isValid || !dirty}
              onClick={handleSubmit}
              type="submit"
            >
              Register
            </button>
          </div>
        )}
      </Formik>
      <ModalSignup
        active={modalActive}
        setActive={setModalActive}
        responseStatus={responseStatus}
      />
    </div>
  );
};

export default Signup;
