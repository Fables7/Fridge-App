import React from 'react';
import {StyledMain} from '../../../sharedStyles';
import {useFocusEffect} from '@react-navigation/native';
import {TouchableWithoutFeedback, Keyboard} from 'react-native';
import {Loading} from '../../../components';

import {useGetProductById} from '../../../hooks/getProductByIdQuery';
import EditItemForm from './EditItemForm';

const EditItemScreen = ({route, navigation}: any) => {
  const {productId} = route.params;
  const {data, isLoading, refetch} = useGetProductById(productId);
  console.log('isLoading', isLoading);
  console.log('DATA EDIT', data);
  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, [refetch]),
  );

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <StyledMain>
        {isLoading ? (
          <Loading />
        ) : (
          <EditItemForm
            data={data}
            productId={productId}
            navigation={navigation}
          />
        )}
      </StyledMain>
    </TouchableWithoutFeedback>
  );
};

export default EditItemScreen;
