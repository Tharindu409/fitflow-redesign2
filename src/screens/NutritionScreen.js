import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Card from '../components/Card';
import PrimaryButton from '../components/PrimaryButton';
import ProgressBar from '../components/ProgressBar';
import { useAppContext } from '../context/AppContext';
import theme from '../theme/theme';

const DAILY_CALORIE_GOAL = 2000;

export default function NutritionScreen() {
  const { meals, addMeal } = useAppContext();
  const [name, setName] = useState('');
  const [calories, setCalories] = useState('');
  const [error, setError] = useState('');

  const totalCalories = meals.reduce((sum, meal) => sum + Number(meal.calories || 0), 0);
  const progress = Math.min(100, (totalCalories / DAILY_CALORIE_GOAL) * 100);

  const handleAddMeal = () => {
    const trimmedName = name.trim();
    const parsedCalories = Number(calories);

    if (!trimmedName) {
      setError('Meal name is required.');
      return;
    }

    if (!Number.isFinite(parsedCalories) || parsedCalories <= 0) {
      setError('Calories must be a positive number.');
      return;
    }

    addMeal({
      id: `meal-${Date.now()}`,
      name: trimmedName,
      calories: parsedCalories,
    });

    setName('');
    setCalories('');
    setError('');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Nutrition Logger</Text>

        <Card>
          <Text style={styles.sectionLabel}>Daily target</Text>
          <Text style={styles.total}>{totalCalories} / {DAILY_CALORIE_GOAL} kcal</Text>
          <ProgressBar value={totalCalories} max={DAILY_CALORIE_GOAL} height={14} color={theme.colors.success} />
        </Card>

        <Card>
          <Text style={styles.sectionLabel}>Add meal</Text>
          <TextInput
            accessibilityLabel="Meal name"
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Meal name"
          />
          <TextInput
            accessibilityLabel="Meal calories"
            style={styles.input}
            value={calories}
            onChangeText={setCalories}
            placeholder="Calories"
            keyboardType="number-pad"
          />
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <PrimaryButton title="Add meal" onPress={handleAddMeal} />
        </Card>

        <Card>
          <Text style={styles.sectionLabel}>Today’s meals</Text>
          {meals.length === 0 ? (
            <Text style={styles.emptyText}>No meals logged yet.</Text>
          ) : (
            meals.map((meal) => (
              <View key={meal.id} style={styles.mealRow}>
                <Text style={styles.mealName}>{meal.name}</Text>
                <Text style={styles.mealCalories}>{meal.calories} kcal</Text>
              </View>
            ))
          )}
        </Card>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: theme.spacing.lg,
    paddingBottom: 100,
  },
  title: {
    fontSize: theme.typography.h2,
    fontWeight: '800',
    color: theme.colors.primary,
    marginBottom: theme.spacing.md,
  },
  sectionLabel: {
    color: theme.colors.muted,
    fontSize: theme.typography.bodySmall,
    fontWeight: '700',
    marginBottom: theme.spacing.sm,
  },
  total: {
    color: theme.colors.text,
    fontSize: theme.typography.h3,
    fontWeight: '800',
    marginBottom: theme.spacing.sm,
  },
  input: {
    backgroundColor: theme.colors.surfaceAlt,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radii.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    color: theme.colors.text,
  },
  error: {
    color: theme.colors.error,
    fontSize: theme.typography.bodySmall,
    marginBottom: theme.spacing.sm,
  },
  mealRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  mealName: {
    color: theme.colors.text,
    fontSize: theme.typography.body,
    fontWeight: '600',
  },
  mealCalories: {
    color: theme.colors.muted,
    fontSize: theme.typography.body,
    fontWeight: '700',
  },
  emptyText: {
    color: theme.colors.muted,
    fontSize: theme.typography.bodySmall,
  },
});
