import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, MoreVertical, ArrowUpDown, Trash2, GripVertical } from "lucide-react";
import { WorkoutPlan as WorkoutPlanType, Exercise } from "@/types/workout";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

interface WorkoutPlanProps {
  workoutPlan: WorkoutPlanType;
  onBack: () => void;
}

export const WorkoutPlan = ({ workoutPlan, onBack }: WorkoutPlanProps) => {
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [exercises, setExercises] = useState(workoutPlan.weeks);
  
  const currentWeek = exercises.find(w => w.week === selectedWeek);

  const handleDeleteExercise = (dayIndex: number, exerciseIndex: number) => {
    const updatedWeeks = exercises.map(week => {
      if (week.week === selectedWeek) {
        const updatedDays = week.days.map((day, dIndex) => {
          if (dIndex === dayIndex) {
            const updatedExercises = day.exercises.filter((_, eIndex) => eIndex !== exerciseIndex);
            return { ...day, exercises: updatedExercises };
          }
          return day;
        });
        return { ...week, days: updatedDays };
      }
      return week;
    });
    
    setExercises(updatedWeeks);
    toast.success("Exercise deleted successfully");
  };

  const handleMoveExercise = (dayIndex: number, exerciseIndex: number, direction: 'up' | 'down') => {
    const updatedWeeks = exercises.map(week => {
      if (week.week === selectedWeek) {
        const updatedDays = week.days.map((day, dIndex) => {
          if (dIndex === dayIndex) {
            const newExercises = [...day.exercises];
            const newIndex = direction === 'up' ? exerciseIndex - 1 : exerciseIndex + 1;
            
            if (newIndex >= 0 && newIndex < newExercises.length) {
              [newExercises[exerciseIndex], newExercises[newIndex]] = 
              [newExercises[newIndex], newExercises[exerciseIndex]];
            }
            
            return { ...day, exercises: newExercises };
          }
          return day;
        });
        return { ...week, days: updatedDays };
      }
      return week;
    });
    
    setExercises(updatedWeeks);
    toast.success(`Exercise moved ${direction}`);
  };

  const renderExerciseRow = (exercise: Exercise, exerciseIndex: number, dayIndex: number) => (
    <tr key={`${dayIndex}-${exerciseIndex}`} className="border-b border-border hover:bg-muted/50 transition-colors group">
      <td className="py-4 px-4 text-center font-medium">
        <Badge variant="outline" className="bg-fitness-primary-light text-fitness-primary">
          {exercise.circuit}
        </Badge>
      </td>
      <td className="py-4 px-4 font-medium text-foreground">{exercise.exerciseName}</td>
      <td className="py-4 px-4 text-center font-medium">{exercise.sets}</td>
      <td className="py-4 px-4 text-center font-medium">{exercise.reps}</td>
      <td className="py-4 px-4 text-sm text-fitness-neutral-dark italic max-w-xs">
        {exercise.notes}
      </td>
      <td className="py-4 px-4 text-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem 
              onClick={() => handleDeleteExercise(dayIndex, exerciseIndex)}
              className="text-destructive focus:text-destructive"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Exercise
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </td>
      <td className="py-4 px-4 text-center">
        <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-6 w-6 p-0"
            onClick={() => handleMoveExercise(dayIndex, exerciseIndex, 'up')}
            disabled={exerciseIndex === 0}
          >
            <ArrowUpDown className="h-3 w-3 rotate-180" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-6 w-6 p-0"
            onClick={() => handleMoveExercise(dayIndex, exerciseIndex, 'down')}
            disabled={exerciseIndex === currentWeek?.days[dayIndex]?.exercises.length - 1}
          >
            <ArrowUpDown className="h-3 w-3" />
          </Button>
        </div>
      </td>
    </tr>
  );

  return (
    <div className="min-h-screen bg-fitness-neutral">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Enhanced Header */}
        <div className="flex items-center justify-between bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={onBack}
              className="p-2 hover:bg-fitness-primary-light rounded-lg transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">{workoutPlan.programName}</h1>
              <p className="text-fitness-neutral-dark mt-1 max-w-2xl">{workoutPlan.programDescription}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="px-3 py-1">
              {workoutPlan.weeks.length} Week Program
            </Badge>
          </div>
        </div>

        {/* Enhanced Week Navigation */}
        <div className="flex flex-wrap gap-3">
          {workoutPlan.weeks.map((week) => (
            <Button
              key={week.week}
              variant={selectedWeek === week.week ? "default" : "outline"}
              onClick={() => setSelectedWeek(week.week)}
              className={`px-6 py-3 font-medium transition-all ${
                selectedWeek === week.week 
                  ? "bg-fitness-primary hover:bg-fitness-primary/90 text-white shadow-md" 
                  : "hover:bg-fitness-primary-light hover:border-fitness-primary"
              }`}
            >
              Week {week.week}
            </Button>
          ))}
        </div>

        {/* Enhanced Workout Days */}
        {currentWeek && (
          <div className="space-y-6">
            {currentWeek.days.map((day, dayIndex) => (
              <Card key={day.day} className="overflow-hidden shadow-sm border-0 bg-white">
                {/* Enhanced Day Header */}
                <div className="bg-gradient-to-r from-fitness-primary to-fitness-accent px-6 py-4 border-b">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-white">
                      Day {day.day} - {day.title}
                    </h2>
                    {day.exercises.length > 0 && (
                      <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                        {day.exercises.length} exercises
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Enhanced Exercises Table */}
                {day.exercises.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-fitness-neutral border-b">
                        <tr>
                          <th className="py-4 px-4 text-left text-sm font-semibold text-fitness-neutral-dark">
                            Circuit
                          </th>
                          <th className="py-4 px-4 text-left text-sm font-semibold text-fitness-neutral-dark">
                            Exercise
                          </th>
                          <th className="py-4 px-4 text-center text-sm font-semibold text-fitness-neutral-dark">
                            Sets
                          </th>
                          <th className="py-4 px-4 text-center text-sm font-semibold text-fitness-neutral-dark">
                            Reps
                          </th>
                          <th className="py-4 px-4 text-left text-sm font-semibold text-fitness-neutral-dark">
                            Notes
                          </th>
                          <th className="py-4 px-4 text-center text-sm font-semibold text-fitness-neutral-dark w-16">
                            Actions
                          </th>
                          <th className="py-4 px-4 text-center text-sm font-semibold text-fitness-neutral-dark w-16">
                            Order
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {day.exercises.map((exercise, exerciseIndex) => 
                          renderExerciseRow(exercise, exerciseIndex, dayIndex)
                        )}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="px-6 py-12 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-fitness-primary-light rounded-full flex items-center justify-center">
                      <GripVertical className="h-8 w-8 text-fitness-primary" />
                    </div>
                    <p className="text-xl font-medium text-foreground mb-2">Rest Day</p>
                    <p className="text-fitness-neutral-dark">Take a well-deserved break and let your muscles recover.</p>
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