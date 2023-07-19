import React from 'react';
import {StyledIncrementButton} from './StyledIncrementButton';
import {faPlus, faMinus} from '@fortawesome/free-solid-svg-icons';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

interface IIncrementButton {
  onPress: () => void;
  minus?: boolean;
}

const IncrementButton = ({onPress, minus}: IIncrementButton) => {
  return (
    <StyledIncrementButton
      onPress={onPress}
      activeOpacity={0.8}
      testID={'increment-button'}>
      <FontAwesomeIcon icon={minus ? faMinus : faPlus} />
    </StyledIncrementButton>
  );
};

export default IncrementButton;
