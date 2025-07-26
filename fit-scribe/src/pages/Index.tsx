import { useState } from "react";
import { WorkoutPrompt } from "@/components/WorkoutPrompt";
import { WorkoutPlan } from "@/components/WorkoutPlan";
import { generateWorkoutPlan } from "@/services/aiService";
import { WorkoutPlan as WorkoutPlanType } from "@/types/workout";
import { toast } from "sonner";

const Index = () => {
  const [currentView, setCurrentView] = useState<"prompt" | "plan">("prompt");
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlanType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitPrompt = async (prompt: string) => {
    setIsLoading(true);
    try {
      const plan = await generateWorkoutPlan(prompt);
      setWorkoutPlan(plan);
      setCurrentView("plan");
      toast.success("Workout plan generated successfully!");
    } catch (error) {
      toast.error("Failed to generate workout plan. Please try again.");
      console.error("Error generating workout plan:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    setCurrentView("prompt");
    setWorkoutPlan(null);
  };

  if (currentView === "plan" && workoutPlan) {
    return <WorkoutPlan workoutPlan={workoutPlan} onBack={handleBack} />;
  }

  return (
    <WorkoutPrompt 
      onSubmitPrompt={handleSubmitPrompt} 
      isLoading={isLoading}
    />
  );
};

export default Index;
