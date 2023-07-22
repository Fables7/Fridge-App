import React, {useState, useEffect} from 'react';
import {
  StyledRecipeItem,
  StyledIngredientsBox,
  StyledIngredientsList,
  StyledButtonContainer,
} from './StyledRecipeItem';
import {View, TouchableOpacity} from 'react-native';
import {StyledTitleBox} from '../fridgeItem/StyledFridgeItem';
import {StyledTextWhite, StyledText} from '../../sharedStyles';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronDown} from '@fortawesome/free-solid-svg-icons';
import {useSpring} from '@react-spring/native';

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
  const [isOpen, setIsOpen] = useState(false);
  const numberOfIngredients =
    props.usedIngredientCount + props.missedIngredientCount;

  const contentProps = useSpring({
    height: isOpen ? numberOfIngredients * 23 : 0,
    config: {tension: 300, friction: 40},
  });

  const {rotate} = useSpring({
    to: {rotate: isOpen ? 1 : 0},
    config: {duration: 300},
  });

  useEffect(() => {
    rotate.start({to: {rotate: isOpen ? 1 : 0}});
  }, [isOpen, rotate]);

  return (
    <StyledRecipeItem
      testID={'recipe-item'}
      imageStyle={{height: 180}}
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

      <View>
        <StyledIngredientsList style={contentProps}>
          {props.usedIngredients.map((ingredient: ingredient) => {
            return (
              <StyledText key={ingredient.name}>{ingredient.name}</StyledText>
            );
          })}
          {props.missedIngredients.map((ingredient: ingredient) => {
            return (
              <StyledText key={ingredient.name}>{ingredient.name}</StyledText>
            );
          })}
        </StyledIngredientsList>
        <StyledIngredientsBox>
          <StyledTextWhite>Have: {props.usedIngredientCount}</StyledTextWhite>
          <StyledTextWhite>
            Missing: {props.missedIngredientCount}
          </StyledTextWhite>
          <StyledButtonContainer
            style={{
              transform: [{rotate: rotate.to([0, 1], ['0deg', '180deg'])}],
            }}>
            <TouchableOpacity onPress={() => setIsOpen(!isOpen)}>
              <FontAwesomeIcon icon={faChevronDown} color="white" size={30} />
            </TouchableOpacity>
          </StyledButtonContainer>
        </StyledIngredientsBox>
      </View>
    </StyledRecipeItem>
  );
};

export default RecipeItem;
