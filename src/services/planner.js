export const GOAL_OPTIONS = ['Build strength', 'Lose weight', 'Improve stamina'];
export const LEVEL_OPTIONS = ['Beginner', 'Intermediate', 'Advanced'];

const goalLibrary = {
  'Build strength': [
    { name: 'Barbell squats', duration: 35, focus: 'Leg strength' },
    { name: 'Push-ups', duration: 20, focus: 'Upper body power' },
    { name: 'Bent-over rows', duration: 30, focus: 'Back strength' },
    { name: 'Plank hold', duration: 15, focus: 'Core stability' },
  ],
  'Lose weight': [
    { name: 'Brisk walk', duration: 30, focus: 'Cardio burn' },
    { name: 'HIIT circuit', duration: 20, focus: 'Fat-burning interval' },
    { name: 'Cycling', duration: 25, focus: 'Low-impact endurance' },
    { name: 'Jump rope', duration: 15, focus: 'Full-body conditioning' },
  ],
  'Improve stamina': [
    { name: 'Easy run', duration: 30, focus: 'Aerobic base' },
    { name: 'Tempo intervals', duration: 25, focus: 'Cardio efficiency' },
    { name: 'Swim session', duration: 35, focus: 'Sustained effort' },
    { name: 'Long walk', duration: 40, focus: 'Endurance building' },
  ],
};

const levelModifiers = {
  Beginner: { label: 'Technique-focused', durationShift: 0 },
  Intermediate: { label: 'Balanced intensity', durationShift: 5 },
  Advanced: { label: 'High intensity', durationShift: 10 },
};

export function generateWorkoutPlan({ goal, level, daysPerWeek }) {
  const basePlan = goalLibrary[goal] || goalLibrary['Build strength'];
  const modifier = levelModifiers[level] || levelModifiers.Beginner;

  return Array.from({ length: daysPerWeek }, (_, index) => {
    const exercise = basePlan[index % basePlan.length];
    const duration = exercise.duration + modifier.durationShift;

    return {
      day: `Day ${index + 1}`,
      workout: exercise.name,
      duration,
      focus: `${modifier.label} • ${exercise.focus}`,
    };
  });
}
