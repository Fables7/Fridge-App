import React from 'react';
import {Text, Button} from 'react-native';
import {StyledMain} from './StyledSplashScreen';

interface ISplashScreen {
  navigation: any;
}

const SplashScreen = ({navigation}: ISplashScreen) => {
  return (
    <StyledMain>
      <Text>Splash Screen</Text>
      <Button title="Continue" onPress={() => navigation.navigate('Auth')} />
    </StyledMain>
  );
};

export default SplashScreen;
