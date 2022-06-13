import propTypes from 'prop-types';
import styles from './Message.module.css';

function Message(props) {
  const { messageText, sendingDate, senderName, senderAvatarUrl } = props;
  const date = new Date(sendingDate);

  return (
    <div className={styles['message-wrapper']}>
      <div className={styles.message}>
        <div className={styles['user-info']}>
          <img alt="avatar" src={senderAvatarUrl} className={styles['user-avatar']} />
          <div>{senderName}</div>
          <div>{`${date.getHours()}:${date.getMinutes()}`}</div>
        </div>
        <div className={styles['message-text']}>{messageText}</div>
      </div>
    </div>
  );
}

export default Message;

Message.propTypes = {
  messageText: propTypes.string.isRequired,
  sendingDate: propTypes.string.isRequired,
  senderName: propTypes.string.isRequired,
  senderAvatarUrl: propTypes.string.isRequired,
};
