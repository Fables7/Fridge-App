import {createContext} from 'react';

export const AuthContext = createContext({
  isLoggedIn: false,
  userId: null,
  fridgeId: null,
  fridgeCode: null,
  token: null,
  login: () => {},
  logout: () => {},
  setCode: () => {},
  setFridge: () => {},
  resetFridge: () => {},
});
