"use client";

import React from "react";
import { Scale, FileSearch, Shield } from "lucide-react";

export function Header() {
  return (
    <header className="border-b border-[var(--border)] bg-[var(--card)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg gradient-bg">
              <Scale className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">ContractIQ</h1>
              <p className="text-xs text-[var(--muted-foreground)] hidden sm:block">
                AI-Powered Contract Analysis
              </p>
            </div>
          </div>
          
          <nav className="flex items-center gap-6">
            <a 
              href="#" 
              className="flex items-center gap-2 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
            >
              <FileSearch className="w-4 h-4" />
              <span className="hidden sm:inline">Analyze</span>
            </a>
            <a 
              href="#" 
              className="flex items-center gap-2 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
            >
              <Shield className="w-4 h-4" />
              <span className="hidden sm:inline">Templates</span>
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
