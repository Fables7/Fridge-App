import React, {useEffect, useState, useContext} from 'react';
import {FlatList, StyleSheet, RefreshControl, View} from 'react-native';
import {API_URL} from '../../variables';
import {useHttpClient} from '../../hooks/http-hook';
import {AuthContext} from '../../context/auth-context';
import {useDispatch, useSelector} from 'react-redux';
import {setExpiredItems, removeExpiredItem} from '../../store/fridgeItems';
import {FridgeItem, Loading} from '../../components';
import {Swipeable, GestureHandlerRootView} from 'react-native-gesture-handler';

import {StyledMain, StyledHeader} from '../../sharedStyles';

const ExpiredScreen = () => {
  const auth = useContext(AuthContext);
  const expiredItems = useSelector(
    (state: any) => state.fridgeItems.expiredItems,
  );
  const dispatch = useDispatch();
  const {sendRequest} = useHttpClient();
  const [isLoading, setIsLoading] = useState(false);
  const [reload, setReload] = useState(false);

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
  }, [auth.fridgeId, dispatch, sendRequest, reload]);

  //TODO: make flatlist component as two files have the same flatlist layout
  const onRefresh = async () => {
    setIsLoading(true);
    setReload(!reload);
    setIsLoading(false);
  };

  const swipeRightHandler = async (id: any) => {
    dispatch(removeExpiredItem(id));
    try {
      await sendRequest(
        `${API_URL}/api/v1/fridges/${auth.fridgeId}/items/${id}`,
        'DELETE',
      );
      console.log('Item deleted');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <StyledMain>
      <StyledHeader />
      {isLoading ? (
        <Loading />
      ) : (
        <GestureHandlerRootView style={{flex: 1}}>
          <FlatList
            refreshControl={
              <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
            }
            data={expiredItems}
            style={styles.flatlistStyle}
            keyExtractor={item => item._id}
            renderItem={({item}) => (
              <Swipeable
                renderRightActions={() => <View style={{width: '100%'}} />}
                onSwipeableOpen={direction =>
                  direction === 'right' && swipeRightHandler(item._id)
                }>
                <FridgeItem item={item} />
              </Swipeable>
            )}
          />
        </GestureHandlerRootView>
      )}
    </StyledMain>
  );
};

const styles = StyleSheet.create({
  flatlistStyle: {
    flex: 1,
    paddingHorizontal: '5%',
  },
});

export default ExpiredScreen;
