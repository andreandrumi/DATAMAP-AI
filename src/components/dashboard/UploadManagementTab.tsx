import React, { useState } from 'react';
import { 
  Upload, 
  FileSpreadsheet, 
  Download, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  FileText, 
  Layers, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { parseParticipantFile, downloadSampleExcelTemplate } from '../../utils/dataProcessor';
import { ParticipantRecord, AuditFinding } from '../../types';

interface UploadManagementTabProps {
  onIngestFiles: (
    newRecords: ParticipantRecord[],
    rowsReceived: number,
    duplicatesRemoved: number,
    anomaliesFixed: number,
    piiRedacted: number,
    findings: AuditFinding[],
    fileName: string
  ) => void;
  onNavigateToTab: (tab: 'kpi' | 'jatim' | 'ntb' | 'audit' | 'upload') => void;
}

export const UploadManagementTab: React.FC<UploadManagementTabProps> = ({
  onIngestFiles,
  onNavigateToTab
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadedFilesList, setUploadedFilesList] = useState<{ name: string; size: string; status: string }[]>([]);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsProcessing(true);
    setFeedbackMessage(null);

    try {
      let combinedRecords: ParticipantRecord[] = [];
      let totalReceived = 0;
      let totalDuplicates = 0;
      let totalAnomalies = 0;
      let totalPii = 0;
      const combinedFindings: AuditFinding[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const result = await parseParticipantFile(file);

        combinedRecords = [...combinedRecords, ...result.records];
        totalReceived += result.totalRowsReceived;
        totalDuplicates += result.duplicatesRemoved;
        totalAnomalies += result.anomaliesFixed;
        totalPii += result.piiRedacted;
        combinedFindings.push(...result.findings);

        setUploadedFilesList(prev => [
          ...prev,
          {
            name: file.name,
            size: `${(file.size / 1024).toFixed(1)} KB`,
            status: 'Diproses & Digabungkan'
          }
        ]);
      }

      onIngestFiles(
        combinedRecords,
        totalReceived,
        totalDuplicates,
        totalAnomalies,
        totalPii,
        combinedFindings,
        files.length === 1 ? files[0].name : `${files.length} File Gabungan`
      );

      setFeedbackMessage(
        `Sukses memproses ${files.length} file dengan total ${totalReceived.toLocaleString()} baris data! PII Nama telah dibuang, duplikat disaring, dan wilayah distandarisasi.`
      );
    } catch (err: any) {
      console.error(err);
      setFeedbackMessage(`Terjadi kesalahan saat memproses file: ${err.message || 'Format tidak didukung'}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Introduction Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Upload className="w-5 h-5 text-blue-400" />
              Unggah &amp; Integrasi Data Pelatihan (FR-01)
            </h3>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
              Unggah satu atau banyak file Excel (.xlsx, .xls) atau CSV sekaligus. Sistem AI Agent akan secara otomatis mencocokkan kolom semantik, membuang data pribadi demi kepatuhan UU PDP, menghapus duplikasi registrasi, dan menyajikan metrik terkini dalam hitungan detik.
            </p>
          </div>

          <button
            onClick={downloadSampleExcelTemplate}
            className="text-xs px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold flex items-center gap-2 shadow-lg transition shrink-0"
          >
            <Download className="w-4 h-4" />
            <span>Unduh Template 13 Kolom</span>
          </button>
        </div>
      </div>

      {/* Main Upload Dropzone */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <label className="border-2 border-dashed border-slate-700 hover:border-blue-500 bg-slate-950/60 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition group">
            <div className="p-4 rounded-2xl bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20 group-hover:scale-105 transition mb-3">
              {isProcessing ? (
                <Loader2 className="w-8 h-8 animate-spin" />
              ) : (
                <Upload className="w-8 h-8" />
              )}
            </div>

            <h4 className="text-sm font-bold text-white text-center">
              {isProcessing ? 'Sedang Memeriksa & Menggabungkan Data...' : 'Klik atau Tarik File Excel / CSV ke Sini'}
            </h4>
            <p className="text-xs text-slate-400 text-center mt-1 max-w-md">
              Dapat mengunggah banyak file sekaligus. Format didukung: <strong>.xlsx, .xls, .csv</strong> (maks. 50MB per batch).
            </p>

            <span className="mt-4 px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs font-semibold group-hover:bg-blue-600 group-hover:text-white transition">
              Pilih Berkas Pelatihan
            </span>

            <input
              type="file"
              multiple
              accept=".xlsx,.xls,.csv"
              onChange={handleFileUpload}
              disabled={isProcessing}
              className="hidden"
            />
          </label>

          {feedbackMessage && (
            <div className="mt-4 p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-xs text-emerald-200 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div className="flex-1">
                <span>{feedbackMessage}</span>
                <div className="mt-2 flex items-center gap-2">
                  <button
                    onClick={() => onNavigateToTab('kpi')}
                    className="text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 px-3 py-1 rounded-lg transition inline-flex items-center gap-1"
                  >
                    Buka Dashboard KPI
                    <ArrowRight className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => onNavigateToTab('audit')}
                    className="text-xs text-slate-300 hover:text-white underline"
                  >
                    Lihat Laporan Rekonsiliasi &amp; Kepatuhan PDP
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Uploaded History in Session */}
          {uploadedFilesList.length > 0 && (
            <div className="mt-5 border-t border-slate-800 pt-4">
              <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Riwayat File Sesi Ini ({uploadedFilesList.length})
              </h5>
              <div className="space-y-1.5 max-h-36 overflow-y-auto">
                {uploadedFilesList.map((f, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs bg-slate-950 p-2 rounded-lg border border-slate-800">
                    <span className="font-medium text-slate-200 truncate pr-2 flex items-center gap-1.5">
                      <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
                      {f.name}
                    </span>
                    <span className="text-slate-400 font-mono text-[11px] shrink-0">{f.size}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Guidelines & 13 Standard Columns Summary */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
          <div>
            <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-400" />
              Ketentuan Standarisasi 13 Kolom
            </h4>
            <p className="text-xs text-slate-400 mb-3 leading-relaxed">
              Sesuai PRD Balai Pelatihan, sistem otomatis memproses 13 kolom baku:
            </p>

            <ul className="text-xs space-y-1.5 text-slate-300">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <strong>Kolom Wajib: </strong> Nama Tema, Nama Pelatihan, Provinsi, Kota, Nomor Registrasi, Status Peserta.
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                <strong>Kolom Opsional: </strong> ID Pelatihan, Nama Akademi, Jenis Kelamin, Kecamatan, Kelurahan, Sertifikasi Internasional.
              </li>
              <li className="flex items-center gap-1.5 text-rose-300">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
                <strong>Dibuang demi Privasi: </strong> Kolom Nama Peserta / NIK (UU PDP No. 27/2022).
              </li>
            </ul>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-800">
            <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800 text-xs">
              <div className="font-semibold text-slate-200 flex items-center gap-1.5 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Pemeriksaan Otomatis Tanpa Staf
              </div>
              <p className="text-slate-400 text-[11px]">
                Pemangku kebijakan tidak perlu menunggu staf teknis merapikan data berhari-hari. Waktu olah data berkurang hingga 95%.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
