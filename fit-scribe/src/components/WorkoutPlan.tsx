import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, MoreVertical, ArrowUpDown } from "lucide-react";
import { WorkoutPlan as WorkoutPlanType, Exercise } from "@/types/workout";

interface WorkoutPlanProps {
  workoutPlan: WorkoutPlanType;
  onBack: () => void;
}

export const WorkoutPlan = ({ workoutPlan, onBack }: WorkoutPlanProps) => {
  const [selectedWeek, setSelectedWeek] = useState(1);
  
  const currentWeek = workoutPlan.weeks.find(w => w.week === selectedWeek);

  const renderExerciseRow = (exercise: Exercise, index: number) => (
    <tr key={index} className="border-b border-border hover:bg-muted/50 transition-colors">
      <td className="py-3 px-4 text-center font-medium">{exercise.circuit}</td>
      <td className="py-3 px-4 font-medium">{exercise.exerciseName}</td>
      <td className="py-3 px-4 text-center">{exercise.sets}</td>
      <td className="py-3 px-4 text-center">{exercise.reps}</td>
      <td className="py-3 px-4 text-sm text-fitness-neutral-dark italic">
        {exercise.notes}
      </td>
      <td className="py-3 px-4 text-center">
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </td>
      <td className="py-3 px-4 text-center">
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      </td>
    </tr>
  );

  return (
    <div className="min-h-screen bg-fitness-neutral p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={onBack}
              className="p-2"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">{workoutPlan.programName}</h1>
              <p className="text-fitness-neutral-dark">{workoutPlan.programDescription}</p>
            </div>
          </div>
        </div>

        {/* Week Navigation */}
        <div className="flex space-x-2">
          {workoutPlan.weeks.map((week) => (
            <Button
              key={week.week}
              variant={selectedWeek === week.week ? "default" : "outline"}
              onClick={() => setSelectedWeek(week.week)}
              className={selectedWeek === week.week ? "bg-fitness-primary hover:bg-fitness-primary/90" : ""}
            >
              Week {week.week}
            </Button>
          ))}
        </div>

        {/* Workout Days */}
        {currentWeek && (
          <div className="space-y-6">
            {currentWeek.days.map((day) => (
              <Card key={day.day} className="overflow-hidden">
                {/* Day Header */}
                <div className="bg-fitness-primary-light px-6 py-4 border-b">
                  <h2 className="text-lg font-semibold text-fitness-primary">
                    Day {day.day} - {day.title}
                  </h2>
                </div>

                {/* Exercises Table */}
                {day.exercises.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-muted/50">
                        <tr>
                          <th className="py-3 px-4 text-left text-sm font-medium text-fitness-neutral-dark">
                            Circuits
                          </th>
                          <th className="py-3 px-4 text-left text-sm font-medium text-fitness-neutral-dark">
                            Exercise
                          </th>
                          <th className="py-3 px-4 text-center text-sm font-medium text-fitness-neutral-dark">
                            Sets
                          </th>
                          <th className="py-3 px-4 text-center text-sm font-medium text-fitness-neutral-dark">
                            Reps
                          </th>
                          <th className="py-3 px-4 text-left text-sm font-medium text-fitness-neutral-dark">
                            Notes
                          </th>
                          <th className="py-3 px-4 text-center text-sm font-medium text-fitness-neutral-dark">
                            
                          </th>
                          <th className="py-3 px-4 text-center text-sm font-medium text-fitness-neutral-dark">
                            
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {day.exercises.map((exercise, index) => renderExerciseRow(exercise, index))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="px-6 py-8 text-center text-fitness-neutral-dark">
                    <p className="text-lg font-medium">Rest Day</p>
                    <p className="text-sm">Take a well-deserved break and let your muscles recover.</p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};