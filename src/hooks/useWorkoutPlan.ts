import { useState, useCallback } from 'react';
import { WorkoutPlan, Exercise } from '@/types/workout';
import { toast } from 'sonner';

export const useWorkoutPlan = (initialPlan?: WorkoutPlan) => {
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan | null>(initialPlan || null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateExercise = useCallback((
    weekIndex: number,
    dayIndex: number,
    exerciseIndex: number,
    updatedExercise: Partial<Exercise>
  ) => {
    if (!workoutPlan) return;

    const updatedPlan = { ...workoutPlan };
    const exercise = updatedPlan.weeks[weekIndex].days[dayIndex].exercises[exerciseIndex];
    
    updatedPlan.weeks[weekIndex].days[dayIndex].exercises[exerciseIndex] = {
      ...exercise,
      ...updatedExercise
    };

    setWorkoutPlan(updatedPlan);
    toast.success('Exercise updated successfully');
  }, [workoutPlan]);

  const deleteExercise = useCallback((
    weekIndex: number,
    dayIndex: number,
    exerciseIndex: number
  ) => {
    if (!workoutPlan) return;

    const updatedPlan = { ...workoutPlan };
    updatedPlan.weeks[weekIndex].days[dayIndex].exercises.splice(exerciseIndex, 1);
    
    setWorkoutPlan(updatedPlan);
    toast.success('Exercise deleted successfully');
  }, [workoutPlan]);

  const reorderExercise = useCallback((
    weekIndex: number,
    dayIndex: number,
    fromIndex: number,
    toIndex: number
  ) => {
    if (!workoutPlan) return;

    const updatedPlan = { ...workoutPlan };
    const exercises = updatedPlan.weeks[weekIndex].days[dayIndex].exercises;
    const [movedExercise] = exercises.splice(fromIndex, 1);
    exercises.splice(toIndex, 0, movedExercise);
    
    setWorkoutPlan(updatedPlan);
    toast.success('Exercise reordered successfully');
  }, [workoutPlan]);

  const addExercise = useCallback((
    weekIndex: number,
    dayIndex: number,
    exercise: Exercise
  ) => {
    if (!workoutPlan) return;

    const updatedPlan = { ...workoutPlan };
    updatedPlan.weeks[weekIndex].days[dayIndex].exercises.push(exercise);
    
    setWorkoutPlan(updatedPlan);
    toast.success('Exercise added successfully');
  }, [workoutPlan]);

  return {
    workoutPlan,
    setWorkoutPlan,
    isLoading,
    setIsLoading,
    error,
    setError,
    updateExercise,
    deleteExercise,
    reorderExercise,
    addExercise
  };
};