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

  it('should be disabled when disabled prop is true', () => {
    const onPress = jest.fn();
    const {getByTestId} = render(
      <CustomButton title={'test'} onPress={onPress} disabled={true} />,
    );
    const button = getByTestId('custom-button');
    expect(button.props.accessibilityState.disabled).toBeTruthy();
  });

  it('style prop should be applied', () => {
    const onPress = jest.fn();
    const {getByTestId} = render(
      <CustomButton
        title={'test'}
        onPress={onPress}
        style={{backgroundColor: 'red'}}
      />,
    );
    const button = getByTestId('custom-button');
    expect(button.props.style).toEqual({
      alignItems: 'center',
      backgroundColor: 'red',
      width: 130,
      height: 40,
      justifyContent: 'center',
      borderRadius: 15,
      opacity: 1,
    });
  });
});
