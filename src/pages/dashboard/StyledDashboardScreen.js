import styled from 'styled-components/native';
import {colors} from '../../variables';

export const StyledFridgeCode = styled.TouchableOpacity`
  background-color: #fff;
  border-radius: 10px;
  padding: 10px;
  width: 100%;
  height: 50px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

export const StyledLeaveFridge = styled.TouchableOpacity`
  background-color: ${colors.secondary};
  border-radius: 10px;
  padding: 10px;
  width: 50px;
  height: 50px;
  align-items: center;
  justify-content: center;
`;
