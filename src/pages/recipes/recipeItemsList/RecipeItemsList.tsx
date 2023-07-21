import React from 'react';
import {StyledRecipeItemsList, StyledContainer} from './StyledRecipeItemsList';
import {RecipeItem} from '../../../components';

const data = [
  {
    title: 'bacon dish',
    image: 'https://www.themealdb.com/images/media/meals/1548772327.jpg',
    missedIngredientCount: 1,
    usedIngredientCount: 2,
    missedIngredients: [
      {
        name: 'bacon',
      },
    ],
    usedIngredients: [
      {
        name: 'eggs',
      },
      {
        name: 'cheese',
      },
    ],
  },
];

const RecipeItemsList = () => {
  return (
    <StyledContainer>
      <StyledRecipeItemsList
        testID={'recipe-items-list'}
        data={data}
        contentContainerStyle={{paddingBottom: 100}}
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
    </StyledContainer>
  );
};

export default RecipeItemsList;
