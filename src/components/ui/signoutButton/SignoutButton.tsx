import React, {useContext} from 'react';
import {Button} from 'react-native';

import {AuthContext} from '../../../context/auth-context';

const SignoutButton = () => {
  const auth = useContext(AuthContext);
  return <Button title="Sign Out" onPress={() => auth.logout()} />;
};

export default SignoutButton;
