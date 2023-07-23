import styled from 'styled-components/native';
import {colors} from '../../variables';
import {animated} from '@react-spring/native';

export const StyledRecipeItem = styled.ImageBackground`
  background-color: white;
  border-radius: 10px;
  min-height: 180px;
  width: 100%;
  margin-bottom: 10px;
  overflow: hidden;
  align-items: flex-start;
  justify-content: space-between;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
  position: relative;
  /* border: 1px solid green; */
`;

export const StyledIngredientsBox = styled.View`
  height: 65px;
  width: 100%;
  background-color: ${colors.secondary};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
  /* border: 1px solid red; */
`;

export const StyledIngredientsList = styled(animated.View)`
  background-color: white;
  /* border: 1px solid red; */
  margin-top: 129px;
`;

export const StyledIngredientsListContainer = styled.View`
  position: absolute;
  padding: 10px;
  padding-left: 20px;
  padding-right: 20px;

  display: flex;
  /* border: 1px solid red; */
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

export const StyledButtonContainer = styled(animated.View)`
  /* background-color: red; */
`;
