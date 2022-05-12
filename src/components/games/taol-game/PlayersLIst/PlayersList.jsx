import PropTypes from 'prop-types';
import Player from './Player';
import styles from './PlayersList.module.css';

function PlayerList(props) {
  const { players } = props;

  return (
    <div className={styles['players-list']}>
      {players.map((item) => (
        <Player
          key={item.id}
          name={item.name}
          avatarUrl={item.avatarUrl}
          isVip={item.isVip}
          isReady={item.isAnswered}
        />
      ))}
    </div>
  );
}

PlayerList.propTypes = { players: PropTypes.instanceOf(Array).isRequired, };

export default PlayerList;
