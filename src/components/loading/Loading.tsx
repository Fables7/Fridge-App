import React from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {colors} from '../../variables';

export default function Loading() {
  return (
    <ActivityIndicator
      size="large"
      style={styles.loading}
      color={colors.turquoise}
    />
  );
}

const styles = StyleSheet.create({
  loading: {
    transform: [{scaleX: 2}, {scaleY: 2}],
    position: 'absolute',
    margin: 'auto',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});
