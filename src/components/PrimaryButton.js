import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import theme from '../theme/theme';

export default function PrimaryButton({ title, onPress, disabled = false, style }) {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel={title}
      activeOpacity={0.9}
      disabled={disabled}
      onPress={onPress}
      style={[styles.button, disabled && styles.disabled, style]}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    minHeight: 48,
    borderRadius: theme.radii.md,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
  },
  disabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: theme.colors.white,
    fontSize: theme.typography.button,
    fontWeight: '700',
  },
});
