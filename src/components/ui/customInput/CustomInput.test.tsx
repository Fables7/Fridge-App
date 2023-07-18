import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import CustomInput from './CustomInput';

describe('CustomInput', () => {
  it('should render correctly', () => {
    const onChangeText = jest.fn();
    const {getByTestId} = render(<CustomInput onChangeText={onChangeText} />);
    const input = getByTestId('custom-input');
    expect(input).toBeTruthy();
  });

  it('should call onChangeText when input is changed', () => {
    const onChangeText = jest.fn();
    const {getByTestId} = render(<CustomInput onChangeText={onChangeText} />);
    const input = getByTestId('custom-input');
    fireEvent.changeText(input, 'test');
    expect(onChangeText).toHaveBeenCalled();
  });

  it('should render title when title prop is passed', () => {
    const onChangeText = jest.fn();
    const {getByText} = render(
      <CustomInput onChangeText={onChangeText} title={'test'} />,
    );
    const title = getByText('test');
    expect(title).toBeTruthy();
  });

  it('should render error message when errMsg prop is passed', () => {
    const onChangeText = jest.fn();
    const {getByText} = render(
      <CustomInput onChangeText={onChangeText} errMsg={'test'} />,
    );
    const errMsg = getByText('test');
    expect(errMsg).toBeTruthy();
  });

  it('should render secureTextEntry when secureTextEntry prop is passed', () => {
    const onChangeText = jest.fn();
    const {getByTestId} = render(
      <CustomInput onChangeText={onChangeText} secureTextEntry={true} />,
    );
    const input = getByTestId('custom-input');
    expect(input.props.secureTextEntry).toBeTruthy();
  });

  it('should render autoCapitalize false when autoCapitalize prop is passed', () => {
    const onChangeText = jest.fn();
    const {getByTestId} = render(
      <CustomInput onChangeText={onChangeText} autoCapitalize={'none'} />,
    );
    const input = getByTestId('custom-input');
    expect(input.props.autoCapitalize).toEqual('none');
  });

  it('should render maxLength when maxLength prop is passed', () => {
    const onChangeText = jest.fn();
    const {getByTestId} = render(
      <CustomInput onChangeText={onChangeText} maxLength={10} />,
    );
    const input = getByTestId('custom-input');
    expect(input.props.maxLength).toEqual(10);
  });

  it('should render keyboardType when keyboardType prop is passed', () => {
    const onChangeText = jest.fn();
    const {getByTestId} = render(
      <CustomInput onChangeText={onChangeText} keyboardType={'numeric'} />,
    );
    const input = getByTestId('custom-input');
    expect(input.props.keyboardType).toEqual('numeric');
  });
});
