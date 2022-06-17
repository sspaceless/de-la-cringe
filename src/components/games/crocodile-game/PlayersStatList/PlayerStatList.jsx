import propTypes from 'prop-types';
import styles from './PlayerStatList.module.css';

function PlayerStatList(props) {
  const { players } = props;
  return (
    <div className={styles['players-list']}>
      {players.map((item) => (
        <div key={item.id} className={styles.player}>
          <img alt="avatar" src={item.avatarUrl} />
          <p>{`${item.name} - ${item.points}`}</p>
        </div>
      ))}
    </div>
  );
}

export default PlayerStatList;

PlayerStatList.propTypes = { players: propTypes.instanceOf(Array).isRequired, };
