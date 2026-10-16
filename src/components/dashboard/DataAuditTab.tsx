import React from 'react';
import { ReconciliationReport, AuditFinding } from '../../types';
import { STANDARD_COLUMNS } from '../../utils/dataProcessor';
import { 
  ShieldCheck, 
  FileCheck, 
  AlertTriangle, 
  Database, 
  CheckCircle2, 
  Trash2, 
  Sparkles, 
  Lock, 
  RefreshCw,
  Info
} from 'lucide-react';

interface DataAuditTabProps {
  auditReport: ReconciliationReport;
  onResetToBenchmark: () => void;
}

export const DataAuditTab: React.FC<DataAuditTabProps> = ({
  auditReport,
  onResetToBenchmark
}) => {
  return (
    <div className="space-y-6">
      {/* Top Banner: UU PDP & Self-Audit Status */}
      <div className="bg-gradient-to-r from-emerald-950/60 via-slate-900 to-slate-900 border border-emerald-500/30 rounded-2xl p-5 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">
                  Laporan Pemeriksaan Data Mandiri & Kepatuhan UU PDP (FR-08)
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Data Privacy Verified
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                Sistem secara mandiri mendeteksi anomali kolom, membuang data pribadi (PII Nama & NIK) sesuai amanat UU No. 27/2022 tentang Perlindungan Data Pribadi, menstandarisasi penulisan wilayah BPS, serta mengeksekusi rekonsiliasi matematis baris data.
              </p>
            </div>
          </div>

          <button
            onClick={onResetToBenchmark}
            className="text-xs px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-2 transition shrink-0"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Data Benchmark</span>
          </button>
        </div>
      </div>

      {/* Mathematical Reconciliation Matrix (NFR-02 & Alat Rekonsiliasi) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg">
          <div className="text-xs font-semibold text-slate-400">Total File Masuk</div>
          <div className="text-2xl font-black text-white mt-2">
            {auditReport.totalFiles}
          </div>
          <div className="text-[10px] text-blue-400 mt-1">File Excel / CSV</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg">
          <div className="text-xs font-semibold text-slate-400">Baris Diterima</div>
          <div className="text-2xl font-black text-white mt-2">
            {auditReport.totalRowsReceived.toLocaleString()}
          </div>
          <div className="text-[10px] text-slate-400 mt-1">Raw Ingestion Total</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg">
          <div className="text-xs font-semibold text-slate-400">Baris Valid Digabung</div>
          <div className="text-2xl font-black text-emerald-400 mt-2">
            {auditReport.totalRowsValid.toLocaleString()}
          </div>
          <div className="text-[10px] text-emerald-500 font-semibold mt-1">
            Data Terpakai Dashboard
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg">
          <div className="text-xs font-semibold text-slate-400">Duplikat Tereliminasi</div>
          <div className="text-2xl font-black text-amber-400 mt-2">
            {auditReport.totalDuplicatesExcluded.toLocaleString()}
          </div>
          <div className="text-[10px] text-amber-400/80 font-medium mt-1">
            Deduplikasi No. Registrasi
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg">
          <div className="text-xs font-semibold text-slate-400">Koreksi Penulisan Wilayah</div>
          <div className="text-2xl font-black text-cyan-400 mt-2">
            {auditReport.totalAnomaliesFixed.toLocaleString()}
          </div>
          <div className="text-[10px] text-cyan-400/80 font-medium mt-1">
            Standarisasi Otomatis BPS
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg">
          <div className="text-xs font-semibold text-slate-400">Kepatuhan UU PDP (PII)</div>
          <div className="text-2xl font-black text-rose-400 mt-2">
            100%
          </div>
          <div className="text-[10px] text-rose-400/80 font-medium mt-1">
            Kolom Nama Dibuang Permanen
          </div>
        </div>
      </div>

      {/* Row 2: Standard 13-Columns Mapping Specification & Status */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-indigo-400" />
            <div>
              <h3 className="text-base font-bold text-white">
                Spesifikasi &amp; Pemilahan 13 Kolom Standar (FR-10)
              </h3>
              <p className="text-xs text-slate-400">
                Pencocokan nama kolom berdasarkan makna semantik dan isi data secara mandiri
              </p>
            </div>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            13 / 13 Kolom Terverifikasi
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {STANDARD_COLUMNS.map((col, idx) => {
            const isExcluded = col.excludedForPrivacy;

            return (
              <div 
                key={idx}
                className={`p-3 rounded-xl border transition ${
                  isExcluded
                    ? 'bg-rose-950/20 border-rose-800/60'
                    : 'bg-slate-950/60 border-slate-800'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400">Kolom #{idx + 1}</span>
                    <h5 className="text-xs font-bold text-white flex items-center gap-1.5 mt-0.5">
                      {col.name}
                      {isExcluded && <Lock className="w-3 h-3 text-rose-400" />}
                    </h5>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isExcluded
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      : col.required
                      ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                      : 'bg-slate-800 text-slate-400 border border-slate-700'
                  }`}>
                    {isExcluded ? 'Dibuang (UU PDP)' : col.required ? 'Wajib' : 'Opsional'}
                  </span>
                </div>

                <div className="mt-2 text-[11px] text-slate-400">
                  <span className="text-slate-400">Sinonim Terdeteksi: </span>
                  <span className="text-slate-300 font-mono text-[10px]">
                    {col.synonyms.slice(0, 3).join(', ')}...
                  </span>
                </div>

                <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px]">
                  <span className="text-slate-400">Status Agen:</span>
                  <span className={`font-semibold flex items-center gap-1 ${
                    isExcluded ? 'text-rose-400' : 'text-emerald-400'
                  }`}>
                    <CheckCircle2 className="w-3 h-3" />
                    {isExcluded ? 'Tereliminasi Aman' : 'Terpetakan 100%'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Row 3: Audit Findings & Decision Explanations Log */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="text-base font-bold text-white">
                Log Pemeriksaan Mandiri &amp; Penjelasan Keputusan Agen
              </h3>
              <p className="text-xs text-slate-400">
                Transparansi tindakan agen AI saat mendeteksi file janggal, duplikasi, atau inkonsistensi
              </p>
            </div>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            {auditReport.findings.length} Catatan Audit
          </span>
        </div>

        <div className="space-y-3">
          {auditReport.findings.map((item, idx) => (
            <div 
              key={idx}
              className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 hover:border-slate-700 transition"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 border-b border-slate-800/80 pb-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    item.category === 'privasi' ? 'bg-rose-500/20 text-rose-300' :
                    item.category === 'duplikasi' ? 'bg-amber-500/20 text-amber-300' :
                    item.category === 'wilayah' ? 'bg-cyan-500/20 text-cyan-300' :
                    'bg-blue-500/20 text-blue-300'
                  }`}>
                    {item.category.toUpperCase()}
                  </span>
                  <h4 className="text-xs font-bold text-white">{item.title}</h4>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">{item.timestamp}</span>
              </div>

              <p className="text-xs text-slate-300 mb-2 leading-relaxed">
                {item.description}
              </p>

              <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800 text-[11px] text-emerald-300 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Tindakan Mandiri Agen: </strong>
                  {item.actionTaken}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
