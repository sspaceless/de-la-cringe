import propTypes from 'prop-types';
import useInput from '../../../../hooks/use-input';
import { sendMessage } from '../../../../modules/room-connect';
import Message from './Messsage';
import * as constants from '../config';

function Chat(props) {
  const { messages: messagesArray, isSpectator, players } = props;

  const {
    valueChangeHandler: inputChangeHandler,
    isValid: isInputMessageValid,
    value: enteredMessage,
    inputBlurHandler,
    reset,
  } = useInput((value) => value.trim().length > 0);

  const sendMessageButtonHandler = () => {
    sendMessage(constants.NEW_MESSAGE_MESSAGE_TYPE, { messageText: enteredMessage });
    reset();
  };

  const messages = messagesArray.map((message) => {
    const { messageText, senderId, sendingDate } = message;
    const sender = players.find((player) => player.id === senderId);

    return (
      <Message
        messageText={messageText}
        sendingDate={sendingDate}
        senderName={sender.name}
        senderAvatarUrl={sender.avatarUrl}
      />
    );
  });

  const newMessageForm = (
    <div>
      <input
        type="text"
        value={enteredMessage}
        onChange={inputChangeHandler}
        onBlur={inputBlurHandler}
      />
      <button
        type="button"
        disabled={!isInputMessageValid}
        onClick={sendMessageButtonHandler}
      >Надіслати
      </button>
    </div>
  );

  return (
    <div>
      <div>
        {messages}
      </div>
      {isSpectator && newMessageForm}
    </div>
  );
}

export default Chat;

Chat.propTypes = {
  isSpectator: propTypes.bool.isRequired,
  messages: propTypes.shape(Array).isRequired,
  players: propTypes.shape(Array).isRequired,
};
