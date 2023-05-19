import React, {useEffect, useState} from 'react';
import {StyledCard, StyledButton} from './StyledFridgeItemCard';
import {StyledTextWhite, StyledText} from '../../../../sharedStyles';
import {useHttpClient} from '../../../../hooks/http-hook';
import moment from 'moment';
import {CustomInput, CustomButton} from '../../../../components';
import {View, KeyboardAvoidingView, Platform} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {API_URL} from '../../../../variables';

const NewItemCard = ({quantity, setQuantity, setExpDate, expDate}) => {
  const [showDate, setShowDate] = useState(false);
  const dateString = moment(expDate);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || expDate;
    if (currentDate instanceof Date && !isNaN(currentDate)) {
      setShowDate(Platform.OS === 'ios');
      setExpDate(currentDate);
    }
  };

  return (
    <>
      <CustomInput
        title="Amount:"
        value={quantity}
        keyboardType={'numeric'}
        onChangeText={e => setQuantity(e)}
        style={{width: '100%'}}
      />

      <StyledButton
        style={{
          width: 300,
          height: 50,
          marginVertical: 20,
          alignItems: 'flex-start',
        }}
        onPress={() => setShowDate(true)}
        title={`${expDate}`}>
        <StyledText>Exp. Date: {dateString.format('DD/MM/YY')}</StyledText>
      </StyledButton>

      {showDate && (
        <DateTimePicker
          testID="dateTimePicker"
          value={expDate}
          mode="date"
          is24Hour={true}
          display="spinner"
          onChange={onChange}
        />
      )}
    </>
  );
};

const NewProductCard = ({
  estimated,
  setEstimated,
  fixedAmount,
  setFixedAmount,
  setProductName,
  productName,
  imageUrl,
  setImageUrl,
}) => {
  const [isFixed, setIsFixed] = useState(true);
  return (
    <View>
      <CustomInput
        value={productName}
        title="Name:"
        onChangeText={e => setProductName(e)}
      />
      <CustomInput
        value={imageUrl}
        title="Image URL: (optional)"
        onChangeText={e => setImageUrl(e)}
      />
      <StyledTextWhite>Amount:</StyledTextWhite>

      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <CustomButton
          title="Fixed"
          onPress={() => {
            setEstimated(false);
            setIsFixed(true);
          }}
          selected={!estimated}
        />

        <CustomButton
          title="Estimate"
          onPress={() => {
            setEstimated(true);
            setIsFixed(false);
          }}
          selected={estimated}
        />
      </View>
      {isFixed && (
        <CustomInput
          value={fixedAmount}
          onChangeText={e => setFixedAmount(e)}
          keyboardType={'numeric'}
        />
      )}
      {/* <CustomInput
        value={fixedAmount}
        onChangeText={e => setFixedAmount(e)}
        keyboardType={'numeric'}
      /> */}
    </View>
  );
};

const FridgeItemCard = ({name, barcode, addItem, handleRescan}) => {
  const {sendRequest} = useHttpClient();
  const [productId, setProductId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [recall, setRecall] = useState(false);

  // NEW ITEM
  const [quantity, setQuantity] = useState('1');
  const [expDate, setExpDate] = useState(new Date());

  // NEW PRODUCT
  const [productName, setProductName] = useState(`${name}` || '');
  const [fixedAmount, setFixedAmount] = useState('1');
  const [estimated, setEstimated] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  // Find if product exists in database
  useEffect(() => {
    const findProduct = async () => {
      setIsLoading(true);
      try {
        const responseData = await sendRequest(
          `${API_URL}/api/v1/products/barcode/${barcode}`,
          'GET',
          null,
          {
            'Content-Type': 'application/json',
          },
        );
        if (responseData.status === 'success') {
          setProductId(responseData.data.product._id);
          setProductName(responseData.data.product.name);
        }
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };
    findProduct();
  }, [barcode, sendRequest, recall]);

  const addProductHandler = async () => {
    if (productId) {
      addItem({
        name: productName,
        product: productId,
        expDate: expDate,
        quantity: parseInt(quantity, 10) > 0 ? parseInt(quantity, 10) : 1,
      });
      handleRescan();
    } else {
      let productData = {
        name: productName,
        barcode: barcode,
        image: imageUrl,
      };
      if (estimated) {
        productData = {...productData, estimatedAmount: estimated};
      } else {
        productData = {...productData, fixedAmount: fixedAmount};
      }
      try {
        await sendRequest(
          `${API_URL}/api/v1/products`,
          'POST',
          JSON.stringify(productData),
          {
            'Content-Type': 'application/json',
          },
        );
        setRecall(!recall);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <StyledCard contentContainerStyle={{alignItems: 'center'}}>
        {!isLoading && (
          <>
            <StyledTextWhite>
              {productId ? name : 'New Product'}
            </StyledTextWhite>
            <KeyboardAvoidingView enabled style={{width: '80%'}}>
              {productId ? (
                <NewItemCard
                  {...{quantity, setQuantity, expDate, setExpDate}}
                />
              ) : (
                <NewProductCard
                  {...{
                    name,
                    estimated,
                    setEstimated,
                    setFixedAmount,
                    fixedAmount,
                    productName,
                    setProductName,
                    setImageUrl,
                    imageUrl,
                  }}
                />
              )}
            </KeyboardAvoidingView>
            {/* <StyledTextWhite>{props.name}</StyledTextWhite> */}

            <StyledButton onPress={addProductHandler}>
              <StyledText>{productId ? 'ADD' : 'CREATE'}</StyledText>
            </StyledButton>
          </>
        )}
      </StyledCard>
    </>
  );
};

export default FridgeItemCard;
