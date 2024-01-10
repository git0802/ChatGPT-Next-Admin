'use client';

import PropTypes from 'prop-types';
import { useMemo, useState, useCallback } from 'react';
import { useAuth0, Auth0Provider } from '@auth0/auth0-react';

import { AUTH0_API } from 'src/config-global';

import { AuthContext } from './auth-context';

// ----------------------------------------------------------------------

function AuthProviderWrapper({ children }) {
  const { isAuthenticated, user, isLoading, loginWithRedirect, loginWithPopup, logout } =
    useAuth0();

  const [popupClick, setPopupClick] = useState(true);

  // LOGIN
  const handleLoginWithPopup = useCallback(
    async (options) => {
      loginWithPopup?.(options);
      setPopupClick(false);
    },
    [loginWithPopup]
  );

  // LOGOUT
  const handleLogout = useCallback(
    async (options) => {
      logout?.(options);
    },
    [logout]
  );

  // ----------------------------------------------------------------------

  const checkAuthenticated = isAuthenticated ? 'authenticated' : 'unauthenticated';

  const status = popupClick && isLoading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: {
        ...user,
        displayName: user?.name,
        photoURL: user?.picture,
        role: 'admin',
      },
      method: 'auth0',
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
      //
      loginWithRedirect,
      loginWithPopup: handleLoginWithPopup,
      logout: handleLogout,
    }),
    [handleLoginWithPopup, handleLogout, loginWithRedirect, status, user]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}

AuthProviderWrapper.propTypes = {
  children: PropTypes.node,
};

// ----------------------------------------------------------------------

export const AuthProvider = ({ children }) => {
  const domain = AUTH0_API.domain ?? '';

  const clientId = AUTH0_API.clientId ?? '';

  const redirectUri = AUTH0_API.callbackUrl ?? '';

  const onRedirectCallback = useCallback((appState) => {
    window.location.replace(appState?.returnTo || window.location.pathname);
  }, []);

  if (!(domain && clientId && redirectUri)) {
    return null;
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
      }}
      onRedirectCallback={onRedirectCallback}
      cacheLocation="localstorage"
    >
      <AuthProviderWrapper>{children}</AuthProviderWrapper>
    </Auth0Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};
