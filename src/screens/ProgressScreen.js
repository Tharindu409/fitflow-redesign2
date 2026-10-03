import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Card from '../components/Card';
import { useAppContext } from '../context/AppContext';
import theme from '../theme/theme';

const WEEK_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function ProgressScreen() {
  const { workouts } = useAppContext();

  const chartData = useMemo(() => {
    const base = [20, 35, 25, 40, 30, 50, 15];
    const currentActive = workouts.reduce((sum, item) => sum + Number(item.duration || 0), 0);
    const intensity = currentActive % 90;
    return base.map((item, index) => {
      if (index === 6) {
        return Math.min(90, currentActive + 5);
      }
      return Math.min(90, item + (intensity > 20 && index % 2 === 0 ? 8 : 0));
    });
  }, [workouts]);

  const weeklyTotal = chartData.reduce((sum, value) => sum + value, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Progress</Text>

      <Card>
        <Text style={styles.sectionLabel}>Weekly total</Text>
        <Text style={styles.total}>{weeklyTotal} min</Text>
        <Text style={styles.goalText}>Goal: 300 min</Text>
      </Card>

      <Card>
        <Text style={styles.sectionLabel}>Active minutes</Text>
        <View style={styles.chartWrap}>
          {chartData.map((value, index) => (
            <View key={WEEK_DAYS[index]} style={styles.barGroup}>
              <Text style={styles.valueLabel}>{value}</Text>
              <View style={styles.barColumnWrap}>
                <View
                  style={[
                    styles.bar,
                    { height: Math.max(24, (value / 90) * 150) },
                  ]}
                />
              </View>
              <Text style={styles.dayLabel}>{WEEK_DAYS[index]}</Text>
            </View>
          ))}
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.lg,
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
    marginBottom: theme.spacing.sm,
    fontWeight: '600',
  },
  total: {
    color: theme.colors.text,
    fontSize: theme.typography.h1,
    fontWeight: '800',
    marginBottom: 4,
  },
  goalText: {
    color: theme.colors.muted,
    fontSize: theme.typography.bodySmall,
  },
  chartWrap: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    minHeight: 180,
    paddingTop: theme.spacing.md,
  },
  barGroup: {
    alignItems: 'center',
    flex: 1,
  },
  valueLabel: {
    fontSize: theme.typography.caption,
    color: theme.colors.muted,
    marginBottom: 6,
    fontWeight: '600',
  },
  barColumnWrap: {
    height: 150,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  bar: {
    width: '75%',
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
    minHeight: 24,
  },
  dayLabel: {
    marginTop: 8,
    color: theme.colors.muted,
    fontSize: theme.typography.caption,
    fontWeight: '700',
  },
});
