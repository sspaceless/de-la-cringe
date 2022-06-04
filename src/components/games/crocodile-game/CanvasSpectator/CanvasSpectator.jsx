import propTypes from 'prop-types';
import { useEffect } from 'react';
import useCanvasSpectator from '../../../../hooks/use-canvas-spectator';

function CanvasSpectator(props) {
  const { canvasState } = props;
  const { points, isDrawing } = canvasState;

  const {
    canvasRef,
    setupCanvas,
    startDrawing,
    draw,
    finishDrawing,
  } = useCanvasSpectator(500, 500);

  useEffect(() => {
    setupCanvas(500, 500);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    startDrawing();
    points.forEach((item) => {
      const { x, y } = item;
      draw(x, y);
    });
    finishDrawing();
  }, [draw, finishDrawing, isDrawing, points, startDrawing]);

  return (
    <canvas ref={canvasRef} />
  );
}

export default CanvasSpectator;

CanvasSpectator.propTypes = {
  canvasState: propTypes.shape({
    points: propTypes.instanceOf(Array).isRequired,
    isDrawing: propTypes.bool.isRequired
  }).isRequired,
};
