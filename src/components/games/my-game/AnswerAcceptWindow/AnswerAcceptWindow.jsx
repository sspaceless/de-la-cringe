import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import MGContext from '../MGContext';
import { MessageTypes } from '../MGConfig';

function AnswerAcceptWindow({ answeringPlayer, answer }) {
  const { room } = useContext(MGContext);

  const sendAnswerDecision = (decision) => () => room.send(
    MessageTypes.ANSWER_DECISION,
    { accepted: decision }
  );

  return (
    <>
      Отвечает игрок: {answeringPlayer.name}

      <p>{answer}</p>

      <input type="button" value="Right" onClick={sendAnswerDecision(true)} />
      <input type="button" value="Wrong" onClick={sendAnswerDecision(false)} />
    </>
  );
}

AnswerAcceptWindow.propTypes = {
  answeringPlayer: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired,
  answer: PropTypes.string.isRequired
};

export default AnswerAcceptWindow;
