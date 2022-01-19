import React, { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router";

import ModalSignin from "src/components/Modals/ModalSignin";

import styles from "src/components/Signup.module.scss";

const Signin = () => {
  const [modalActive, setModalActive] = useState(false);
  const [responseStatus, setResponseStatus] = useState(null);

  const navigate = useNavigate();

  const loginHandler = async (values, { setSubmitting }) => {
    const payload = {
      email: values.email,
      password: values.password,
    };
    try {
      const response = await axios.post("/api/auth/login", payload, {
        headers: {
          "Content-type": "application/json",
        },
      });
      console.log(response.data);
      localStorage.setItem("values", JSON.stringify(values));
      navigate("/profile");
    } catch (err) {
      setResponseStatus(err.response.status);
      console.log(err.response.status);
    } finally {
      setSubmitting(false);
    }
    setModalActive(true);
  };

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
        onSubmit={loginHandler}
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
      <ModalSignin
        active={modalActive}
        setActive={setModalActive}
        responseStatus={responseStatus}
      />
    </div>
  );
};

export default Signin;
