import { useRef } from 'react';

const useCanvasSpectator = (width, height) => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  const setupCanvas = () => {
    const canvas = canvasRef.current;
    canvas.width = width * 2;
    canvas.height = height * 2;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const context = canvas.getContext('2d');
    context.scale(2, 2);
    context.lineCap = 'round';
    context.strokeStyle = 'black';
    context.lineWidth = 5;
    contextRef.current = context;
  };

  const startDrawing = (x, y) => {
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
