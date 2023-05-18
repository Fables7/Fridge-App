import React from 'react';
import {StyleSheet, TouchableWithoutFeedback, Keyboard} from 'react-native';
import {LoginForm} from '../../components';
import {StyledMain} from '../../sharedStyles';

const AuthScreen = () => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <StyledMain style={styles.main}>
        <LoginForm />
      </StyledMain>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  main: {
    justifyContent: 'center',
    paddingHorizontal: '5%',
    alignItems: 'center',
  },
});

export default AuthScreen;
