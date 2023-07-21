import React from 'react';
import {StyledRecipeItem} from './StyledRecipeItem';
import {Text} from 'react-native';

type ingredient = {
  name: string;
};

interface IRecipeItem {
  title: string;
  image: string;
  usedIngredientCount: number;
  missedIngredientCount: number;
  missedIngredients: ingredient[];
  usedIngredients: ingredient[];
}

const RecipeItem = ({...props}: IRecipeItem) => {
  return (
    <StyledRecipeItem testID={'recipe-item'}>
      <Text>{props.title}</Text>
    </StyledRecipeItem>
  );
};

export default RecipeItem;
