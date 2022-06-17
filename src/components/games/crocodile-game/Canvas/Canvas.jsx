import propTypes from 'prop-types';
import { useEffect } from 'react';
import useCanvas from '../../../../hooks/use-canvas';
import { sendMessage, onMessage } from '../../../../modules/room-connect';
import * as constants from '../config';
import styles from './Canvas.module.css';

function Canvas(props) {
  const { canvasState, isSpectator } = props;
  const {
    points,
    strokeStyle: strokeStyleSpectator,
    lineWidth: lineWidthSpectator,
    isDrawing
  } = canvasState;

  const {
    canvasRef,
    setupCanvas,
    startDrawing,
    startDrawingSpectator,
    draw,
    drawSpectator,
    finishDrawing,
    finishDrawingSpectator,
    clearCanvas,
    strokeStyle,
    lineWidth,
    setStrokeStyle,
    setLineWidth,
  } = useCanvas(sendMessage.bind(null, constants.DRAW_MESSAGE_TYPE));

  useEffect(() => {
    onMessage(constants.CLEAR_CANVAS_MESSAGE_TYPE, clearCanvas);
    setupCanvas();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isSpectator) {
      return;
    }

    setStrokeStyle(strokeStyleSpectator);
    setLineWidth(lineWidthSpectator);

    startDrawingSpectator();
    points.forEach((item) => {
      const { x, y } = item;
      drawSpectator(x, y);
    });
    finishDrawingSpectator();
  }, [
    finishDrawingSpectator,
    startDrawingSpectator,
    strokeStyleSpectator,
    lineWidthSpectator,
    setStrokeStyle,
    drawSpectator,
    startDrawing,
    setLineWidth,
    isSpectator,
    isDrawing,
    points,
  ]);

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
    setStrokeStyle('#000000');
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

  const toolsPanel = (
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
  );

  return (
    <div className={styles.canvas}>
      <canvas
        onMouseDown={!isSpectator ? startDrawing : undefined}
        onMouseUp={!isSpectator ? finishDrawing : undefined}
        onMouseMove={!isSpectator ? draw : undefined}
        ref={canvasRef}
      />
      {!isSpectator && toolsPanel}
    </div>
  );
}

export default Canvas;

Canvas.propTypes = {
  canvasState: propTypes.shape({
    points: propTypes.instanceOf(Array).isRequired,
    strokeStyle: propTypes.string.isRequired,
    lineWidth: propTypes.string.isRequired,
    isDrawing: propTypes.bool.isRequired,
  }).isRequired,
  isSpectator: propTypes.bool.isRequired,
};
