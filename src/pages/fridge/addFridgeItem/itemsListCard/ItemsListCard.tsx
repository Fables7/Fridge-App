/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {View, FlatList} from 'react-native';
import {StyledText} from '../../../../sharedStyles';
import {StyledCard, StyledButton, StyledItem} from './StyledItemsList';
import {Swipeable, GestureHandlerRootView} from 'react-native-gesture-handler';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBasketShopping} from '@fortawesome/free-solid-svg-icons';
import {IncrementButton} from '../../../../components';
import moment from 'moment';

const ItemsListCard = ({
  items,
  deleteItem,
  createItems,
  increaseQuantity,
  decreaseQuantity,
}: any) => {
  const RightButton = (index: any) => {
    return (
      <View style={{flexDirection: 'row'}}>
        <IncrementButton onPress={() => decreaseQuantity(index)} minus />
        <IncrementButton onPress={() => increaseQuantity(index)} />
      </View>
    );
  };
  // console.log(items);
  return (
    <View style={{alignItems: 'center'}}>
      <StyledCard>
        {items.length === 0 ? (
          <StyledText>There are no items</StyledText>
        ) : (
          <GestureHandlerRootView
            style={{
              width: '100%',
              height: '100%',
            }}>
            <FlatList
              style={{width: '100%'}}
              data={items}
              keyExtractor={item => item.expDate}
              renderItem={({item, index}: any) => {
                const date = moment(item.expDate).format('DD/MM/YYYY');
                return (
                  <Swipeable
                    renderRightActions={() => RightButton(index)}
                    renderLeftActions={() => <View style={{width: '100%'}} />}
                    onSwipeableOpen={direction =>
                      direction === 'left' && deleteItem(index)
                    }>
                    <StyledItem>
                      <StyledText style={{fontSize: 20}}>
                        {item.name}
                      </StyledText>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <StyledText style={{fontSize: 20, marginRight: 10}}>
                          {item.quantity}x
                        </StyledText>
                        <FontAwesomeIcon icon={faBasketShopping} size={25} />
                      </View>
                    </StyledItem>
                    <StyledText style={{marginTop: -10}}>{date}</StyledText>
                  </Swipeable>
                );
              }}
            />
          </GestureHandlerRootView>
        )}
      </StyledCard>
      <StyledButton onPress={createItems}>
        <StyledText>Finished</StyledText>
      </StyledButton>
    </View>
  );
};

export default ItemsListCard;
