import React from 'react';
import 'react-native-gesture-handler';

import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {
  SplashScreen,
  AuthScreen,
  FridgeScreen,
  AddFridgeItemScreen,
  NeedToBuyScreen,
  ExpiringSoonScreen,
  RecipesScreen,
  RecurringItemsScreen,
  ItemDetailsScreen,
  ExpiredScreen,
} from './src/pages';

import {Provider} from 'react-redux';
import {store} from './src/store/store';
import {useAuth} from './src/hooks/auth-hook';
import {AuthContext} from './src/context/auth-context';

import {
  CustomDrawerContent,
  HeaderRight,
  HeaderLeft,
} from './src/navigation/CustomDrawerContent';
import {colors} from './src/variables';
import {
  faPlus,
  faRefrigerator,
  faListCheck,
  faHourglassClock,
  faHourglassEnd,
  faFaceThinking,
  faRepeat,
} from '@fortawesome/pro-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const renderDrawerContent = props => {
  return <CustomDrawerContent {...props} />;
};

const renderAddItemOptions = ({navigation}) => ({
  headerRight: () => (
    <HeaderRight
      icon={faPlus}
      onPress={() => navigation.navigate('AddFridgeItem')}
    />
  ),
  drawerIcon: ({color}) => (
    <FontAwesomeIcon icon={faRefrigerator} size={20} color={color} />
  ),
});

const renderRootNavOptions = ({navigation}) => ({
  // headerShown: false,
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
  headerLeft: () => <HeaderLeft navigation={navigation} />,
});

const Root = () => {
  return (
    <Drawer.Navigator
      screenOptions={renderRootNavOptions}
      drawerContent={renderDrawerContent}>
      <Drawer.Screen
        options={renderAddItemOptions}
        name="Fridge Items"
        component={FridgeScreen}
      />
      <Drawer.Screen
        name="Need To Buy"
        component={NeedToBuyScreen}
        options={{
          drawerIcon: ({color}) => (
            <FontAwesomeIcon icon={faListCheck} size={20} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Expiring Soon"
        component={ExpiringSoonScreen}
        options={{
          drawerIcon: ({color}) => (
            <FontAwesomeIcon icon={faHourglassClock} size={20} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Expired"
        component={ExpiredScreen}
        options={{
          drawerIcon: ({color}) => (
            <FontAwesomeIcon icon={faHourglassEnd} size={20} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="What can I make?"
        component={RecipesScreen}
        options={{
          drawerIcon: ({color}) => (
            <FontAwesomeIcon icon={faFaceThinking} size={20} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Recurring Items"
        component={RecurringItemsScreen}
        options={{
          drawerIcon: ({color}) => (
            <FontAwesomeIcon icon={faRepeat} size={20} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

function App() {
  const {token, login, logout, userId, fridgeId, fridgeCode, setCode} =
    useAuth();
  let routes;

  if (token) {
    routes = (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Root" component={Root} />
        <Stack.Screen name="AddFridgeItem" component={AddFridgeItemScreen} />
        <Stack.Screen name="ItemDetails" component={ItemDetailsScreen} />
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
        }}>
        <NavigationContainer>{routes}</NavigationContainer>
      </AuthContext.Provider>
    </Provider>
  );
}

export default App;
