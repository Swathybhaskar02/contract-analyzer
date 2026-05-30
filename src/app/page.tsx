"use client";

import React, { useState } from "react";
import { Scale, FileSearch, Shield, Zap, ArrowRight } from "lucide-react";
import { Header } from "@/components/Header";
import { FileUpload } from "@/components/FileUpload";
import { AnalysisResults } from "@/components/AnalysisResults";
import { AnalyzingState } from "@/components/AnalyzingState";
import { Button } from "@/components/ui/button";
import type { AnalysisResult } from "@/lib/types";

type AppState = "landing" | "upload" | "analyzing" | "results";

export default function Home() {
  const [appState, setAppState] = useState<AppState>("landing");
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const handleAnalysisComplete = (result: AnalysisResult) => {
    setAnalysisResult(result);
    setAppState("results");
  };

  const handleNewAnalysis = () => {
    setAnalysisResult(null);
    setAppState("upload");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {appState === "landing" && (
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 gradient-bg opacity-5" />
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
            
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-sm font-medium mb-6">
                  <Zap className="w-4 h-4" />
                  AI-Powered Legal Document Analysis
                </div>
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  Analyze Complex Contracts
                  <span 
                    className="block bg-clip-text text-transparent"
                    style={{ backgroundImage: "linear-gradient(135deg, #2563eb 0%, #7c3aed 50%, #06b6d4 100%)" }}
                  >
                    in Seconds, Not Hours
                  </span>
                </h1>
                
                <p className="text-lg text-[var(--muted-foreground)] mb-8 max-w-2xl mx-auto">
                  Quickly identify non-standard clauses, liability risks, and obligations 
                  in 50+ page legal documents. Automate your first-pass review and 
                  focus on what matters most.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg" 
                    className="text-lg"
                    onClick={() => setAppState("upload")}
                  >
                    Analyze a Contract
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="text-lg"
                  >
                    View Demo
                  </Button>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mt-20">
                <div className="text-center p-6">
                  <div className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-4">
                    <FileSearch className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Smart Extraction</h3>
                  <p className="text-[var(--muted-foreground)]">
                    Upload PDFs and our AI extracts and categorizes every clause, 
                    obligation, and term automatically.
                  </p>
                </div>
                
                <div className="text-center p-6">
                  <div className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-4">
                    <Scale className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Template Comparison</h3>
                  <p className="text-[var(--muted-foreground)]">
                    Compare against your baseline templates to instantly spot 
                    deviations and non-standard language.
                  </p>
                </div>
                
                <div className="text-center p-6">
                  <div className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Risk Assessment</h3>
                  <p className="text-[var(--muted-foreground)]">
                    Get a comprehensive risk score with actionable recommendations 
                    for your legal team.
                  </p>
                </div>
              </div>

              <div className="mt-20 p-8 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-lg">
                <div className="grid md:grid-cols-4 gap-8 text-center">
                  <div>
                    <p className="text-4xl font-bold text-[var(--primary)]">90%</p>
                    <p className="text-sm text-[var(--muted-foreground)]">Time Saved on First Review</p>
                  </div>
                  <div>
                    <p className="text-4xl font-bold text-[var(--primary)]">50+</p>
                    <p className="text-sm text-[var(--muted-foreground)]">Page Documents Supported</p>
                  </div>
                  <div>
                    <p className="text-4xl font-bold text-[var(--primary)]">100+</p>
                    <p className="text-sm text-[var(--muted-foreground)]">Clause Types Detected</p>
                  </div>
                  <div>
                    <p className="text-4xl font-bold text-[var(--primary)]">4</p>
                    <p className="text-sm text-[var(--muted-foreground)]">Baseline Templates</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {appState === "upload" && (
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <FileUpload 
              onAnalysisComplete={handleAnalysisComplete}
              onAnalysisStart={() => setAppState("analyzing")}
            />
          </div>
        )}

        {appState === "analyzing" && (
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <AnalyzingState />
          </div>
        )}

        {appState === "results" && analysisResult && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold">Analysis Results</h2>
                <p className="text-[var(--muted-foreground)]">
                  Analyzed on {new Date(analysisResult.analyzedAt).toLocaleDateString()}
                </p>
              </div>
              <Button onClick={handleNewAnalysis}>
                Analyze Another Contract
              </Button>
            </div>
            <AnalysisResults result={analysisResult} />
          </div>
        )}
      </main>

      <footer className="border-t border-[var(--border)] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Scale className="w-5 h-5 text-[var(--primary)]" />
              <span className="font-semibold">ContractIQ</span>
            </div>
            <p className="text-sm text-[var(--muted-foreground)]">
              AI-powered contract analysis for legal professionals
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
