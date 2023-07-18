import React from 'react';
import {render, screen} from '@testing-library/react-native';
import CustomButton from './CustomButton';

describe('CustomButton', () => {
  test('renders CustomButton component', () => {
    render(
      <CustomButton
        title={''}
        onPress={function (): void {
          throw new Error('Function not implemented.');
        }}
      />,
    );
  });
  test('test', () => {
    expect(true).toBe(true);
  });
});
