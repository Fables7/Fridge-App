import styled from 'styled-components/native';
import {colors} from '../../../variables';

export const StyledButton = styled.TouchableOpacity`
  background-color: ${props =>
    props.selected ? colors.turquoise : colors.lightGray};
  width: 130px;
  height: 40px;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
`;
