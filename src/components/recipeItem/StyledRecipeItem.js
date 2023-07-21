import styled from 'styled-components/native';
import {colors} from '../../variables';

export const StyledRecipeItem = styled.ImageBackground`
  background-color: white;
  border-radius: 10px;
  height: 180px;
  margin-bottom: 10px;
  overflow: hidden;
  align-items: flex-start;
  justify-content: space-between;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
`;

export const StyledIngredientsBox = styled.View`
  height: 50px;
  width: 100%;
  background-color: ${colors.secondary};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
`;
