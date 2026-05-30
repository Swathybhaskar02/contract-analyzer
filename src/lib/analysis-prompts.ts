export const SYSTEM_PROMPT = `You are an expert legal analyst AI specializing in contract and NDA analysis. Your role is to:

1. Identify and extract key clauses from legal documents
2. Assess risk levels (high, medium, low) for each identified item
3. Compare clauses against standard templates to identify deviations
4. Provide actionable recommendations for legal review

You must be thorough, precise, and objective in your analysis. Always err on the side of caution when identifying potential risks.`;

export const ANALYSIS_PROMPT = `Analyze the following legal document and provide a comprehensive analysis in JSON format.

Document Content:
{documentContent}

Baseline Template for Comparison:
{baselineTemplate}

Provide your analysis in the following JSON structure:
{
  "documentType": "string - type of document (NDA, Service Agreement, Employment Contract, etc.)",
  "summary": "string - 2-3 sentence executive summary of the document",
  "overallRisk": "high | medium | low",
  "riskScore": "number 0-100",
  
  "keyFindings": {
    "nonStandardClauses": [
      {
        "title": "string",
        "content": "string - the actual clause text",
        "riskLevel": "high | medium | low",
        "section": "string - document section reference"
      }
    ],
    "liabilityRisks": [...],
    "obligations": [...],
    "terminationClauses": [...],
    "confidentialityTerms": [...],
    "indemnificationClauses": [...]
  },
  
  "deviations": [
    {
      "description": "string - what deviates from standard",
      "severity": "high | medium | low",
      "recommendation": "string - suggested action"
    }
  ],
  
  "parties": [
    {
      "name": "string",
      "role": "string - e.g., Disclosing Party, Receiving Party, Service Provider, Client"
    }
  ],
  
  "keyDates": [
    {
      "description": "string - what the date represents",
      "date": "string - the date or duration"
    }
  ],
  
  "financialTerms": [
    {
      "description": "string",
      "amount": "string - if applicable",
      "terms": "string - payment terms if applicable"
    }
  ],
  
  "recommendations": [
    "string - actionable recommendation for legal team"
  ]
}

Focus on:
1. Unusual or non-standard language that differs from typical contracts
2. Unlimited liability clauses or missing liability caps
3. One-sided indemnification provisions
4. Automatic renewal clauses with unfavorable terms
5. Broad IP assignment provisions
6. Restrictive non-compete or non-solicitation terms
7. Unusual termination conditions or penalties
8. Missing standard protections
9. Ambiguous language that could be interpreted unfavorably
10. Unusual jurisdiction or arbitration clauses

Return ONLY valid JSON, no additional text.`;

export const QUICK_ANALYSIS_PROMPT = `Quickly analyze this legal document and identify the top 5 most critical issues or risks.

Document Content:
{documentContent}

Return a JSON object with:
{
  "documentType": "string",
  "criticalIssues": [
    {
      "issue": "string - description of the issue",
      "riskLevel": "high | medium | low",
      "location": "string - where in document",
      "recommendation": "string - brief recommendation"
    }
  ],
  "overallRisk": "high | medium | low",
  "summary": "string - 1-2 sentence summary"
}

Return ONLY valid JSON.`;
