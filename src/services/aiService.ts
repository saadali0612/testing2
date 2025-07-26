import { WorkoutPlan } from "@/types/workout";

// Enhanced AI service with better error handling and realistic responses
export const generateWorkoutPlan = async (prompt: string): Promise<WorkoutPlan> => {
  try {
    // Simulate realistic API call timing
    await new Promise(resolve => setTimeout(resolve, 3000 + Math.random() * 2000));
    
    // Enhanced mock response that adapts to the prompt
    const isStrengthFocused = prompt.toLowerCase().includes('strength');
    const isCardioFocused = prompt.toLowerCase().includes('cardio') || prompt.toLowerCase().includes('conditioning');
    const weekCount = extractWeekCount(prompt);
    
    const mockResponse: WorkoutPlan = {
      programName: generateProgramName(prompt),
      programDescription: generateProgramDescription(prompt),
      weeks: generateWeeks(weekCount, isStrengthFocused, isCardioFocused)
    };

    return mockResponse;
  } catch (error) {
    console.error('Error generating workout plan:', error);
    throw new Error('Failed to generate workout plan. Please try again.');
  }
};

const extractWeekCount = (prompt: string): number => {
  const weekMatch = prompt.match(/(\d+)[-\s]?week/i);
  return weekMatch ? parseInt(weekMatch[1]) : 4;
};

const generateProgramName = (prompt: string): string => {
  if (prompt.toLowerCase().includes('strength')) return "Strength Mastery Program";
  if (prompt.toLowerCase().includes('cardio')) return "Cardio Conditioning Challenge";
  if (prompt.toLowerCase().includes('full body')) return "Total Body Transformation";
  if (prompt.toLowerCase().includes('beginner')) return "Foundation Builder";
  if (prompt.toLowerCase().includes('advanced')) return "Elite Performance Protocol";
  return "Custom Fitness Program";
};

const generateProgramDescription = (prompt: string): string => {
  const level = prompt.toLowerCase().includes('beginner') ? 'beginner' : 
               prompt.toLowerCase().includes('advanced') ? 'advanced' : 'intermediate';
  
  return `A comprehensive ${level}-level fitness program designed to help you achieve your specific goals through scientifically-backed training principles and progressive overload.`;
};

const generateWeeks = (weekCount: number, isStrength: boolean, isCardio: boolean): any[] => {
  const weeks = [];
  
  for (let week = 1; week <= weekCount; week++) {
    const days = [];
    const daysPerWeek = isCardio ? 6 : 4;
    
    for (let day = 1; day <= daysPerWeek; day++) {
      if (day === 3 || day === 7) {
        days.push({
          day,
          title: "Rest Day",
          exercises: []
        });
      } else {
        days.push({
          day,
          title: getDayTitle(day, isStrength, isCardio),
          exercises: generateExercises(day, week, isStrength, isCardio)
        });
      }
    }
    
    weeks.push({ week, days });
  }
  
  return weeks;
};

const getDayTitle = (day: number, isStrength: boolean, isCardio: boolean): string => {
  if (isStrength) {
    const titles = ["Upper Body Power", "Lower Body Strength", "Push Focus", "Pull Focus", "Full Body", "Core & Conditioning"];
    return titles[(day - 1) % titles.length];
  }
  if (isCardio) {
    const titles = ["HIIT Cardio", "Strength Circuit", "Endurance Training", "Metabolic Conditioning", "Active Recovery", "Power Training"];
    return titles[(day - 1) % titles.length];
  }
  const titles = ["Upper Body", "Lower Body", "Full Body", "Cardio & Core"];
  return titles[(day - 1) % titles.length];
};

const generateExercises = (day: number, week: number, isStrength: boolean, isCardio: boolean): any[] => {
  const exercises = [];
  const exerciseCount = Math.floor(Math.random() * 3) + 4; // 4-6 exercises
  
  const exercisePool = isStrength ? strengthExercises : isCardio ? cardioExercises : generalExercises;
  const dayExercises = exercisePool[day % exercisePool.length] || exercisePool[0];
  
  for (let i = 0; i < exerciseCount; i++) {
    const exercise = dayExercises[i % dayExercises.length];
    const sets = week <= 2 ? 3 : 4;
    const reps = isStrength ? `${12 - week}, ${10 - week}, ${8 - week}` : "12-15";
    
    exercises.push({
      circuit: String.fromCharCode(65 + i), // A, B, C, etc.
      exerciseName: exercise.name,
      sets,
      reps,
      rest: exercise.rest,
      notes: `Week ${week}: ${exercise.notes}`
    });
  }
  
  return exercises;
};

const strengthExercises = [
  [
    { name: "Barbell Bench Press", rest: "2-3min", notes: "Focus on controlled descent" },
    { name: "Incline Dumbbell Press", rest: "90s", notes: "45-degree angle" },
    { name: "Weighted Pull-ups", rest: "2min", notes: "Full range of motion" },
    { name: "Barbell Rows", rest: "90s", notes: "Squeeze shoulder blades" },
    { name: "Overhead Press", rest: "2min", notes: "Keep core tight" },
    { name: "Dips", rest: "90s", notes: "Lean forward slightly" }
  ],
  [
    { name: "Back Squats", rest: "3min", notes: "Below parallel depth" },
    { name: "Romanian Deadlifts", rest: "2min", notes: "Hip hinge movement" },
    { name: "Bulgarian Split Squats", rest: "90s", notes: "Each leg" },
    { name: "Walking Lunges", rest: "60s", notes: "Controlled tempo" },
    { name: "Calf Raises", rest: "60s", notes: "Full stretch at bottom" },
    { name: "Leg Curls", rest: "90s", notes: "Slow negative" }
  ]
];

const cardioExercises = [
  [
    { name: "Burpees", rest: "30s", notes: "Explosive movement" },
    { name: "Mountain Climbers", rest: "30s", notes: "Keep hips level" },
    { name: "Jump Squats", rest: "45s", notes: "Land softly" },
    { name: "High Knees", rest: "30s", notes: "Drive knees up" },
    { name: "Battle Ropes", rest: "60s", notes: "Maintain intensity" }
  ]
];

const generalExercises = [
  [
    { name: "Push-ups", rest: "60s", notes: "Maintain straight line" },
    { name: "Bodyweight Squats", rest: "45s", notes: "Full depth" },
    { name: "Plank", rest: "60s", notes: "Hold for time" },
    { name: "Lunges", rest: "45s", notes: "Alternate legs" },
    { name: "Jumping Jacks", rest: "30s", notes: "Cardio finisher" }
  ]
];