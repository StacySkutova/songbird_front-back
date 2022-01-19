import React, { createRef } from "react";

import styles from "src/components/Profile/Profile.module.scss";

const Profile = () => {
  const newProfileData = JSON.parse(localStorage.getItem("values"));

  const applyButtonRef = createRef();

  const showPassword = () => {
    if (applyButtonRef.current.type === "password") {
      applyButtonRef.current.type = "text";
    } else {
      applyButtonRef.current.type = "password";
    }
  };

  return (
    <div className={styles.container}>
      <h2>Ваш личный кабинент</h2>
      <div>Ваш E-mail: {newProfileData["email"]}</div>
      <div>
        Ваш пароль:
        <input
          type="password"
          value={newProfileData["password"]}
          className={styles.password}
          ref={applyButtonRef}
        />
        <button className={styles.button} onClick={showPassword}>
          Show
        </button>
      </div>
    </div>
  );
};

export default Profile;
