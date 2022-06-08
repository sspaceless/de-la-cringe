/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import useCanvas from '../../../../hooks/use-canvas';
import { sendMessage } from '../../../../modules/room-connect';
import { CANVAS_PEN_COLORS, DRAW_MESSAGE_TYPE } from '../config';
import styles from './Canvas.module.css';

function Canvas() {
  const {
    canvasRef,
    setupCanvas,
    startDrawing,
    draw,
    lineWidth,
    strokeStyle,
    setStrokeStyle,
    setLineWidth,
    finishDrawing,
  } = useCanvas(sendMessage.bind(null, DRAW_MESSAGE_TYPE));

  useEffect(() => {
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

  const colorButtons = CANVAS_PEN_COLORS.map((item) => {
    const colorChangeHandler = () => {
      setStrokeStyle(item);
    };

    return (
      <button type="button" key={item} onClick={colorChangeHandler}>
        <div className={styles['color-example']} style={{ backgroundColor: item }} />
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
        {colorButtons}
        <button type="button" className={styles['erase-button']} onClick={eraseButtonClickHandler}>
          <img alt="erase-button" src="https://api.iconify.design/mdi/eraser.svg" />
        </button>
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
            <div style={{
              width: `${lineWidth}px`,
              height: `${lineWidth}px`,
              backgroundColor: strokeStyle
            }}
            />
          </div>
          <input type="range" min="5" max="25" step="1" value={lineWidth} onChange={changeLineWidthHandler} />
        </div>
      </div>
    </div>
  );
}

export default Canvas;
