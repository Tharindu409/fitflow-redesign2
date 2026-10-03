import React from 'react';
import { StyleSheet, View } from 'react-native';
import theme from '../theme/theme';

export default function ProgressBar({ value, max = 100, height = 12, color = theme.colors.primary }) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <View style={[styles.track, { height }]}>
      <View style={[styles.fill, { width: `${percentage}%`, backgroundColor: color }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    width: '100%',
    backgroundColor: theme.colors.primarySoft,
    borderRadius: 999,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 999,
  },
});
