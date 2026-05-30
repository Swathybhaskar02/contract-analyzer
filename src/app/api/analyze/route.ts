import { NextRequest, NextResponse } from "next/server";
import { SYSTEM_PROMPT, ANALYSIS_PROMPT } from "@/lib/analysis-prompts";
import { baselineTemplates } from "@/lib/baseline-templates";
import type { AnalysisResult, RiskLevel } from "@/lib/types";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const templateId = formData.get("templateId") as string | null;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    let documentContent: string;
    
    if (file.type === "application/pdf") {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const pdfParse = require("pdf-parse");
      const pdfData = await pdfParse(buffer);
      documentContent = pdfData.text;
    } else if (file.type === "text/plain" || file.name.endsWith(".txt")) {
      documentContent = buffer.toString("utf-8");
    } else {
      return NextResponse.json(
        { error: "Unsupported file type. Please upload a PDF or TXT file." },
        { status: 400 }
      );
    }

    if (!documentContent || documentContent.trim().length === 0) {
      return NextResponse.json(
        { error: "Could not extract text from the document" },
        { status: 400 }
      );
    }

    const selectedTemplate = templateId 
      ? baselineTemplates.find(t => t.id === templateId)
      : baselineTemplates[0];

    const baselineTemplateText = selectedTemplate
      ? JSON.stringify(selectedTemplate, null, 2)
      : "No baseline template selected";

    const prompt = ANALYSIS_PROMPT
      .replace("{documentContent}", documentContent.substring(0, 30000))
      .replace("{baselineTemplate}", baselineTemplateText);

    let analysisResult: AnalysisResult;

    if (GEMINI_API_KEY) {
      const fullPrompt = `${SYSTEM_PROMPT}\n\n${prompt}`;
      
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: fullPrompt
                  }
                ]
              }
            ],
            generationConfig: {
              temperature: 0.1,
              maxOutputTokens: 8192,
              responseMimeType: "application/json"
            }
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Gemini API error:", errorText);
        throw new Error(`Gemini API error: ${response.statusText}`);
      }

      const data = await response.json();
      const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (!content) {
        throw new Error("No content in Gemini response");
      }

      const cleanedContent = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      const parsed = JSON.parse(cleanedContent);
      
      analysisResult = {
        id: generateId(),
        documentName: file.name,
        documentType: parsed.documentType || "Unknown",
        uploadedAt: new Date().toISOString(),
        analyzedAt: new Date().toISOString(),
        summary: parsed.summary || "",
        overallRisk: parsed.overallRisk || "medium",
        riskScore: parsed.riskScore || 50,
        keyFindings: parsed.keyFindings || {
          nonStandardClauses: [],
          liabilityRisks: [],
          obligations: [],
          terminationClauses: [],
          confidentialityTerms: [],
          indemnificationClauses: [],
        },
        deviations: parsed.deviations || [],
        parties: parsed.parties || [],
        keyDates: parsed.keyDates || [],
        financialTerms: parsed.financialTerms || [],
        recommendations: parsed.recommendations || [],
      };
    } else {
      analysisResult = generateMockAnalysis(file.name, documentContent);
    }

    return NextResponse.json(analysisResult);
  } catch (error) {
    console.error("Analysis error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to analyze document" },
      { status: 500 }
    );
  }
}

function generateId(): string {
  return `analysis-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

function generateMockAnalysis(fileName: string, content: string): AnalysisResult {
  const isNDA = content.toLowerCase().includes("confidential") || 
                content.toLowerCase().includes("non-disclosure") ||
                fileName.toLowerCase().includes("nda");
  
  const isService = content.toLowerCase().includes("service") ||
                    content.toLowerCase().includes("provider") ||
                    content.toLowerCase().includes("scope of work");

  const documentType = isNDA ? "Non-Disclosure Agreement" : 
                       isService ? "Service Agreement" : "General Contract";

  const riskLevels: RiskLevel[] = ["high", "medium", "low"];
  
  return {
    id: generateId(),
    documentName: fileName,
    documentType,
    uploadedAt: new Date().toISOString(),
    analyzedAt: new Date().toISOString(),
    summary: `This ${documentType} contains several clauses that require careful review. The document outlines standard terms but includes some non-standard provisions that may expose your organization to additional risk.`,
    overallRisk: "medium",
    riskScore: 65,
    
    keyFindings: {
      nonStandardClauses: [
        {
          title: "Unlimited Liability Provision",
          content: "The receiving party shall be liable for all damages, including consequential and indirect damages, arising from any breach of this agreement without limitation.",
          riskLevel: "high",
          section: "Section 8.2",
          pageNumber: 12
        },
        {
          title: "Broad Definition of Confidential Information",
          content: "Confidential Information shall include all information disclosed by either party, regardless of whether marked as confidential.",
          riskLevel: "medium",
          section: "Section 1.1",
          pageNumber: 2
        },
        {
          title: "Extended Survival Period",
          content: "The obligations of confidentiality shall survive for a period of ten (10) years following termination.",
          riskLevel: "medium",
          section: "Section 5.3",
          pageNumber: 8
        }
      ],
      liabilityRisks: [
        {
          title: "No Liability Cap",
          content: "Agreement does not include a cap on liability, exposing parties to unlimited damages.",
          riskLevel: "high",
          section: "Section 8",
          pageNumber: 12
        },
        {
          title: "Consequential Damages Not Excluded",
          content: "The agreement does not exclude consequential, incidental, or punitive damages.",
          riskLevel: "high",
          section: "Section 8.1",
          pageNumber: 11
        }
      ],
      obligations: [
        {
          title: "Data Security Requirements",
          content: "Receiving party must implement industry-standard security measures including encryption at rest and in transit.",
          riskLevel: "medium",
          section: "Section 4.2",
          pageNumber: 6
        },
        {
          title: "Audit Rights",
          content: "Disclosing party shall have the right to audit receiving party's compliance with reasonable notice.",
          riskLevel: "low",
          section: "Section 4.5",
          pageNumber: 7
        },
        {
          title: "Annual Compliance Certification",
          content: "Receiving party must provide annual certification of compliance with confidentiality obligations.",
          riskLevel: "medium",
          section: "Section 4.6",
          pageNumber: 7
        }
      ],
      terminationClauses: [
        {
          title: "Termination for Convenience",
          content: "Either party may terminate this agreement upon sixty (60) days written notice.",
          riskLevel: "low",
          section: "Section 6.1",
          pageNumber: 9
        },
        {
          title: "Immediate Termination for Breach",
          content: "Agreement may be terminated immediately upon material breach without cure period.",
          riskLevel: "high",
          section: "Section 6.2",
          pageNumber: 9
        }
      ],
      confidentialityTerms: [
        {
          title: "Residual Knowledge",
          content: "The agreement does not include a residual knowledge clause, which may limit the receiving party's ability to use general skills and knowledge gained.",
          riskLevel: "medium",
          section: "Section 3",
          pageNumber: 5
        }
      ],
      indemnificationClauses: [
        {
          title: "Broad Indemnification",
          content: "Receiving party agrees to indemnify disclosing party against all claims, damages, and expenses arising from any breach or alleged breach.",
          riskLevel: "high",
          section: "Section 9.1",
          pageNumber: 13
        }
      ]
    },
    
    deviations: [
      {
        description: "Liability clause does not include standard caps - typical agreements cap liability at 12 months of fees paid",
        severity: "high",
        recommendation: "Negotiate to include a liability cap equal to fees paid in the 12 months preceding the claim"
      },
      {
        description: "Confidentiality survival period of 10 years exceeds standard 2-3 year terms",
        severity: "medium",
        recommendation: "Request reduction to standard 2-3 year survival period, or 5 years for trade secrets"
      },
      {
        description: "Missing mutual indemnification - agreement only requires one-sided indemnification",
        severity: "high",
        recommendation: "Request mutual indemnification provisions to balance risk between parties"
      },
      {
        description: "No cure period for material breach before termination",
        severity: "medium",
        recommendation: "Add 30-day cure period for material breach before termination rights trigger"
      },
      {
        description: "Jurisdiction clause specifies unfamiliar venue",
        severity: "low",
        recommendation: "Consider negotiating for mutual jurisdiction or arbitration in neutral venue"
      }
    ],
    
    parties: [
      { name: "Acme Corporation", role: "Disclosing Party" },
      { name: "Your Company", role: "Receiving Party" }
    ],
    
    keyDates: [
      { description: "Agreement Effective Date", date: "Upon execution" },
      { description: "Initial Term", date: "2 years from Effective Date" },
      { description: "Confidentiality Survival", date: "10 years post-termination" },
      { description: "Termination Notice Period", date: "60 days" }
    ],
    
    financialTerms: [
      {
        description: "Liquidated Damages for Breach",
        amount: "$50,000 per occurrence",
        terms: "Payable within 30 days of breach determination"
      }
    ],
    
    recommendations: [
      "Negotiate a liability cap equal to 12 months of fees or contract value",
      "Request reduction of confidentiality survival period from 10 years to 3 years",
      "Add mutual indemnification provisions to balance risk",
      "Include a 30-day cure period before termination for breach",
      "Add a residual knowledge clause to protect general skills retention",
      "Review and negotiate the liquidated damages provision downward",
      "Consider adding a carve-out for information that becomes publicly available",
      "Request right to audit security measures of the other party"
    ]
  };
}
