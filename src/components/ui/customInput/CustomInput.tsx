import React from 'react';
import {StyledInput} from './StyledInput';
import {StyledText} from '../../../sharedStyles';
import {View} from 'react-native';

interface ICustomInput {
  placeholder?: string;
  onChangeText?: (e: any) => void;
  value?: any;
  style?: any;
  title?: string;
  titleColor?: string;
  keyboardType?: any;
}

const CustomInput = (props: ICustomInput) => {
  return (
    <View>
      <StyledText style={{color: props.titleColor, marginBottom: 5}}>
        {props.title}
      </StyledText>
      <StyledInput
        placeholder={props.placeholder}
        onChangeText={props.onChangeText}
        value={props.value}
        style={props.style}
        keyboardType={props.keyboardType}
      />
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
