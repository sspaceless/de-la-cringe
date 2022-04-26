import { useCallback, useState, useEffect } from 'react';
import { quickGet } from '../modules/quickfetch';
import { completeGamesList } from '../modules/utils';

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
    const authInfo = await quickGet('http://localhost:3002/api/users/isAuthorized');

    if (authInfo.success && authInfo.isAuthorized) {
      const info = await quickGet('http://localhost:3002/api/users/getUserInfo');

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
