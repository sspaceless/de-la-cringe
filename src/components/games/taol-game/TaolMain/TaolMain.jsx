import propTypes from 'prop-types';
import { sendMessage } from '../../../../modules/room-connect';
import Question from '../Question/Question';
import Voting from '../Voting/Voting';

function TaolMain({ roomId, roomState }) {
  const { players, clientId, stage, questionNumber } = roomState;
  const isVip = players.find((player) => player.id === clientId).isVip === true;
  const isButtonActive = isVip && players.length >= 3;

  const buttonClickHandler = () => {
    sendMessage('STAGE', { stage: 'PERSONAL-QUESTION' });
  };

  let content = (
    <div>
      <h2>{`Room ID: ${roomId}`}</h2>
      <ul>
        {players.map((player) => (
          <li key={player.id}>
            {`${player.isVip ? 'VIP:' : ''} ${player.name}`}
          </li>
        ))}
      </ul>
      {isVip && <button type="button" disabled={!isButtonActive} onClick={buttonClickHandler}>Start!</button>}
    </div>
  );

  if (stage === 'PERSONAL-QUESTION') {
    const player = players.find((item) => item.id === clientId);
    const { personalQuestion } = player.question;

    content = (
      <Question
        roomId={roomId}
        question={personalQuestion}
        questionFor={player.id}
        roomState={roomState}
        type="PERSONAL"
      />
    );
  }

  if (stage === 'PUBLIC-QUESTION') {
    const player = players[questionNumber];
    const publicQuestion = player.question.publicQuestion.replace('<PLAYER>', player.name);
    content = (
      <Question
        roomId={roomId}
        question={publicQuestion}
        questionFor={player.id}
        roomState={roomState}
        type="PUBLIC"
      />
    );
  }

  if (stage === 'VOTING') {
    content = (
      <Voting
        roomState={roomState}
      />
    );
  }

  return (content);
}

TaolMain.propTypes = {
  roomId: propTypes.string.isRequired,
  roomState: propTypes.shape({
    players: propTypes.instanceOf(Array).isRequired,
    clientId: propTypes.string.isRequired,
    stage: propTypes.string.isRequired,
    questionNumber: propTypes.number.isRequired,
  }).isRequired,
};

export default TaolMain;
