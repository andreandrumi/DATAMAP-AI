export type ParticipantStatus = 'lulus' | 'tidak_lulus' | 'pembatalan' | 'tidak_lulus_administrasi' | 'pendaftar';

export type Gender = 'Laki-laki' | 'Perempuan' | 'Lainnya';

export interface ParticipantRecord {
  id: string;
  trainingId?: string;
  academyName: string;
  themeName: string;
  trainingName: string;
  // PII stripped as per PRD & UU PDP (Nama is excluded)
  gender: Gender;
  province: 'Jawa Timur' | 'Nusa Tenggara Barat';
  city: string; // Kabupaten / Kota
  district?: string; // Kecamatan
  subDistrict?: string; // Kelurahan
  registrationNumber: string; // Used for unique deduplication
  status: ParticipantStatus;
  hasInternationalCert: boolean;
  batchYear: number;
}

export interface IMDIRecord {
  province: string;
  city: string;
  score: number; // 0 - 100
  category: 'Sangat Tinggi' | 'Tinggi' | 'Sedang' | 'Rendah';
  pilarInfrastruktur: number;
  pilarKeterampilan: number;
  pilarPemberdayaan: number;
  pilarPekerjaan: number;
  catatanKebutuhan: string;
}

export interface AuditFinding {
  id: string;
  timestamp: string;
  category: 'kolom' | 'wilayah' | 'duplikasi' | 'privasi' | 'anomali';
  severity: 'info' | 'warning' | 'resolved';
  title: string;
  description: string;
  actionTaken: string;
}

export interface ReconciliationReport {
  totalFiles: number;
  totalRowsReceived: number;
  totalRowsValid: number;
  totalDuplicatesExcluded: number;
  totalAnomaliesFixed: number;
  totalPIIRedacted: number;
  reconciliationRate: number; // e.g. 100%
  columnMappingSummary: {
    columnName: string;
    detectedHeader: string;
    status: 'mapped' | 'optional_missing' | 'excluded_pdp';
    matchConfidence: number;
  }[];
  findings: AuditFinding[];
}

export interface RegionMetric {
  city: string;
  province: 'Jawa Timur' | 'Nusa Tenggara Barat';
  pendaftar: number;
  lulusan: number;
  pembatalan: number;
  tidakLulus: number;
  tingkatKelulusan: number; // 0 - 100%
  tingkatPembatalan: number; // 0 - 100%
  sertifikasiInternasional: number;
  rasioSertifikasi: number;
  genderRatio: {
    lakiLaki: number;
    perempuan: number;
  };
  topKecamatan: {
    name: string;
    pendaftar: number;
    lulusan: number;
    tingkatKelulusan: number;
  }[];
  topThemes: {
    name: string;
    pendaftar: number;
    lulusan: number;
  }[];
  topAcademies: {
    name: string;
    pendaftar: number;
    lulusan: number;
  }[];
  imdi?: IMDIRecord;
  priorityScore: number; // 0 - 100 (high need for training)
}

export interface ThemeRecommendation {
  themeName: string;
  academyName: string;
  suitabilityScore: number; // 0 - 100%
  urgency: 'Prioritas Utama' | 'Prioritas Menengah' | 'Pendukung';
  rationaleNumeric: string[];
  targetAudience: string;
  impactPrediction: string;
}

export interface FilterState {
  province: string; // 'All' | 'Jawa Timur' | 'Nusa Tenggara Barat'
  city: string; // 'All' | specific city
  academy: string; // 'All' | specific academy
  theme: string; // 'All' | specific theme
  status: string; // 'All' | specific status
  year: string; // 'All' | '2024' | '2025' | '2026'
  searchQuery: string;
}
