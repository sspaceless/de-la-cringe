import { useCallback, useState, useEffect } from 'react';
import { quickGet } from '../modules/quickfetch';
import { completeGamesList } from '../modules/utils';
import config from '../config.json';

function useUserState() {
  const [userState, setUserState] = useState({
    isFetched: false,
    isAuthorized: false,
    user: {}
  });

  useEffect(() => {
    document.title = userState.isFetched
      ? 'De La Cringe'
      : 'Updating...';
  }, [userState.isFetched]);

  const reloadUserState = useCallback(async () => {
    const authInfo = await quickGet(new URL('/api/users/isAuthorized', config.apiUrl));

    if (authInfo.success && authInfo.isAuthorized) {
      const info = await quickGet(new URL('/api/users/getUserInfo', config.apiUrl));

      if (info.success) {
        info.user.availableGames = completeGamesList(info.user.availableGames);

        setUserState({
          isFetched: true,
          isAuthorized: true,
          user: info.user
        });

        return;
      }
    }

    setUserState({
      isFetched: true,
      isAuthorized: false,
      user: { availableGames: completeGamesList([]) }
    });
  }, []);

  useEffect(() => {
    reloadUserState();
  }, [reloadUserState]);

  return [userState, reloadUserState];
}

export default useUserState;
