/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect, useState} from 'react';
import {FlatList, RefreshControl} from 'react-native';
import {Swipeable, GestureHandlerRootView} from 'react-native-gesture-handler';
import {HeaderRight} from '../../../navigation/CustomDrawerContent';
import {faEdit} from '@fortawesome/free-solid-svg-icons';
import {useFocusEffect} from '@react-navigation/native';

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
import {StyledMain, StyledText, StyledHeader} from '../../../sharedStyles';
import {StyledButtons, NumDisplay} from './StyledItemDetails';

export const ItemDetailsScreen = ({route, navigation}) => {
  const {productId} = route.params;

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderRight
          icon={faEdit}
          onPress={() =>
            navigation.navigate('EditItem', {
              productId: productId,
            })
          }
        />
      ),
    });
  }, [navigation, productId]);

  const estimatedWords = [
    'full',
    '3/4',
    'half',
    '1/4',
    'nearly empty',
    'empty',
  ];

  const {data, isLoading, refetch} = useGetItemDetails(productId);

  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, [refetch]),
  );
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
    <StyledMain style={{paddingBottom: 20, alignItems: 'center'}}>
      <StyledHeader />
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
              refreshControl={
                <RefreshControl refreshing={isLoading} onRefresh={refetch} />
              }
              style={{
                flex: 1,
                paddingHorizontal: '5%',
              }}
              contentContainerStyle={{paddingBottom: 80}}
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
            style={{
              width: '90%',
              height: 50,
              marginBottom: 30,
              position: 'absolute',
              bottom: 20,
            }}
            title="Save"
            onPress={SaveHandler}
          />
        </>
      )}
    </StyledMain>
  );
};

export default ItemDetailsScreen;
