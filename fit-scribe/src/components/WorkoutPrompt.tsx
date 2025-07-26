import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Loader2, Send } from "lucide-react";

interface WorkoutPromptProps {
  onSubmitPrompt: (prompt: string) => void;
  isLoading: boolean;
}

export const WorkoutPrompt = ({ onSubmitPrompt, isLoading }: WorkoutPromptProps) => {
  const [prompt, setPrompt] = useState("");
  const [charCount, setCharCount] = useState(0);

  const handleSubmit = () => {
    if (prompt.trim() && !isLoading) {
      onSubmitPrompt(prompt.trim());
    }
  };

  const handleInputChange = (value: string) => {
    setPrompt(value);
    setCharCount(value.length);
  };

  return (
    <div className="min-h-screen bg-fitness-neutral flex items-center justify-center px-4">
      <div className="w-full max-w-2xl text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Smarter training starts here
          </h1>
          <p className="text-lg text-fitness-neutral-dark">
            Chat with AI to build custom fitness plans
          </p>
        </div>

        <Card className="p-6 bg-white shadow-lg">
          <div className="space-y-4">
            <div className="relative">
              <Textarea
                placeholder="Describe what are we building today..."
                value={prompt}
                onChange={(e) => handleInputChange(e.target.value)}
                className="min-h-[120px] resize-none border-2 border-border focus:border-fitness-primary transition-colors"
                disabled={isLoading}
              />
              <div className="absolute bottom-3 right-3 text-xs text-fitness-neutral-dark">
                {charCount}/1000
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button
                onClick={handleSubmit}
                disabled={!prompt.trim() || isLoading}
                className="bg-fitness-primary hover:bg-fitness-primary/90 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Generate Plan
                  </>
                )}
              </Button>
            </div>
          </div>
        </Card>

        <div className="text-sm text-fitness-neutral-dark">
          Try: "A 6-week full-body strength and conditioning program for an intermediate lifter"
        </div>
      </div>
    </div>
  );
};