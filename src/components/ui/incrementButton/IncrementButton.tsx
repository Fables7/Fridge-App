import React from 'react';
import {StyledIncrementButton} from './StyledIncrementButton';
import {faPlus, faMinus} from '@fortawesome/pro-solid-svg-icons';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

const IncrementButton = ({onPress, minus}: any) => {
  return (
    <StyledIncrementButton onPress={onPress} activeOpacity={0.8}>
      <FontAwesomeIcon icon={minus ? faMinus : faPlus} />
    </StyledIncrementButton>
  );
};

export default IncrementButton;
