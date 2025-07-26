import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Loader2, Send, Sparkles, Dumbbell, Target } from "lucide-react";

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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleSubmit();
    }
  };

  const examplePrompts = [
    "A 6-week full-body strength and conditioning program for an intermediate lifter",
    "4-week beginner-friendly home workout routine with no equipment",
    "Advanced 8-week powerlifting program focusing on squat, bench, and deadlift",
    "High-intensity cardio and strength circuit for weight loss over 5 weeks"
  ];

  const handleExampleClick = (example: string) => {
    setPrompt(example);
    setCharCount(example.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-fitness-neutral via-white to-fitness-primary-light flex items-center justify-center px-4">
      <div className="w-full max-w-4xl text-center space-y-8">
        {/* Enhanced Header */}
        <div className="space-y-6">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="p-3 bg-fitness-primary rounded-full">
              <Dumbbell className="h-8 w-8 text-white" />
            </div>
            <Sparkles className="h-6 w-6 text-fitness-primary animate-pulse" />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
            Smarter training starts{" "}
            <span className="bg-gradient-to-r from-fitness-primary to-fitness-accent bg-clip-text text-transparent">
              here
            </span>
          </h1>
          
          <p className="text-xl text-fitness-neutral-dark max-w-2xl mx-auto leading-relaxed">
            Chat with AI to build custom fitness plans tailored to your goals, experience level, and preferences
          </p>
        </div>

        {/* Enhanced Input Card */}
        <Card className="p-8 bg-white/80 backdrop-blur-sm shadow-xl border-0 max-w-3xl mx-auto">
          <div className="space-y-6">
            <div className="relative">
              <Textarea
                placeholder="Describe what we're building today... Be specific about your goals, experience level, duration, and any equipment preferences."
                value={prompt}
                onChange={(e) => handleInputChange(e.target.value)}
                onKeyDown={handleKeyPress}
                className="min-h-[140px] resize-none border-2 border-border focus:border-fitness-primary transition-colors text-base leading-relaxed"
                disabled={isLoading}
                maxLength={1000}
              />
              <div className="absolute bottom-3 right-3 text-xs text-fitness-neutral-dark bg-white/80 px-2 py-1 rounded">
                {charCount}/1000
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="text-sm text-fitness-neutral-dark flex items-center space-x-2">
                <Target className="h-4 w-4" />
                <span>Press Cmd/Ctrl + Enter to submit</span>
              </div>
              
              <Button
                onClick={handleSubmit}
                disabled={!prompt.trim() || isLoading}
                className="bg-fitness-primary hover:bg-fitness-primary/90 text-white px-8 py-3 rounded-lg font-medium transition-all transform hover:scale-105 disabled:transform-none"
                size="lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Generating your plan...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Generate Plan
                  </>
                )}
              </Button>
            </div>
          </div>
        </Card>

        {/* Example Prompts */}
        <div className="space-y-4">
          <p className="text-sm font-medium text-fitness-neutral-dark">
            Try these examples:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-4xl mx-auto">
            {examplePrompts.map((example, index) => (
              <button
                key={index}
                onClick={() => handleExampleClick(example)}
                disabled={isLoading}
                className="text-left p-4 bg-white/60 hover:bg-white/80 rounded-lg border border-fitness-primary/20 hover:border-fitness-primary/40 transition-all text-sm text-fitness-neutral-dark hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed"
              >
                "{example}"
              </button>
            ))}
          </div>
        </div>

        {/* Loading State Enhancement */}
        {isLoading && (
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
            <Card className="p-8 bg-white shadow-2xl max-w-md mx-4">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-fitness-primary-light rounded-full flex items-center justify-center">
                  <Loader2 className="w-8 h-8 text-fitness-primary animate-spin" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Creating Your Plan</h3>
                  <p className="text-fitness-neutral-dark text-sm mt-1">
                    Our AI is analyzing your requirements and crafting a personalized workout program...
                  </p>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};