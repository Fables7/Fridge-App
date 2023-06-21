import React from 'react';
import 'react-native-gesture-handler';

import {createDrawerNavigator} from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {
  FridgeScreen,
  NeedToBuyScreen,
  ExpiringSoonScreen,
  RecipesScreen,
  RecurringItemsScreen,
  ItemDetailsScreen,
  ExpiredScreen,
  EditItemScreen,
} from '../pages';

import {
  CustomDrawerContent,
  HeaderRight,
  HeaderLeft,
} from './CustomDrawerContent';
import {colors} from '../variables';
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

const renderDrawerContent = (props: any) => {
  return <CustomDrawerContent {...props} />;
};

const renderAddItemOptions = ({navigation}: any) => ({
  headerRight: () => (
    <HeaderRight
      icon={faPlus}
      onPress={() => navigation.navigate('AddFridgeItem')}
    />
  ),
  drawerIcon: ({color}: any) => (
    <FontAwesomeIcon icon={faHouse} size={20} color={color} />
  ),
});

const renderRootNavOptions = ({navigation}: any) => ({
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

const ItemDetailsNav = ({navigation}: any) => {
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

export {Root, ItemDetailsNav};
