import React, {useEffect, useState, useContext} from 'react';
import {FlatList} from 'react-native';
import {API_URL} from '../../variables';
import {useHttpClient} from '../../hooks/http-hook';
import {AuthContext} from '../../context/auth-context';
import {useDispatch, useSelector} from 'react-redux';
import {setExpiredItems} from '../../store/fridgeItems';
import {FridgeItem, Loading} from '../../components';

import {StyledMain, StyledHeader} from '../../sharedStyles';

const ExpiredScreen = () => {
  const auth = useContext(AuthContext);
  const expiredItems = useSelector(
    (state: any) => state.fridgeItems.expiredItems,
  );
  const dispatch = useDispatch();
  const {sendRequest} = useHttpClient();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true);
      try {
        const responseData = await sendRequest(
          `${API_URL}/api/v1/fridges/${auth.fridgeId}/items?sort=expDate&expired=true`,
          'GET',
          null,
          {
            'Content-Type': 'application/json',
          },
        );
        dispatch(setExpiredItems(responseData.data));
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        console.log(err);
      }
    };
    fetchItems();
  }, [auth.fridgeId, dispatch, sendRequest]);
  return (
    <StyledMain>
      <StyledHeader />
      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={expiredItems}
          style={{flex: 1, paddingHorizontal: '5%'}}
          keyExtractor={item => item._id}
          renderItem={({item}) => <FridgeItem item={item} />}
        />
      )}
    </StyledMain>
  );
};

export default ExpiredScreen;
