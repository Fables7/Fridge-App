import {useMutation} from '@tanstack/react-query';
import axios from 'axios';
import {API_URL} from '../variables';
import {useContext} from 'react';
import {AuthContext} from '../context/auth-context';

export const useUpdateProduct = () => {
  const auth = useContext(AuthContext);
  const {error, mutate, isLoading} = useMutation(async (data: any) => {
    await axios.patch(
      `${API_URL}/api/v1/products/${data.productId}`,
      data.changes,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.token}`,
        },
      },
    );
  });
  return {mutate, isLoading, error};
};
