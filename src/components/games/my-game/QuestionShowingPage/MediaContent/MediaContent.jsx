import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './MediaContent.module.css';

function MediaContent({ url, type, maxWidth, maxHeight }) {
  const [popupHeight, setPopupHeight] = useState(1);

  useEffect(() => {
    setPopupHeight(document.getElementById('popup').offsetHeight);

    const popupObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.borderBoxSize) return;

        const borderBoxSize = Array.isArray(entry.borderBoxSize)
          ? entry.borderBoxSize[0]
          : entry.borderBoxSize;

        setPopupHeight(borderBoxSize.blockSize);
      });
    });

    popupObserver.observe(document.getElementById('popup'));
    return () => popupObserver.unobserve(document.getElementById('popup'));
  }, []);

  const [volume, setVolume] = useState(0.5);
  const mediaRef = useRef();

  useEffect(() => {
    if (mediaRef.current) {
      mediaRef.current.volume = volume;
    }
  }, [volume]);

  const volumeSlider = (
    <input
      style={{ width: popupHeight, right: -popupHeight - 25 }}
      className={styles.volumeSlider}
      value={volume}
      onChange={(e) => setVolume(e.target.value)}
      type="range"
      step="0.01"
      max="1"
      min="0"
    />
  );

  const fileStyle = {
    maxWidth,
    maxHeight,
    marginBottom: 15
  };

  switch (type) {
    case 'image':
      return (
        <img
          style={fileStyle}
          className={styles.file}
          alt="question file"
          src={url}
        />
      );
    case 'video':
      fileStyle.maxWidth -= 45;

      return (
        <>
          <video
            autoPlay
            ref={mediaRef}
            style={fileStyle}
            className={styles.file}
            alt="question file"
            src={url}
          />

          {popupHeight && volumeSlider}
        </>
      );
    case 'audio': {
      fileStyle.maxWidth -= 45;

      return (
        <>
          <div style={fileStyle}>
            <audio
              ref={mediaRef}
              autoPlay
              className={styles.file}
              alt="question file"
              src={url}
              hidden
            />

            <p className={styles.audioText}>
              Відтворюється аудіо-файл...
            </p>
          </div>

          {popupHeight && volumeSlider}
        </>
      );
    }
    default:
      break;
  }
}

MediaContent.propTypes = {
  type: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  maxWidth: PropTypes.number.isRequired,
  maxHeight: PropTypes.number.isRequired
};

export default MediaContent;
