export interface Exercise {
  circuit: string;
  exerciseName: string;
  sets: number;
  reps: string;
  rest?: string;
  notes: string;
  id?: string; // For better tracking and manipulation
}

export interface WorkoutDay {
  day: number;
  title: string;
  exercises: Exercise[];
  id?: string;
}

export interface WorkoutWeek {
  week: number;
  days: WorkoutDay[];
  id?: string;
}

export interface WorkoutPlan {
  programName: string;
  programDescription: string;
  weeks: WorkoutWeek[];
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Additional types for enhanced functionality
export interface WorkoutPlanMetadata {
  totalWeeks: number;
  totalWorkoutDays: number;
  totalExercises: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  focus: string[];
}

export interface ExerciseTemplate {
  name: string;
  category: string;
  muscleGroups: string[];
  equipment: string[];
  difficulty: number;
  instructions?: string;
}