import { WorkoutPlan, WorkoutPlanMetadata } from '@/types/workout';

export const calculateWorkoutMetadata = (plan: WorkoutPlan): WorkoutPlanMetadata => {
  const totalWeeks = plan.weeks.length;
  const totalWorkoutDays = plan.weeks.reduce((total, week) => 
    total + week.days.filter(day => day.exercises.length > 0).length, 0
  );
  const totalExercises = plan.weeks.reduce((total, week) => 
    total + week.days.reduce((dayTotal, day) => dayTotal + day.exercises.length, 0), 0
  );

  // Determine difficulty based on exercise complexity and volume
  const avgExercisesPerDay = totalExercises / Math.max(totalWorkoutDays, 1);
  let difficulty: 'Beginner' | 'Intermediate' | 'Advanced' = 'Beginner';
  
  if (avgExercisesPerDay > 6) difficulty = 'Advanced';
  else if (avgExercisesPerDay > 4) difficulty = 'Intermediate';

  // Extract focus areas from exercise names and day titles
  const focus = extractFocusAreas(plan);

  return {
    totalWeeks,
    totalWorkoutDays,
    totalExercises,
    difficulty,
    focus
  };
};

const extractFocusAreas = (plan: WorkoutPlan): string[] => {
  const focusSet = new Set<string>();
  
  plan.weeks.forEach(week => {
    week.days.forEach(day => {
      // Extract from day titles
      if (day.title.toLowerCase().includes('upper')) focusSet.add('Upper Body');
      if (day.title.toLowerCase().includes('lower')) focusSet.add('Lower Body');
      if (day.title.toLowerCase().includes('cardio')) focusSet.add('Cardio');
      if (day.title.toLowerCase().includes('strength')) focusSet.add('Strength');
      if (day.title.toLowerCase().includes('core')) focusSet.add('Core');
      
      // Extract from exercise names
      day.exercises.forEach(exercise => {
        const name = exercise.exerciseName.toLowerCase();
        if (name.includes('squat') || name.includes('deadlift')) focusSet.add('Compound Movements');
        if (name.includes('cardio') || name.includes('hiit')) focusSet.add('Cardio');
        if (name.includes('core') || name.includes('plank')) focusSet.add('Core');
      });
    });
  });

  return Array.from(focusSet);
};

export const formatWorkoutDuration = (weeks: number): string => {
  if (weeks === 1) return '1 week';
  if (weeks < 4) return `${weeks} weeks`;
  if (weeks === 4) return '1 month';
  if (weeks < 8) return `${weeks} weeks`;
  if (weeks === 8) return '2 months';
  return `${weeks} weeks`;
};

export const validateWorkoutPlan = (plan: WorkoutPlan): string[] => {
  const errors: string[] = [];
  
  if (!plan.programName?.trim()) {
    errors.push('Program name is required');
  }
  
  if (!plan.programDescription?.trim()) {
    errors.push('Program description is required');
  }
  
  if (!plan.weeks || plan.weeks.length === 0) {
    errors.push('At least one week is required');
  }
  
  plan.weeks.forEach((week, weekIndex) => {
    if (!week.days || week.days.length === 0) {
      errors.push(`Week ${weekIndex + 1} must have at least one day`);
    }
    
    week.days.forEach((day, dayIndex) => {
      if (!day.title?.trim()) {
        errors.push(`Week ${weekIndex + 1}, Day ${dayIndex + 1} must have a title`);
      }
      
      day.exercises.forEach((exercise, exerciseIndex) => {
        if (!exercise.exerciseName?.trim()) {
          errors.push(`Week ${weekIndex + 1}, Day ${dayIndex + 1}, Exercise ${exerciseIndex + 1} must have a name`);
        }
        
        if (!exercise.sets || exercise.sets < 1) {
          errors.push(`Week ${weekIndex + 1}, Day ${dayIndex + 1}, Exercise ${exerciseIndex + 1} must have at least 1 set`);
        }
        
        if (!exercise.reps?.trim()) {
          errors.push(`Week ${weekIndex + 1}, Day ${dayIndex + 1}, Exercise ${exerciseIndex + 1} must have reps specified`);
        }
      });
    });
  });
  
  return errors;
};