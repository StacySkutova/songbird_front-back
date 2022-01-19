import React from "react";
import { useSelector } from "react-redux";
import cn from "classnames";
import { NavLink } from "react-router-dom";

import birdsData from "src/redux/BirdsData";
import { levelSelector, scoreSelector } from "src/redux/Selectors";

import styles from "src/components/Header/Header.module.scss";

const Header = () => {
  const categoriesData = birdsData.map(({ category }) => category);

  const score = useSelector(scoreSelector);
  const level = useSelector(levelSelector);

  return (
    <div className={styles.header}>
      <div className={styles.headerMain}>
        <div className={styles.logo}>
          Song<span>bird</span>
        </div>
        <div className={styles.rightBlock}>
          <div className={styles.score}>Score: {score}</div>
          <div className={styles.buttonsField}>
            <NavLink to="/" className={styles.button}>
              Back
            </NavLink>
            <NavLink to="/signin" className={styles.button}>
              Signin
            </NavLink>
            <NavLink to="/signup" className={styles.button}>
              Signup
            </NavLink>
          </div>
        </div>
      </div>
      <ul className={styles.categoryList}>
        {categoriesData.map((category, index) => (
          <li
            key={category}
            className={cn([styles.item, { [styles.active]: index === level }])}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Header;
