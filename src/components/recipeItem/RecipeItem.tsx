import React from 'react';
import {StyledRecipeItem, StyledIngredientsBox} from './StyledRecipeItem';
import {View, TouchableOpacity} from 'react-native';
import {StyledTitleBox} from '../fridgeItem/StyledFridgeItem';
import {StyledTextWhite} from '../../sharedStyles';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronDown} from '@fortawesome/free-solid-svg-icons';

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
    <StyledRecipeItem
      testID={'recipe-item'}
      source={{
        uri:
          props.image ||
          'https://raw.githubusercontent.com/koehlersimon/fallback/master/Resources/Public/Images/placeholder.jpg',
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
        }}>
        <StyledTitleBox>
          <StyledTextWhite>{props.title}</StyledTextWhite>
        </StyledTitleBox>
      </View>

      {/* {props.missedIngredients.map((ingredient: ingredient) => {
        return <Text key={ingredient.name}>{ingredient.name}</Text>;
      })}
      {props.usedIngredients.map((ingredient: ingredient) => {
        return <Text key={ingredient.name}>{ingredient.name}</Text>;
      })} */}

      <StyledIngredientsBox>
        <StyledTextWhite>Have: {props.usedIngredientCount}</StyledTextWhite>
        <StyledTextWhite>
          Missing: {props.missedIngredientCount}
        </StyledTextWhite>
        <TouchableOpacity>
          <FontAwesomeIcon icon={faChevronDown} color="white" size={30} />
        </TouchableOpacity>
      </StyledIngredientsBox>
    </StyledRecipeItem>
  );
};

export default RecipeItem;
