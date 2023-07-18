import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import CustomButton from './CustomButton';

describe('CustomButton', () => {
  it('should render correctly', () => {
    const onPress = jest.fn();
    const {getByTestId} = render(
      <CustomButton title={'test'} onPress={onPress} />,
    );
    const button = getByTestId('custom-button');
    expect(button).toBeTruthy();
  });

  it('should call onPress when button is pressed', () => {
    const onPress = jest.fn();
    const {getByTestId} = render(
      <CustomButton title={'test'} onPress={onPress} />,
    );
    const button = getByTestId('custom-button');
    fireEvent.press(button);
    expect(onPress).toHaveBeenCalled();
  });
});
