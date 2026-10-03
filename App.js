import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text } from 'react-native';
import { AppProvider, useAppContext } from './src/context/AppContext';
import CommunityScreen from './src/screens/CommunityScreen';
import HomeScreen from './src/screens/HomeScreen';
import NutritionScreen from './src/screens/NutritionScreen';
import PlannerScreen from './src/screens/PlannerScreen';
import ProgressScreen from './src/screens/ProgressScreen';
import SplashScreen from './src/screens/SplashScreen';
import theme from './src/theme/theme';

const Tab = createBottomTabNavigator();
const MINIMUM_SPLASH_DURATION_MS = 1600;

const tabIcons = {
  Home: '🏠',
  Planner: '✨',
  Progress: '📈',
  Community: '👥',
  Nutrition: '🍽️',
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

function AppContent() {
  const { isReady } = useAppContext();
  const [minimumSplashElapsed, setMinimumSplashElapsed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMinimumSplashElapsed(true), MINIMUM_SPLASH_DURATION_MS);
    return () => clearTimeout(timer);
  }, []);

  if (!isReady || !minimumSplashElapsed) {
    return (
      <>
        <StatusBar style="light" />
        <SplashScreen />
      </>
    );
  }

  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarActiveTintColor: theme.colors.primary,
            tabBarInactiveTintColor: theme.colors.muted,
            tabBarStyle: styles.tabBar,
            tabBarLabelStyle: styles.tabBarLabel,
            tabBarIcon: ({ color, size }) => (
              <Text style={[styles.tabIcon, { fontSize: size, color }]}>{tabIcons[route.name]}</Text>
            ),
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Planner" component={PlannerScreen} />
          <Tab.Screen name="Progress" component={ProgressScreen} />
          <Tab.Screen name="Community" component={CommunityScreen} />
          <Tab.Screen name="Nutrition" component={NutritionScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: theme.colors.surface,
    borderTopColor: theme.colors.border,
    borderTopWidth: 1,
    height: 72,
    paddingBottom: 8,
    paddingTop: 8,
  },
  tabBarLabel: {
    fontSize: theme.typography.caption,
    fontWeight: '700',
  },
  tabIcon: {
    textAlign: 'center',
  },
});