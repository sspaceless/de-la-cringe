import React from 'react';

const userContext = React.createContext({
  userState: {
    isFetched: false,
    isAuthorized: false,
    user: {}
  },
  reloadUserState: undefined
});

export default userContext;
