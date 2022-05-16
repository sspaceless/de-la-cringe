import { useRef, useState } from 'react';

const useCanvas = (width, height, onDrawing) => {
  const [isDrawing, setIsDrawing] = useState(false);
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

  const startDrawing = (event) => {
    const { nativeEvent } = event;
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const getCanvasState = () => {
    const context = contextRef.current;
    const canvasState = context.getImageData(0, 0, width, height);
    return canvasState;
  };

  const draw = (event) => {
    if (!isDrawing) {
      return;
    }

    const { nativeEvent } = event;
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();

    if (onDrawing) {
      const canvasState = getCanvasState();
      onDrawing(canvasState);
    }
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
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
    getCanvasState,
    clearCanvas,
    draw,
  };
};

export default useCanvas;
