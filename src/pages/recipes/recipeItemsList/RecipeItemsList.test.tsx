import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
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

  it('should render recipe item', () => {
    const {getByTestId} = render(<RecipeItemsList />);
    const recipeItem = getByTestId('recipe-item');
    expect(recipeItem).toBeTruthy();
  });
});
