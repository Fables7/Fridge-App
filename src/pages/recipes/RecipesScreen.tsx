import React from 'react';
import {Text} from 'react-native';
import {StyledMain, StyledHeader} from '../../sharedStyles';
import {SearchBar} from '../../components';
import RecipeItemsList from './recipeItemsList/RecipeItemsList';

const RecipesScreen = () => {
  return (
    <StyledMain>
      <StyledHeader style={{height: 70}}>
        <SearchBar placeholder="Search Ingredient" />
      </StyledHeader>
      <Text>Recipes Screen WIP</Text>
      <RecipeItemsList />
    </StyledMain>
  );
};

export default RecipesScreen;
