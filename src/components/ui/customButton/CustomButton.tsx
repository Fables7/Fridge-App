import React from 'react';

import {StyledText} from '../../../sharedStyles';
import {StyledButton} from './StyledCustomButton';

interface ICustomButton {
  title: string;
  onPress: () => void;
  selected?: boolean;
  style?: any;
  disabled?: boolean;
}

const CustomButton = ({
  title,
  onPress,
  selected,
  style,
  disabled,
}: ICustomButton) => {
  return (
    <StyledButton
      activeOpacity={1}
      title={title}
      onPress={onPress}
      style={style}
      selected={selected}
      disabled={disabled}>
      <StyledText>{title}</StyledText>
    </StyledButton>
  );
};

export default CustomButton;
