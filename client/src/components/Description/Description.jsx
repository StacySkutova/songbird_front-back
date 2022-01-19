import React from "react";
import { useSelector } from "react-redux";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/src/styles.scss";

import { selectedBirdSelector } from "src/redux/Selectors";

import styles from "src/components/Description/Description.module.scss";

const Description = ({ audioPlayerRef, detailsAudioPlayerRef }) => {
  const selectedBird = useSelector(selectedBirdSelector);

  if (selectedBird == null) {
    return (
      <div className={styles.details}>
        <div>
          <div>Послушайте плеер.</div>
          <div>Выберите птицу из списка.</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.details}>
      <div className={styles.info}>
        <img
          className={styles.image}
          src={selectedBird.image}
          alt={selectedBird.name}
        />
        <div className={styles.namesAndAudio}>
          <h2>{selectedBird.name}</h2>
          <h3>{selectedBird.species}</h3>
          <AudioPlayer
            width="100%"
            height="40px"
            src={selectedBird.audio}
            ref={detailsAudioPlayerRef}
            autoPlayAfterSrcChange={false}
            onPlay={() => audioPlayerRef.current.audio.current.pause()}
          />
        </div>
      </div>
      <p>{selectedBird.description}</p>
    </div>
  );
};

export default Description;
