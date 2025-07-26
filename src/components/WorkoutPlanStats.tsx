import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { WorkoutPlan } from "@/types/workout";
import { calculateWorkoutMetadata, formatWorkoutDuration } from "@/utils/workoutUtils";
import { Calendar, Target, Dumbbell, TrendingUp } from "lucide-react";

interface WorkoutPlanStatsProps {
  workoutPlan: WorkoutPlan;
}

export const WorkoutPlanStats = ({ workoutPlan }: WorkoutPlanStatsProps) => {
  const metadata = calculateWorkoutMetadata(workoutPlan);

  const stats = [
    {
      icon: Calendar,
      label: "Duration",
      value: formatWorkoutDuration(metadata.totalWeeks),
      color: "text-blue-600"
    },
    {
      icon: Target,
      label: "Workout Days",
      value: metadata.totalWorkoutDays.toString(),
      color: "text-green-600"
    },
    {
      icon: Dumbbell,
      label: "Total Exercises",
      value: metadata.totalExercises.toString(),
      color: "text-purple-600"
    },
    {
      icon: TrendingUp,
      label: "Difficulty",
      value: metadata.difficulty,
      color: "text-orange-600"
    }
  ];

  return (
    <Card className="p-6 bg-white shadow-sm border-0">
      <h3 className="text-lg font-semibold text-foreground mb-4">Program Overview</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className={`w-12 h-12 mx-auto mb-2 rounded-full bg-gray-100 flex items-center justify-center ${stat.color}`}>
              <stat.icon className="h-6 w-6" />
            </div>
            <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            <div className="text-sm text-fitness-neutral-dark">{stat.label}</div>
          </div>
        ))}
      </div>

      {metadata.focus.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-fitness-neutral-dark mb-2">Focus Areas</h4>
          <div className="flex flex-wrap gap-2">
            {metadata.focus.map((focus, index) => (
              <Badge key={index} variant="secondary" className="bg-fitness-primary-light text-fitness-primary">
                {focus}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};