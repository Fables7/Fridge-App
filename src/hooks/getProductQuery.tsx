import {useQuery, useMutation} from '@tanstack/react-query';
import axios from 'axios';
import {API_URL} from '../variables';

// Get Product by barcode
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

// Add new product to database
export const useAddProduct = () => {
  const {error, mutate, isLoading} = useMutation(async (productData: any) => {
    await axios.post(`${API_URL}/api/v1/products`, productData);
  });

  return {mutate, isLoading, error};
};

export const useBarcodeScanner = ({data: barcode}: any) => {
  const {isLoading, data, error, refetch} = useQuery(
    ['barcodeScanner'],
    async () => {
      const {data: responseData} = await axios.get(
        `https://world.openfoodfacts.org/api/v2/search?code=${barcode}&fields=code,product_name,_keywords`,
      );
      const nameExist = responseData.products.length > 0;
      const productName = nameExist
        ? responseData.products[0].product_name
        : '';

      return {barcode, productName};
    },
    {
      enabled: false,
    },
  );

  return {isLoading, data, error, refetch};
};
