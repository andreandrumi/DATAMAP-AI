import React from 'react';
import { RegionMetric, ParticipantRecord } from '../../types';
import * as XLSX from 'xlsx';
import { 
  X, 
  Download, 
  Printer, 
  FileSpreadsheet, 
  ShieldCheck, 
  Building2, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';

interface ExecutiveExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  regionMetrics: Record<string, RegionMetric>;
  participants: ParticipantRecord[];
}

export const ExecutiveExportModal: React.FC<ExecutiveExportModalProps> = ({
  isOpen,
  onClose,
  regionMetrics,
  participants
}) => {
  if (!isOpen) return null;

  const totalParticipants = participants.length;
  const totalGraduates = participants.filter(p => p.status === 'lulus').length;
  const passRate = totalParticipants > 0 ? ((totalGraduates / totalParticipants) * 100).toFixed(1) : '0';

  const regions = Object.values(regionMetrics);
  const jatimRegions = regions.filter(r => r.province === 'Jawa Timur');
  const ntbRegions = regions.filter(r => r.province === 'Nusa Tenggara Barat');

  // Export Aggregated Dataset to Excel
  const handleExportExcel = () => {
    const summaryRows = regions.map(r => ({
      'Provinsi': r.province,
      'Kabupaten / Kota': r.city,
      'Total Pendaftar Unik': r.pendaftar,
      'Total Lulusan': r.lulusan,
      'Tingkat Kelulusan (%)': r.tingkatKelulusan,
      'Pembatalan': r.pembatalan,
      'Tingkat Pembatalan (%)': r.tingkatPembatalan,
      'Sertifikasi Global': r.sertifikasiInternasional,
      'Skor IMDI': r.imdi?.score || 'N/A',
      'Kategori IMDI': r.imdi?.category || 'N/A',
      'Skor Prioritas Kebutuhan': r.priorityScore
    }));

    const ws = XLSX.utils.json_to_sheet(summaryRows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Agregat_Wilayah');
    XLSX.writeFile(wb, `MRKI_Laporan_Eksekutif_Agregat_${new Date().toISOString().slice(0, 10)}.xlsx`);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1 rounded bg-blue-500/20 text-blue-400">
                <Building2 className="w-4 h-4" />
              </span>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                Laporan Eksekutif Pemangku Kebijakan
              </span>
            </div>
            <h3 className="text-xl font-black text-white mt-1">
              Ringkasan Analitik Sebaran Alumni Pelatihan
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Provinsi Jawa Timur &amp; Nusa Tenggara Barat &bull; Basis UU PDP No. 27/2022
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable Section */}
        <div className="space-y-5 print:text-black">
          {/* Executive Overview Card */}
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Ringkasan Kinerja Capaian
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                <div className="text-[11px] text-slate-400">Pendaftar Terverifikasi</div>
                <div className="text-xl font-bold text-white mt-1">{totalParticipants.toLocaleString()}</div>
              </div>
              <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                <div className="text-[11px] text-slate-400">Alumni Lulus</div>
                <div className="text-xl font-bold text-emerald-400 mt-1">{totalGraduates.toLocaleString()}</div>
              </div>
              <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                <div className="text-[11px] text-slate-400">Tingkat Kelulusan</div>
                <div className="text-xl font-bold text-teal-400 mt-1">{passRate}%</div>
              </div>
              <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                <div className="text-[11px] text-slate-400">Cakupan Wilayah</div>
                <div className="text-xl font-bold text-indigo-400 mt-1">48 Kab/Kota</div>
              </div>
            </div>
          </div>

          {/* Regional Snapshot Table */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Wilayah Prioritas Berdasarkan Gap IMDI &amp; Partisipasi
            </h4>
            <div className="border border-slate-800 rounded-xl overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-slate-950 text-slate-400 text-[10px] uppercase border-b border-slate-800">
                  <tr>
                    <th className="p-2.5">Wilayah</th>
                    <th className="p-2.5">Provinsi</th>
                    <th className="p-2.5 text-right">Skor IMDI</th>
                    <th className="p-2.5 text-right">Pendaftar</th>
                    <th className="p-2.5 text-right">Tingkat Kelulusan</th>
                    <th className="p-2.5 text-center">Status Rekomendasi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {regions
                    .sort((a, b) => b.priorityScore - a.priorityScore)
                    .slice(0, 6)
                    .map((r, i) => (
                      <tr key={i} className="hover:bg-slate-850">
                        <td className="p-2.5 font-bold text-white">{r.city}</td>
                        <td className="p-2.5">{r.province}</td>
                        <td className="p-2.5 text-right font-mono text-cyan-400">{r.imdi?.score || 'N/A'}</td>
                        <td className="p-2.5 text-right font-mono">{r.pendaftar}</td>
                        <td className="p-2.5 text-right font-mono text-emerald-400">{r.tingkatKelulusan}%</td>
                        <td className="p-2.5 text-center">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            Intervensi DEA / VSGA
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Privacy & Integrity Compliance Seal */}
          <div className="bg-slate-950 p-3.5 rounded-xl border border-emerald-500/30 flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <div className="text-[11px] text-slate-300">
              <strong className="text-white">Pernyataan Kepatuhan Perlindungan Data: </strong>
              Dokumen dan dataset ini hanya memuat agregat statistik non-personal. Seluruh atribut PII (Nama Lengkap, NIK) telah dimusnahkan secara sistemik saat tahap pembersihan mandiri.
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-slate-800">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            Tutup
          </button>
          <button
            onClick={handleExportExcel}
            className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center gap-2 shadow-lg transition"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Ekspor File Excel (.xlsx)</span>
          </button>
          <button
            onClick={handlePrint}
            className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center gap-2 shadow-lg transition"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak Ringkasan Eksekutif</span>
          </button>
        </div>
      </div>
    </div>
  );
};
