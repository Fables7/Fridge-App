import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import IncrementButton from './IncrementButton';

jest.mock('@fortawesome/react-native-fontawesome', () => ({
  FontAwesomeIcon: '',
}));
describe('IncremenetButton', () => {
  it('should render correctly', () => {
    const onPress = jest.fn();
    const {getByTestId} = render(<IncrementButton onPress={onPress} />);
    const button = getByTestId('increment-button');
    expect(button).toBeTruthy();
  });

  it('should call onPress when button is pressed', () => {
    const onPress = jest.fn();
    const {getByTestId} = render(<IncrementButton onPress={onPress} />);
    const button = getByTestId('increment-button');
    fireEvent.press(button);
    expect(onPress).toHaveBeenCalled();
  });

  it('should render minus icon when minus prop is true', () => {
    const onPress = jest.fn();
    const {getByTestId} = render(
      <IncrementButton onPress={onPress} minus={true} />,
    );
    const button = getByTestId('increment-button');
    expect(button.props.children[0].props.icon.iconName).toEqual('minus');
  });

  it('should render plus icon when minus prop is false', () => {
    const onPress = jest.fn();
    const {getByTestId} = render(
      <IncrementButton onPress={onPress} minus={false} />,
    );
    const button = getByTestId('increment-button');
    expect(button.props.children[0].props.icon.iconName).toEqual('plus');
  });
});
