"use client";

import React from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  FileText,
  Shield,
  AlertCircle,
  Users,
  Calendar,
  DollarSign,
  Lightbulb,
  XCircle,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { AnalysisResult, Clause, RiskLevel } from "@/lib/types";

interface AnalysisResultsProps {
  result: AnalysisResult;
}

const RiskIcon = ({ level }: { level: RiskLevel }) => {
  switch (level) {
    case "high":
      return <XCircle className="w-5 h-5 text-red-500" />;
    case "medium":
      return <AlertTriangle className="w-5 h-5 text-amber-500" />;
    case "low":
      return <CheckCircle2 className="w-5 h-5 text-green-500" />;
  }
};

const RiskBadge = ({ level }: { level: RiskLevel }) => (
  <Badge variant={level} className="capitalize">
    {level} Risk
  </Badge>
);

const ClauseCard = ({ clause }: { clause: Clause }) => (
  <div className="p-4 rounded-lg border border-[var(--border)] bg-[var(--card)] hover:shadow-md transition-shadow">
    <div className="flex items-start justify-between gap-4 mb-2">
      <div className="flex items-center gap-2">
        <RiskIcon level={clause.riskLevel} />
        <h4 className="font-semibold">{clause.title}</h4>
      </div>
      <RiskBadge level={clause.riskLevel} />
    </div>
    <p className="text-sm text-[var(--muted-foreground)] mb-2 line-clamp-3">
      {clause.content}
    </p>
    <div className="flex items-center gap-4 text-xs text-[var(--muted-foreground)]">
      <span className="flex items-center gap-1">
        <FileText className="w-3 h-3" />
        {clause.section}
      </span>
      {clause.pageNumber && (
        <span>Page {clause.pageNumber}</span>
      )}
    </div>
  </div>
);

export function AnalysisResults({ result }: AnalysisResultsProps) {
  const riskColor = 
    result.overallRisk === "high" ? "bg-red-500" :
    result.overallRisk === "medium" ? "bg-amber-500" : "bg-green-500";

  const totalIssues = 
    result.keyFindings.nonStandardClauses.length +
    result.keyFindings.liabilityRisks.length +
    result.keyFindings.obligations.length +
    result.keyFindings.terminationClauses.length +
    result.keyFindings.confidentialityTerms.length +
    result.keyFindings.indemnificationClauses.length;

  const highRiskCount = [
    ...result.keyFindings.nonStandardClauses,
    ...result.keyFindings.liabilityRisks,
    ...result.keyFindings.obligations,
    ...result.keyFindings.terminationClauses,
    ...result.keyFindings.confidentialityTerms,
    ...result.keyFindings.indemnificationClauses,
  ].filter(c => c.riskLevel === "high").length;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col lg:flex-row gap-6">
        <Card className="flex-1">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  {result.documentName}
                </CardTitle>
                <CardDescription>{result.documentType}</CardDescription>
              </div>
              <RiskBadge level={result.overallRisk} />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-[var(--muted-foreground)]">{result.summary}</p>
          </CardContent>
        </Card>

        <Card className="lg:w-80">
          <CardHeader>
            <CardTitle className="text-lg">Risk Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-4xl font-bold">{result.riskScore}</span>
                <span className="text-sm text-[var(--muted-foreground)]">/ 100</span>
              </div>
              <Progress 
                value={result.riskScore} 
                indicatorClassName={riskColor}
              />
              <div className="grid grid-cols-3 gap-2 text-center text-sm">
                <div className="p-2 rounded-lg bg-[var(--muted)]">
                  <p className="font-semibold text-red-500">{highRiskCount}</p>
                  <p className="text-xs text-[var(--muted-foreground)]">High Risk</p>
                </div>
                <div className="p-2 rounded-lg bg-[var(--muted)]">
                  <p className="font-semibold">{totalIssues}</p>
                  <p className="text-xs text-[var(--muted-foreground)]">Total Issues</p>
                </div>
                <div className="p-2 rounded-lg bg-[var(--muted)]">
                  <p className="font-semibold">{result.deviations.length}</p>
                  <p className="text-xs text-[var(--muted-foreground)]">Deviations</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
              <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-[var(--muted-foreground)]">Parties</p>
              <p className="font-semibold">{result.parties.length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30">
              <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-[var(--muted-foreground)]">Key Dates</p>
              <p className="font-semibold">{result.keyDates.length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30">
              <DollarSign className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-[var(--muted-foreground)]">Financial Terms</p>
              <p className="font-semibold">{result.financialTerms.length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30">
              <Lightbulb className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <p className="text-sm text-[var(--muted-foreground)]">Recommendations</p>
              <p className="font-semibold">{result.recommendations.length}</p>
            </div>
          </div>
        </Card>
      </div>

      <Tabs defaultValue="findings" className="w-full">
        <TabsList className="w-full justify-start overflow-x-auto">
          <TabsTrigger value="findings">Key Findings</TabsTrigger>
          <TabsTrigger value="deviations">Deviations</TabsTrigger>
          <TabsTrigger value="details">Contract Details</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="findings">
          <div className="space-y-6">
            {result.keyFindings.nonStandardClauses.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-amber-500" />
                  Non-Standard Clauses
                </h3>
                <div className="grid gap-3 md:grid-cols-2">
                  {result.keyFindings.nonStandardClauses.map((clause, i) => (
                    <ClauseCard key={i} clause={clause} />
                  ))}
                </div>
              </div>
            )}

            {result.keyFindings.liabilityRisks.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-red-500" />
                  Liability Risks
                </h3>
                <div className="grid gap-3 md:grid-cols-2">
                  {result.keyFindings.liabilityRisks.map((clause, i) => (
                    <ClauseCard key={i} clause={clause} />
                  ))}
                </div>
              </div>
            )}

            {result.keyFindings.obligations.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-500" />
                  Obligations
                </h3>
                <div className="grid gap-3 md:grid-cols-2">
                  {result.keyFindings.obligations.map((clause, i) => (
                    <ClauseCard key={i} clause={clause} />
                  ))}
                </div>
              </div>
            )}

            {result.keyFindings.terminationClauses.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-purple-500" />
                  Termination Clauses
                </h3>
                <div className="grid gap-3 md:grid-cols-2">
                  {result.keyFindings.terminationClauses.map((clause, i) => (
                    <ClauseCard key={i} clause={clause} />
                  ))}
                </div>
              </div>
            )}

            {result.keyFindings.indemnificationClauses.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-orange-500" />
                  Indemnification Clauses
                </h3>
                <div className="grid gap-3 md:grid-cols-2">
                  {result.keyFindings.indemnificationClauses.map((clause, i) => (
                    <ClauseCard key={i} clause={clause} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="deviations">
          <Card>
            <CardHeader>
              <CardTitle>Deviations from Standard Template</CardTitle>
              <CardDescription>
                Clauses that differ from your company&apos;s baseline templates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {result.deviations.map((deviation, i) => (
                  <div 
                    key={i} 
                    className="p-4 rounded-lg border border-[var(--border)] hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex items-start gap-3">
                        <RiskIcon level={deviation.severity} />
                        <p className="font-medium">{deviation.description}</p>
                      </div>
                      <RiskBadge level={deviation.severity} />
                    </div>
                    <div className="ml-8 p-3 rounded bg-[var(--muted)] text-sm">
                      <span className="font-medium">Recommendation: </span>
                      {deviation.recommendation}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="details">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Parties
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {result.parties.map((party, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-[var(--muted)]">
                      <span className="font-medium">{party.name}</span>
                      <Badge variant="outline">{party.role}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Key Dates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {result.keyDates.map((date, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-[var(--muted)]">
                      <span className="text-sm">{date.description}</span>
                      <span className="font-medium">{date.date}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Financial Terms
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {result.financialTerms.map((term, i) => (
                    <div key={i} className="p-3 rounded-lg bg-[var(--muted)]">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium">{term.description}</span>
                        {term.amount && (
                          <span className="text-lg font-bold text-green-600 dark:text-green-400">
                            {term.amount}
                          </span>
                        )}
                      </div>
                      {term.terms && (
                        <p className="text-sm text-[var(--muted-foreground)]">{term.terms}</p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="recommendations">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-amber-500" />
                Recommendations
              </CardTitle>
              <CardDescription>
                Actionable items for your legal team to review
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {result.recommendations.map((rec, i) => (
                  <div 
                    key={i} 
                    className="flex items-start gap-3 p-4 rounded-lg border border-[var(--border)] hover:bg-[var(--muted)]/50 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5 text-[var(--primary)] mt-0.5 flex-shrink-0" />
                    <p>{rec}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
