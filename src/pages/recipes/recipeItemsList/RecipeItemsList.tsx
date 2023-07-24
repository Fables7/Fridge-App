import React from 'react';
import {RefreshControl} from 'react-native';
import {StyledRecipeItemsList, StyledContainer} from './StyledRecipeItemsList';
import {RecipeItem, Loading} from '../../../components';
import {useGetRecipes} from '../../../hooks/getRecipesQuery';

const RecipeItemsList = () => {
  const {data, isLoading, refetch} = useGetRecipes();
  return (
    <StyledContainer>
      {isLoading ? (
        <Loading />
      ) : (
        <StyledRecipeItemsList
          data={data}
          contentContainerStyle={{paddingBottom: 100}}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={refetch} />
          }
          renderItem={({item}: any) => {
            return (
              <RecipeItem
                title={item.title}
                image={item.image}
                usedIngredientCount={item.usedIngredientCount}
                missedIngredientCount={item.missedIngredientCount}
                missedIngredients={item.missedIngredients}
                usedIngredients={item.usedIngredients}
              />
            );
          }}
        />
      )}
    </StyledContainer>
  );
};

export default RecipeItemsList;
