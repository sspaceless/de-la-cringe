import { useRef, useState } from 'react';

const useCanvas = (width, height, onDrawing) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const points = [];

  const setupCanvas = () => {
    const canvas = canvasRef.current;
    canvas.width = width * 2;
    canvas.height = height * 2;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const context = canvas.getContext('2d');
    context.scale(2, 2);
    context.lineJoin = 'round';
    context.lineCap = 'round';
    context.strokeStyle = 'black';
    context.lineWidth = 5;
    contextRef.current = context;
  };

  const startDrawing = (event) => {
    const { nativeEvent } = event;
    const { offsetX, offsetY } = nativeEvent;

    points.push({ x: offsetX, y: offsetY });

    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = (event) => {
    if (!isDrawing) {
      return;
    }

    const { nativeEvent } = event;
    const { offsetX, offsetY } = nativeEvent;

    points.push({ x: offsetX, y: offsetY });

    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const finishDrawing = () => {
    const { lineWidth, strokeStyle } = contextRef.current;
    const canvasState = {
      points,
      lineWidth,
      strokeStyle,
      isDrawing: false
    };

    contextRef.current.closePath();
    setIsDrawing(false);

    onDrawing(canvasState);
    points.splice(0, points.length);
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

export default useCanvas;
