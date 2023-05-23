import React from 'react';
import {StyledInput} from './StyledInput';
import {StyledText} from '../../../sharedStyles';
import {View} from 'react-native';

interface ICustomInput {
  placeholder?: string;
  onChangeText?: (e: any) => void;
  value?: any;
  style?: any;
  containerStyle?: any;
  title?: string;
  titleColor?: string;
  keyboardType?: string;
  errMsg?: string;
  onBlur?: () => void;
  secureTextEntry?: boolean;
  autoCapitalize?: any;
  maxLength?: number;
}

const CustomInput = (props: ICustomInput) => {
  return (
    <View style={{width: 300, ...props.containerStyle}}>
      {props.title && (
        <StyledText
          style={{
            color: props.titleColor ? props.titleColor : 'white',
            marginBottom: 5,
          }}>
          {props.title}
        </StyledText>
      )}
      <StyledInput
        onBlur={props.onBlur}
        placeholder={props.placeholder}
        onChangeText={props.onChangeText}
        value={props.value}
        style={props.style}
        keyboardType={props.keyboardType}
        secureTextEntry={props.secureTextEntry ? true : false}
        autoCapitalize={props.autoCapitalize}
        maxLength={props.maxLength}
      />
      {props.errMsg && (
        <StyledText
          style={{
            color: 'red',
          }}>
          {props.errMsg}
        </StyledText>
      )}
    </View>
  );
};

export default CustomInput;

// <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
//   <>
// <StyledText style={{color: props.titleColor, marginBottom: 5}}>
//   {props.title}
// </StyledText>
// <StyledInput
//   placeholder={props.placeholder}
//   onChangeText={props.onChangeText}
//   value={props?.value}
//   style={props.style}
//   keyboardType={props.keyboardType}
// />
//   </>
// </TouchableWithoutFeedback>
