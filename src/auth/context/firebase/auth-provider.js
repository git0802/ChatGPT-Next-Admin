'use client';

import PropTypes from 'prop-types';
import { initializeApp } from 'firebase/app';
import { useMemo, useEffect, useReducer, useCallback } from 'react';
import { doc, getDoc, setDoc, collection, getFirestore } from 'firebase/firestore';
import {
  getAuth,
  signOut,
  signInWithPopup,
  onAuthStateChanged,
  GoogleAuthProvider,
  GithubAuthProvider,
  TwitterAuthProvider,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

import { FIREBASE_API } from 'src/config-global';

import { AuthContext } from './auth-context';

// ----------------------------------------------------------------------

// NOTE:
// We only build demo at basic level.
// Customer will need to do some extra handling yourself if you want to extend the logic and other features...

// ----------------------------------------------------------------------

const firebaseApp = initializeApp(FIREBASE_API);

const AUTH = getAuth(firebaseApp);

const DB = getFirestore(firebaseApp);

// ----------------------------------------------------------------------

const initialState = {
  user: null,
  loading: true,
};

const reducer = (state, action) => {
  if (action.type === 'INITIAL') {
    return {
      loading: false,
      user: action.payload.user,
    };
  }
  return state;
};

// ----------------------------------------------------------------------

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = useCallback(() => {
    try {
      onAuthStateChanged(AUTH, async (user) => {
        if (user) {
          if (user.emailVerified) {
            const userProfile = doc(DB, 'users', user.uid);

            const docSnap = await getDoc(userProfile);

            const profile = docSnap.data();

            dispatch({
              type: 'INITIAL',
              payload: {
                user: {
                  ...user,
                  ...profile,
                  id: user.uid,
                  role: 'admin',
                },
              },
            });
          } else {
            dispatch({
              type: 'INITIAL',
              payload: {
                user: null,
              },
            });
          }
        } else {
          dispatch({
            type: 'INITIAL',
            payload: {
              user: null,
            },
          });
        }
      });
    } catch (error) {
      console.error(error);
      dispatch({
        type: 'INITIAL',
        payload: {
          user: null,
        },
      });
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const login = useCallback(async (email, password) => {
    await signInWithEmailAndPassword(AUTH, email, password);
  }, []);

  const loginWithGoogle = useCallback(async () => {
    const provider = new GoogleAuthProvider();

    await signInWithPopup(AUTH, provider);
  }, []);

  const loginWithGithub = useCallback(async () => {
    const provider = new GithubAuthProvider();

    await signInWithPopup(AUTH, provider);
  }, []);

  const loginWithTwitter = useCallback(async () => {
    const provider = new TwitterAuthProvider();

    await signInWithPopup(AUTH, provider);
  }, []);

  // REGISTER
  const register = useCallback(async (email, password, firstName, lastName) => {
    const newUser = await createUserWithEmailAndPassword(AUTH, email, password);

    await sendEmailVerification(newUser.user);

    const userProfile = doc(collection(DB, 'users'), newUser.user?.uid);

    await setDoc(userProfile, {
      uid: newUser.user?.uid,
      email,
      displayName: `${firstName} ${lastName}`,
    });
  }, []);

  // LOGOUT
  const logout = useCallback(async () => {
    await signOut(AUTH);
  }, []);

  // FORGOT PASSWORD
  const forgotPassword = useCallback(async (email) => {
    await sendPasswordResetEmail(AUTH, email);
  }, []);

  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user?.emailVerified ? 'authenticated' : 'unauthenticated';

  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      method: 'firebase',
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
      //
      login,
      logout,
      register,
      forgotPassword,
      loginWithGoogle,
      loginWithGithub,
      loginWithTwitter,
    }),
    [
      status,
      state.user,
      //
      login,
      logout,
      register,
      forgotPassword,
      loginWithGithub,
      loginWithGoogle,
      loginWithTwitter,
    ]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};
