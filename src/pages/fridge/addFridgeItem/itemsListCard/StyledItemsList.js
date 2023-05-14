import styled from 'styled-components';

export const StyledCard = styled.View`
  background-color: white;
  border-radius: 10px;
  padding: 10px;
  height: 80%;
  width: 90%;
  align-items: center;
  justify-content: center;
`;

export const StyledItem = styled.View`
  width: 100%;
  /* border: 1px solid black; */
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  background-color: white;
`;

export const StyledButton = styled.TouchableOpacity`
  background-color: white;
  border-radius: 10px;
  padding: 10px;
  height: 50px;
  width: 100px;
  align-items: center;
  justify-content: center;
  margin-top: auto;
`;
