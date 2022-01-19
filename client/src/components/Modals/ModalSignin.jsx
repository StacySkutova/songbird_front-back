import React from "react";
import cn from "classnames";

import styles from "src/components/Modals/Modal.module.scss";

const ModalSignin = ({ active, setActive, responseStatus }) => {
  return (
    <div
      className={cn([styles.modal, { [styles.active]: active === true }])}
      onClick={() => setActive(false)}
    >
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <h1>ERROR {responseStatus}</h1>
        {responseStatus === 401 ? (
          <p>Such user has been not found</p>
        ) : responseStatus === 400 ? (
          <p>Password has been entered incorrectly</p>
        ) : (
          <p>Errors</p>
        )}
      </div>
    </div>
  );
};

export default ModalSignin;
