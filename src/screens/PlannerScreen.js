import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Card from '../components/Card';
import Chip from '../components/Chip';
import PrimaryButton from '../components/PrimaryButton';
import { GOAL_OPTIONS, LEVEL_OPTIONS, generateWorkoutPlan } from '../services/planner';
import theme from '../theme/theme';

const DAYS = [2, 3, 4, 5, 6];

export default function PlannerScreen() {
  const [goal, setGoal] = useState(GOAL_OPTIONS[0]);
  const [level, setLevel] = useState(LEVEL_OPTIONS[0]);
  const [daysPerWeek, setDaysPerWeek] = useState(3);
  const [plan, setPlan] = useState(() => generateWorkoutPlan({ goal, level, daysPerWeek }));

  const totalMinutes = useMemo(
    () => plan.reduce((sum, item) => sum + Number(item.duration || 0), 0),
    [plan]
  );

  const handleGenerate = () => {
    const generatedPlan = generateWorkoutPlan({ goal, level, daysPerWeek });
    setPlan(generatedPlan);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>AI Workout Planner</Text>

      <Card>
        <Text style={styles.sectionTitle}>Goal</Text>
        <View style={styles.choiceWrap}>
          {GOAL_OPTIONS.map((option) => (
            <Chip
              key={option}
              label={option}
              selected={goal === option}
              accessibilityLabel={`Select goal ${option}`}
              onPress={() => setGoal(option)}
            />
          ))}
        </View>
      </Card>

      <Card>
        <Text style={styles.sectionTitle}>Level</Text>
        <View style={styles.choiceWrap}>
          {LEVEL_OPTIONS.map((option) => (
            <Chip
              key={option}
              label={option}
              selected={level === option}
              accessibilityLabel={`Select level ${option}`}
              onPress={() => setLevel(option)}
            />
          ))}
        </View>
      </Card>

      <Card>
        <Text style={styles.sectionTitle}>Days per week</Text>
        <View style={styles.choiceWrap}>
          {DAYS.map((option) => (
            <Chip
              key={option}
              label={String(option)}
              selected={daysPerWeek === option}
              accessibilityLabel={`Select ${option} days per week`}
              onPress={() => setDaysPerWeek(option)}
            />
          ))}
        </View>
      </Card>

      <PrimaryButton
        title="Generate plan"
        onPress={handleGenerate}
        style={styles.generateButton}
      />

      <Card style={styles.summaryCard}>
        <Text style={styles.summaryText}>Planned weekly volume</Text>
        <Text style={styles.summaryNumber}>{totalMinutes} min</Text>
      </Card>

      {plan.map((item) => (
        <Card key={item.day} style={styles.planCard}>
          <Text style={styles.dayLabel}>{item.day}</Text>
          <Text style={styles.planName}>{item.workout}</Text>
          <Text style={styles.planMeta}>{item.duration} min</Text>
          <Text style={styles.planFocus}>{item.focus}</Text>
        </Card>
      ))}
    </ScrollView>
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
  sectionTitle: {
    fontSize: theme.typography.body,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  choiceWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  generateButton: {
    marginBottom: theme.spacing.md,
  },
  summaryCard: {
    backgroundColor: theme.colors.primarySoft,
    borderColor: theme.colors.primary,
  },
  summaryText: {
    color: theme.colors.muted,
    fontSize: theme.typography.bodySmall,
  },
  summaryNumber: {
    color: theme.colors.primary,
    fontSize: theme.typography.h2,
    fontWeight: '800',
    marginTop: 4,
  },
  planCard: {
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.primary,
  },
  dayLabel: {
    fontSize: theme.typography.caption,
    color: theme.colors.muted,
    marginBottom: 4,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  planName: {
    fontSize: theme.typography.body,
    fontWeight: '700',
    color: theme.colors.text,
  },
  planMeta: {
    color: theme.colors.primary,
    fontWeight: '700',
    marginTop: 4,
  },
  planFocus: {
    color: theme.colors.muted,
    marginTop: 4,
    fontSize: theme.typography.bodySmall,
  },
});
