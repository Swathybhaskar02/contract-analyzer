"use client";

import React, { useState, useEffect } from "react";
import { Shield, FileText, ChevronRight, Check, Plus, Trash2, X } from "lucide-react";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { baselineTemplates } from "@/lib/baseline-templates";
import type { BaselineTemplate, RiskLevel } from "@/lib/types";

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<BaselineTemplate[]>(baselineTemplates);
  const [selectedTemplate, setSelectedTemplate] = useState<BaselineTemplate>(baselineTemplates[0]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAddClause, setShowAddClause] = useState(false);
  
  const [newTemplate, setNewTemplate] = useState({
    name: "",
    description: "",
  });
  
  const [newClause, setNewClause] = useState({
    title: "",
    standardLanguage: "",
    importance: "medium" as RiskLevel,
  });

  useEffect(() => {
    const saved = localStorage.getItem("customTemplates");
    if (saved) {
      const customTemplates = JSON.parse(saved);
      setTemplates([...baselineTemplates, ...customTemplates]);
    }
  }, []);

  const saveCustomTemplates = (allTemplates: BaselineTemplate[]) => {
    const customOnly = allTemplates.filter(t => !baselineTemplates.find(bt => bt.id === t.id));
    localStorage.setItem("customTemplates", JSON.stringify(customOnly));
  };

  const handleAddTemplate = () => {
    if (!newTemplate.name.trim()) return;
    
    const template: BaselineTemplate = {
      id: `custom-${Date.now()}`,
      name: newTemplate.name,
      description: newTemplate.description || "Custom template",
      clauses: [],
    };
    
    const updated = [...templates, template];
    setTemplates(updated);
    saveCustomTemplates(updated);
    setSelectedTemplate(template);
    setNewTemplate({ name: "", description: "" });
    setShowAddModal(false);
  };

  const handleDeleteTemplate = (id: string) => {
    if (baselineTemplates.find(t => t.id === id)) {
      alert("Cannot delete built-in templates");
      return;
    }
    const updated = templates.filter(t => t.id !== id);
    setTemplates(updated);
    saveCustomTemplates(updated);
    setSelectedTemplate(updated[0]);
  };

  const handleAddClause = () => {
    if (!newClause.title.trim() || !newClause.standardLanguage.trim()) return;
    
    const updatedTemplate = {
      ...selectedTemplate,
      clauses: [...selectedTemplate.clauses, { ...newClause }],
    };
    
    const updated = templates.map(t => t.id === selectedTemplate.id ? updatedTemplate : t);
    setTemplates(updated);
    saveCustomTemplates(updated);
    setSelectedTemplate(updatedTemplate);
    setNewClause({ title: "", standardLanguage: "", importance: "medium" });
    setShowAddClause(false);
  };

  const handleDeleteClause = (index: number) => {
    const updatedTemplate = {
      ...selectedTemplate,
      clauses: selectedTemplate.clauses.filter((_, i) => i !== index),
    };
    
    const updated = templates.map(t => t.id === selectedTemplate.id ? updatedTemplate : t);
    setTemplates(updated);
    saveCustomTemplates(updated);
    setSelectedTemplate(updatedTemplate);
  };

  const isCustomTemplate = !baselineTemplates.find(t => t.id === selectedTemplate.id);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Baseline Templates</h1>
          <p className="text-[var(--muted-foreground)]">
            These are the standard contract templates we compare your documents against to identify deviations and risks.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-3">
            <Button 
              onClick={() => setShowAddModal(true)}
              className="w-full"
              variant="outline"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Custom Template
            </Button>
            
            {templates.map((template) => (
              <Card
                key={template.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedTemplate.id === template.id
                    ? "ring-2 ring-[var(--primary)] bg-[var(--primary)]/5"
                    : ""
                }`}
                onClick={() => setSelectedTemplate(template)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        selectedTemplate.id === template.id 
                          ? "bg-[var(--primary)] text-white" 
                          : "bg-[var(--muted)]"
                      }`}>
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{template.name}</h3>
                        <p className="text-xs text-[var(--muted-foreground)]">
                          {template.clauses.length} standard clauses
                          {!baselineTemplates.find(t => t.id === template.id) && (
                            <span className="ml-1 text-[var(--primary)]">• Custom</span>
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {!baselineTemplates.find(t => t.id === template.id) && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteTemplate(template.id);
                          }}
                          className="p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                      <ChevronRight className={`w-5 h-5 transition-transform ${
                        selectedTemplate.id === template.id ? "rotate-90" : ""
                      }`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-[var(--primary)] text-white">
                    <Shield className="w-6 h-6" />
                  </div>
                  <div>
                    <CardTitle>{selectedTemplate.name}</CardTitle>
                    <CardDescription>{selectedTemplate.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Standard Clauses</h3>
                  {isCustomTemplate && (
                    <Button size="sm" variant="outline" onClick={() => setShowAddClause(true)}>
                      <Plus className="w-4 h-4 mr-1" />
                      Add Clause
                    </Button>
                  )}
                </div>
                <div className="space-y-4">
                  {selectedTemplate.clauses.map((clause, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-lg border border-[var(--border)] hover:bg-[var(--muted)]/50 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <h4 className="font-medium">{clause.title}</h4>
                        </div>
                        <Badge variant={clause.importance}>
                          {clause.importance} importance
                        </Badge>
                      </div>
                      <div className="flex items-start justify-between">
                        <p className="text-sm text-[var(--muted-foreground)] ml-6 flex-1">
                          {clause.standardLanguage}
                        </p>
                        {isCustomTemplate && (
                          <button
                            onClick={() => handleDeleteClause(index)}
                            className="ml-2 p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {selectedTemplate.clauses.length === 0 && (
                    <div className="text-center py-8 text-[var(--muted-foreground)]">
                      <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>No clauses yet.</p>
                      {isCustomTemplate && (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="mt-3"
                          onClick={() => setShowAddClause(true)}
                        >
                          <Plus className="w-4 h-4 mr-1" />
                          Add First Clause
                        </Button>
                      )}
                    </div>
                  )}
                </div>

                <div className="mt-6 p-4 rounded-lg bg-[var(--muted)]">
                  <h4 className="font-medium mb-2">How This Template Is Used</h4>
                  <p className="text-sm text-[var(--muted-foreground)]">
                    When you upload a document and select this template, our AI compares your contract 
                    against these standard clauses. Any deviations, missing protections, or non-standard 
                    language will be flagged in the analysis results with appropriate risk levels.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Add Custom Template</CardTitle>
                  <button onClick={() => setShowAddModal(false)} className="p-1 hover:bg-[var(--muted)] rounded">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Template Name</label>
                  <input
                    type="text"
                    value={newTemplate.name}
                    onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
                    placeholder="e.g., Vendor Agreement"
                    className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--card)]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea
                    value={newTemplate.description}
                    onChange={(e) => setNewTemplate({ ...newTemplate, description: e.target.value })}
                    placeholder="Brief description of this template..."
                    rows={3}
                    className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--card)]"
                  />
                </div>
                <div className="flex gap-3 justify-end">
                  <Button variant="outline" onClick={() => setShowAddModal(false)}>Cancel</Button>
                  <Button onClick={handleAddTemplate}>Create Template</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {showAddClause && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Add Clause to {selectedTemplate.name}</CardTitle>
                  <button onClick={() => setShowAddClause(false)} className="p-1 hover:bg-[var(--muted)] rounded">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Clause Title</label>
                  <input
                    type="text"
                    value={newClause.title}
                    onChange={(e) => setNewClause({ ...newClause, title: e.target.value })}
                    placeholder="e.g., Limitation of Liability"
                    className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--card)]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Standard Language</label>
                  <textarea
                    value={newClause.standardLanguage}
                    onChange={(e) => setNewClause({ ...newClause, standardLanguage: e.target.value })}
                    placeholder="The standard clause text you expect to see in contracts..."
                    rows={4}
                    className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--card)]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Importance Level</label>
                  <select
                    value={newClause.importance}
                    onChange={(e) => setNewClause({ ...newClause, importance: e.target.value as RiskLevel })}
                    className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--card)]"
                  >
                    <option value="high">High - Critical clause</option>
                    <option value="medium">Medium - Important clause</option>
                    <option value="low">Low - Nice to have</option>
                  </select>
                </div>
                <div className="flex gap-3 justify-end">
                  <Button variant="outline" onClick={() => setShowAddClause(false)}>Cancel</Button>
                  <Button onClick={handleAddClause}>Add Clause</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
