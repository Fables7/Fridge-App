/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {AuthContext} from '../context/auth-context';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {TouchableOpacity, View} from 'react-native';
import {
  faBars,
  faPowerOff,
  faRightFromBracket,
  faGrip,
} from '@fortawesome/free-solid-svg-icons';
import {colors} from '../variables';

import {StyledTextWhite} from '../sharedStyles';

export const CustomDrawerContent = (props: any) => {
  const {fridgeCode, logout, resetFridge} = useContext(AuthContext);

  return (
    <DrawerContentScrollView style={{backgroundColor: colors.secondary}}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Dashboard"
        inactiveTintColor="white"
        onPress={() => {
          resetFridge();
          props.navigation.navigate('Dashboard');
        }}
        icon={({color}) => (
          <FontAwesomeIcon icon={faGrip} color={color} size={20} />
        )}
      />

      <View style={{width: '100%', alignItems: 'center', marginTop: '5%'}}>
        <StyledTextWhite selectable={true}>CODE: {fridgeCode}</StyledTextWhite>
      </View>
      <DrawerItem
        style={{marginTop: '100%'}}
        label="Sign Out"
        inactiveTintColor="white"
        onPress={() => logout()}
        icon={({color}) => (
          <FontAwesomeIcon icon={faPowerOff} color={color} size={20} />
        )}
      />
    </DrawerContentScrollView>
  );
};

export const HeaderRight = ({onPress, icon}: any) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <FontAwesomeIcon
        size={30}
        style={{marginRight: 15}}
        icon={icon}
        color="white"
      />
    </TouchableOpacity>
  );
};

export const HeaderLeft = ({navigation}: any) => {
  return (
    <TouchableOpacity onPress={() => navigation.openDrawer()}>
      <FontAwesomeIcon
        size={30}
        style={{marginLeft: 15}}
        icon={faBars}
        color="white"
      />
    </TouchableOpacity>
  );
};

export const HeaderLeftLogOut = () => {
  const {logout} = useContext(AuthContext);

  return (
    <TouchableOpacity onPress={() => logout()}>
      <FontAwesomeIcon
        size={30}
        style={{marginLeft: 15}}
        icon={faRightFromBracket}
        color="white"
      />
    </TouchableOpacity>
  );
};
