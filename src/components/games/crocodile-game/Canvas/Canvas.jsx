import { useEffect } from 'react';
import useCanvas from '../../../../hooks/use-canvas';
import { sendMessage } from '../../../../modules/room-connect';
import { DRAWING_MESSAGE_TYPE } from '../config';

function Canvas() {
  const sendCanvasState = (canvasState) => {
    const canvasStateJson = JSON.stringify(canvasState);
    sendMessage(DRAWING_MESSAGE_TYPE, { canvasState: canvasStateJson });
  };

  const {
    canvasRef,
    setupCanvas,
    startDrawing,
    draw,
    finishDrawing,
  } = useCanvas(500, 500);

  useEffect(() => {
    setupCanvas(500, 500);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <canvas
      onMouseDown={startDrawing}
      onMouseUp={finishDrawing}
      onMouseMove={draw}
      ref={canvasRef}
    />
  );
}

export default Canvas;
