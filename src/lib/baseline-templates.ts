import { BaselineTemplate } from "./types";

export const baselineTemplates: BaselineTemplate[] = [
  {
    id: "nda-standard",
    name: "Standard NDA",
    description: "Standard Non-Disclosure Agreement template for general business use",
    clauses: [
      {
        title: "Definition of Confidential Information",
        standardLanguage: "Confidential Information means any non-public information disclosed by either party to the other, either directly or indirectly, in writing, orally or by inspection of tangible objects.",
        importance: "high"
      },
      {
        title: "Non-Use and Non-Disclosure",
        standardLanguage: "The Receiving Party agrees not to use any Confidential Information for any purpose except to evaluate and engage in discussions concerning a potential business relationship between the parties.",
        importance: "high"
      },
      {
        title: "Term",
        standardLanguage: "This Agreement shall remain in effect for a period of two (2) years from the date of last disclosure of Confidential Information.",
        importance: "medium"
      },
      {
        title: "Return of Materials",
        standardLanguage: "Upon termination of this Agreement, or upon request by the Disclosing Party, the Receiving Party shall promptly return or destroy all Confidential Information.",
        importance: "medium"
      },
      {
        title: "No License",
        standardLanguage: "Nothing in this Agreement is intended to grant any rights to either party under any patent, copyright, trade secret or other intellectual property right.",
        importance: "low"
      }
    ]
  },
  {
    id: "service-agreement",
    name: "Service Agreement",
    description: "Standard Master Service Agreement template",
    clauses: [
      {
        title: "Scope of Services",
        standardLanguage: "Provider shall perform the services described in the applicable Statement of Work in accordance with the terms and conditions of this Agreement.",
        importance: "high"
      },
      {
        title: "Payment Terms",
        standardLanguage: "Client shall pay Provider the fees set forth in the applicable Statement of Work within thirty (30) days of receipt of invoice.",
        importance: "high"
      },
      {
        title: "Limitation of Liability",
        standardLanguage: "In no event shall either party be liable for any indirect, incidental, special, consequential or punitive damages. Total liability shall not exceed the fees paid in the twelve (12) months preceding the claim.",
        importance: "high"
      },
      {
        title: "Indemnification",
        standardLanguage: "Each party shall indemnify and hold harmless the other party from any claims arising from the indemnifying party's breach of this Agreement or negligent acts.",
        importance: "high"
      },
      {
        title: "Termination for Convenience",
        standardLanguage: "Either party may terminate this Agreement upon thirty (30) days written notice to the other party.",
        importance: "medium"
      },
      {
        title: "Intellectual Property",
        standardLanguage: "All intellectual property developed by Provider specifically for Client under this Agreement shall be owned by Client upon full payment.",
        importance: "high"
      }
    ]
  },
  {
    id: "employment-contract",
    name: "Employment Contract",
    description: "Standard Employment Agreement template",
    clauses: [
      {
        title: "At-Will Employment",
        standardLanguage: "Employment with the Company is at-will, meaning either party may terminate the employment relationship at any time, with or without cause or notice.",
        importance: "high"
      },
      {
        title: "Non-Compete",
        standardLanguage: "During employment and for twelve (12) months thereafter, Employee shall not engage in any business that competes with the Company within the same geographic area.",
        importance: "high"
      },
      {
        title: "Confidentiality",
        standardLanguage: "Employee agrees to maintain the confidentiality of all proprietary information during and after employment.",
        importance: "high"
      },
      {
        title: "Work Product Assignment",
        standardLanguage: "All inventions, discoveries, and works created by Employee during employment shall be the sole property of the Company.",
        importance: "medium"
      },
      {
        title: "Benefits",
        standardLanguage: "Employee shall be eligible for standard company benefits as described in the Employee Handbook.",
        importance: "low"
      }
    ]
  },
  {
    id: "software-license",
    name: "Software License Agreement",
    description: "Standard SaaS/Software License Agreement template",
    clauses: [
      {
        title: "License Grant",
        standardLanguage: "Licensor grants Licensee a non-exclusive, non-transferable license to use the Software during the Subscription Term.",
        importance: "high"
      },
      {
        title: "Restrictions",
        standardLanguage: "Licensee shall not: (a) sublicense, sell, or transfer the Software; (b) reverse engineer or decompile the Software; (c) use the Software for illegal purposes.",
        importance: "high"
      },
      {
        title: "Data Security",
        standardLanguage: "Licensor shall implement industry-standard security measures to protect Licensee data.",
        importance: "high"
      },
      {
        title: "Service Level Agreement",
        standardLanguage: "Licensor guarantees 99.9% uptime for the Software, excluding scheduled maintenance.",
        importance: "medium"
      },
      {
        title: "Warranty Disclaimer",
        standardLanguage: "THE SOFTWARE IS PROVIDED 'AS IS' WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED.",
        importance: "medium"
      },
      {
        title: "Auto-Renewal",
        standardLanguage: "This Agreement shall automatically renew for successive one-year periods unless either party provides written notice of non-renewal at least thirty (30) days prior to the end of the then-current term.",
        importance: "medium"
      }
    ]
  }
];
