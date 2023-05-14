import React from 'react';
import {View, Text} from 'react-native';
import {LoginForm} from '../../components';

const AuthScreen = () => {
  return (
    <View>
      <Text>Auth Screen</Text>
      <LoginForm />
    </View>
  );
};

export default AuthScreen;
