import propTypes from 'prop-types';
import { sendMessage } from '../../../../modules/room-connect';
import Question from '../Question/Question';

function TaolMain({ roomId, roomState }) {
  const { players, clientId, stage } = roomState;
  const isVip = players.find((player) => player.id === clientId).isVip === true;
  const isButtonActive = isVip && players.length >= 3;
  const time = new Date();
  time.setSeconds(time.getSeconds() + 60);

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
    const { personalQuestion } = players.find((player) => player.id === clientId).question;

    content = (
      <Question
        roomId={roomId}
        question={personalQuestion}
        players={players}
        clientId={clientId}
        time={time}
        type="PERSONAL"
      />
    );
  }

  if (stage === 'PUBLIC-QUESTION') {
    const { publicQuestion } = players[0].question;
    content = (
      <Question
        roomId={roomId}
        question={publicQuestion}
        players={players}
        clientId={clientId}
        time={time}
        type="PUBLIC"
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
  }).isRequired,
};

export default TaolMain;
