import React from 'react';
import {StyledMain} from '../../sharedStyles';
import {CustomButton} from '../../components';

interface ISplashScreen {
  navigation: any;
}

const SplashScreen = ({navigation}: ISplashScreen) => {
  return (
    <StyledMain style={{alignItems: 'center', justifyContent: 'center'}}>
      <CustomButton
        title="Continue"
        onPress={() => navigation.navigate('Auth')}
      />
    </StyledMain>
  );
};

export default SplashScreen;
