import React from 'react';
import 'react-native-gesture-handler';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {
  SplashScreen,
  AuthScreen,
  AddFridgeItemScreen,
  DashboardScreen,
} from './src/pages';

import {Provider} from 'react-redux';
import {store} from './src/store/store';
import {useAuth} from './src/hooks/auth-hook';
import {AuthContext} from './src/context/auth-context';

import {HeaderLeftLogOut} from './src/navigation/CustomDrawerContent';
import {colors} from './src/variables';
import {Root, ItemDetailsNav} from './src/navigation/navigation';

const Stack = createNativeStackNavigator();

function App() {
  const {
    token,
    login,
    logout,
    userId,
    fridgeId,
    fridgeCode,
    setCode,
    setFridge,
    resetFridge,
  } = useAuth();
  let routes;

  if (token) {
    routes = (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{
            headerShown: true,
            headerShadowVisible: false,
            drawerActiveTintColor: colors.turquoise,
            drawerInactiveTintColor: 'white',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: colors.secondary,
              elevation: 0,
              shadowOpacity: 0,
              borderBottomWidth: 0,
            },
            headerTitleStyle: {
              color: 'white',
            },
            headerLeft: () => <HeaderLeftLogOut />,
          }}
        />
        <Stack.Screen name="Root" component={Root} />
        <Stack.Screen name="AddFridgeItem" component={AddFridgeItemScreen} />
        <Stack.Screen name="ItemDetailsNav" component={ItemDetailsNav} />
      </Stack.Navigator>
    );
  } else {
    routes = (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Auth" component={AuthScreen} />
      </Stack.Navigator>
    );
  }

  return (
    <Provider store={store}>
      <AuthContext.Provider
        value={{
          isLoggedIn: !!token,
          token: token,
          userId: userId,
          setCode: setCode,
          login: login,
          logout: logout,
          fridgeId: fridgeId,
          fridgeCode: fridgeCode,
          setFridge: setFridge,
          resetFridge: resetFridge,
        }}>
        <NavigationContainer>{routes}</NavigationContainer>
      </AuthContext.Provider>
    </Provider>
  );
}

export default App;
