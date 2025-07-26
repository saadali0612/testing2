import { useState } from "react";
import { WorkoutPrompt } from "@/components/WorkoutPrompt";
import { WorkoutPlan } from "@/components/WorkoutPlan";
import { generateWorkoutPlan } from "@/services/aiService";
import { WorkoutPlan as WorkoutPlanType } from "@/types/workout";
import { toast } from "sonner";
import { validateWorkoutPlan } from "@/utils/workoutUtils";

const Index = () => {
  const [currentView, setCurrentView] = useState<"prompt" | "plan">("prompt");
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlanType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitPrompt = async (prompt: string) => {
    if (!prompt.trim()) {
      toast.error("Please enter a workout description");
      return;
    }

    setIsLoading(true);
    
    try {
      // Show immediate feedback
      toast.info("Analyzing your requirements...");
      
      const plan = await generateWorkoutPlan(prompt);
      
      // Validate the generated plan
      const validationErrors = validateWorkoutPlan(plan);
      if (validationErrors.length > 0) {
        console.warn("Plan validation warnings:", validationErrors);
        // Continue anyway but log warnings
      }
      
      setWorkoutPlan(plan);
      setCurrentView("plan");
      
      toast.success("🎉 Your personalized workout plan is ready!", {
        duration: 4000,
      });
      
    } catch (error) {
      console.error("Error generating workout plan:", error);
      
      const errorMessage = error instanceof Error 
        ? error.message 
        : "Failed to generate workout plan. Please try again.";
        
      toast.error(errorMessage, {
        duration: 5000,
        action: {
          label: "Retry",
          onClick: () => handleSubmitPrompt(prompt)
        }
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    setCurrentView("prompt");
    // Don't clear the workout plan immediately to allow quick navigation back
    setTimeout(() => {
      if (currentView === "prompt") {
        setWorkoutPlan(null);
      }
    }, 300);
  };

  const handleNewPlan = () => {
    setCurrentView("prompt");
    setWorkoutPlan(null);
    toast.info("Ready to create a new workout plan!");
  };

  if (currentView === "plan" && workoutPlan) {
    return (
      <WorkoutPlan 
        workoutPlan={workoutPlan} 
        onBack={handleBack}
      />
    );
  }

  return (
    <WorkoutPrompt 
      onSubmitPrompt={handleSubmitPrompt} 
      isLoading={isLoading}
    />
  );
};

export default Index;