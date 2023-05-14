import React from 'react';

import {StyledTextWhite} from '../../../pages/sharedStyles';
import {StyledButton} from './StyledCustomButton';

interface ICustomButton {
  title: string;
  onPress: () => void;
  selected?: boolean;
  style?: any;
}

const CustomButton = ({title, onPress, selected, style}: ICustomButton) => {
  return (
    <StyledButton
      activeOpacity={1}
      title={title}
      onPress={onPress}
      style={style}
      selected={selected}>
      <StyledTextWhite>{title}</StyledTextWhite>
    </StyledButton>
  );
};

export default CustomButton;
