/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect, useContext, useState} from 'react';
import {FlatList} from 'react-native';
import {useHttpClient} from '../../../hooks/http-hook';
import {AuthContext} from '../../../context/auth-context';
import {Swipeable, GestureHandlerRootView} from 'react-native-gesture-handler';
import FridgeItem from '../fridgeItem/FridgeItem';
import {IncrementButton, CustomButton} from '../../../components';
import {API_URL} from '../../../variables';

// Styles
import {StyledMain, StyledText} from '../../sharedStyles';
import {StyledButtons, NumDisplay} from './StyledItemDetails';

export const ItemDetailsScreen = ({route, navigation}) => {
  const {sendRequest} = useHttpClient();
  const auth = useContext(AuthContext);
  const {productId} = route.params;
  const estimatedWords = [
    'full',
    '3/4',
    'half',
    '1/4',
    'nearly empty',
    'empty',
  ];

  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const responseData = await sendRequest(
          `${API_URL}/api/v1/fridges/${auth.fridgeId}/items/product/${productId}`,
          'GET',
          null,
          {
            'Content-Type': 'application/json',
          },
        );
        setItems(responseData.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchItems();
  }, [auth.fridgeId, productId, sendRequest]);

  const decreaseQuantity = index => {
    const newItems = [...items];

    if (
      'estimatedAmount' in newItems[index] &&
      newItems[index].estimatedAmount !== 'empty'
    ) {
      newItems[index].estimatedAmount =
        estimatedWords[
          estimatedWords.indexOf(newItems[index].estimatedAmount) + 1
        ];
    }
    if ('fixedAmount' in newItems[index]) {
      if (newItems[index].fixedAmount === 0) {
        return;
      }
      newItems[index].fixedAmount -= 1;
    }

    setItems(newItems);
  };

  const increaseQuantity = index => {
    const newItems = [...items];
    if (
      'estimatedAmount' in newItems[index] &&
      newItems[index].estimatedAmount !== 'full'
    ) {
      newItems[index].estimatedAmount =
        estimatedWords[
          estimatedWords.indexOf(newItems[index].estimatedAmount) - 1
        ];
    }
    if ('fixedAmount' in newItems[index]) {
      newItems[index].fixedAmount += 1;
    }
    setItems(newItems);
  };

  const RightButton = index => {
    const isFixed = 'fixedAmount' in items[index];
    return (
      <StyledButtons>
        <IncrementButton onPress={() => increaseQuantity(index)} />
        <NumDisplay>
          <StyledText>
            {isFixed ? items[index].fixedAmount : items[index].estimatedAmount}
          </StyledText>
        </NumDisplay>
        <IncrementButton minus onPress={() => decreaseQuantity(index)} />
      </StyledButtons>
    );
  };

  const SaveHandler = async () => {
    const itemsToDelete = [];
    const itemsToUpdate = [];

    items.forEach(item => {
      if (item.fixedAmount === 0 || item.estimatedAmount === 'empty') {
        itemsToDelete.push(item._id);
      } else {
        itemsToUpdate.push(item);
      }
    });

    try {
      if (itemsToDelete.length > 0) {
        console.log('Deleting Items', itemsToDelete);

        await sendRequest(
          `${API_URL}/api/v1/fridges/${
            auth.fridgeId
          }/items?ids=${itemsToDelete.join(',')}`,
          'DELETE',
        );
      }
      if (itemsToUpdate.length > 0) {
        console.log('Updating Items', itemsToUpdate);
        await sendRequest(
          `${API_URL}/api/v1/fridges/${auth.fridgeId}/items`,
          'PATCH',
          JSON.stringify(itemsToUpdate),
          {
            'Content-Type': 'application/json',
          },
        );
      }
      navigation.goBack();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <StyledMain style={{alignItems: 'center', paddingVertical: 20}}>
      <GestureHandlerRootView
        style={{
          flex: 1,
        }}>
        <FlatList
          data={items}
          style={{flex: 1, paddingHorizontal: '5%'}}
          renderItem={({item, index}) => {
            return (
              <Swipeable renderRightActions={() => RightButton(index)}>
                <FridgeItem item={item} />
              </Swipeable>
            );
          }}
        />
      </GestureHandlerRootView>
      <CustomButton
        style={{width: '90%', height: 50, marginBottom: 30}}
        title="Save"
        onPress={SaveHandler}
      />
    </StyledMain>
  );
};

export default ItemDetailsScreen;
