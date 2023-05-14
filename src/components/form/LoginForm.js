import React, {useState, useEffect, useContext} from 'react';
import {View, Text, Button} from 'react-native';
import {CustomInput} from '..';
import {useHttpClient} from '../../hooks/http-hook';
import {AuthContext} from '../../context/auth-context';
import {useDispatch} from 'react-redux';
import {setFridgeCode, setFridgeId} from '../../store/fridgeItems';
import {API_URL} from '../../variables';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fridgeCode, setFridgeCodeState] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState();

  const {sendRequest} = useHttpClient();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const auth = useContext(AuthContext);
  const dispatch = useDispatch();
  useEffect(() => {}, [email, password]);

  const authSubmitHandler = async () => {
    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          `${API_URL}/api/v1/users/login`,
          'POST',
          JSON.stringify({
            email: email,
            password: password,
          }),
          {
            'Content-Type': 'application/json',
          },
        );

        auth.login(
          responseData.data.user._id,
          responseData.token,
          responseData.data.user.fridgeId,
        );

        console.log('success');
      } catch (err) {
        setError(err.message);
        // console.error(err.message);
      }
    } else {
      try {
        const fridgeId = await sendRequest(
          `${API_URL}/api/v1/fridges/code/${fridgeCode}`,
          'GET',
          null,
          {
            'Content-Type': 'application/json',
          },
        );
        const responseData = await sendRequest(
          `${API_URL}/api/v1/users/signup`,
          'POST',
          JSON.stringify({
            name: name,
            email: email,
            password: password,
            passwordConfirm: confirmPassword,
            fridgeId: fridgeId.data.id,
          }),
          {
            'Content-Type': 'application/json',
          },
        );

        auth.login(
          responseData.data.user._id,
          responseData.token,
          responseData.data.fridgeId,
        );
        dispatch(setFridgeId(fridgeId.data.id));
        dispatch(setFridgeCode(fridgeCode));
        console.log('success');
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    }
  };

  return (
    <View>
      {!isLoginMode && (
        <>
          <Text>Name</Text>
          <CustomInput
            placeholder="Enter Name"
            value={name}
            onChangeText={e => setName(e)}
          />
        </>
      )}
      {!isLoginMode && (
        <>
          <Text>Fridge Code</Text>
          <CustomInput
            placeholder="Enter Fridge Code"
            value={fridgeCode}
            onChangeText={e => setFridgeCodeState(e)}
          />
        </>
      )}

      <Text>Email</Text>
      <CustomInput
        placeholder="Enter Email"
        value={email}
        onChangeText={e => setEmail(e)}
      />
      <Text>Password</Text>
      <CustomInput
        placeholder="Enter Password"
        value={password}
        onChangeText={e => setPassword(e)}
      />
      {!isLoginMode && (
        <>
          <Text>Confirm Password</Text>
          <CustomInput
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={e => setConfirmPassword(e)}
          />
        </>
      )}
      {error && <Text>{error}</Text>}
      <Button
        title={isLoginMode ? 'Login' : 'SignUp'}
        onPress={authSubmitHandler}
      />
      <Button
        title={`Switch to ${isLoginMode ? 'SignUp' : 'Login'}`}
        onPress={() => setIsLoginMode(!isLoginMode)}
      />
    </View>
  );
};

export default LoginForm;
