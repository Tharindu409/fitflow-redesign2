import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import theme from '../theme/theme';

export default function Chip({ label, selected = false, onPress, accessibilityLabel, style }) {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || label}
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.chip, selected && styles.selected, style]}
    >
      <Text style={[styles.label, selected && styles.selectedLabel]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    minHeight: 44,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    marginRight: 8,
    marginBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selected: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  label: {
    color: theme.colors.text,
    fontSize: theme.typography.bodySmall,
    fontWeight: '600',
  },
  selectedLabel: {
    color: theme.colors.white,
  },
});
