import React from 'react';

const userContext = React.createContext({
  userState: {
    isAuthorized: false,
    user: {}
  },
  reloadUserState: undefined
});

export default userContext;
