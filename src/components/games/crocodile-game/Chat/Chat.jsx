/* eslint-disable react/no-array-index-key */
import propTypes from 'prop-types';
import { useRef, useEffect } from 'react';
import useInput from '../../../../hooks/use-input';
import { sendMessage } from '../../../../modules/room-connect';
import Message from './Message';
import * as constants from '../config';
import config from '../../../../config.json';
import styles from './Chat.module.css';

function Chat(props) {
  const { messages: messagesArray, isSpectator, players } = props;
  const chatBottom = useRef(null);

  const {
    valueChangeHandler: inputChangeHandler,
    isValid: isInputMessageValid,
    value: enteredMessage,
    inputBlurHandler,
    reset: resetInputValue,
  } = useInput((value) => value.trim().length > 0);

  const sendMessageButtonHandler = () => {
    sendMessage(constants.NEW_MESSAGE_MESSAGE_TYPE, { messageText: enteredMessage, });
    resetInputValue();
  };

  const keyDownHandler = (event) => {
    if (event.code !== 'Enter' || !isInputMessageValid) {
      return;
    }
    sendMessageButtonHandler();
  };

  const messages = messagesArray.map((message, index) => {
    const { messageText, senderId, sendingDate } = message;

    if (senderId === 'SYSTEM') {
      return (
        <Message
          key={index}
          messageText={messageText}
          sendingDate={sendingDate}
          senderName="Крокодил"
          senderAvatarUrl={`${config.apiUrl}/files/logo.svg`}
        />
      );
    }

    const sender = players.find((player) => player.id === senderId);
    return (
      <Message
        key={index}
        messageText={messageText}
        sendingDate={sendingDate}
        senderName={sender.name}
        senderAvatarUrl={sender.avatarUrl}
      />
    );
  });

  useEffect(() => {
    chatBottom.current.scrollIntoView({ behavior: 'smooth' });
  });

  const newMessageForm = (
    <div className={styles['new-message-form']}>
      <input
        type="text"
        value={enteredMessage}
        disabled={!isSpectator}
        onChange={inputChangeHandler}
        onBlur={inputBlurHandler}
        onKeyDown={keyDownHandler}
      />
      <button
        type="button"
        className={styles['send-message-button']}
        disabled={!isInputMessageValid}
        onClick={sendMessageButtonHandler}
      >
        <img
          alt="send-message-button"
          src={constants.SEND_MESSAGE_BUTTON_URL}
        />
      </button>
    </div>
  );

  return (
    <div>
      <div className={styles['chat-wrapper']}>
        <div className={styles.messages}>
          <p>
            Надсилай свої здогадки <br />
            до чату :)
          </p>
          {messages}
          <div ref={chatBottom} />
        </div>
        {newMessageForm}
      </div>
    </div>
  );
}

export default Chat;

Chat.propTypes = {
  isSpectator: propTypes.bool.isRequired,
  messages: propTypes.shape(Array).isRequired,
  players: propTypes.shape(Array).isRequired,
};
