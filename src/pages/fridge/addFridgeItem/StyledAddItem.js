import styled from 'styled-components/native';
import {colors} from '../../../variables';

export const StyledMain = styled.View`
  flex: 1;
  position: relative;
  justify-content: flex-end;
  align-items: center;
`;

export const StyledFooter = styled.View`
  height: 50%;
  width: 100%;
  /* padding: 20px 0; */
  /* border: 1px solid red; */
  /* align-items: center; */
  justify-content: center;
  background-color: ${colors.primary};
`;

export const CameraContainer = styled.View`
  width: 100%;
  position: relative;
  height: 70%;
  aspect-ratio: 16/9;
  /* border: 1px solid red; */
  align-items: center;
  justify-content: flex-start;
`;
