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
  { key: 'status', name: 'Status Peserta', required: true, synonyms: ['status peserta', 'status', 'status kelulusan', 'kelulusan', 'hasil'] },
  { key: 'hasInternationalCert', name: 'Sertifikasi Internasional', required: false, synonyms: ['sertifikasi internasional', 'sertifikasi', 'sertifikat internasional', 'international cert', 'global cert', 'sertifikat global'] },
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

// Standardize Status
export function normalizeStatus(val: string): ParticipantStatus {
  const clean = String(val || '').toLowerCase().trim();
  if (clean.includes('lulus') && !clean.includes('tidak')) return 'lulus';
  if (clean.includes('batal') || clean.includes('pembatalan') || clean.includes('cancel')) return 'pembatalan';
  if (clean.includes('administrasi') || clean.includes('adm')) return 'tidak_lulus_administrasi';
  if (clean.includes('tidak lulus') || clean.includes('gagal') || clean.includes('drop')) return 'tidak_lulus';
  return 'pendaftar';
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
  const rawRows: Record<string, any>[] = XLSX.utils.sheet_to_json(worksheet, { defval: '' });

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
          title: `File Kosong: ${file.name}`,
          description: 'Sheet pertama tidak memiliki baris data untuk diproses.',
          actionTaken: 'File dilewati.'
        }
      ]
    };
  }

  const headers = Object.keys(rawRows[0] || {});
  const { mapping, confidenceMap } = mapHeaders(headers);

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

    const rawStatus = row[mapping['status']] || 'lulus';
    const status = normalizeStatus(rawStatus);

    const hasCertRaw = String(row[mapping['hasInternationalCert']] || '').toLowerCase();
    const hasCert = hasCertRaw === 'ya' || hasCertRaw === 'true' || hasCertRaw === '1' || hasCertRaw === 'yes' || hasCertRaw.includes('sertifikasi');

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

  findings.push({
    id: `FND-MAP-${Date.now()}`,
    timestamp: new Date().toLocaleTimeString(),
    category: 'kolom',
    severity: 'info',
    title: `Pemetaan Kolom Berhasil (${file.name})`,
    description: `Berhasil memetakan kolom dari total ${headers.length} kolom terdeteksi.`,
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
      'lulus',
      'Ya'
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
      'lulus',
      'Tidak'
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
      'lulus',
      'Ya'
    ]
  ];

  const ws = XLSX.utils.aoa_to_sheet([sampleHeaders, ...sampleRows]);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Template_13_Kolom');
  XLSX.writeFile(wb, 'MRKI_Template_13_Kolom_Standar.xlsx');
}
