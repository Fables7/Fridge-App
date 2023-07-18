import styled from 'styled-components/native';
import {colors} from './variables';

export const StyledMain = styled.SafeAreaView`
  background-color: ${colors.primary};
  flex: 1;
`;

export const StyledHeader = styled.View`
  background-color: ${colors.secondary};
  height: 50px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  margin-bottom: 20px;
`;

export const StyledText = styled.Text`
  font-size: 16px;
  color: black;
`;

export const StyledTextWhite = styled.Text`
  font-size: 16px;
  color: white;
`;
