/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import useCanvas from '../../../../hooks/use-canvas';
import { onMessage, sendMessage } from '../../../../modules/room-connect';
import * as constants from '../config';
import styles from './Canvas.module.css';

function Canvas() {
  const {
    canvasRef,
    setupCanvas,
    startDrawing,
    draw,
    finishDrawing,
    clearCanvas,
    strokeStyle,
    lineWidth,
    setStrokeStyle,
    setLineWidth,
  } = useCanvas(sendMessage.bind(null, constants.DRAW_MESSAGE_TYPE));

  useEffect(() => {
    onMessage(constants.CLEAR_CANVAS_MESSAGE_TYPE, clearCanvas);
    setupCanvas();
  }, []);

  const chooseColorHandler = (event) => {
    const { value } = event.target;
    setStrokeStyle(value);
  };

  const changeLineWidthHandler = (event) => {
    const { value } = event.target;
    setLineWidth(value);
  };

  const eraseButtonClickHandler = () => {
    setStrokeStyle('#FFFFFF');
  };

  const clearButtonClickHandler = () => {
    sendMessage(constants.CLEAR_CANVAS_MESSAGE_TYPE);
  };

  const colorButtons = constants.CANVAS_PEN_COLORS.map((item) => {
    const colorChangeHandler = () => {
      setStrokeStyle(item);
    };

    return (
      <button type="button" key={item} onClick={colorChangeHandler}>
        <div
          className={styles['color-example']}
          style={{ backgroundColor: item }}
        />
      </button>
    );
  });

  return (
    <div className={styles.canvas}>
      <canvas
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        ref={canvasRef}
      />
      <div className={styles['tools-panel']}>
        <button
          type="button"
          className={styles['clear-button']}
          onClick={clearButtonClickHandler}
        >
          <img alt="clear-button" src={constants.CLEAR_BUTTON_URL} />
        </button>

        <button
          type="button"
          className={styles['erase-button']}
          onClick={eraseButtonClickHandler}
        >
          <img alt="erase-button" src={constants.ERASE_BUTTON_URL} />
        </button>
        {colorButtons}
        <div className={styles.eyedropper}>
          <label>
            Обери колір:
            <input
              type="color"
              value={strokeStyle}
              onChange={chooseColorHandler}
            />
          </label>
        </div>
        <div className={styles['width-range']}>
          <div className={styles['line-example']}>
            <div
              style={{
                width: `${lineWidth}px`,
                height: `${lineWidth}px`,
                backgroundColor: strokeStyle,
              }}
            />
          </div>
          <input
            type="range"
            min="5"
            max="25"
            step="1"
            value={lineWidth}
            onChange={changeLineWidthHandler}
          />
        </div>
      </div>
    </div>
  );
}

export default Canvas;
