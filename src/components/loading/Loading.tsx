import React from 'react';
import {ActivityIndicator} from 'react-native';

export default function Loading() {
  return (
    <ActivityIndicator
      size="large"
      style={{transform: [{scaleX: 2}, {scaleY: 2}]}}
    />
  );
}
