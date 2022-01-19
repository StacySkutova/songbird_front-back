import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "src/components/Header/Header";
import FullPageLoader from "src/components/FullPageLoader/FullPageLoader";
import Game from "src/components/Game/Game";
import Signup from "src/components/Signup/Signup";
import Signin from "src/components/Signin/Signin";
import Profile from "src/components/Profile/Profile";
import {
  isAsyncBirdsDataFetchingSelector,
  pureBirdsDataSelector,
} from "src/reduxtoolkit/Selectors";
import { fetchAsyncBirdsData } from "src/reduxtoolkit/ToolkitSongbirdReducer";

import styles from "src/App.module.scss";

const App = () => {
  const pureBirdsData = useSelector(pureBirdsDataSelector);
  const isAsyncBirdsDataFetching = useSelector(
    isAsyncBirdsDataFetchingSelector
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAsyncBirdsData());
  }, []);

  if (isAsyncBirdsDataFetching) {
    return (
      <div>
        <FullPageLoader />
      </div>
    );
  }

  return (
    <div>
      {!pureBirdsData.length ? (
        <div>
          <ToastContainer autoClose={10000} />
          <div className={styles.notificationWindow}>
            <div className={styles.text}>Data is not available</div>
            <button
              onClick={() => dispatch(fetchAsyncBirdsData())}
              className={styles.button}
            >
              Reload
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.app}>
          <Header />
          <Routes>
            <Route path="/" element={<Game />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      )}
    </div>
  );
};

export default App;
