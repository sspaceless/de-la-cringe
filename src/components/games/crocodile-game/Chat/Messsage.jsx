import propTypes from 'prop-types';

function Message(props) {
  const { messageText, sendingDate, senderName, senderAvatarUrl } = props;

  return (
    <div>
      <div>
        <img alt="avatar" src={senderAvatarUrl} />
      </div>
      {senderName}
      {messageText}
      {Date.parse(sendingDate)}
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
