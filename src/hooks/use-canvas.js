import { useRef, useState } from 'react';

const useCanvas = (onDrawing) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [lineWidth, setLineWidth] = useState('5');
  const [strokeStyle, setStrokeStyle] = useState('#000000');
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const points = [];

  const setupCanvas = () => {
    const canvas = canvasRef.current;
    canvas.width *= 2;
    canvas.height *= 2;
    const context = canvas.getContext('2d');
    context.scale(1, 1);
    context.lineJoin = 'round';
    context.lineCap = 'round';
    contextRef.current = context;
  };

  const startDrawing = (event) => {
    const { nativeEvent } = event;
    const { offsetX, offsetY } = nativeEvent;

    points.push({ x: offsetX, y: offsetY });

    contextRef.current.strokeStyle = strokeStyle;
    contextRef.current.lineWidth = lineWidth;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const startDrawingSpectator = (x, y) => {
    contextRef.current.strokeStyle = strokeStyle;
    contextRef.current.lineWidth = lineWidth;
    contextRef.current.beginPath();
    contextRef.current.moveTo(x, y);
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

  const drawSpectator = (x, y) => {
    contextRef.current.lineTo(x, y);
    contextRef.current.stroke();
  };

  const finishDrawing = () => {
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

  const finishDrawingSpectator = () => {
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
    startDrawingSpectator,
    finishDrawing,
    finishDrawingSpectator,
    lineWidth,
    strokeStyle,
    setStrokeStyle,
    setLineWidth,
    clearCanvas,
    draw,
    drawSpectator,
  };
};

export default useCanvas;
