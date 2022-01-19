import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import correctAudio from "src/assets/media/CorrectAnswerSound.mp3";
import incorrectAudio from "src/assets/media/IncorrectAnswerSound.mp3";
import {
  correctAnswerSelector,
  levelScoreSelector,
  questionedBirdSelector,
  resetColorIndicatorSelector,
  scoreSelector,
} from "src/reduxtoolkit/Selectors";
import {
  setCorrectAnswer,
  setLevelScore,
  setResetColorIndicator,
  setScore,
  setSelectedBird,
} from "src/reduxtoolkit/ToolkitSongbirdReducer";

import styles from "src/components/Answers/Answers.module.scss";

const initialClasses = new Array(6);
initialClasses.fill(styles.indicator);

const Answers = ({ birdsList, audioPlayerRef }) => {
  const score = useSelector(scoreSelector);
  const levelScore = useSelector(levelScoreSelector);
  const questionedBird = useSelector(questionedBirdSelector);
  const correctAnswer = useSelector(correctAnswerSelector);
  const resetColorIndicator = useSelector(resetColorIndicatorSelector);

  const dispatch = useDispatch();

  const [classesForIndicators, setClassesForIndicators] =
    useState(initialClasses);

  useEffect(() => {
    if (resetColorIndicator) {
      setClassesForIndicators(initialClasses);
      dispatch(setResetColorIndicator(false));
    }
  }, [resetColorIndicator, setResetColorIndicator]);

  const playAudio = (src) => {
    const audio = new Audio(src);
    audio.play();
  };

  const checkAnswer = (bird) => {
    dispatch(setSelectedBird(bird));
    if (!correctAnswer) {
      const key = bird.id - 1;
      const defaultAnswerIndicator = classesForIndicators.slice();

      if (questionedBird.name === bird.name) {
        dispatch(setCorrectAnswer(true));
        defaultAnswerIndicator[key] =
          defaultAnswerIndicator[key] && styles.correct;
        setClassesForIndicators(defaultAnswerIndicator);
        dispatch(setScore(score + levelScore));
        playAudio(correctAudio);
        audioPlayerRef.current.audio.current.pause();
      } else {
        defaultAnswerIndicator[key] =
          defaultAnswerIndicator[key] && styles.wrong;
        setClassesForIndicators(defaultAnswerIndicator);
        dispatch(setLevelScore(levelScore - 1));
        playAudio(incorrectAudio);
      }
    }
  };

  return (
    <ul className={styles.answersList}>
      {birdsList.map((bird) => (
        <li
          className={styles.item}
          onClick={() => checkAnswer(bird)}
          key={bird.id}
        >
          <div className={classesForIndicators[bird.id - 1]}></div>
          <span>{bird.name}</span>
        </li>
      ))}
    </ul>
  );
};

export default Answers;
