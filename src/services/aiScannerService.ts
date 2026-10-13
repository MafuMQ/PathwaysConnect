export interface ScannedSubject {
  name: string;
  rawName?: string;
  mark: number;
  level?: number;
}

export interface ScanReportResponse {
  success: boolean;
  documentType?: string;
  termInfo?: string;
  latestTermNotice?: string;
  endorsement?: string | null;
  subjects: ScannedSubject[];
  notes?: string;
  error?: string;
  _meta?: {
    modelUsed: string;
  };
}

export async function scanReportDocument(
  base64OrDataUrl: string, 
  mimeType: string = 'image/jpeg'
): Promise<ScanReportResponse> {
  const cleanBase64 = base64OrDataUrl.includes(',')
    ? base64OrDataUrl.split(',')[1]
    : base64OrDataUrl;

  const response = await fetch('/api/ai/scan-report', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      image: cleanBase64,
      mimeType
    })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Failed to scan academic report.');
  }

  return data;
}
