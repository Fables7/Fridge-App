import {useQuery} from '@tanstack/react-query';
import axios from 'axios';
import {recipe_api_key} from '../config';
import {useGetHomeFridgeItems} from './getAllFridgeItemsQuery';

// Get recipes
export const useGetRecipes = () => {
  const {data: fridgeItems} = useGetHomeFridgeItems();
  const ingredients = fridgeItems.map((item: any) => item.product.name);
  const ingredientsString = ingredients.join(',');
  console.log('ingredientsString:', ingredients);
  const {isLoading, data, error, refetch} = useQuery(['recipes'], async () => {
    const {data: responseData} = await axios.get(
      `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientsString}`,
      {
        params: {
          apiKey: recipe_api_key,
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${recipe_api_key}`,
        },
      },
    );
    // console.log('responseData:', responseData);
    return responseData;
  });

  return {data, isLoading, error, refetch};
};
