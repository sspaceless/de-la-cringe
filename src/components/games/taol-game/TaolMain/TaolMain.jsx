import propTypes from 'prop-types';
import { sendMessage } from '../../../../modules/room-connect';
import Question from '../Question/Question';
import Results from '../Results/Results';
import Voting from '../Voting/Voting';

const STAGE_MESSAGE_TYPE = 'STAGE';
const PUBLIC_MESSAGE_TYPE = 'PUBLIC';
const PERSONAL_MESSAGE_TYPE = 'PERSONAL';

const PUBLIC_QUESTION_STAGE = 'PUBLIC-QUESTION';
const PERSONAL_QUESTION_STAGE = 'PERSONAL-QUESTION';
const VOTING_STAGE = 'VOTING';
const RESULTS_STAGE = 'RESULTS';

function TaolMain(props) {
  const { roomId, roomState } = props;
  const { players, clientId, stage } = roomState;
  const isVip = players.find((player) => player.id === clientId).isVip === true;
  const isButtonActive = isVip && players.length >= 3;

  const buttonClickHandler = () => {
    sendMessage(STAGE_MESSAGE_TYPE, { stage: PERSONAL_QUESTION_STAGE });
  };

  const content = (
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

  switch (stage) {
    case PERSONAL_QUESTION_STAGE:
      return (
        <Question
          roomState={roomState}
          messageType={PERSONAL_MESSAGE_TYPE}
        />
      );

    case PUBLIC_QUESTION_STAGE:
      return (
        <Question
          roomState={roomState}
          messageType={PUBLIC_MESSAGE_TYPE}
        />
      );

    case VOTING_STAGE:
      return (
        <Voting
          roomState={roomState}
        />
      );

    case RESULTS_STAGE:
      return (<Results roomState={roomState} />);

    default:
      return (content);
  }
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
