export interface RequirementCheck {
  type: string;
  name: string;
  required?: string | number;
  achieved?: string | number;
  passed?: boolean;
  gap?: string | null;
  description?: string;
  isAdvisory?: boolean;
  groupName?: string;
  options?: Array<{
    subject: string;
    required: string;
    achieved: string;
    passed: boolean;
  }>;
}

export interface ProgrammeMatch {
  programme_id: number;
  programme_name: string;
  faculty?: string;
  department?: string;
  duration_years?: number;
  study_mode?: string;
  programme_description?: string;
  institution_name: string;
  province?: string;
  city?: string;
  institution_type?: string;
  institution_website?: string;
  qualification_type?: string;
  nqf_level?: number;
  min_aps?: number;
  status: 'QUALIFIED' | 'NEAR_MISS' | 'NOT_QUALIFIED';
  checks: RequirementCheck[];
  gaps: string[];
}

export interface NSCStatus {
  isValid: boolean;
  endorsement: 'BACHELOR' | 'DIPLOMA' | 'HIGHER_CERTIFICATE' | 'NSC_PASS' | 'INVALID_OR_INCOMPLETE' | 'NOT_ACHIEVED';
  endorsementLabel: string;
  hasHomeLanguage: boolean;
  homeLanguageName?: string;
  homeLanguageScore?: number;
  languageCount: number;
  hasMaths: boolean;
  hasLifeOrientation: boolean;
  subjectCount: number;
  nonLoAt50Count: number;
  nonLoAt40Count: number;
  validationIssues: string[];
}

export interface QualificationResponse {
  student_aps: number;
  nsc_status?: NSCStatus;
  total_programmes_evaluated: number;
  qualified_count: number;
  near_miss_count: number;
  results: ProgrammeMatch[];
}

export interface FilterOptions {
  institutions: string[];
  provinces: string[];
}

export async function fetchProgrammeFilters(): Promise<FilterOptions> {
  try {
    const res = await fetch('/api/programmes/filters');
    if (!res.ok) {
      throw new Error(`Filter fetch failed with HTTP ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.warn('Could not fetch filters from /api/programmes/filters:', error);
    return { institutions: [], provinces: [] };
  }
}

export async function checkQualifications(
  marks: Record<string, number>,
  filters?: {
    institution?: string;
    province?: string;
    search?: string;
  }
): Promise<QualificationResponse> {
  const res = await fetch('/api/programmes/qualify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ marks, filters }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Qualification evaluation failed: ${errText || res.statusText}`);
  }

  return await res.json();
}
