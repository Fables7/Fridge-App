/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useEffect} from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {AuthContext} from '../context/auth-context';
import {useHttpClient} from '../hooks/http-hook';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {TouchableOpacity, View} from 'react-native';
import {faBars, faPowerOff} from '@fortawesome/free-solid-svg-icons';
import {API_URL, colors} from '../variables';

import {StyledTextWhite} from '../sharedStyles';

export const CustomDrawerContent = (props: any) => {
  const {fridgeCode, fridgeId, setCode, logout} = useContext(AuthContext);
  const {sendRequest} = useHttpClient();

  useEffect(() => {
    if (!fridgeCode && fridgeId) {
      const fetchCode = async () => {
        try {
          const responseData = await sendRequest(
            `${API_URL}/api/v1/fridges/${fridgeId}/code`,
            'GET',
            null,
            {'Content-Type': 'application/json'},
          );
          console.log(responseData.data.code);
          // @ts-ignore
          setCode(responseData.data.code);
        } catch (err) {
          console.log(err);
        }
      };
      fetchCode();
    }
  }, [fridgeCode, fridgeId, sendRequest, setCode]);
  return (
    <DrawerContentScrollView style={{backgroundColor: colors.secondary}}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Sign Out"
        inactiveTintColor="white"
        onPress={() => logout()}
        icon={({color}) => (
          <FontAwesomeIcon icon={faPowerOff} color={color} size={20} />
        )}
      />

      <View style={{width: '100%', alignItems: 'center', marginTop: '5%'}}>
        <StyledTextWhite selectable={true}>CODE: {fridgeCode}</StyledTextWhite>
      </View>
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
