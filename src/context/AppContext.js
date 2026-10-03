import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  workouts: 'fitflow.workouts',
  meals: 'fitflow.meals',
  posts: 'fitflow.posts',
};

const defaultWorkouts = [
  { id: 'w1', name: 'Morning Run', duration: 30, calories: 280, date: 'today' },
  { id: 'w2', name: 'Core Session', duration: 20, calories: 120, date: 'today' },
];

const defaultMeals = [
  { id: 'm1', name: 'Oatmeal & banana', calories: 320 },
  { id: 'm2', name: 'Chicken rice bowl', calories: 610 },
];

const defaultPosts = [
  { id: 'p1', user: 'Nimali', text: 'Finished a 5K today! Feeling strong.', likes: 12, liked: false },
  { id: 'p2', user: 'Kasun', text: 'Week 3 of my strength plan is done.', likes: 8, liked: false },
];

const AppContext = createContext();

export function AppProvider({ children }) {
  const [workouts, setWorkouts] = useState(defaultWorkouts);
  const [meals, setMeals] = useState(defaultMeals);
  const [posts, setPosts] = useState(defaultPosts);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const loadState = async () => {
      try {
        const [storedWorkouts, storedMeals, storedPosts] = await Promise.all([
          AsyncStorage.getItem(STORAGE_KEYS.workouts),
          AsyncStorage.getItem(STORAGE_KEYS.meals),
          AsyncStorage.getItem(STORAGE_KEYS.posts),
        ]);

        if (storedWorkouts) {
          setWorkouts(JSON.parse(storedWorkouts));
        }
        if (storedMeals) {
          setMeals(JSON.parse(storedMeals));
        }
        if (storedPosts) {
          setPosts(JSON.parse(storedPosts));
        }
      } catch (error) {
        console.warn('Failed to load FitFlow state', error);
      } finally {
        setIsReady(true);
      }
    };

    loadState();
  }, []);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    AsyncStorage.setItem(STORAGE_KEYS.workouts, JSON.stringify(workouts)).catch((error) => {
      console.warn('Failed to save workouts', error);
    });
  }, [workouts, isReady]);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    AsyncStorage.setItem(STORAGE_KEYS.meals, JSON.stringify(meals)).catch((error) => {
      console.warn('Failed to save meals', error);
    });
  }, [meals, isReady]);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    AsyncStorage.setItem(STORAGE_KEYS.posts, JSON.stringify(posts)).catch((error) => {
      console.warn('Failed to save posts', error);
    });
  }, [posts, isReady]);

  const addMeal = (meal) => {
    setMeals((currentMeals) => [meal, ...currentMeals]);
  };

  const value = useMemo(
    () => ({
      workouts,
      setWorkouts,
      meals,
      setMeals,
      addMeal,
      posts,
      setPosts,
      isReady,
    }),
    [workouts, meals, posts, isReady]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}
