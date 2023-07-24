import {useMutation} from '@tanstack/react-query';
import axios from 'axios';
import {API_URL} from '../variables';

export const useUpdateProduct = () => {
  const {error, mutate, isLoading} = useMutation(
    async ({productId, changes}: any) => {
      await axios.post(`${API_URL}/api/v1/products/${productId}`, changes);
    },
  );
  return {mutate, isLoading, error};
};
