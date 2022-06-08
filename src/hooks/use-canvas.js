import { useRef, useState } from 'react';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from '../components/games/crocodile-game/config';

const useCanvas = (onDrawing) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [lineWidth, setLineWidth] = useState('5');
  const [strokeStyle, setStrokeStyle] = useState('#000000');
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const points = [];

  const setupCanvas = () => {
    const canvas = canvasRef.current;
    canvas.width = CANVAS_WIDTH * 2;
    canvas.height = CANVAS_HEIGHT * 2;
    canvas.style.width = `${CANVAS_WIDTH}px`;
    canvas.style.height = `${CANVAS_HEIGHT}px`;

    const context = canvas.getContext('2d');
    context.scale(2, 2);
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
    lineWidth,
    strokeStyle,
    setStrokeStyle,
    setLineWidth,
    clearCanvas,
    draw,
  };
};

export default useCanvas;
