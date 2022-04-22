import React, { useState } from 'react';
import SignInView from './SignInView';
import SignUpView from './SignUpView';

function AuthWindow() {
  const [isSignInShown, setSignInShown] = useState(true);

  return (
    <div>
      {isSignInShown
        ? <SignInView />
        : <SignUpView accountCreatedCallback={() => setSignInShown(true)} />}

      {isSignInShown
        // eslint-disable-next-line
        ? <p>Don{'\''}t have an account? <a href='#'onClick={() => setSignInShown(false)}>Create one!</a></p>
        // eslint-disable-next-line
        : <p>Already have an account? <a href='#'onClick={() => setSignInShown(true)}>Sign in!</a></p>}
    </div>
  );
}

export default AuthWindow;
