import { WorkoutPlan } from "@/types/workout";

export const generateWorkoutPlan = async (prompt: string): Promise<WorkoutPlan> => {
  // Simulate AI API call with realistic delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Mock response based on the example provided in the task
  const mockResponse: WorkoutPlan = {
    programName: "Maxed²",
    programDescription: "A comprehensive 4-week strength and conditioning program designed to maximize your fitness potential through progressive overload and varied training modalities.",
    weeks: [
      {
        week: 1,
        days: [
          {
            day: 1,
            title: "Upper Body",
            exercises: [
              {
                circuit: "A",
                exerciseName: "Barbell Bench Press",
                sets: 3,
                reps: "12, 10, 8",
                rest: "90s",
                notes: "AI generated workout notes"
              },
              {
                circuit: "B",
                exerciseName: "Cable Pullover",
                sets: 3,
                reps: "12, 10, 8",
                rest: "60s",
                notes: "AI generated workout notes"
              },
              {
                circuit: "C",
                exerciseName: "Cable Pullover",
                sets: 3,
                reps: "12, 10, 8",
                rest: "60s",
                notes: "AI generated workout notes"
              },
              {
                circuit: "D",
                exerciseName: "Cable Pullover",
                sets: 3,
                reps: "12, 10, 8",
                rest: "60s",
                notes: "AI generated workout notes"
              },
              {
                circuit: "E",
                exerciseName: "Lat Pulldowns",
                sets: 3,
                reps: "12, 10, 8",
                rest: "60s",
                notes: "AI generated workout notes"
              }
            ]
          },
          {
            day: 2,
            title: "Lower Body",
            exercises: [
              {
                circuit: "A",
                exerciseName: "Barbell Bench Press",
                sets: 3,
                reps: "12, 10, 8",
                rest: "90s",
                notes: "AI generated workout notes"
              },
              {
                circuit: "B",
                exerciseName: "Cable Pullover",
                sets: 3,
                reps: "12, 10, 8",
                rest: "60s",
                notes: "AI generated workout notes"
              },
              {
                circuit: "C",
                exerciseName: "Cable Pullover",
                sets: 3,
                reps: "12, 10, 8",
                rest: "60s",
                notes: "AI generated workout notes"
              },
              {
                circuit: "D",
                exerciseName: "Cable Pullover",
                sets: 3,
                reps: "12, 10, 8",
                rest: "60s",
                notes: "AI generated workout notes"
              },
              {
                circuit: "E",
                exerciseName: "Lat Pulldowns",
                sets: 3,
                reps: "12, 10, 8",
                rest: "60s",
                notes: "AI generated workout notes"
              }
            ]
          },
          {
            day: 3,
            title: "Rest",
            exercises: []
          },
          {
            day: 4,
            title: "Upper Body",
            exercises: [
              {
                circuit: "A",
                exerciseName: "Barbell Bench Press",
                sets: 3,
                reps: "12, 10, 8",
                rest: "90s",
                notes: "AI generated workout notes"
              },
              {
                circuit: "B",
                exerciseName: "Cable Pullover",
                sets: 3,
                reps: "12, 10, 8",
                rest: "60s",
                notes: "AI generated workout notes"
              },
              {
                circuit: "C",
                exerciseName: "Cable Pullover",
                sets: 3,
                reps: "12, 10, 8",
                rest: "60s",
                notes: "AI generated workout notes"
              },
              {
                circuit: "D",
                exerciseName: "Cable Pullover",
                sets: 3,
                reps: "12, 10, 8",
                rest: "60s",
                notes: "AI generated workout notes"
              },
              {
                circuit: "E",
                exerciseName: "Lat Pulldowns",
                sets: 3,
                reps: "12, 10, 8",
                rest: "60s",
                notes: "AI generated workout notes"
              }
            ]
          }
        ]
      },
      {
        week: 2,
        days: [
          {
            day: 1,
            title: "Upper Body",
            exercises: [
              {
                circuit: "A",
                exerciseName: "Incline Dumbbell Press",
                sets: 4,
                reps: "10, 8, 6, 6",
                rest: "90s",
                notes: "Increase weight each set"
              },
              {
                circuit: "B",
                exerciseName: "T-Bar Row",
                sets: 4,
                reps: "10, 8, 6, 6",
                rest: "90s",
                notes: "Focus on squeezing shoulder blades"
              }
            ]
          }
        ]
      },
      {
        week: 3,
        days: [
          {
            day: 1,
            title: "Upper Body",
            exercises: [
              {
                circuit: "A",
                exerciseName: "Barbell Overhead Press",
                sets: 4,
                reps: "8, 6, 4, 4",
                rest: "2min",
                notes: "Heavy compound movement"
              }
            ]
          }
        ]
      },
      {
        week: 4,
        days: [
          {
            day: 1,
            title: "Upper Body",
            exercises: [
              {
                circuit: "A",
                exerciseName: "Weighted Dips",
                sets: 5,
                reps: "6, 4, 3, 2, 1",
                rest: "3min",
                notes: "Max strength focus"
              }
            ]
          }
        ]
      }
    ]
  };

  return mockResponse;
};