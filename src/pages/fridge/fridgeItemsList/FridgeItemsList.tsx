import React, {useEffect, useState, useContext} from 'react';

import {FlatList, RefreshControl, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';

import {useHttpClient} from '../../../hooks/http-hook';
import {useIsFocused} from '@react-navigation/native';
import {setFridgeItems} from '../../../store/fridgeItems';
import {AuthContext} from '../../../context/auth-context';
import {API_URL} from '../../../variables';

import FridgeItem from '../fridgeItem/FridgeItem';

const FridgeItemsList = ({navigation}: any) => {
  const [filteredList, setFilteredList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [reload, setReload] = useState(false);
  const auth = useContext(AuthContext);
  const {sendRequest} = useHttpClient();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true);
      if (isFocused) {
        try {
          const responseData = await sendRequest(
            `${API_URL}/api/v1/fridges/${auth.fridgeId}/items?sort=expDate&expired=false`,
            'GET',
            null,
            {
              'Content-Type': 'application/json',
            },
          );
          // console.log(responseData.data);
          dispatch(setFridgeItems(responseData.data));
          const filteredItems = responseData.data.reduce(
            (acc: any, curr: any) => {
              if (
                !acc.some((item: any) => item.product._id === curr.product._id)
              ) {
                acc.push(curr);
              }
              return acc;
            },
            [],
          );
          const ids = filteredItems.map((item: any) => item.product._id);

          try {
            const stats = await sendRequest(
              `${API_URL}/api/v1/fridges/${
                auth.fridgeId
              }/items/product/stats/${ids.join(',')}`,
              'GET',
              null,
              {
                'Content-Type': 'application/json',
              },
            );

            const counts = filteredItems.map((item: any) => {
              const stat = stats.data.stats.find(
                (statData: any) => statData._id === item.product._id,
              );
              return stat ? stat.count : 0;
            });

            const newList = filteredItems.map((item: any, index: any) => {
              return {
                ...item,
                count: counts[index],
              };
            });
            setFilteredList(newList);
            // console.log('counts', newList);
          } catch (err) {
            console.log(err);
          }

          setIsLoading(false);
        } catch (err) {
          console.log(err);
          setIsLoading(false);
        }
      }
    };

    fetchItems();
  }, [sendRequest, dispatch, isFocused, auth.fridgeId, reload]);

  const onRefresh = async () => {
    setIsLoading(true);
    setReload(!reload);
    setIsLoading(false);
  };

  return (
    // <View style={{alignItems: 'center', flex: 1}}>
    <FlatList
      data={filteredList}
      style={{flex: 1, paddingHorizontal: '5%'}}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
      }
      renderItem={({item}) => {
        return (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() =>
              navigation.navigate('ItemDetails', {
                productId: item.product._id,
              })
            }>
            <FridgeItem item={item} />
          </TouchableOpacity>
        );
      }}
    />
    // </View>
  );
};

export default FridgeItemsList;
