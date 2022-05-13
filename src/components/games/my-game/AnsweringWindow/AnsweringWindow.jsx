import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import MGContext from '../MGContext';
import Timer from '../../../Timer/Timer';

function AnsweringWindow({ answeringPlayer, isAnswering }) {
  const { state } = useContext(MGContext);

  const [loadingPercent, setLoadingPercent] = useState(0);

  return (
    <>
      Отвечает игрок: {answeringPlayer.name}

      {isAnswering
        && (
          <>
            <Timer
              untilDate={state.answerWaitUntil}
              onStep={(percent) => setLoadingPercent(percent * 100)}
              format="ss"
              hidden
            />

            <div style={{ position: 'relative', margin: 0, padding: 0, background: 'grey', width: 400, height: 20 }}>
              <div style={{ position: 'relative', margin: 0, padding: 0, transition: 'width 1s linear', width: `${loadingPercent}%`, height: 20, background: 'black' }}> </div>
            </div>
          </>
        )}
    </>
  );
}

AnsweringWindow.propTypes = {
  answeringPlayer: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired,
  isAnswering: PropTypes.bool.isRequired
};

export default AnsweringWindow;
