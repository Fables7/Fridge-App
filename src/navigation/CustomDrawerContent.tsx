/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {TouchableOpacity} from 'react-native';
import {faBars} from '@fortawesome/pro-solid-svg-icons';

import {SignoutButton} from '../components';

export const CustomDrawerContent = (props: any) => {
  return (
    <DrawerContentScrollView>
      <DrawerItemList {...props} />
      <SignoutButton />
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
