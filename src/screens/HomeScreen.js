import React, { useMemo, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Card from '../components/Card';
import Chip from '../components/Chip';
import PrimaryButton from '../components/PrimaryButton';
import ProgressBar from '../components/ProgressBar';
import { useAppContext } from '../context/AppContext';
import theme from '../theme/theme';

const DAILY_GOAL_MINUTES = 60;
const QUICK_LOGS = [
  { label: 'Run', duration: 30, calories: 280 },
  { label: 'Yoga', duration: 20, calories: 90 },
  { label: 'Gym', duration: 45, calories: 320 },
  { label: 'Walk', duration: 30, calories: 120 },
];

export default function HomeScreen() {
  const { workouts, setWorkouts } = useAppContext();
  const [isSaving, setIsSaving] = useState(false);

  const totalMinutes = useMemo(
    () => workouts.reduce((total, workout) => total + Number(workout.duration || 0), 0),
    [workouts]
  );
  const totalCalories = useMemo(
    () => workouts.reduce((total, workout) => total + Number(workout.calories || 0), 0),
    [workouts]
  );

  const addWorkout = (workout) => {
    setIsSaving(true);
    const nextWorkout = {
      id: `workout-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      name: workout.label,
      duration: workout.duration,
      calories: workout.calories,
      date: 'today',
    };

    setWorkouts((current) => [nextWorkout, ...current]);
    setTimeout(() => setIsSaving(false), 150);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerRow}>
          <Text style={styles.title}>Today</Text>
          <Text style={styles.dateText}>Active</Text>
        </View>

        <Card style={styles.primaryCard}>
          <Text style={styles.metaText}>Daily goal</Text>
          <Text style={styles.goalText}>
            {totalMinutes} / {DAILY_GOAL_MINUTES} min
          </Text>
          <View style={styles.progressWrap}>
            <ProgressBar value={totalMinutes} max={DAILY_GOAL_MINUTES} height={14} />
          </View>
          <Text style={styles.subtleText}>{totalCalories} kcal burned</Text>
        </Card>

        <Text style={styles.sectionTitle}>Quick log</Text>
        <View style={styles.quickLogRow}>
          {QUICK_LOGS.map((item) => (
            <Chip
              key={item.label}
              label={`${item.label} ${item.duration}m`}
              selected={false}
              accessibilityLabel={`Log ${item.label} for ${item.duration} minutes`}
              onPress={() => addWorkout(item)}
              style={styles.quickChip}
            />
          ))}
        </View>

        <Text style={styles.sectionTitle}>Today’s workouts</Text>
        {workouts.length === 0 ? (
          <Card>
            <Text style={styles.emptyText}>No workouts logged yet. Start with a quick log.</Text>
          </Card>
        ) : (
          workouts.map((workout) => (
            <Card key={workout.id} style={styles.workoutCard}>
              <View style={styles.workoutRow}>
                <View style={styles.workoutInfo}>
                  <Text style={styles.workoutName}>{workout.name}</Text>
                  <Text style={styles.workoutMeta}>
                    {workout.duration} min • {workout.calories} kcal
                  </Text>
                </View>
                <Text style={styles.workoutBadge}>Done</Text>
              </View>
            </Card>
          ))
        )}

        <PrimaryButton
          title={isSaving ? 'Logged' : 'Log workout'}
          onPress={() => addWorkout(QUICK_LOGS[0])}
          disabled={isSaving}
          style={styles.logButton}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    padding: theme.spacing.lg,
    paddingBottom: 100,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  title: {
    fontSize: theme.typography.h2,
    fontWeight: '800',
    color: theme.colors.primary,
  },
  dateText: {
    color: theme.colors.muted,
    fontSize: theme.typography.bodySmall,
    fontWeight: '600',
  },
  primaryCard: {
    backgroundColor: theme.colors.primarySoft,
    borderColor: theme.colors.primary,
  },
  metaText: {
    color: theme.colors.muted,
    fontSize: theme.typography.bodySmall,
    marginBottom: theme.spacing.sm,
    fontWeight: '600',
  },
  goalText: {
    fontSize: theme.typography.h1,
    fontWeight: '800',
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  progressWrap: {
    marginBottom: theme.spacing.sm,
  },
  subtleText: {
    color: theme.colors.muted,
    fontSize: theme.typography.bodySmall,
  },
  sectionTitle: {
    fontSize: theme.typography.body,
    fontWeight: '700',
    color: theme.colors.text,
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.sm,
  },
  quickLogRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: theme.spacing.sm,
  },
  quickChip: {
    minWidth: 110,
  },
  workoutCard: {
    paddingVertical: theme.spacing.md,
  },
  workoutRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  workoutInfo: {
    flex: 1,
  },
  workoutName: {
    color: theme.colors.text,
    fontSize: theme.typography.body,
    fontWeight: '700',
  },
  workoutMeta: {
    color: theme.colors.muted,
    marginTop: 4,
    fontSize: theme.typography.bodySmall,
  },
  workoutBadge: {
    backgroundColor: theme.colors.primarySoft,
    color: theme.colors.primary,
    borderRadius: 999,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 6,
    fontWeight: '700',
    overflow: 'hidden',
  },
  emptyText: {
    color: theme.colors.muted,
    fontSize: theme.typography.bodySmall,
  },
  logButton: {
    marginTop: theme.spacing.xl,
  },
});
