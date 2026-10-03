import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FitFlowLogo from '../components/FitFlowLogo';
import theme from '../theme/theme';

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.decorCircleLarge} />
      <View style={styles.decorCircleSmall} />
      <View style={styles.brand}>
        <FitFlowLogo />
        <Text style={styles.tagline}>Move with purpose.</Text>
      </View>
      <Text style={styles.footer}>YOUR DAILY FITNESS COMPANION</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  decorCircleLarge: {
    position: 'absolute',
    width: 340,
    height: 340,
    borderRadius: 170,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  decorCircleSmall: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 130,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  brand: {
    alignItems: 'center',
    transform: [{ translateY: -12 }],
  },
  tagline: {
    color: 'rgba(255,255,255,0.82)',
    fontSize: theme.typography.body,
    fontWeight: '500',
    marginTop: theme.spacing.md,
    letterSpacing: 0.3,
  },
  footer: {
    position: 'absolute',
    bottom: 48,
    color: 'rgba(255,255,255,0.65)',
    fontSize: theme.typography.caption,
    fontWeight: '700',
    letterSpacing: 2,
  },
});
