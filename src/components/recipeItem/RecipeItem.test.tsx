import React from 'react';
import {render} from '@testing-library/react-native';
import RecipeItem from './RecipeItem';

describe('RecipeItem', () => {
  it('should render correctly', () => {
    const {getByTestId} = render(<RecipeItem />);
    const recipeItem = getByTestId('recipe-item');
    expect(recipeItem).toBeTruthy();
  });
});
