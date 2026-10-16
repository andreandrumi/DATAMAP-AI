import * as XLSX from 'xlsx';
import { ParticipantRecord, IMDIRecord, RegionMetric, ReconciliationReport, AuditFinding, ParticipantStatus } from '../types';
import { BENCHMARK_IMDI } from '../data/benchmarkData';

// Standard 13 Columns defined in PRD
export const STANDARD_COLUMNS = [
  { key: 'trainingId', name: 'ID Pelatihan', required: false, synonyms: ['id pelatihan', 'kode pelatihan', 'training_id', 'id_training'] },
  { key: 'academyName', name: 'Nama Akademi', required: false, synonyms: ['nama akademi', 'akademi', 'academy', 'skema', 'jenis akademi'] },
  { key: 'themeName', name: 'Nama Tema', required: true, synonyms: ['nama tema', 'tema', 'theme', 'topik', 'bidang pelatihan', 'keahlian'] },
  { key: 'trainingName', name: 'Nama Pelatihan', required: true, synonyms: ['nama pelatihan', 'pelatihan', 'course', 'nama kelas', 'judul pelatihan'] },
  { key: 'nama_pribadi', name: 'Nama', required: false, excludedForPrivacy: true, synonyms: ['nama', 'nama lengkap', 'nama peserta', 'participant_name', 'full_name'] },
  { key: 'gender', name: 'Jenis Kelamin', required: false, synonyms: ['jenis kelamin', 'gender', 'jk', 'sex'] },
  { key: 'province', name: 'Provinsi', required: true, synonyms: ['provinsi', 'propinsi', 'province'] },
  { key: 'city', name: 'Kota', required: true, synonyms: ['kota', 'kabupaten', 'kab/kota', 'kabupaten/kota', 'city', 'regency'] },
  { key: 'district', name: 'Kecamatan', required: false, synonyms: ['kecamatan', 'distrik', 'subdistrict'] },
  { key: 'subDistrict', name: 'Kelurahan', required: false, synonyms: ['kelurahan', 'desa', 'kel/desa', 'village'] },
  { key: 'registrationNumber', name: 'Nomor Registrasi', required: true, synonyms: ['nomor registrasi', 'no registrasi', 'no reg', 'reg number', 'registration_id', 'id registrasi', 'no_peserta'] },
  { 
    key: 'status', 
    name: 'Status Peserta', 
    required: true, 
    synonyms: [
      'status peserta', 
      'status', 
      'status kelulusan', 
      'status kelulusan pelatihan',
      'lulus pelatihan - nilai',
      'lulus pelatihan',
      'lulus nilai',
      'kelulusan', 
      'kelulusan pelatihan',
      'hasil', 
      'hasil pelatihan', 
      'hasil kelulusan',
      'keterangan lulus', 
      'keterangan kelulusan',
      'keterangan kelulusan pelatihan',
      'status akhir', 
      'status pelatihan',
      'evaluasi akhir', 
      'kondisi kelulusan',
      'keterangan',
      'keterangan hasil',
      'status nilai',
      'ket kelulusan',
      'ket lulus',
      'ket',
      'ket.',
      'yudisium',
      'predikat',
      'hasil evaluasi',
      'status belajar',
      'status kelas'
    ] 
  },
  { 
    key: 'hasInternationalCert', 
    name: 'Sertifikasi Internasional', 
    required: false, 
    synonyms: [
      'sertifikasi internasional', 
      'sertifikasi', 
      'sertifikat internasional', 
      'international cert', 
      'global cert', 
      'sertifikat global', 
      'sertifikat', 
      'status sertifikasi', 
      'sertifikasi bnsp', 
      'sertifikat bnsp', 
      'ujian sertifikasi', 
      'hasil sertifikasi', 
      'keterangan sertifikasi', 
      'certification', 
      'certified', 
      'certificate', 
      'no sertifikat', 
      'nomor sertifikat', 
      'no. sertifikat', 
      'nomor lisensi', 
      'lisensi', 
      'status sertifikat', 
      'sertifikasi kelulusan', 
      'hasil uji sertifikasi', 
      'status bnsp', 
      'status kompetensi',
      'sertifikat kelulusan'
    ] 
  },
];

// Standardize Province
export function normalizeProvince(val: string): 'Jawa Timur' | 'Nusa Tenggara Barat' {
  const clean = String(val || '').toLowerCase().trim();
  if (clean.includes('timur') || clean.includes('jatim') || clean.includes('east java')) {
    return 'Jawa Timur';
  }
  if (clean.includes('barat') || clean.includes('ntb') || clean.includes('nusa tenggara')) {
    return 'Nusa Tenggara Barat';
  }
  // Default fallback
  return 'Jawa Timur';
}

// Standardize City / Regency based on real BPS list
export function normalizeCity(val: string, provinceHint?: string): string {
  const clean = String(val || '').toLowerCase().trim().replace(/kabupaten|kab\.|kota\s+|regency/gi, '').trim();

  // NTB Cities
  if (clean.includes('mataram')) return 'Kota Mataram';
  if (clean.includes('lombok barat') || clean === 'lobar') return 'Kab. Lombok Barat';
  if (clean.includes('lombok tengah') || clean === 'loteng') return 'Kab. Lombok Tengah';
  if (clean.includes('lombok timur') || clean === 'lotim') return 'Kab. Lombok Timur';
  if (clean.includes('lombok utara') || clean === 'klu') return 'Kab. Lombok Utara';
  if (clean.includes('sumbawa barat') || clean === 'ksb') return 'Kab. Sumbawa Barat';
  if (clean.includes('sumbawa')) return 'Kab. Sumbawa';
  if (clean.includes('dompu')) return 'Kab. Dompu';
  if (clean.includes('kota bima')) return 'Kota Bima';
  if (clean.includes('bima')) return 'Kab. Bima';

  // East Java Cities
  if (clean.includes('surabaya')) return 'Kota Surabaya';
  if (clean.includes('sidoarjo')) return 'Kab. Sidoarjo';
  if (clean.includes('gresik')) return 'Kab. Gresik';
  if (clean.includes('batu')) return 'Kota Batu';
  if (clean.includes('kota malang')) return 'Kota Malang';
  if (clean.includes('malang')) return 'Kab. Malang';
  if (clean.includes('banyuwangi')) return 'Kab. Banyuwangi';
  if (clean.includes('jember')) return 'Kab. Jember';
  if (clean.includes('kota kediri')) return 'Kota Kediri';
  if (clean.includes('kediri')) return 'Kab. Kediri';
  if (clean.includes('kota blitar')) return 'Kota Blitar';
  if (clean.includes('blitar')) return 'Kab. Blitar';
  if (clean.includes('kota madiun')) return 'Kota Madiun';
  if (clean.includes('madiun')) return 'Kab. Madiun';
  if (clean.includes('kota mojokerto')) return 'Kota Mojokerto';
  if (clean.includes('mojokerto')) return 'Kab. Mojokerto';
  if (clean.includes('kota pasuruan')) return 'Kota Pasuruan';
  if (clean.includes('pasuruan')) return 'Kab. Pasuruan';
  if (clean.includes('kota probolinggo')) return 'Kota Probolinggo';
  if (clean.includes('probolinggo')) return 'Kab. Probolinggo';
  if (clean.includes('bojonegoro')) return 'Kab. Bojonegoro';
  if (clean.includes('tuban')) return 'Kab. Tuban';
  if (clean.includes('lamongan')) return 'Kab. Lamongan';
  if (clean.includes('jombang')) return 'Kab. Jombang';
  if (clean.includes('nganjuk')) return 'Kab. Nganjuk';
  if (clean.includes('tulungagung')) return 'Kab. Tulungagung';
  if (clean.includes('trenggalek')) return 'Kab. Trenggalek';
  if (clean.includes('ponorogo')) return 'Kab. Ponorogo';
  if (clean.includes('pacitan')) return 'Kab. Pacitan';
  if (clean.includes('magetan')) return 'Kab. Magetan';
  if (clean.includes('ngawi')) return 'Kab. Ngawi';
  if (clean.includes('lumajang')) return 'Kab. Lumajang';
  if (clean.includes('bondowoso')) return 'Kab. Bondowoso';
  if (clean.includes('situbondo')) return 'Kab. Situbondo';
  if (clean.includes('bangkalan')) return 'Kab. Bangkalan';
  if (clean.includes('sampang')) return 'Kab. Sampang';
  if (clean.includes('pamekasan')) return 'Kab. Pamekasan';
  if (clean.includes('sumenep')) return 'Kab. Sumenep';

  // Fallback with prefix
  if (provinceHint === 'Nusa Tenggara Barat') {
    return `Kab. ${val.charAt(0).toUpperCase() + val.slice(1)}`;
  }
  return `Kab. ${val.charAt(0).toUpperCase() + val.slice(1)}`;
}

// Standardize Status to ParticipantStatus
export function normalizeStatus(val: string): ParticipantStatus {
  // Normalize punctuation, hyphens (including unicode dashes), whitespace, and casing
  const clean = String(val || '')
    .toLowerCase()
    .replace(/[\u2010-\u2015\u2212]/g, '-')
    .replace(/\s+/g, ' ')
    .trim();

  if (!clean) return 'pendaftar';

  // 1. Explicit cancellation / withdrawal
  if (
    clean.includes('batal') || 
    clean.includes('cancel') || 
    clean.includes('mundur') || 
    clean.includes('withdraw')
  ) {
    return 'pembatalan';
  }

  // 2. Administrative failures
  if (clean.includes('administrasi') || clean.includes('adm')) {
    if (
      clean.includes('tidak') || 
      clean.includes('tdk') || 
      clean.includes('gagal') || 
      clean.includes('tms') || 
      clean.includes('gugur') || 
      clean.includes('tolak')
    ) {
      return 'tidak_lulus_administrasi';
    }
  }

  // 3. Explicit negative indicators (failures)
  // E.g.: "tidak lulus pelatihan - nilai", "tidak lulus", "belum lulus", "tms", "gagal", "drop"
  const isFailed = 
    clean.includes('tidak') || 
    clean.includes('tdk') || 
    clean.includes('belum') || 
    clean.includes('blm') || 
    clean.includes('gagal') || 
    clean.includes('drop') || 
    clean.includes('fail') || 
    clean.includes('gugur') || 
    clean.includes('tms') || // Tidak Memenuhi Syarat
    clean.includes('diskualifikasi') ||
    clean.includes('tolak');

  if (isFailed) {
    return 'tidak_lulus';
  }

  // 4. Positive indicators for graduation:
  // Recognizes:
  // - "lulus pelatihan - nilai" (Official DTS / Kominfo graduation status based on passing score)
  // - "lulus pelatihan-nilai", "lulus pelatihan : nilai", "lulus pelatihan (nilai)", "lulus pelatihan / nilai"
  // - "lulus pelatihan - kehadiran", "lulus pelatihan - portofolio", "lulus pelatihan - proyek"
  // - "lulus pelatihan", "lulus nilai", "lulus - nilai"
  // - "lulue pelatihan - nilai", "lulue pelatihan", "lulue nilai", "lulue", "lulua", "llus", "luls" (typos in Excel)
  // - "lulus uji kompetensi", "lulus evaluasi", "lulus substansi", "lulus administrasi dan substansi", "lulus bersyarat", "lulusan", "lulus"
  // - "kompeten", "kompeten (k)", "tuntas", "selesai", "berhasil", "lolos", "memenuhi syarat", "ms"
  // - "passed", "graduated", "completed", "complete", "terverifikasi lulus"
  const isLulus = 
    clean.includes('lulus pelatihan - nilai') ||
    clean.includes('lulus pelatihan-nilai') ||
    clean.includes('lulus pelatihan : nilai') ||
    clean.includes('lulus pelatihan: nilai') ||
    clean.includes('lulus pelatihan (nilai)') ||
    clean.includes('lulus pelatihan / nilai') ||
    clean.includes('lulus pelatihan/nilai') ||
    clean.includes('lulus pelatihan') ||
    clean.includes('lulus nilai') ||
    clean.includes('lulus - nilai') ||
    clean.includes('lulue pelatihan - nilai') ||
    clean.includes('lulue pelatihan') ||
    clean.includes('lulue nilai') ||
    clean.includes('lulus') ||
    clean.includes('lulue') ||
    clean.includes('lulua') ||
    clean.includes('llus') ||
    clean.includes('luls') ||
    clean.includes('kompeten') ||
    clean.includes('tuntas') ||
    clean.includes('selesai') ||
    clean.includes('berhasil') ||
    clean.includes('passed') ||
    clean.includes('graduated') ||
    clean.includes('completed') ||
    clean.includes('complete') ||
    clean.includes('memenuhi syarat') ||
    clean === 'ms' ||
    clean === 'l' ||
    clean.includes('lolos');

  if (isLulus) {
    return 'lulus';
  }

  return 'pendaftar';
}

// Evaluate whether a participant holds a certification from cell value, status, or entire row context
export function isParticipantCertified(
  certVal: any, 
  statusVal?: string,
  entireRow?: Record<string, any>
): boolean {
  const clean = String(certVal ?? '').toLowerCase().trim();
  const cleanStatus = String(statusVal ?? '').toLowerCase().trim();

  // 1. Check if status column itself explicitly states certification
  if (
    cleanStatus.includes('sertifikasi') ||
    cleanStatus.includes('bersertifikat') ||
    cleanStatus.includes('sertifikat') ||
    cleanStatus.includes('certified')
  ) {
    if (
      !cleanStatus.includes('tidak') &&
      !cleanStatus.includes('tdk') &&
      !cleanStatus.includes('belum') &&
      !cleanStatus.includes('gagal')
    ) {
      return true;
    }
  }

  // 2. Check explicit positives in cert column
  if (clean && clean !== '-' && clean !== 'none' && clean !== 'null' && clean !== 'n/a') {
    const isNegative =
      clean === 'tidak' ||
      clean === 'tdk' ||
      clean === 'no' ||
      clean === 'n' ||
      clean === 'false' ||
      clean === '0' ||
      clean === 'belum' ||
      clean === 'blm' ||
      clean.includes('tidak ada') ||
      clean.includes('tidak lulus') ||
      clean.includes('gagal') ||
      clean.includes('belum sertifikasi') ||
      clean.includes('batal');

    if (!isNegative) {
      const isPositive =
        clean === 'ya' ||
        clean === 'yes' ||
        clean === 'y' ||
        clean === 'true' ||
        clean === '1' ||
        clean === 'v' ||
        clean === 'ada' ||
        clean === 'sudah' ||
        clean === 'punya' ||
        clean === 'dapat' ||
        clean.includes('sertifikasi') ||
        clean.includes('sertifikat') ||
        clean.includes('certified') ||
        clean.includes('kompeten') ||
        clean.includes('bnsp') ||
        clean.includes('global') ||
        clean.includes('internasional') ||
        clean.includes('oracle') ||
        clean.includes('cisco') ||
        clean.includes('google') ||
        clean.includes('aws') ||
        clean.includes('microsoft') ||
        clean.includes('redhat') ||
        clean.includes('huawei') ||
        clean.includes('comptia') ||
        clean.includes('lulus') ||
        clean.includes('terbit') ||
        clean.includes('passed');

      if (isPositive) {
        return true;
      }

      if (clean.length >= 3 && (/\d/.test(clean) || clean.includes('/') || clean.includes('-') || clean.includes('_'))) {
        return true;
      }
    }
  }

  // 3. Check if any other cell in entireRow indicates certification
  if (entireRow) {
    for (const [colName, val] of Object.entries(entireRow)) {
      if (!val) continue;
      const cellText = String(val).toLowerCase().trim();
      const colLow = colName.toLowerCase().trim();

      if (colLow.includes('sertif') || colLow.includes('cert') || colLow.includes('bnsp') || colLow.includes('lisensi')) {
        if (
          cellText === 'ya' || cellText === '1' || cellText === 'true' || cellText === 'v' ||
          cellText.includes('sertif') || cellText.includes('certified') || cellText.includes('kompeten') ||
          (cellText.length >= 3 && /\d/.test(cellText))
        ) {
          if (!cellText.includes('tidak') && !cellText.includes('belum') && !cellText.includes('gagal')) {
            return true;
          }
        }
      }
    }
  }

  return false;
}

// Find closest column match
export function mapHeaders(headers: string[]) {
  const mapping: Record<string, string> = {};
  const confidenceMap: Record<string, number> = {};

  for (const std of STANDARD_COLUMNS) {
    let bestMatch = '';
    let highestScore = 0;

    for (const h of headers) {
      const hClean = h.toLowerCase().trim().replace(/[_\-\.]/g, ' ');
      for (const syn of std.synonyms) {
        if (hClean === syn) {
          bestMatch = h;
          highestScore = 1.0;
          break;
        } else if (hClean.includes(syn) || syn.includes(hClean)) {
          if (0.8 > highestScore) {
            bestMatch = h;
            highestScore = 0.85;
          }
        }
      }
      if (highestScore === 1.0) break;
    }

    if (bestMatch) {
      mapping[std.key] = bestMatch;
      confidenceMap[std.key] = highestScore;
    }
  }

  return { mapping, confidenceMap };
}

// Parse file (Buffer or ArrayBuffer) from Excel or CSV
export async function parseParticipantFile(
  file: File
): Promise<{
  records: ParticipantRecord[];
  totalRowsReceived: number;
  duplicatesRemoved: number;
  anomaliesFixed: number;
  piiRedacted: number;
  findings: AuditFinding[];
}> {
  const data = await file.arrayBuffer();
  const workbook = XLSX.read(data, { type: 'array' });
  const firstSheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[firstSheetName];

  if (!worksheet) {
    return {
      records: [],
      totalRowsReceived: 0,
      duplicatesRemoved: 0,
      anomaliesFixed: 0,
      piiRedacted: 0,
      findings: [
        {
          id: `FND-${Date.now()}`,
          timestamp: new Date().toLocaleTimeString(),
          category: 'anomali',
          severity: 'warning',
          title: `File Kosong: ${file.name}`,
          description: 'Sheet pertama tidak memiliki konten valid.',
          actionTaken: 'File dilewati.'
        }
      ]
    };
  }

  // 1. Read sheet as 2D array to accurately detect the true header row
  // (Prevents failures when government/Kominfo files have title rows on lines 1-3)
  const rawAoa = XLSX.utils.sheet_to_json<any[]>(worksheet, { header: 1, defval: '' });
  if (!rawAoa || rawAoa.length === 0) {
    return {
      records: [],
      totalRowsReceived: 0,
      duplicatesRemoved: 0,
      anomaliesFixed: 0,
      piiRedacted: 0,
      findings: [
        {
          id: `FND-${Date.now()}`,
          timestamp: new Date().toLocaleTimeString(),
          category: 'anomali',
          severity: 'warning',
          title: `File Kosong: ${file.name}`,
          description: 'Sheet pertama tidak memiliki baris data untuk diproses.',
          actionTaken: 'File dilewati.'
        }
      ]
    };
  }

  // Scan top 15 rows to find the row that has the highest number of recognized column keywords
  let headerRowIndex = 0;
  let maxHeaderScore = 0;
  const headerKeywords = [
    'registrasi', 'reg', 'no_peserta', 'peserta', 'nama', 'provinsi', 'kota', 'kabupaten',
    'kecamatan', 'pelatihan', 'tema', 'akademi', 'status', 'kelulusan', 'lulus',
    'lulus pelatihan - nilai', 'sertifikat', 'gender', 'jenis kelamin', 'keterangan'
  ];

  for (let r = 0; r < Math.min(15, rawAoa.length); r++) {
    const row = rawAoa[r];
    if (!Array.isArray(row)) continue;
    let score = 0;
    for (const cell of row) {
      const cellText = String(cell || '').toLowerCase().trim();
      if (!cellText) continue;
      for (const kw of headerKeywords) {
        if (cellText === kw || cellText.includes(kw)) {
          score++;
          break;
        }
      }
    }
    if (score > maxHeaderScore) {
      maxHeaderScore = score;
      headerRowIndex = r;
    }
  }

  // Extract headers
  const headerRow = rawAoa[headerRowIndex] as any[];
  const headers: string[] = (headerRow || []).map((h, i) => {
    const str = String(h || '').trim();
    return str || `Kolom_${i + 1}`;
  });

  // Build rawRows from rows after headerRowIndex
  const rawRows: Record<string, any>[] = [];
  for (let r = headerRowIndex + 1; r < rawAoa.length; r++) {
    const row = rawAoa[r];
    if (!Array.isArray(row)) continue;
    const hasData = row.some(cell => String(cell || '').trim() !== '');
    if (!hasData) continue;

    const rowObj: Record<string, any> = {};
    headers.forEach((h, colIdx) => {
      rowObj[h] = row[colIdx] ?? '';
    });
    rawRows.push(rowObj);
  }

  const totalRowsReceived = rawRows.length;
  if (totalRowsReceived === 0) {
    return {
      records: [],
      totalRowsReceived: 0,
      duplicatesRemoved: 0,
      anomaliesFixed: 0,
      piiRedacted: 0,
      findings: [
        {
          id: `FND-${Date.now()}`,
          timestamp: new Date().toLocaleTimeString(),
          category: 'anomali',
          severity: 'warning',
          title: `Tidak Ada Data: ${file.name}`,
          description: 'Header terdeteksi tetapi tidak ada baris peserta di bawahnya.',
          actionTaken: 'File dilewati.'
        }
      ]
    };
  }

  const { mapping } = mapHeaders(headers);

  // 2. Smart Content-Based Detection for the true Status column
  // (Crucial when files have multiple status-like columns or uninformative headers like "Keterangan")
  let bestStatusCol = mapping['status'] || '';
  let bestStatusScore = -1;

  for (const h of headers) {
    let score = 0;
    const hClean = h.toLowerCase().replace(/[\u2010-\u2015\u2212]/g, '-').trim();
    if (hClean.includes('lulus pelatihan - nilai') || hClean.includes('lulus pelatihan-nilai')) score += 60;
    else if (hClean.includes('status kelulusan pelatihan') || hClean.includes('status kelulusan')) score += 40;
    else if (hClean.includes('keterangan kelulusan') || hClean.includes('keterangan lulus')) score += 35;
    else if (hClean.includes('status akhir') || hClean.includes('status pelatihan')) score += 30;
    else if (hClean.includes('status peserta') || hClean === 'status') score += 20;
    else if (hClean.includes('kelulusan')) score += 20;
    else if (hClean.includes('keterangan') || hClean.includes('hasil')) score += 15;

    // Scan actual cell values in this column for graduation keywords
    const sampleLimit = Math.min(rawRows.length, 100);
    for (let sIdx = 0; sIdx < sampleLimit; sIdx++) {
      const cell = String(rawRows[sIdx][h] ?? '').toLowerCase().replace(/[\u2010-\u2015\u2212]/g, '-').trim();
      if (!cell) continue;
      if (cell.includes('lulus pelatihan - nilai') || cell.includes('lulus pelatihan-nilai')) {
        score += 80; // High confidence match for official status
      } else if (cell.includes('lulus pelatihan') || cell.includes('lulus nilai')) {
        score += 50;
      } else if (cell.includes('tidak lulus pelatihan - nilai')) {
        score += 60;
      } else if (cell.includes('tidak lulus') || cell.includes('belum lulus')) {
        score += 30;
      } else if (cell.includes('lulus') || cell.includes('lulue')) {
        score += 25;
      } else if (cell.includes('kompeten') || cell.includes('tuntas')) {
        score += 20;
      } else if (cell.includes('pembatalan')) {
        score += 15;
      }
    }

    if (score > bestStatusScore && score > 0) {
      bestStatusScore = score;
      bestStatusCol = h;
    }
  }

  const statusKey = bestStatusCol || mapping['status'] || headers.find(h => {
    const hl = h.toLowerCase().trim();
    return hl.includes('status') || hl.includes('lulus') || hl.includes('hasil') || hl.includes('kelulusan') || hl.includes('keterangan');
  });

  const certKey = mapping['hasInternationalCert'] || headers.find(h => {
    const hl = h.toLowerCase().trim();
    return hl.includes('sertif') || hl.includes('cert') || hl.includes('bnsp') || hl.includes('lisensi') || hl.includes('kompetensi');
  });

  let duplicatesRemoved = 0;
  let anomaliesFixed = 0;
  let piiRedacted = 0;
  const findings: AuditFinding[] = [];

  // Check PII redaction
  if (mapping['nama_pribadi']) {
    piiRedacted = totalRowsReceived;
    findings.push({
      id: `FND-PDP-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString(),
      category: 'privasi',
      severity: 'resolved',
      title: `Kepatuhan UU PDP No. 27/2022 (${file.name})`,
      description: `Kolom '${mapping['nama_pribadi']}' berisi data pribadi nama lengkap terdeteksi pada ${totalRowsReceived} baris.`,
      actionTaken: 'Kolom nama telah dibuang secara permanen sebelum data disimpan ke state agregat.'
    });
  }

  // Deduplication map by registrationNumber
  const uniqueMap = new Map<string, ParticipantRecord>();
  let rowIndex = 0;
  let recognizedGraduates = 0;
  let recognizedLulusNilaiCount = 0;
  let recognizedCertified = 0;
  const variedStatusSet = new Set<string>();

  for (const row of rawRows) {
    rowIndex++;
    const rawProv = row[mapping['province']] || 'Jawa Timur';
    const rawCity = row[mapping['city']] || 'Kota Surabaya';
    const normProv = normalizeProvince(rawProv);
    const normCity = normalizeCity(rawCity, normProv);

    if (rawCity !== normCity) {
      anomaliesFixed++;
    }

    const regNo = String(
      row[mapping['registrationNumber']] || `REG-AUTO-${normCity.slice(0, 3)}-${100000 + rowIndex}`
    ).trim();

    // 1. Primary status extraction from statusKey
    let rawStatus = statusKey ? row[statusKey] : '';
    if (!rawStatus) {
      for (const k of headers) {
        const kl = k.toLowerCase();
        if (kl.includes('status') || kl.includes('lulus') || kl.includes('hasil') || kl.includes('keterangan')) {
          rawStatus = row[k];
          if (rawStatus) break;
        }
      }
    }

    let status = normalizeStatus(rawStatus);

    // 2. Comprehensive Row-Level Deep Scan:
    // If status is not yet 'lulus', inspect all cells of this row to catch "Lulus Pelatihan - Nilai"
    if (status !== 'lulus') {
      for (const [colNameRaw, cellValRaw] of Object.entries(row)) {
        if (!cellValRaw) continue;
        const cellText = String(cellValRaw)
          .toLowerCase()
          .replace(/[\u2010-\u2015\u2212]/g, '-')
          .replace(/\s+/g, ' ')
          .trim();
        if (!cellText) continue;

        const colName = colNameRaw.toLowerCase().replace(/[\u2010-\u2015\u2212]/g, '-').trim();

        // Check if column header itself is "Lulus Pelatihan - Nilai" or similar
        if (
          colName.includes('lulus pelatihan - nilai') ||
          colName.includes('lulus pelatihan-nilai') ||
          colName.includes('lulus pelatihan') ||
          colName.includes('lulus nilai')
        ) {
          if (
            cellText === 'ya' || cellText === 'y' || cellText === '1' || cellText === 'v' ||
            cellText === 'true' || cellText.includes('lulus') || cellText === 'yes' || cellText === 'ok'
          ) {
            status = 'lulus';
            rawStatus = 'Lulus Pelatihan - Nilai';
            break;
          }
        }

        // Check if cell value contains "Lulus Pelatihan - Nilai" or variants
        if (
          cellText.includes('lulus pelatihan - nilai') ||
          cellText.includes('lulus pelatihan-nilai') ||
          cellText.includes('lulus pelatihan : nilai') ||
          cellText.includes('lulus pelatihan: nilai') ||
          cellText.includes('lulus pelatihan (nilai)') ||
          cellText.includes('lulus pelatihan / nilai') ||
          cellText.includes('lulus pelatihan') ||
          cellText.includes('lulus nilai') ||
          cellText.includes('lulus - nilai') ||
          cellText.includes('lulue pelatihan') ||
          cellText.includes('lulue nilai') ||
          cellText.includes('lulus') ||
          cellText.includes('lulue')
        ) {
          const evaluated = normalizeStatus(cellText);
          if (evaluated === 'lulus') {
            status = 'lulus';
            rawStatus = String(cellValRaw);
            break;
          }
        }
      }
    }

    // Tally graduate and specific "Lulus Pelatihan - Nilai" recognition
    if (status === 'lulus') {
      recognizedGraduates++;
      const sTrim = String(rawStatus || '').trim();
      const sLower = sTrim.toLowerCase().replace(/[\u2010-\u2015\u2212]/g, '-');
      if (sLower.includes('lulus pelatihan - nilai') || sLower.includes('lulus pelatihan-nilai')) {
        recognizedLulusNilaiCount++;
      }
      if (sTrim && sTrim.toLowerCase() !== 'lulus') {
        variedStatusSet.add(sTrim);
      }
    }

    // 3. Extract certification with fallback across row keys and full row context
    let rawCert = certKey ? row[certKey] : '';
    if (!rawCert) {
      for (const k of headers) {
        const kl = k.toLowerCase();
        if (kl.includes('sertif') || kl.includes('cert') || kl.includes('bnsp') || kl.includes('lisensi')) {
          rawCert = row[k];
          if (rawCert) break;
        }
      }
    }
    const hasCert = isParticipantCertified(rawCert, rawStatus, row);
    if (hasCert) {
      recognizedCertified++;
    }

    const record: ParticipantRecord = {
      id: `${normCity}-${Date.now()}-${rowIndex}`,
      trainingId: row[mapping['trainingId']] || `TRN-${Date.now().toString().slice(-4)}`,
      academyName: String(row[mapping['academyName']] || 'Digital Academy').trim(),
      themeName: String(row[mapping['themeName']] || 'Digital Competency').trim(),
      trainingName: String(row[mapping['trainingName']] || 'Pelatihan Kompetensi').trim(),
      gender: String(row[mapping['gender']] || '').toLowerCase().includes('perempuan') ? 'Perempuan' : 'Laki-laki',
      province: normProv,
      city: normCity,
      district: row[mapping['district']] ? String(row[mapping['district']]).trim() : undefined,
      subDistrict: row[mapping['subDistrict']] ? String(row[mapping['subDistrict']]).trim() : undefined,
      registrationNumber: regNo,
      status,
      hasInternationalCert: hasCert,
      batchYear: 2025
    };

    if (uniqueMap.has(regNo)) {
      duplicatesRemoved++;
      // Priority rule: Keep 'lulus' over 'pembatalan'/'tidak_lulus'
      const existing = uniqueMap.get(regNo)!;
      if (existing.status !== 'lulus' && record.status === 'lulus') {
        uniqueMap.set(regNo, record);
      }
    } else {
      uniqueMap.set(regNo, record);
    }
  }

  if (duplicatesRemoved > 0) {
    findings.push({
      id: `FND-DUP-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString(),
      category: 'duplikasi',
      severity: 'resolved',
      title: `Eliminasi Pendaftaran Duplikat (${file.name})`,
      description: `Ditemukan ${duplicatesRemoved} baris dengan Nomor Registrasi kembar.`,
      actionTaken: 'Data duplikat telah difilter dan digabungkan berdasarkan record berstatus tertinggi.'
    });
  }

  // Record audit finding specifically highlighting "Lulus Pelatihan - Nilai" recognition
  findings.push({
    id: `FND-LULUS-${Date.now()}`,
    timestamp: new Date().toLocaleTimeString(),
    category: 'anomali',
    severity: 'resolved',
    title: `Pengenalan Status "Lulus Pelatihan - Nilai" & Kelulusan (${file.name})`,
    description: `Agen berhasil mengenali ${recognizedGraduates} peserta lulus dari total ${totalRowsReceived} baris.${
      recognizedLulusNilaiCount > 0 
        ? ` Termasuk ${recognizedLulusNilaiCount} baris data dengan status spesifik "Lulus Pelatihan - Nilai".` 
        : ''
    }${
      variedStatusSet.size > 0 
        ? ` Variasi terdeteksi: ${Array.from(variedStatusSet).slice(0, 4).map(s => `"${s}"`).join(', ')}.`
        : ''
    }`,
    actionTaken: 'Seluruh baris dengan status "Lulus Pelatihan - Nilai", lulus nilai, lulue pelatihan, kompeten, dan variasinya dinormalisasi otomatis menjadi status Lulus.'
  });

  // Record audit finding for recognized certifications
  findings.push({
    id: `FND-CERT-${Date.now()}`,
    timestamp: new Date().toLocaleTimeString(),
    category: 'anomali',
    severity: 'resolved',
    title: `Deteksi Kepemilikan Sertifikasi (${file.name})`,
    description: `Agen berhasil mendeteksi ${recognizedCertified} peserta yang memiliki sertifikasi internasional / BNSP / sertifikat kompetensi.`,
    actionTaken: 'Mengevaluasi kolom sertifikat dan status peserta untuk memastikan seluruh pemegang sertifikasi terdata akurat.'
  });

  findings.push({
    id: `FND-MAP-${Date.now()}`,
    timestamp: new Date().toLocaleTimeString(),
    category: 'kolom',
    severity: 'info',
    title: `Pemetaan Kolom Berhasil (${file.name})`,
    description: `Berhasil memetakan kolom dari total ${headers.length} kolom terdeteksi.${
      headerRowIndex > 0 ? ` Header tabel terdeteksi di baris ke-${headerRowIndex + 1}.` : ''
    }`,
    actionTaken: 'Data siap diagregasi ke dashboard.'
  });

  return {
    records: Array.from(uniqueMap.values()),
    totalRowsReceived,
    duplicatesRemoved,
    anomaliesFixed,
    piiRedacted,
    findings
  };
}

// Calculate Comprehensive Aggregates by Region
export function aggregateMetricsByRegion(
  participants: ParticipantRecord[],
  imdiDataset: Record<string, IMDIRecord> = BENCHMARK_IMDI
): Record<string, RegionMetric> {
  const result: Record<string, RegionMetric> = {};

  // Initialize with all known cities in IMDI
  for (const [cityName, imdi] of Object.entries(imdiDataset)) {
    result[cityName] = {
      city: cityName,
      province: imdi.province as 'Jawa Timur' | 'Nusa Tenggara Barat',
      pendaftar: 0,
      lulusan: 0,
      pembatalan: 0,
      tidakLulus: 0,
      tingkatKelulusan: 0,
      tingkatPembatalan: 0,
      sertifikasiInternasional: 0,
      rasioSertifikasi: 0,
      genderRatio: {
        lakiLaki: 0,
        perempuan: 0
      },
      topKecamatan: [],
      topThemes: [],
      topAcademies: [],
      imdi,
      priorityScore: 0
    };
  }

  // Temporary maps for sub-aggregations per city
  const districtMap: Record<string, Record<string, { pendaftar: number; lulusan: number }>> = {};
  const themeMap: Record<string, Record<string, { pendaftar: number; lulusan: number }>> = {};
  const academyMap: Record<string, Record<string, { pendaftar: number; lulusan: number }>> = {};

  for (const p of participants) {
    if (!result[p.city]) {
      // New city not in benchmark
      result[p.city] = {
        city: p.city,
        province: p.province,
        pendaftar: 0,
        lulusan: 0,
        pembatalan: 0,
        tidakLulus: 0,
        tingkatKelulusan: 0,
        tingkatPembatalan: 0,
        sertifikasiInternasional: 0,
        rasioSertifikasi: 0,
        genderRatio: { lakiLaki: 0, perempuan: 0 },
        topKecamatan: [],
        topThemes: [],
        topAcademies: [],
        imdi: undefined,
        priorityScore: 0
      };
    }

    const reg = result[p.city];
    reg.pendaftar++;

    if (p.status === 'lulus') reg.lulusan++;
    else if (p.status === 'pembatalan') reg.pembatalan++;
    else reg.tidakLulus++;

    if (p.hasInternationalCert) reg.sertifikasiInternasional++;

    if (p.gender === 'Perempuan') reg.genderRatio.perempuan++;
    else reg.genderRatio.lakiLaki++;

    // Sub-district tally
    const distName = p.district || 'Kecamatan Sentra';
    if (!districtMap[p.city]) districtMap[p.city] = {};
    if (!districtMap[p.city][distName]) districtMap[p.city][distName] = { pendaftar: 0, lulusan: 0 };
    districtMap[p.city][distName].pendaftar++;
    if (p.status === 'lulus') districtMap[p.city][distName].lulusan++;

    // Theme tally
    if (!themeMap[p.city]) themeMap[p.city] = {};
    if (!themeMap[p.city][p.themeName]) themeMap[p.city][p.themeName] = { pendaftar: 0, lulusan: 0 };
    themeMap[p.city][p.themeName].pendaftar++;
    if (p.status === 'lulus') themeMap[p.city][p.themeName].lulusan++;

    // Academy tally
    if (!academyMap[p.city]) academyMap[p.city] = {};
    if (!academyMap[p.city][p.academyName]) academyMap[p.city][p.academyName] = { pendaftar: 0, lulusan: 0 };
    academyMap[p.city][p.academyName].pendaftar++;
    if (p.status === 'lulus') academyMap[p.city][p.academyName].lulusan++;
  }

  // Calculate final percentages and sorted lists
  for (const [cityName, reg] of Object.entries(result)) {
    if (reg.pendaftar > 0) {
      reg.tingkatKelulusan = Number(((reg.lulusan / reg.pendaftar) * 100).toFixed(1));
      reg.tingkatPembatalan = Number(((reg.pembatalan / reg.pendaftar) * 100).toFixed(1));
      reg.rasioSertifikasi = Number(((reg.sertifikasiInternasional / reg.pendaftar) * 100).toFixed(1));
    }

    // Top Kecamatan
    if (districtMap[cityName]) {
      reg.topKecamatan = Object.entries(districtMap[cityName])
        .map(([name, val]) => ({
          name,
          pendaftar: val.pendaftar,
          lulusan: val.lulusan,
          tingkatKelulusan: val.pendaftar > 0 ? Number(((val.lulusan / val.pendaftar) * 100).toFixed(1)) : 0
        }))
        .sort((a, b) => b.pendaftar - a.pendaftar)
        .slice(0, 10);
    }

    // Top Themes
    if (themeMap[cityName]) {
      reg.topThemes = Object.entries(themeMap[cityName])
        .map(([name, val]) => ({ name, pendaftar: val.pendaftar, lulusan: val.lulusan }))
        .sort((a, b) => b.pendaftar - a.pendaftar);
    }

    // Top Academies
    if (academyMap[cityName]) {
      reg.topAcademies = Object.entries(academyMap[cityName])
        .map(([name, val]) => ({ name, pendaftar: val.pendaftar, lulusan: val.lulusan }))
        .sort((a, b) => b.pendaftar - a.pendaftar);
    }

    // Compute Priority Score for Region (High score = high need for training intervention)
    // Formula: (100 - IMDI Score)*0.5 + (100 - PassRate)*0.25 + (LowParticipationWeight)*0.25
    const imdiVal = reg.imdi?.score || 45;
    const passRate = reg.tingkatKelulusan || 50;
    const participationPenalty = Math.max(0, 100 - Math.min(100, reg.pendaftar * 1.2));
    reg.priorityScore = Number(
      ((100 - imdiVal) * 0.45 + (100 - passRate) * 0.25 + participationPenalty * 0.3).toFixed(1)
    );
  }

  return result;
}

// Download Sample 13-Column Excel
export function downloadSampleExcelTemplate() {
  const sampleHeaders = [
    'ID Pelatihan',
    'Nama Akademi',
    'Nama Tema',
    'Nama Pelatihan',
    'Nama',
    'Jenis Kelamin',
    'Provinsi',
    'Kota',
    'Kecamatan',
    'Kelurahan',
    'Nomor Registrasi',
    'Status Peserta',
    'Sertifikasi Internasional'
  ];

  const sampleRows = [
    [
      'TRN-2025-FGA-001',
      'Fresh Graduate Academy (FGA)',
      'Artificial Intelligence & Machine Learning',
      'Pelatihan Machine Learning Engineer',
      'Ahmad Fauzi (Akan dihapus sistem demi privasi)',
      'Laki-laki',
      'Jawa Timur',
      'Kota Surabaya',
      'Gubeng',
      'Airlangga',
      'REG-2025-JTM-SBY-101001',
      'Lulus Pelatihan - Nilai',
      'Oracle Certified Associate'
    ],
    [
      'TRN-2025-DEA-002',
      'Digital Entrepreneurship Academy (DEA)',
      'Digital Marketing & E-Commerce',
      'Pemasaran Digital UMKM Agrobisnis',
      'Siti Nurhaliza (Akan dihapus sistem demi privasi)',
      'Perempuan',
      'Nusa Tenggara Barat',
      'Kab. Lombok Barat',
      'Gerung',
      'Gerung Utara',
      'REG-2025-NTB-LBR-202002',
      'lulus nilai',
      'BNSP-2025-0819'
    ],
    [
      'TRN-2025-GTA-003',
      'Government Transformation Academy (GTA)',
      'Cybersecurity Specialist',
      'Manajemen Insiden Siber SPBE',
      'Budi Santoso (Akan dihapus sistem demi privasi)',
      'Laki-laki',
      'Jawa Timur',
      'Kab. Banyuwangi',
      'Rogojampi',
      'Gitik',
      'REG-2025-JTM-BYW-303003',
      'kompeten',
      'Ya'
    ],
    [
      'TRN-2025-VSGA-004',
      'Vocational School Graduate Academy (VSGA)',
      'Cloud Computing & DevOps',
      'Cloud Practitioner & Network Admin',
      'Rian Pratama (Akan dihapus sistem demi privasi)',
      'Laki-laki',
      'Nusa Tenggara Barat',
      'Kota Mataram',
      'Cakranegara',
      'Cakra Barat',
      'REG-2025-NTB-MTR-404004',
      'lulus',
      'Tersertifikasi Global'
    ],
    [
      'TRN-2025-TA-005',
      'Thematic Academy (TA)',
      'UI/UX Design & Product Management',
      'Desain Layanan Publik Terpadu',
      'Dewi Lestari (Akan dihapus sistem demi privasi)',
      'Perempuan',
      'Jawa Timur',
      'Kota Malang',
      'Klojen',
      'Klojen Sentra',
      'REG-2025-JTM-MLG-505005',
      'tidak lulus',
      'Tidak'
    ]
  ];

  const ws = XLSX.utils.aoa_to_sheet([sampleHeaders, ...sampleRows]);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Template_13_Kolom');
  XLSX.writeFile(wb, 'MRKI_Template_13_Kolom_Standar.xlsx');
}
