'use client';

import { useContext } from 'react';

import { AuthContext } from '../context/jwt/auth-context';
// import { AuthContext } from '../context/auth0/auth-context';
// import { AuthContext } from '../context/amplify/auth-context';
// import { AuthContext } from '../context/firebase/auth-context';

// ----------------------------------------------------------------------

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) throw new Error('useAuthContext context must be use inside AuthProvider');

  return context;
};
