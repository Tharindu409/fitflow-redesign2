import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import theme from '../theme/theme';

export default function FitFlowLogo({ compact = false, light = false }) {
  return (
    <View
      accessible
      accessibilityRole="image"
      accessibilityLabel="FitFlow fitness"
      style={styles.container}
    >
      <View
        style={[
          styles.mark,
          compact && styles.compactMark,
          light && styles.lightMark,
        ]}
      >
        <View style={[styles.weight, styles.leftWeight, light && styles.lightWeight]} />
        <View style={[styles.bar, light && styles.lightBar]} />
        <View style={[styles.weight, styles.rightWeight, light && styles.lightWeight]} />
        <View style={[styles.motionLine, styles.topMotionLine]} />
        <View style={[styles.motionLine, styles.bottomMotionLine]} />
      </View>
      <Text
        style={[
          styles.wordmark,
          compact && styles.compactWordmark,
          light && styles.lightText,
        ]}
      >
        Fit<Text style={styles.flow}>Flow</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  mark: {
    width: 104,
    height: 104,
    borderRadius: 32,
    backgroundColor: theme.colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.md,
    shadowColor: '#0A2C43',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 6,
  },
  compactMark: {
    width: 52,
    height: 52,
    borderRadius: 17,
    marginBottom: 0,
    shadowOpacity: 0,
    elevation: 0,
  },
  lightMark: {
    backgroundColor: 'rgba(255,255,255,0.16)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.32)',
  },
  bar: {
    position: 'absolute',
    width: 48,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.primary,
  },
  lightBar: {
    backgroundColor: theme.colors.white,
  },
  weight: {
    position: 'absolute',
    width: 8,
    height: 30,
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
  },
  leftWeight: {
    left: 27,
  },
  rightWeight: {
    right: 27,
  },
  lightWeight: {
    backgroundColor: theme.colors.white,
  },
  motionLine: {
    position: 'absolute',
    right: 23,
    width: 18,
    height: 3,
    borderRadius: 2,
    backgroundColor: theme.colors.success,
    transform: [{ rotate: '-35deg' }],
  },
  topMotionLine: {
    top: 30,
  },
  bottomMotionLine: {
    bottom: 30,
    right: 18,
    width: 12,
    opacity: 0.7,
  },
  wordmark: {
    color: theme.colors.white,
    fontSize: 34,
    fontWeight: '800',
    letterSpacing: -1.2,
  },
  compactWordmark: {
    fontSize: 22,
    marginLeft: theme.spacing.sm,
  },
  flow: {
    color: '#A8E6CF',
  },
  lightText: {
    color: theme.colors.white,
  },
});
