import {useMutation, useQuery} from '@tanstack/react-query';
import axios from 'axios';
import {API_URL} from '../variables';
import {useContext} from 'react';
import {AuthContext} from '../context/auth-context';
import {useDispatch} from 'react-redux';
import {setFridgeItems} from '../store/fridgeItems';

// Get all Home Fridge items
export const useGetHomeFridgeItems = () => {
  const dispatch = useDispatch();
  const auth = useContext(AuthContext);

  const {isLoading, data, error, status, refetch} = useQuery(
    ['homeFridgeItems'],
    async () => {
      const {data: responseData} = await axios.get(
        `${API_URL}/api/v1/fridges/${auth.fridgeId}/items?sort=expDate&expired=false`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      // console.log('responseData:', responseData.data);

      dispatch(setFridgeItems(responseData.data));
      if (responseData.data.length > 0) {
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

        const {data: stats} = await axios.get(
          `${API_URL}/api/v1/fridges/${
            auth.fridgeId
          }/items/product/stats/${ids.join(',')}`,
        );
        console.log(stats.data.stats);

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

        return newList;
      } else {
        return [];
      }
    },
  );

  return {data, isLoading, error, status, refetch};
};

// Get item details
export const useGetItemDetails = (productId: any) => {
  const auth = useContext(AuthContext);

  const {isLoading, data, error, status, refetch} = useQuery(
    ['itemDetails'],
    async () => {
      const {data: responseData} = await axios.get(
        `${API_URL}/api/v1/fridges/${auth.fridgeId}/items/product/${productId}`,
      );
      return responseData.data;
    },
  );

  return {data, isLoading, error, status, refetch};
};

// Save item details
export const useSaveItemDetails = () => {
  const auth = useContext(AuthContext);

  const {error, mutate, status, isLoading} = useMutation(
    async ({itemsToDelete, itemsToUpdate}: any) => {
      if (itemsToDelete.length > 0) {
        await axios.delete(
          `${API_URL}/api/v1/fridges/${
            auth.fridgeId
          }/items?ids=${itemsToDelete.join(',')}`,
        );
      }
      if (itemsToUpdate.length > 0) {
        await axios.patch(
          `${API_URL}/api/v1/fridges/${auth.fridgeId}/items`,
          itemsToUpdate,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
      }
    },
  );
  return {error, mutate, status, isLoading};
};
