import {useState, useCallback, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

let logoutTimer;

export const useAuth = () => {
  const [token, setToken] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userId, setUserId] = useState(false);
  const [fridgeId, setFridgeId] = useState(false);
  const [fridgeCode, setFridgeCode] = useState(false);

  const setFridge = useCallback(async (fridgeID, code) => {
    setFridgeId(fridgeID);
    setFridgeCode(code);

    try {
      await AsyncStorage.setItem(
        'fridgeData',
        JSON.stringify({fridgeID, code}),
      );
      console.log('code set');
    } catch (err) {
      console.log(err);
    }
  }, []);

  const resetFridge = useCallback(async () => {
    setFridgeId(null);
    setFridgeCode(null);
    try {
      await AsyncStorage.removeItem('fridgeData');
      console.log('Fridge reset');
    } catch (err) {
      console.log(err);
    }
  }, []);

  const login = useCallback(async (uid, newToken, expirationDate) => {
    setToken(newToken);
    setUserId(uid);
    // setFridgeId(fridgeID);
    const newTokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);

    setTokenExpirationDate(newTokenExpirationDate);
    try {
      await AsyncStorage.setItem(
        'userData',
        JSON.stringify({
          userId: uid,
          token: newToken,
          // fridgeId: fridgeID,
          expirationDate: newTokenExpirationDate.toISOString(),
        }),
      );
      console.log('logged in');
    } catch (err) {
      console.log(err);
    }
  }, []);

  const logout = useCallback(async () => {
    setToken(null);
    setUserId(null);
    setFridgeId(null);
    setFridgeCode(null);
    setTokenExpirationDate(null);
    try {
      await AsyncStorage.removeItem('userData', 'fridgeData');
      console.log('signed out');
    } catch (err) {
      console.log(err);
    }
  }, []);

  const setCode = useCallback(async code => {
    setFridgeCode(code);
    try {
      await AsyncStorage.setItem('fridgeCode', code);
      console.log('code set');
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    const trySetFridge = async () => {
      const fridgeData = await AsyncStorage.getItem('fridgeData');
      if (fridgeData) {
        const parsedFridgeData = JSON.parse(fridgeData);
        setFridgeId(parsedFridgeData.fridgeID);
        setFridgeCode(parsedFridgeData.code);
      }
    };
    trySetFridge();
  }, [setFridge]);

  useEffect(() => {
    const tryCode = async () => {
      const code = await AsyncStorage.getItem('fridgeCode');
      if (code) {
        setFridgeCode(code);
      }
    };
    tryCode();
  }, [setCode]);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem('userData');
      const parsedUserData = JSON.parse(userData);
      if (parsedUserData && parsedUserData.token) {
        login(
          parsedUserData.userId,
          parsedUserData.token,
          // parsedUserData.fridgeId,
          //   new Date(userData.expirationDate),
        );
      }
      // console.log(parsedUserData.userId);
    };
    tryLogin();
    console.log('ran');
  }, [login]);

  return {
    token,
    login,
    logout,
    userId,
    fridgeId,
    fridgeCode,
    setCode,
    resetFridge,
    setFridge,
  };
};
