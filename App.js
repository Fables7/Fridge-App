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
import {faPlus} from '@fortawesome/pro-solid-svg-icons';

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
});

const renderRootNavOptions = ({navigation}) => ({
  // headerShown: false,
  headerTitleAlign: 'center',
  headerStyle: {
    backgroundColor: colors.gray,
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
      <Drawer.Screen name="Need To Buy" component={NeedToBuyScreen} />
      <Drawer.Screen name="Expiring Soon" component={ExpiringSoonScreen} />
      <Drawer.Screen name="Expired" component={ExpiredScreen} />
      <Drawer.Screen name="What can I make?" component={RecipesScreen} />
      <Drawer.Screen name="Recurring Items" component={RecurringItemsScreen} />
    </Drawer.Navigator>
  );
};

function App() {
  const {token, login, logout, userId, fridgeId} = useAuth();
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
          login: login,
          logout: logout,
          fridgeId: fridgeId,
        }}>
        <NavigationContainer>{routes}</NavigationContainer>
      </AuthContext.Provider>
    </Provider>
  );
}

export default App;
