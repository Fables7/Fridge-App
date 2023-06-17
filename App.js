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
  DashboardScreen,
  EditItemScreen,
} from './src/pages';

import {Provider} from 'react-redux';
import {store} from './src/store/store';
import {useAuth} from './src/hooks/auth-hook';
import {AuthContext} from './src/context/auth-context';

import {
  CustomDrawerContent,
  HeaderRight,
  HeaderLeft,
  HeaderLeftLogOut,
} from './src/navigation/CustomDrawerContent';
import {colors} from './src/variables';
import {
  faPlus,
  faHouse,
  faListCheck,
  faHourglassHalf,
  faHourglassEnd,
  faUtensils,
  faRepeat,
  faEdit,
} from '@fortawesome/free-solid-svg-icons';
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
    <FontAwesomeIcon icon={faHouse} size={20} color={color} />
  ),
});

const renderRootNavOptions = ({navigation}) => ({
  // headerShown: false,
  drawerActiveTintColor: colors.turquoise,
  headerShadowVisible: false,
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
            <FontAwesomeIcon icon={faHourglassHalf} size={20} color={color} />
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
            <FontAwesomeIcon icon={faUtensils} size={20} color={color} />
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

const ItemDetailsNav = ({navigation}) => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="ItemDetails"
        component={ItemDetailsScreen}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: colors.secondary,
          },
          headerTitle: '',
          headerBackVisible: false,
          headerRight: () => (
            <HeaderRight
              icon={faEdit}
              onPress={() => navigation.navigate('EditItem')}
            />
          ),
        }}
      />
      <Stack.Screen name="EditItem" component={EditItemScreen} />
    </Stack.Navigator>
  );
};

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
