import React, { createRef } from "react";
import { useSelector } from "react-redux";

import Results from "src/components/Results/Results";
import Question from "src/components/Question/Question";
import Answers from "src/components/Answers/Answers";
import Description from "src/components/Description/Description";
import Button from "src/components/Button/Button";
import {
  levelSelector,
  pureBirdsDataSelector,
} from "src/reduxtoolkit/Selectors";

import styles from "src/components/Game/Game.module.scss";

const Game = () => {
  const pureBirdsData = useSelector(pureBirdsDataSelector);
  const level = useSelector(levelSelector);

  const audioPlayerRef = createRef();
  const detailsAudioPlayerRef = createRef();

  return (
    <div>
      {level > pureBirdsData.length - 1 ? (
        <Results />
      ) : (
        <>
          <Question
            audioPlayerRef={audioPlayerRef}
            detailsAudioPlayerRef={detailsAudioPlayerRef}
          />
          <div className={styles.answersDetails}>
            <Answers
              birdsList={pureBirdsData[level]}
              audioPlayerRef={audioPlayerRef}
            />
            <Description
              audioPlayerRef={audioPlayerRef}
              detailsAudioPlayerRef={detailsAudioPlayerRef}
            />
          </div>
        </>
      )}
      <Button />
    </div>
  );
};

export default Game;
