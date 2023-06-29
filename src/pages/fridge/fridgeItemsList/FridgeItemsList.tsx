import React from 'react';

import {
  FlatList,
  RefreshControl,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

import {FridgeItem, Loading} from '../../../components';
import {useGetHomeFridgeItems} from '../../../hooks/getAllFridgeItemsQuery';

// TODO THIS COMPONENT RE RENDERS 4 TIMES ON INITIAL LOAD

const FridgeItemsList = ({navigation}: any) => {
  const {data, refetch, isLoading} = useGetHomeFridgeItems();
  console.log('data', data);

  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, [refetch]),
  );

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={data}
          style={styles.flatlistStyle}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={refetch} />
          }
          keyExtractor={item => item._id}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() =>
                  navigation.navigate('ItemDetailsNav', {
                    screen: 'ItemDetails',
                    params: {
                      productId: item.product._id,
                    },
                  })
                }>
                <FridgeItem item={item} />
              </TouchableOpacity>
            );
          }}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  flatlistStyle: {
    flex: 1,
    paddingHorizontal: '5%',
  },
});

export default FridgeItemsList;
