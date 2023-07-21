import React from 'react';
import {render} from '@testing-library/react-native';
import RecipeItem from './RecipeItem';

describe('RecipeItem', () => {
  it('should render correctly', () => {
    const {getByTestId} = render(
      <RecipeItem
        title={''}
        image={''}
        usedIngredientCount={0}
        missedIngredientCount={0}
        missedIngredients={[]}
        usedIngredients={[]}
      />,
    );
    const recipeItem = getByTestId('recipe-item');
    expect(recipeItem).toBeTruthy();
  });
});
