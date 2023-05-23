import React, {useState, useContext, useEffect} from 'react';
import {
  StyledMain,
  StyledTextWhite,
  StyledHeader,
  StyledText,
} from '../../sharedStyles';
import {FlatList, StyleSheet, View, RefreshControl} from 'react-native';
import {CustomButton, CustomInput, Loading} from '../../components';
import {API_URL} from '../../variables';
import {useHttpClient} from '../../hooks/http-hook';
import {AuthContext} from '../../context/auth-context';
import {StyledFridgeCode, StyledLeaveFridge} from './StyledDashboardScreen';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faRightFromBracket} from '@fortawesome/free-solid-svg-icons';
import {Swipeable, GestureHandlerRootView} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {setJoinedFridges, removeJoinedFridge} from '../../store/joinedFridges';
import {useIsFocused} from '@react-navigation/native';

const RightButton = ({code, leaveHandler}) => {
  return (
    <StyledLeaveFridge onPress={() => leaveHandler(code)}>
      <FontAwesomeIcon icon={faRightFromBracket} size={30} color="white" />
    </StyledLeaveFridge>
  );
};

const DashboardScreen = ({navigation}) => {
  const {sendRequest} = useHttpClient();
  const auth = useContext(AuthContext);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const [fridgeCode, setFridgeCode] = useState('');
  const [error, setError] = useState();
  const joinedFridges = useSelector(state => state.joinedFridges.joinedFridges);
  const [isLoading, setIsLoading] = useState(false);
  const [reload, setReload] = useState(false);

  const createFridge = async () => {
    try {
      const responseData = await sendRequest(
        `${API_URL}/api/v1/fridges`,
        'POST',
        JSON.stringify({owner: auth.userId}),
        {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.token,
        },
      );
      auth.setFridge(responseData.data.fridgeId, responseData.data.code);
      navigation.navigate('Root', {screen: 'Fridge'});
    } catch (err) {
      console.log(err);
    }
  };

  const joinFridge = async () => {
    if (!fridgeCode) {
      return setError('Please enter a fridge code');
    }
    try {
      const responseData = await sendRequest(
        `${API_URL}/api/v1/fridges/code/${fridgeCode.toUpperCase()}/join`,
        'PATCH',
        JSON.stringify({id: auth.userId}),
        {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.token,
        },
      );
      auth.setFridge(responseData.data.fridgeId, responseData.data.code);
      navigation.navigate('Root', {screen: 'Fridge'});
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  };

  const joinAddedFridge = (id, code) => {
    auth.setFridge(id, code);
    navigation.navigate('Root', {screen: 'Fridge'});
  };

  const leaveHandler = async code => {
    try {
      await sendRequest(
        `${API_URL}/api/v1/fridges/code/${code}/leave`,
        'PATCH',
        JSON.stringify({id: auth.userId}),
        {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.token,
        },
      );
      dispatch(removeJoinedFridge(code));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchFridges = async () => {
      setIsLoading(true);
      try {
        const responseData = await sendRequest(
          `${API_URL}/api/v1/users/${auth.userId}/joinedFridges`,
          'GET',
          null,
          {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + auth.token,
          },
        );
        setJoinedFridges(responseData.data.fridges);
        dispatch(setJoinedFridges(responseData.data.fridges));
        setFridgeCode('');
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };
    fetchFridges();
  }, [auth.token, auth.userId, dispatch, sendRequest, isFocused, reload]);

  const onRefresh = async () => {
    setIsLoading(true);
    setReload(!reload);
    setIsLoading(false);
  };

  return (
    <StyledMain>
      <StyledHeader />
      <View style={styles.main}>
        <StyledTextWhite>CREATE FRIDGE</StyledTextWhite>
        <CustomButton
          style={{alignSelf: 'center', marginVertical: 20, width: '100%'}}
          title="Create Fridge"
          onPress={createFridge}
        />
        <StyledTextWhite>JOIN FRIDGE</StyledTextWhite>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            overflow: 'hidden',
          }}>
          <CustomInput
            placeholder="Fridge CODE"
            onChangeText={e => setFridgeCode(e)}
            maxLength={6}
            autoCapitalize={'characters'}
            value={fridgeCode}
            containerStyle={{flex: 1}}
          />
          <CustomButton title="Join" onPress={joinFridge} />
          {error && <StyledTextWhite>{error}</StyledTextWhite>}
        </View>
        {isLoading ? (
          <Loading />
        ) : (
          <GestureHandlerRootView style={{flex: 1, borderWidth: 1}}>
            <FlatList
              data={joinedFridges}
              style={styles.list}
              refreshControl={
                <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
              }
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <Swipeable
                  renderRightActions={() => (
                    <RightButton code={item.code} leaveHandler={leaveHandler} />
                  )}>
                  <StyledFridgeCode
                    activeOpacity={1}
                    onPress={() => joinAddedFridge(item.id, item.code)}>
                    <StyledText style={styles.text}>{item.code}</StyledText>
                    <StyledText style={styles.text}>
                      {item.users.length}
                    </StyledText>
                  </StyledFridgeCode>
                </Swipeable>
              )}
            />
          </GestureHandlerRootView>
        )}
      </View>
    </StyledMain>
  );
};

const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
    fontSize: 20,
    marginRight: 10,
  },
  main: {
    // borderWidth: 1,
    flex: 1,
    paddingHorizontal: '10%',
  },
  list: {
    paddingTop: 40,
    // borderWidth: 1,
    flex: 1,
  },
});

export default DashboardScreen;
