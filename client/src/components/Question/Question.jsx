import React from "react";
import { useSelector } from "react-redux";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/src/styles.scss";

import bird from "src/assets/images/DefaultBirdPicture.jpg";
import {
  correctAnswerSelector,
  questionedBirdSelector,
} from "src/reduxtoolkit/Selectors";

import styles from "src/components/Question/Question.module.scss";

const Question = ({ audioPlayerRef, detailsAudioPlayerRef }) => {
  const questionedBird = useSelector(questionedBirdSelector);
  const correctAnswer = useSelector(correctAnswerSelector);

  return (
    <div className={styles.question}>
      <img
        className={styles.image}
        src={correctAnswer ? questionedBird.image : bird}
        alt="bird"
      />
      <div className={styles.details}>
        <div className={styles.heading}>
          {correctAnswer ? questionedBird.name : "******"}
        </div>
        <AudioPlayer
          width="100%"
          height="40px"
          src={questionedBird.audio}
          ref={audioPlayerRef}
          autoPlayAfterSrcChange={false}
          onPlay={() => {
            if (detailsAudioPlayerRef.current)
              detailsAudioPlayerRef.current.audio.current.pause();
          }}
        />
      </div>
    </div>
  );
};

export default Question;
