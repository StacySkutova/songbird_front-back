import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  correctAnswerSelector,
  levelSelector,
  pureBirdsDataSelector,
} from "src/reduxtoolkit/Selectors";
import {
  resetDataAfterButtonClick,
  setLevel,
  setQuestionedBird,
  setScore,
} from "src/reduxtoolkit/ToolkitSongbirdReducer";

import styles from "src/components/Button/Button.module.scss";

const Button = () => {
  const pureBirdsData = useSelector(pureBirdsDataSelector);
  const level = useSelector(levelSelector);
  const correctAnswer = useSelector(correctAnswerSelector);

  const dispatch = useDispatch();

  const nextLevel = () => {
    dispatch(setLevel(level + 1));
    if (level < pureBirdsData.length - 1) {
      const randomIndex = Math.floor(
        Math.random() * Math.floor(pureBirdsData.length)
      );
      dispatch(setQuestionedBird(pureBirdsData[level + 1][randomIndex]));
      dispatch(resetDataAfterButtonClick());
    }
  };

  const playAgain = () => {
    dispatch(setLevel(0));
    const randomIndex = Math.floor(
      Math.random() * Math.floor(pureBirdsData.length)
    );
    dispatch(setScore(0));
    dispatch(setQuestionedBird(pureBirdsData[0][randomIndex]));
    dispatch(resetDataAfterButtonClick());
  };

  return (
    <button
      disabled={!correctAnswer && level < pureBirdsData.length}
      className={styles.button}
      onClick={level === pureBirdsData.length ? playAgain : nextLevel}
    >
      {level === pureBirdsData.length ? "Попробовать еще раз!" : "Next"}
    </button>
  );
};

export default Button;
