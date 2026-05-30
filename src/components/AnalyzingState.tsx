"use client";

import React from "react";
import { FileSearch, Brain, Shield, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";

const steps = [
  { icon: FileSearch, label: "Extracting text from document", delay: 0 },
  { icon: Brain, label: "Analyzing clauses with AI", delay: 1 },
  { icon: Shield, label: "Comparing against baseline templates", delay: 2 },
  { icon: CheckCircle2, label: "Generating risk assessment", delay: 3 },
];

export function AnalyzingState() {
  const [activeStep, setActiveStep] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="p-12">
      <div className="flex flex-col items-center text-center">
        <div className="relative w-24 h-24 mb-8">
          <div className="absolute inset-0 rounded-full gradient-bg animate-pulse-slow" />
          <div className="absolute inset-2 rounded-full bg-[var(--card)] flex items-center justify-center">
            <Brain className="w-10 h-10 text-[var(--primary)]" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold mb-2">Analyzing Your Contract</h2>
        <p className="text-[var(--muted-foreground)] mb-8">
          Our AI is reviewing your document for risks and non-standard clauses
        </p>

        <div className="w-full max-w-md space-y-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === activeStep;
            const isComplete = index < activeStep;
            
            return (
              <div
                key={index}
                className={`flex items-center gap-4 p-4 rounded-lg transition-all duration-500 ${
                  isActive 
                    ? "bg-[var(--primary)]/10 border border-[var(--primary)]" 
                    : isComplete
                    ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
                    : "bg-[var(--muted)] border border-transparent"
                }`}
              >
                <div className={`p-2 rounded-full ${
                  isActive 
                    ? "bg-[var(--primary)] text-white" 
                    : isComplete
                    ? "bg-green-500 text-white"
                    : "bg-[var(--background)]"
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`text-sm ${
                  isActive ? "font-medium text-[var(--primary)]" : 
                  isComplete ? "text-green-600 dark:text-green-400" : 
                  "text-[var(--muted-foreground)]"
                }`}>
                  {step.label}
                </span>
                {isActive && (
                  <div className="ml-auto flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-[var(--primary)] animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 rounded-full bg-[var(--primary)] animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 rounded-full bg-[var(--primary)] animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                )}
                {isComplete && (
                  <CheckCircle2 className="ml-auto w-5 h-5 text-green-500" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
