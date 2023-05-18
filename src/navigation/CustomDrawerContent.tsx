/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useEffect} from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {AuthContext} from '../context/auth-context';
import {useHttpClient} from '../hooks/http-hook';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {TouchableOpacity, View} from 'react-native';
import {faBars} from '@fortawesome/pro-solid-svg-icons';
import {API_URL} from '../variables';

import {SignoutButton} from '../components';
import {StyledText} from '../sharedStyles';

export const CustomDrawerContent = (props: any) => {
  const {fridgeCode, fridgeId, setCode} = useContext(AuthContext);
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
    <DrawerContentScrollView>
      <DrawerItemList {...props} />
      <SignoutButton />
      <View style={{width: '100%', alignItems: 'center', marginTop: '5%'}}>
        <StyledText selectable={true}>CODE: {fridgeCode}</StyledText>
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
