import React from "react";
import cn from "classnames";

import styles from "src/components/Modals/Modal.module.scss";

const ModalSignup = ({ active, setActive, responseStatus }) => {
  return (
    <div
      className={cn([styles.modal, { [styles.active]: active === true }])}
      onClick={() => setActive(false)}
    >
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        {responseStatus === null ? (
          <h1>CONGRATS!!!</h1>
        ) : (
          <h1>ERROR {responseStatus}</h1>
        )}
        {responseStatus === null ? (
          <p>User has been successfully created</p>
        ) : responseStatus === 300 ? (
          <p>Such user already exists</p>
        ) : (
          <ul>
            {" "}
            Errors during the registration:
            <li>please, check username and/or email (not empty)</li>
            <li>please, check password (min 5 and max 10 characters)</li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default ModalSignup;
