import React, {useState, useEffect, useContext} from 'react';
import {Text, Button, StyleSheet, View, ActivityIndicator} from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner';
import {useHttpClient} from '../../../hooks/http-hook';
import FridgeItemCard from './fridgeItemCard/FridgeItemCard';
import ItemsListCard from './itemsListCard/ItemsListCard';
import {StyledMain, StyledFooter, CameraContainer} from './StyledAddItem';
import {AuthContext} from '../../../context/auth-context';
import {API_URL} from '../../../variables';

const AddFridgeItemScreen = ({navigation}) => {
  const auth = useContext(AuthContext);

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const {sendRequest} = useHttpClient();
  const [productName, setProductName] = useState();
  const [productBarcode, setProductBarcode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [items, setItems] = useState([]);

  const addItem = item => {
    setItems([...items, item]);
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
            <Button title={'Tap to Scan Again'} onPress={handleRescan} />
          </View>
        )}
        {isLoading ? (
          <ActivityIndicator
            size="large"
            style={{transform: [{scaleX: 2}, {scaleY: 2}]}}
          />
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
