import {useQuery, useMutation} from '@tanstack/react-query';
import axios from 'axios';
import {API_URL} from '../variables';

export const useGetProduct = (barcode: any) => {
  console.log('barcode:', barcode);
  const {isLoading, data, error, refetch} = useQuery(
    ['findProduct'],
    async () => {
      const {data: responseData} = await axios.get(
        `${API_URL}/api/v1/products/barcode/${barcode}`,
        {validateStatus: status => status === 200 || status === 404},
      );
      //   console.log('responseData', responseData);
      if (responseData.status === 'success') {
        const productId = responseData.data.product._id;
        const productName = responseData.data.product.name;
        return {productId, productName};
      }
      return {};
    },
    {
      retry: false,
    },
  );

  //   console.log(error);

  return {data, isLoading, error, refetch};
};

export const useAddProduct = () => {
  const {error, mutate, isLoading} = useMutation(async (productData: any) => {
    await axios.post(`${API_URL}/api/v1/products`, productData);
  });

  return {mutate, isLoading, error};
};
