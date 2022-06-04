/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import useCanvas from '../../../../hooks/use-canvas';
import { sendMessage } from '../../../../modules/room-connect';
import { DRAW_MESSAGE_TYPE } from '../config';
import classes from './Canvas.module.css';

function Canvas() {
  const {
    canvasRef,
    setupCanvas,
    startDrawing,
    draw,
    finishDrawing,
  } = useCanvas(500, 500, sendMessage.bind(null, DRAW_MESSAGE_TYPE));

  useEffect(() => {
    setupCanvas();
  }, []);
  return (
    <div className={classes.canvas}>
      <canvas
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        ref={canvasRef}
      />
    </div>
  );
}

export default Canvas;
