import styled from 'styled-components';
import {colors} from '../../../variables';

export const StyledFridgeItem = styled.ImageBackground`
  background-color: white;
  border-radius: 10px;
  height: 170px;
  margin-bottom: 10px;

  overflow: hidden;

  align-items: flex-start;
  justify-content: space-between;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);

  /* flex-direction: row; */
`;

export const StyledTitleBox = styled.View`
  height: 50px;
  width: auto;
  /* max-width: 100%; */
  background-color: ${colors.gray};
  justify-content: center;
  padding-left: 10px;
  padding-right: 10px;
  border-bottom-right-radius: 10px;
`;

export const StyledAmount = styled.View`
  height: 50px;
  width: 40px;
  background-color: ${colors.gray};
  border-top-right-radius: 10px;
  border-bottom-left-radius: 10px;
  justify-content: center;
  align-items: center;
`;

export const StyledRemainingBox = styled.View`
  height: 40px;
  width: 100%;
  background-color: ${colors.lightGreen};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 10px;
`;

export const StyledDate = styled.View`
  height: 40px;
  width: auto;
  justify-content: center;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
  border-top-left-radius: 10px;
  background-color: ${colors.gray};
`;
