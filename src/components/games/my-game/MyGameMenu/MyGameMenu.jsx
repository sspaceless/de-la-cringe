/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useRef, useState, useEffect, useContext, useMemo } from 'react';
import { Client } from 'colyseus.js';
import { useNavigate } from 'react-router-dom';
import Input from '../../../Input/Input';
import MyGame from '../MyGame/MyGame';
import { Themes } from '../MGConfig';
import Config from '../../../../config';
import UserContext from '../../../userContext';
import MGContext from '../MGContext';
import styles from './MyGameMenu.module.css';

function useForceUpdate() {
  const [, setValue] = useState(0);

  return useCallback(() => setValue((v) => v + 1), []);
}

function MyGameMenu() {
  const forceUpdate = useForceUpdate();
  const navigate = useNavigate();

  const clientRef = useRef(new Client(Config.COLYSEUS_URL));
  const client = clientRef.current;

  const { userState } = useContext(UserContext);
  const userOptionsRef = useRef({
    username: userState.user.username,
    avatar: userState.user.avatar,
    isVip: false,
  });

  const selectedTopicsRef = useRef([]);

  const [value, setValue] = useState('');
  const [room, setRoom] = useState();

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (room) {
      room.onStateChange(forceUpdate);
      room.onLeave(() => navigate(0));
    }

    if (room) return () => room.leave();
  }, [room, forceUpdate]);

  const [isWrong, setIsWrong] = useState(false);

  useEffect(() => {
    if (!value) {
      setIsWrong(false);
      return;
    }

    const checkRoomId = async () => {
      if ((await client.getAvailableRooms('my-game')).find((r) => r.roomId === value)) {
        const r = await client.joinById(value, userOptionsRef.current);

        setRoom(r);
      } else {
        setIsWrong(true);
      }
    };

    checkRoomId();
  }, [client, value, forceUpdate]);

  const createGame = async () => {
    if (selectedTopicsRef.current.length === 0) return;

    userOptionsRef.current.isVip = true;

    const r = await client.create('my-game', {
      themes: selectedTopicsRef.current,
      ...userOptionsRef.current
    });

    setRoom(r);
  };

  const updateTheme = (event) => {
    const target = event.currentTarget;

    if (target.checked) {
      if (selectedTopicsRef.current.length === Themes.length - 1) {
        target.checked = false;
        return;
      }

      selectedTopicsRef.current.push(event.currentTarget.name);
    } else {
      const pos = selectedTopicsRef.current.indexOf(event.currentTarget.name);
      selectedTopicsRef.current.splice(pos, 1);
    }
  };

  const getPlayer = () => {
    if (!room || !room.hasJoined) return undefined;

    if (room.state.host.id === room.sessionId) {
      return room.state.host;
    }

    return room.state.players[room.sessionId];
  };

  const player = getPlayer();

  const context = useMemo(() => {
    if (!room || !player) return undefined;

    return {
      player,
      room,
      isHost: player.isVip,
      state: room.state,
      stage: room.state.stage
    };
  }, [room, player, room?.state?.stage]);

  const [isVisibleList, setIsVisibleList] = useState(false);
  const cls = isVisibleList ? styles.visibleList : '';
  const clsInp = isVisibleList ? styles.hoveredInp : '';

  const [themesHeight, setThemesHeight] = useState(0);

  const themesWrapperStyle = {
    height: themesHeight + 50
  };

  useEffect(() => {
    setThemesHeight(document.getElementById('themes').offsetHeight);
  }, []);

  const menu = (
    <div className={styles.wrapper}>
      <div className={styles.menu}>
        <div id="themesWrapper" className={styles.themesListWrapper} style={themesWrapperStyle} onMouseLeave={() => setIsVisibleList(false)}>
          <ul id="themes" className={[styles.themesList, cls].join(' ')}>
            {Themes.map((topic, counter) => (
              <li key={topic}>
                <input type="checkbox" name={topic} id={`checkbox${counter + 1}`} onChange={updateTheme} />
                <label htmlFor={`checkbox${counter + 1}`}>{topic}</label>
              </li>
            ))}
          </ul>
        </div>

        <input
          className={[styles.inp, clsInp].join(' ')}
          type="button"
          value="New Game"
          onMouseEnter={() => setIsVisibleList(true)}
          onMouseLeave={(e) => {
            const isLeaving = e.relatedTarget !== document.getElementById('themes')
              && e.relatedTarget !== document.getElementById('themesWrapper')
              && e.relatedTarget.tagName !== 'LI'
              && e.relatedTarget.tagName !== 'LABEL';

            if (isLeaving) {
              setIsVisibleList(false);
            }
          }}
          onClick={createGame}
        />

        <Input className={[styles.inp, isWrong ? styles.wrong : ''].join(' ')} onChange={setValue} placeholder="Room ID to Join" />

        <img src={`${Config.API_URL}/files/games/my-game/ingamelogo.svg`} alt="logo" />
      </div>
    </div>
  );

  const game = (
    <MGContext.Provider value={context}>
      <MyGame />
    </MGContext.Provider>
  );

  return (
    <div className={styles.gameBody}>
      {context
        ? game
        : menu}
    </div>
  );
}

export default MyGameMenu;
