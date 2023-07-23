import React from 'react';
import {render} from '@testing-library/react-native';
import RecipeItemsList from './RecipeItemsList';

jest.mock('@fortawesome/react-native-fontawesome', () => ({
  FontAwesomeIcon: '',
}));
describe('RecipeItemsList', () => {
  it('should render correctly', () => {
    const {getByTestId} = render(<RecipeItemsList />);
    const recipeItemsList = getByTestId('recipe-items-list');
    expect(recipeItemsList).toBeTruthy();
  });
});
