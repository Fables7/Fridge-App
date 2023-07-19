import React, {useState, useEffect, useContext, useCallback} from 'react';
import {View, KeyboardAvoidingView, Platform} from 'react-native';
import {CustomInput, CustomButton, Loading} from '..';
import {useHttpClient} from '../../hooks/http-hook';
import {AuthContext} from '../../context/auth-context';

import {API_URL} from '../../variables';
import {StyledTextWhite} from '../../sharedStyles';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [name, setName] = useState('');
  const [error, setError] = useState();
  const [errors, setErrors] = useState({});

  const {sendRequest} = useHttpClient();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [loginValid, setLoginValid] = useState(false);
  const [signupValid, setSignupValid] = useState(false);
  const auth = useContext(AuthContext);

  useEffect(() => {
    const isEmailValid = validateInput('email', email) === '';
    const isPasswordValid = validateInput('password', password) === '';
    const isConfirmPasswordValid =
      validateInput('confirmPassword', confirmPassword) === '';

    if (isLoginMode && isEmailValid && isPasswordValid) {
      setLoginValid(true);
    } else if (
      !isLoginMode &&
      name &&
      isEmailValid &&
      isPasswordValid &&
      isConfirmPasswordValid
    ) {
      setSignupValid(true);
    } else {
      setLoginValid(false);
      setSignupValid(false);
    }
  }, [email, password, confirmPassword, name, isLoginMode, validateInput]);

  const validateInput = useCallback(
    (inputName, inputValue) => {
      switch (inputName) {
        case 'email':
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(inputValue)) {
            return 'Invalid email';
          }
          break;
        case 'password':
          if (inputValue.length < 8) {
            return 'Password must be at least 8 characters long';
          }
          break;
        case 'confirmPassword':
          if (inputValue !== password) {
            return 'Passwords do not match';
          }
          break;
        case 'name':
          if (inputValue.length === 0) {
            return 'Enter a name';
          }
          break;
        default:
          break;
      }

      return '';
    },
    [password],
  );

  const handleInputChange = (inputName, inputValue) => {
    const errorMessage = validateInput(inputName, inputValue);
    setErrors(prevErrors => {
      return {
        ...prevErrors,
        [inputName]: errorMessage,
      };
    });
  };

  const authSubmitHandler = async () => {
    if (isLoginMode && !loginValid) {
      const emailError = validateInput('email', email);
      const passwordError = validateInput('password', password);
      setErrors(prevErrors => ({
        ...prevErrors,
        email: emailError,
        password: passwordError,
      }));
      return;
    }
    if (!isLoginMode && !signupValid) {
      const emailError = validateInput('email', email);
      const passwordError = validateInput('password', password);
      const confirmPasswordError = validateInput(
        'confirmPassword',
        confirmPassword,
      );
      const nameError = validateInput('name', name);

      setErrors(prevErrors => ({
        ...prevErrors,
        email: emailError,
        password: passwordError,
        confirmPassword: confirmPasswordError,
        name: nameError,
      }));
      return;
    }
    if (isLoginMode && loginValid) {
      setIsLoading(true);
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
          // responseData.data.user.fridgeId,
        );

        console.log('success');
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
        // console.error(err.message);
      }
    } else if (!isLoginMode && signupValid) {
      setIsLoading(true);
      try {
        const responseData = await sendRequest(
          `${API_URL}/api/v1/users/signup`,
          'POST',
          JSON.stringify({
            name: name,
            email: email,
            password: password,
            passwordConfirm: confirmPassword,
          }),
          {
            'Content-Type': 'application/json',
          },
        );

        auth.login(
          responseData.data.user._id,
          responseData.token,
          // responseData.data.fridgeId,
        );

        console.log('success');
        setIsLoading(false);
      } catch (err) {
        console.error(err.message);
        setError(err.message);
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <KeyboardAvoidingView
          testID="login-form"
          behavior={Platform.OS === 'ios' && 'padding'}
          style={{width: '100%', alignItems: 'center'}}>
          {!isLoginMode && (
            <>
              <CustomInput
                title="Name"
                placeholder="Enter Name"
                value={name}
                onChangeText={e => setName(e)}
                onBlur={() => handleInputChange('name', name)}
                errMsg={errors.name}
              />
            </>
          )}

          <CustomInput
            title="Email"
            placeholder="Enter Email"
            value={email}
            onChangeText={e => setEmail(e)}
            onBlur={() => handleInputChange('email', email)}
            errMsg={errors.email}
            keyboardType={'email-address'}
          />

          <CustomInput
            title="Password"
            placeholder="Enter Password"
            value={password}
            onChangeText={e => setPassword(e)}
            onBlur={() => handleInputChange('password', password)}
            errMsg={errors.password}
            secureTextEntry
            autoCapitalize={'none'}
          />
          {!isLoginMode && (
            <>
              <CustomInput
                title="Confirm Password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={e => setConfirmPassword(e)}
                onBlur={() =>
                  handleInputChange('confirmPassword', confirmPassword)
                }
                errMsg={errors.confirmPassword}
                secureTextEntry
                autoCapitalize={'none'}
              />
            </>
          )}
          <View style={{alignItems: 'center'}}>
            {error && <StyledTextWhite>{error}</StyledTextWhite>}
            <CustomButton
              title={isLoginMode ? 'Login' : 'SignUp'}
              onPress={authSubmitHandler}
              style={{marginVertical: '5%', width: 300}}
            />
            <CustomButton
              style={{width: 180}}
              title={`Switch to ${isLoginMode ? 'SignUp' : 'Login'}`}
              onPress={() => {
                setIsLoginMode(!isLoginMode);
                setError(null);
                setErrors({});
              }}
            />
          </View>
        </KeyboardAvoidingView>
      )}
    </>
  );
};

export default LoginForm;
