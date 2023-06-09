/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {Swipeable, GestureHandlerRootView} from 'react-native-gesture-handler';

import {
  IncrementButton,
  CustomButton,
  FridgeItem,
  Loading,
} from '../../../components';

import {
  useGetItemDetails,
  useSaveItemDetails,
} from '../../../hooks/getAllFridgeItemsQuery';

// Styles
import {StyledMain, StyledText} from '../../../sharedStyles';
import {StyledButtons, NumDisplay} from './StyledItemDetails';

export const ItemDetailsScreen = ({route, navigation}) => {
  const {productId} = route.params;
  const estimatedWords = [
    'full',
    '3/4',
    'half',
    '1/4',
    'nearly empty',
    'empty',
  ];

  const {data, isLoading} = useGetItemDetails(productId);
  const {mutate, error} = useSaveItemDetails();
  console.log('isLoading:', isLoading);
  console.log('data:', data);

  const [items, setItems] = useState(data || []);

  useEffect(() => {
    if (data) {
      setItems(data);
    }
  }, [data]);

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

  //TODO: find a way to only update items that need updating rather than updating all of it

  const SaveHandler = async () => {
    const itemsToDelete = [];
    const itemsToUpdate = [];

    items.forEach(item => {
      if (item.fixedAmount === 0 || item.estimatedAmount === 'empty') {
        itemsToDelete.push(item._id);
      } else {
        if (item.estimatedAmount && item.estimatedAmount !== 'full') {
          item.opened = true;
          console.log('item should be closed', item);
        } else if (
          item.fixedAmount !== null &&
          item.fixedAmount < item.product.fixedAmount
        ) {
          item.opened = true;
        } else {
          item.opened = false;
        }
        itemsToUpdate.push(item);
      }
    });
    await mutate({itemsToDelete, itemsToUpdate});
    if (error) {
      console.log('item details save error', error);
      return;
    }

    navigation.goBack();
  };

  // TODO add loading

  return (
    <StyledMain style={{alignItems: 'center', paddingVertical: 20}}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
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
        </>
      )}
    </StyledMain>
  );
};

export default ItemDetailsScreen;
