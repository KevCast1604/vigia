export type ViewType = 'radar' | 'verifier' | 'report';

export type DistrictKey = string;

export interface DistrictStats {
  key: DistrictKey;
  name: string;
  ubigeo: string;
  officialComplaints: number;
  communityPatterns: number;
  sectorName: string;
  coordinates: [number, number]; // [lat, lng]
  riskLevel: 'very-high' | 'high' | 'medium' | 'moderate';
  yearlyTrend: {
    year: number;
    count: number;
  }[];
  crimesSummary?: Record<string, number>;
}

export interface VerificationResultData {
  identifier: string;
  maskedIdentifier: string;
  hmac: string;
  hasMatches: boolean;
  associatedReportsCount: number;
  frequentModality?: string;
  firstReportDaysAgo?: number;
  lastReportDaysAgo?: number;
  lastReportDistrict?: string;
}

export type IncidentCategory = 
  | 'extorsion'
  | 'gota_a_gota'
  | 'amenaza'
  | 'fraude';
