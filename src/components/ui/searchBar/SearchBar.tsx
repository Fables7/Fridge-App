import React from 'react';
import {StyledSearchBar} from './StyledSearchBar';

interface ISearchBar {
  placeholder?: string;
  onChangeText?: (e: string) => void;
  value?: string;
  style?: React.CSSProperties;
  containerStyle?: any;
}

const SearchBar = ({...props}: ISearchBar) => {
  return (
    <StyledSearchBar
      placeholder={props.placeholder}
      testID="search-bar"
      placeholderTextColor="#000"
    />
  );
};

export default SearchBar;
