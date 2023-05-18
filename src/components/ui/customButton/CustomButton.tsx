import React from 'react';

import {StyledTextWhite} from '../../../sharedStyles';
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
      <StyledTextWhite>{title}</StyledTextWhite>
    </StyledButton>
  );
};

export default CustomButton;
