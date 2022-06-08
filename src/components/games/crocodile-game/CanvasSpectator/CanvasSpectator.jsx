import propTypes from 'prop-types';
import { useEffect } from 'react';
import useCanvasSpectator from '../../../../hooks/use-canvas-spectator';
import styles from './CanvasSpectator.module.css';

function CanvasSpectator(props) {
  const { canvasState } = props;
  const { points, strokeStyle, lineWidth, isDrawing } = canvasState;

  const {
    canvasRef,
    setupCanvas,
    startDrawing,
    draw,
    finishDrawing,
  } = useCanvasSpectator(strokeStyle, lineWidth);

  useEffect(() => {
    setupCanvas();
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
    <div className={styles.canvas}>
      <canvas ref={canvasRef} />
    </div>
  );
}

export default CanvasSpectator;

CanvasSpectator.propTypes = {
  canvasState: propTypes.shape({
    points: propTypes.instanceOf(Array).isRequired,
    strokeStyle: propTypes.string.isRequired,
    lineWidth: propTypes.string.isRequired,
    isDrawing: propTypes.bool.isRequired,
  }).isRequired,
};
