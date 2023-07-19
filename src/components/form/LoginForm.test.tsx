import React from 'react';
import {render} from '@testing-library/react-native';
import LoginForm from './LoginForm';

jest.mock('@fortawesome/react-native-fontawesome', () => ({
  FontAwesomeIcon: '',
}));
describe('LoginForm', () => {
  it('should render correctly', () => {
    const {getByTestId} = render(<LoginForm />);
    const form = getByTestId('login-form');
    expect(form).toBeTruthy();
  });
});
