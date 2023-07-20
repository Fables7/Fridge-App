import React from 'react';
import {render} from '@testing-library/react-native';
import SearchBar from './SearchBar';

describe('SearchBar', () => {
  it('should render correctly', () => {
    const {getByTestId} = render(<SearchBar />);
    const searchBar = getByTestId('search-bar');
    expect(searchBar).toBeTruthy();
  });
});
