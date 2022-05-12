/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useRef, useState, useEffect, useContext, useMemo } from 'react';
import { Client } from 'colyseus.js';
import Input from '../../Input/Input';
import MyGame from './MyGame';
import { Themes } from './MGConfig';
import Config from '../../../config.json';
import UserContext from '../../userContext';
import MGContext from './MGContext';

function useForceUpdate() {
  const [, setValue] = useState(0);

  return useCallback(() => setValue((v) => v + 1), []);
}

function MyGameMenu() {
  const forceUpdate = useForceUpdate();

  const clientRef = useRef(new Client(Config.colyseusUrl));
  const client = clientRef.current;

  const { userState } = useContext(UserContext);
  const userOptionsRef = useRef({
    username: userState.user.username,
    avatarUrl: userState.user.avatarUrl,
    isVip: false,
  });

  const selectedTopicsRef = useRef([]);

  const [value, setValue] = useState('');
  const [room, setRoom] = useState();

  useEffect(() => {
    if (room) room.onStateChange(forceUpdate);
  }, [room, forceUpdate]);

  const [isWrong, setIsWrong] = useState(false);
  const [isShowingTopics, setIsShowingTopics] = useState(false);

  useEffect(() => {
    if (!value) return;

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

  const showTopics = () => {
    setIsShowingTopics(true);
  };

  const createGame = async () => {
    userOptionsRef.current.isVip = true;

    const r = await client.create('my-game', {
      themes: selectedTopicsRef.current,
      ...userOptionsRef.current
    });

    setRoom(r);
  };

  const updateTheme = (event) => {
    if (event.currentTarget.checked) {
      selectedTopicsRef.current.push(event.currentTarget.name);
    } else {
      const pos = selectedTopicsRef.current.indexOf(event.currentTarget.name);
      selectedTopicsRef.current.splice(pos, 1);
    }
  };

  let counter = 1;
  const themeChoose = (
    <ul>
      {Themes.map((topic) => (
        <li key={topic}>
          <input type="checkbox" name={topic} id={`checkbox${counter}`} onChange={updateTheme} />
          <label htmlFor={`checkbox${counter++}`}>{topic}</label>
        </li>
      ))}
    </ul>
  );

  const menu = (
    <div>
      {isShowingTopics
        && themeChoose}
      <input type="button" value="New Game" onClick={isShowingTopics ? createGame : showTopics} />

      <Input onChange={setValue} placeholder="Room ID to Join" />
      {isWrong
        && <p>Invalid Room ID</p>}
    </div>
  );

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

  if (context) {
    return (
      <MGContext.Provider value={context}>
        <MyGame />
      </MGContext.Provider>
    );
  }

  return menu;
}

export default MyGameMenu;
