export type RiskLevel = "high" | "medium" | "low";

export interface Clause {
  title: string;
  content: string;
  riskLevel: RiskLevel;
  section: string;
  pageNumber?: number;
}

export interface AnalysisResult {
  id: string;
  documentName: string;
  documentType: string;
  uploadedAt: string;
  analyzedAt: string;
  summary: string;
  overallRisk: RiskLevel;
  riskScore: number;
  
  keyFindings: {
    nonStandardClauses: Clause[];
    liabilityRisks: Clause[];
    obligations: Clause[];
    terminationClauses: Clause[];
    confidentialityTerms: Clause[];
    indemnificationClauses: Clause[];
  };
  
  deviations: {
    description: string;
    severity: RiskLevel;
    recommendation: string;
  }[];
  
  parties: {
    name: string;
    role: string;
  }[];
  
  keyDates: {
    description: string;
    date: string;
  }[];
  
  financialTerms: {
    description: string;
    amount?: string;
    terms?: string;
  }[];
  
  recommendations: string[];
}

export interface BaselineTemplate {
  id: string;
  name: string;
  description: string;
  clauses: {
    title: string;
    standardLanguage: string;
    importance: RiskLevel;
  }[];
}
