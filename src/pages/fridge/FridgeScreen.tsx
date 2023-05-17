import React from 'react';

import {StyledMain, StyledHeader} from '../../sharedStyles';
import FridgeItemsList from './fridgeItemsList/FridgeItemsList';

const FridgeScreen = ({navigation}: any) => {
  return (
    <StyledMain>
      <StyledHeader />
      <FridgeItemsList {...{navigation}} />
    </StyledMain>
  );
};

export default FridgeScreen;
