import { useRef } from 'react';
// import { CANVAS_WIDTH, CANVAS_HEIGHT } from '../components/games/crocodile-game/config';

const useCanvasSpectator = (strokeStyle, lineWidth) => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  const setupCanvas = () => {
    const canvas = canvasRef.current;
    canvas.width *= 2;
    canvas.height *= 2;
    // canvas.style.width = `${CANVAS_WIDTH}px`;
    // canvas.style.height = `${CANVAS_HEIGHT}px`;

    const context = canvas.getContext('2d');
    context.scale(1, 1);
    context.lineCap = 'round';
    context.strokeStyle = strokeStyle;
    context.lineWidth = lineWidth;
    contextRef.current = context;
  };

  const startDrawing = (x, y) => {
    contextRef.current.strokeStyle = strokeStyle;
    contextRef.current.lineWidth = lineWidth;
    contextRef.current.beginPath();
    contextRef.current.moveTo(x, y);
  };

  const draw = (x, y) => {
    contextRef.current.lineTo(x, y);
    contextRef.current.stroke();
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);
  };

  return {
    canvasRef,
    contextRef,
    setupCanvas,
    startDrawing,
    finishDrawing,
    clearCanvas,
    draw,
  };
};

export default useCanvasSpectator;
