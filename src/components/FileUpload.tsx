"use client";

import React, { useCallback, useState } from "react";
import { Upload, FileText, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { baselineTemplates } from "@/lib/baseline-templates";
import { cn } from "@/lib/utils";
import type { AnalysisResult } from "@/lib/types";

interface FileUploadProps {
  onAnalysisComplete: (result: AnalysisResult) => void;
  onAnalysisStart: () => void;
}

export function FileUpload({ onAnalysisComplete, onAnalysisStart }: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState(baselineTemplates[0].id);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    setError(null);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      validateAndSetFile(droppedFile);
    }
  }, []);

  const validateAndSetFile = (file: File) => {
    const validTypes = ["application/pdf", "text/plain", "image/png", "image/jpeg", "image/jpg", "image/webp"];
    const validExtensions = [".pdf", ".txt", ".png", ".jpg", ".jpeg", ".webp"];
    
    const hasValidType = validTypes.includes(file.type);
    const hasValidExtension = validExtensions.some(ext => 
      file.name.toLowerCase().endsWith(ext)
    );
    
    if (!hasValidType && !hasValidExtension) {
      setError("Please upload a PDF, TXT, or image file (PNG, JPG)");
      return;
    }
    
    if (file.size > 50 * 1024 * 1024) {
      setError("File size must be less than 50MB");
      return;
    }
    
    setFile(file);
    setError(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      validateAndSetFile(selectedFile);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setError(null);
  };

  const handleAnalyze = async () => {
    if (!file) return;
    
    setIsAnalyzing(true);
    setError(null);
    onAnalysisStart();
    
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("templateId", selectedTemplate);
      
      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Analysis failed");
      }
      
      const result = await response.json();
      onAnalysisComplete(result);
    } catch (error) {
      console.error("Analysis error:", error);
      setError(error instanceof Error ? error.message : "Failed to analyze document");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const templateOptions = baselineTemplates.map(t => ({
    value: t.id,
    label: t.name,
  }));

  return (
    <Card className="p-8">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">Upload Contract</h2>
          <p className="text-[var(--muted-foreground)]">
            Upload a PDF or TXT file to analyze. We support contracts up to 50+ pages.
          </p>
        </div>

        <div
          className={cn(
            "relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-200 cursor-pointer",
            isDragging 
              ? "border-[var(--primary)] bg-[var(--primary)]/5" 
              : "border-[var(--border)] hover:border-[var(--primary)]/50 hover:bg-[var(--muted)]/50",
            file && "border-green-500 bg-green-50 dark:bg-green-900/10"
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => document.getElementById("file-input")?.click()}
        >
          <input
            id="file-input"
            type="file"
            accept=".pdf,.txt,.png,.jpg,.jpeg,.webp,application/pdf,text/plain,image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          
          {file ? (
            <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <FileText className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="font-semibold text-lg">{file.name}</p>
                <p className="text-sm text-[var(--muted-foreground)]">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveFile();
                }}
                className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <X className="w-4 h-4 mr-1" />
                Remove
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-full bg-[var(--muted)] flex items-center justify-center">
                <Upload className="w-8 h-8 text-[var(--muted-foreground)]" />
              </div>
              <div>
                <p className="font-semibold text-lg">
                  Drop your contract here or click to browse
                </p>
                <p className="text-sm text-[var(--muted-foreground)]">
                  Supports PDF, TXT, and images (with OCR) up to 50MB
                </p>
              </div>
            </div>
          )}
        </div>

        {error && (
          <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400">
            {error}
          </div>
        )}

        <div className="space-y-2">
          <label className="text-sm font-medium">Compare Against Template</label>
          <Select
            options={templateOptions}
            value={selectedTemplate}
            onChange={(e) => setSelectedTemplate(e.target.value)}
          />
          <p className="text-xs text-[var(--muted-foreground)]">
            Select a baseline template to compare your contract against standard terms
          </p>
        </div>

        <Button
          size="lg"
          className="w-full"
          disabled={!file || isAnalyzing}
          onClick={handleAnalyze}
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Analyzing Document...
            </>
          ) : (
            <>
              <FileText className="w-5 h-5" />
              Analyze Contract
            </>
          )}
        </Button>
      </div>
    </Card>
  );
}
