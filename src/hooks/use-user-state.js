import { useCallback, useState } from 'react';
import { quickGet } from '../modules/quickfetch';

function useUserState() {
  const [userState, setUserState] = useState({
    isAuthorized: false,
    user: {}
  });

  const reloadUserState = useCallback(async () => {
    const authInfo = await quickGet('http://localhost:3002/api/users/isAuthorized');

    if (authInfo.success && authInfo.isAuthorized) {
      const info = await quickGet('http://localhost:3002/api/users/getUserInfo');

      if (info.success) {
        setUserState({
          isAuthorized: true,
          user: info.user
        });

        return;
      }
    }

    setUserState({
      isAuthorized: false,
      user: {}
    });
  }, []);

  return [userState, reloadUserState];
}

export default useUserState;
