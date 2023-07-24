import {useQuery} from '@tanstack/react-query';
import axios from 'axios';
import {API_URL} from '../variables';

export const useGetProductById = (productId: any) => {
  const {isLoading, data, error, refetch, isFetching} = useQuery(
    ['getProduct'],
    async () => {
      const {data: responseData} = await axios.get(
        `${API_URL}/api/v1/products/${productId}`,
      );
      console.log('DATA', responseData.data);
      return responseData.data;
    },
  );

  return {data, isLoading, error, refetch, isFetching};
};
