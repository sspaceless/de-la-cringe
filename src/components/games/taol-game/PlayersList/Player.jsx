import PropTypes from 'prop-types';
import styles from './Player.module.css';

function Player(props) {
  const { name, avatar, isVip, isReady, } = props;
  const classes = `${styles.player} ${!(isReady) ? styles['not-ready'] : ''}`;

  return (
    <div className={classes}>
      <img alt="avatar" src={avatar} />
      {isVip && <p>VIP</p>}
      <p>{name}</p>
    </div>
  );
}

export default Player;

Player.propTypes = {
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  isVip: PropTypes.bool.isRequired,
  isReady: PropTypes.bool,
};

Player.defaultProps = { isReady: true, };
