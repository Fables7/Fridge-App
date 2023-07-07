import React, {useState, useEffect, useContext} from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner';
import {useHttpClient} from '../../../hooks/http-hook';
import FridgeItemCard from './fridgeItemCard/FridgeItemCard';
import ItemsListCard from './itemsListCard/ItemsListCard';
import {StyledMain, StyledFooter, CameraContainer} from './StyledAddItem';
import {AuthContext} from '../../../context/auth-context';
import {API_URL, colors} from '../../../variables';
import {Loading} from '../../../components';
import {StyledText} from '../../../sharedStyles';
import moment from 'moment';
import {useBarcodeScanner} from '../../../hooks/getProductQuery';

const AddFridgeItemScreen = ({navigation}) => {
  const auth = useContext(AuthContext);

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const {sendRequest} = useHttpClient();
  const [productName, setProductName] = useState();
  const [productBarcode, setProductBarcode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [items, setItems] = useState([]);

  const addItem = newItem => {
    console.log('items', items);
    console.log('newItem', newItem);
    const existingItem = items.find(
      item =>
        item.product === newItem.product &&
        moment(item.expDate).isSame(newItem.expDate, 'day'),
    );

    if (existingItem) {
      const updatedItems = items.map(item => {
        if (item === existingItem) {
          return {...item, quantity: item.quantity + newItem.quantity};
        }
        return item;
      });
      setItems(updatedItems);
    } else {
      setItems([...items, newItem]);
    }
  };

  const expandItemsByQuantity = fridgeItems => {
    const expandedItems = [];
    for (let i = 0; i < fridgeItems.length; i++) {
      const {quantity, expDate, product} = fridgeItems[i];
      for (let j = 0; j < quantity; j++) {
        expandedItems.push({product, expDate});
      }
    }
    return expandedItems;
  };

  const deleteItem = index => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const increaseQuantity = index => {
    const newItems = [...items];
    newItems[index].quantity += 1;
    setItems(newItems);
  };

  const decreaseQuantity = index => {
    const newItems = [...items];
    if (newItems[index].quantity === 1) {
      return;
    }
    newItems[index].quantity -= 1;
    setItems(newItems);
  };

  const handleRescan = () => {
    setScanned(false);
    setProductName();
    setProductBarcode('');
  };

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const {status} = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  // const {data: productData, error, refetch} = useBarcodeScanner(data);
  const handleBarCodeScanned = async ({type, data}) => {
    setIsLoading(true);
    setScanned(true);
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    if (data) {
      try {
        const responseData = await sendRequest(
          `https://world.openfoodfacts.org/api/v2/search?code=${data}&fields=code,product_name,_keywords`,
          'GET',
          null,
          {
            'Content-Type': 'application/json',
          },
        );

        // alert(responseData.products[0].product_name);
        const nameExist = responseData.products.length > 0;

        setProductName(nameExist ? responseData.products[0].product_name : '');

        setProductBarcode(data);

        console.log('success');
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
        // console.error(err.message);
      }
    }
  };

  const createItems = async () => {
    if (items.length > 0) {
      const expandedItems = expandItemsByQuantity(items);
      try {
        await sendRequest(
          `${API_URL}/api/v1/fridges/${auth.fridgeId}/items`,
          'POST',
          JSON.stringify(expandedItems),
          {
            'Content-Type': 'application/json',
          },
        );
        navigation.goBack();
      } catch (err) {
        console.log(err);
      }
    } else {
      navigation.goBack();
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <StyledMain>
      <CameraContainer>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={styles.scanner}
          type="back"
        />
      </CameraContainer>

      <StyledFooter scanned={scanned}>
        {scanned && !isLoading && (
          <View style={{width: '100%'}}>
            <TouchableOpacity
              onPress={handleRescan}
              style={{
                width: '100%',
                backgroundColor: colors.turquoise,
                height: 35,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <StyledText>TAP TO SCAN AGAIN</StyledText>
            </TouchableOpacity>
          </View>
        )}
        {isLoading ? (
          <Loading />
        ) : productName || productName === '' ? (
          <FridgeItemCard
            name={productName}
            barcode={productBarcode}
            addItem={addItem}
            handleRescan={handleRescan}
          />
        ) : (
          <ItemsListCard
            {...{
              items,
              deleteItem,
              createItems,
              increaseQuantity,
              decreaseQuantity,
            }}
          />
        )}
      </StyledFooter>
    </StyledMain>
  );
};

const styles = StyleSheet.create({
  scanner: {
    // ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    // margin: -30,
  },
});

export default AddFridgeItemScreen;
