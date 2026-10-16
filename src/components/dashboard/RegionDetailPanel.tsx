import React from 'react';
import { RegionMetric, ThemeRecommendation } from '../../types';
import { generateThemeRecommendations } from '../../utils/reasoningEngine';
import { 
  Building2, 
  GraduationCap, 
  Award, 
  MapPin, 
  TrendingUp, 
  Sparkles, 
  CheckCircle2, 
  ChevronRight, 
  Layers, 
  PieChart, 
  X,
  Target,
  ArrowUpRight
} from 'lucide-react';

interface RegionDetailPanelProps {
  region: RegionMetric | null;
  onClose: () => void;
  onFilterByCity?: (city: string) => void;
}

export const RegionDetailPanel: React.FC<RegionDetailPanelProps> = ({
  region,
  onClose,
  onFilterByCity
}) => {
  if (!region) {
    return (
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-8 text-center text-slate-400">
        <MapPin className="w-12 h-12 mx-auto text-slate-600 mb-3" />
        <h4 className="text-base font-semibold text-slate-200">Belum Ada Wilayah Terpilih</h4>
        <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
          Klik salah satu Kabupaten/Kota pada peta interaktif untuk memeriksa profil IMDI, sebaran kecamatan, dan rekomendasi tema pelatihan berbasis angka.
        </p>
      </div>
    );
  }

  const recommendations = generateThemeRecommendations(region);
  const imdi = region.imdi;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
      {/* Panel Header */}
      <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 via-slate-850 to-indigo-950/40 border-b border-slate-800 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
              {region.province}
            </span>
            <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full border ${
              imdi?.category === 'Sangat Tinggi' ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' :
              imdi?.category === 'Tinggi' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' :
              imdi?.category === 'Sedang' ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' :
              'bg-rose-500/20 text-rose-300 border-rose-500/30'
            }`}>
              IMDI: {imdi?.category || 'Standar'} ({imdi?.score ?? 'N/A'})
            </span>
          </div>
          <h3 className="text-xl font-black text-white mt-1.5 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-emerald-400" />
            {region.city}
          </h3>
        </div>

        <div className="flex items-center gap-2">
          {onFilterByCity && (
            <button
              onClick={() => onFilterByCity(region.city)}
              className="text-xs px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg flex items-center gap-1 transition"
              title="Terapkan filter hanya untuk kota ini"
            >
              <span>Filter Data</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="p-4 sm:p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-240px)]">
        {/* Core Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3">
            <div className="text-[11px] text-slate-400 font-medium">Pendaftar Unik</div>
            <div className="text-lg font-bold text-white mt-0.5">{region.pendaftar.toLocaleString()}</div>
            <div className="text-[10px] text-slate-400 mt-1">Deduplikasi No. Reg</div>
          </div>

          <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3">
            <div className="text-[11px] text-slate-400 font-medium">Alumni Lulus</div>
            <div className="text-lg font-bold text-emerald-400 mt-0.5">{region.lulusan.toLocaleString()}</div>
            <div className="text-[10px] text-emerald-500/80 mt-1 font-semibold">
              {region.tingkatKelulusan}% Lulus
            </div>
          </div>

          <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3">
            <div className="text-[11px] text-slate-400 font-medium">Pembatalan</div>
            <div className="text-lg font-bold text-rose-400 mt-0.5">{region.pembatalan.toLocaleString()}</div>
            <div className="text-[10px] text-rose-400/80 mt-1 font-semibold">
              {region.tingkatPembatalan}% Batal
            </div>
          </div>

          <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3">
            <div className="text-[11px] text-slate-400 font-medium">Sertifikat Global</div>
            <div className="text-lg font-bold text-teal-400 mt-0.5">{region.sertifikasiInternasional.toLocaleString()}</div>
            <div className="text-[10px] text-teal-400/80 mt-1 font-semibold">
              {region.rasioSertifikasi}% Rasio
            </div>
          </div>
        </div>

        {/* IMDI 4 Pillars Breakdown (FR-11) */}
        {imdi && (
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-indigo-400" />
                <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                  Indeks Masyarakat Digital Indonesia (IMDI) &bull; Skor: {imdi.score}
                </h4>
              </div>
              <span className="text-[11px] text-slate-400">Sumber: Publikasi BPSDMP / Kominfo</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
              <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                <div className="text-[10px] text-slate-400">1. Infrastruktur</div>
                <div className="text-base font-bold text-indigo-300">{imdi.pilarInfrastruktur}</div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
                  <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${Math.min(100, imdi.pilarInfrastruktur)}%` }}></div>
                </div>
              </div>

              <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                <div className="text-[10px] text-slate-400">2. Keterampilan</div>
                <div className="text-base font-bold text-cyan-300">{imdi.pilarKeterampilan}</div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
                  <div className="bg-cyan-500 h-full rounded-full" style={{ width: `${Math.min(100, imdi.pilarKeterampilan)}%` }}></div>
                </div>
              </div>

              <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                <div className="text-[10px] text-slate-400">3. Pemberdayaan</div>
                <div className="text-base font-bold text-emerald-300">{imdi.pilarPemberdayaan}</div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${Math.min(100, imdi.pilarPemberdayaan)}%` }}></div>
                </div>
              </div>

              <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                <div className="text-[10px] text-slate-400">4. Pekerjaan</div>
                <div className="text-base font-bold text-amber-300">{imdi.pilarPekerjaan}</div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: `${Math.min(100, imdi.pilarPekerjaan)}%` }}></div>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-300 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80 leading-relaxed">
              <strong className="text-indigo-300">Catatan Kebutuhan Daerah: </strong>
              {imdi.catatanKebutuhan}
            </p>
          </div>
        )}

        {/* AI Recommendations with Numeric Rationale (FR-09 & NFR-05) */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <h4 className="text-sm font-bold text-white tracking-wide">
                Rekomendasi Tema Pelatihan Berbasis Penalaran AI & Angka
              </h4>
            </div>
            <span className="text-[11px] text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              Multifactor Quantitative Model
            </span>
          </div>

          <div className="space-y-3">
            {recommendations.map((rec, idx) => (
              <div 
                key={idx}
                className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 hover:border-slate-700 transition"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                        {rec.academyName}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        rec.urgency === 'Prioritas Utama' ? 'bg-red-500/20 text-red-300 border border-red-500/30' :
                        rec.urgency === 'Prioritas Menengah' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                        'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                      }`}>
                        {rec.urgency}
                      </span>
                    </div>
                    <h5 className="text-sm font-bold text-white mt-1.5">{rec.themeName}</h5>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-xs text-slate-400">Skor Kesesuaian</div>
                    <div className="text-lg font-black text-emerald-400">{rec.suitabilityScore}%</div>
                  </div>
                </div>

                {/* Quantitative Bullet Rationale (Alasan Berbasis Angka - PRD Wajib) */}
                <div className="mt-3 bg-slate-900/90 rounded-lg p-3 border border-slate-800">
                  <div className="text-[11px] font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-blue-400" />
                    Alasan Berbasis Angka (Quantitative Rationale):
                  </div>
                  <ul className="space-y-1">
                    {rec.rationaleNumeric.map((reason, rIdx) => (
                      <li key={rIdx} className="text-xs text-slate-300 flex items-start gap-2">
                        <span className="text-emerald-400 font-bold shrink-0 mt-0.5">&bull;</span>
                        <span>{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-2.5 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                  <div className="bg-slate-900/40 p-2 rounded border border-slate-800/60">
                    <span className="text-slate-400">Target Peserta: </span>
                    <span className="text-slate-200 font-medium">{rec.targetAudience}</span>
                  </div>
                  <div className="bg-slate-900/40 p-2 rounded border border-slate-800/60">
                    <span className="text-slate-400">Prediksi Dampak: </span>
                    <span className="text-slate-200 font-medium">{rec.impactPrediction}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Drilldown: Top 10 Kecamatan (FR-03 & PRD data) */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <h4 className="text-sm font-bold text-white tracking-wide">
                Sebaran Tingkat Kecamatan (Top 10 Drilldown)
              </h4>
            </div>
            <span className="text-[11px] text-slate-400">
              {region.topKecamatan.length} Kecamatan terdata
            </span>
          </div>

          {region.topKecamatan.length === 0 ? (
            <p className="text-xs text-slate-400 italic bg-slate-950 p-3 rounded-lg border border-slate-800">
              Data pendaftaran pada tingkat kecamatan untuk wilayah ini belum terpetakan pada file batch pelatihan saat ini.
            </p>
          ) : (
            <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-800/60 text-slate-300 uppercase text-[10px] tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="py-2.5 px-3">Kecamatan</th>
                    <th className="py-2.5 px-3 text-right">Pendaftar</th>
                    <th className="py-2.5 px-3 text-right">Lulusan</th>
                    <th className="py-2.5 px-3 text-right">Tingkat Kelulusan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  {region.topKecamatan.map((kec, kIdx) => (
                    <tr key={kIdx} className="hover:bg-slate-850 transition">
                      <td className="py-2 px-3 font-medium text-white flex items-center gap-2">
                        <span className="text-[10px] text-slate-400 font-mono w-4">{kIdx + 1}.</span>
                        {kec.name}
                      </td>
                      <td className="py-2 px-3 text-right font-mono">{kec.pendaftar}</td>
                      <td className="py-2 px-3 text-right font-mono text-emerald-400">{kec.lulusan}</td>
                      <td className="py-2 px-3 text-right">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          kec.tingkatKelulusan >= 85 ? 'bg-emerald-500/20 text-emerald-300' :
                          kec.tingkatKelulusan >= 70 ? 'bg-amber-500/20 text-amber-300' :
                          'bg-rose-500/20 text-rose-300'
                        }`}>
                          {kec.tingkatKelulusan}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Capaian Per Tema & Akademi di Wilayah Terpilih */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Top Akademi */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3.5">
            <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-blue-400" />
              Capaian per Akademi
            </h5>
            <div className="space-y-2">
              {region.topAcademies.slice(0, 4).map((acad, aIdx) => (
                <div key={aIdx} className="text-xs">
                  <div className="flex justify-between text-slate-300 mb-0.5">
                    <span className="truncate pr-2 font-medium">{acad.name}</span>
                    <span className="font-mono text-slate-400 shrink-0">{acad.pendaftar} pst ({acad.lulusan} lls)</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-blue-500 h-full rounded-full"
                      style={{ width: `${Math.min(100, (acad.pendaftar / Math.max(1, region.pendaftar)) * 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Tema */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3.5">
            <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <PieChart className="w-3.5 h-3.5 text-emerald-400" />
              Capaian per Tema
            </h5>
            <div className="space-y-2">
              {region.topThemes.slice(0, 4).map((th, tIdx) => (
                <div key={tIdx} className="text-xs">
                  <div className="flex justify-between text-slate-300 mb-0.5">
                    <span className="truncate pr-2 font-medium">{th.name}</span>
                    <span className="font-mono text-slate-400 shrink-0">{th.pendaftar} pst ({th.lulusan} lls)</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-emerald-500 h-full rounded-full"
                      style={{ width: `${Math.min(100, (th.pendaftar / Math.max(1, region.pendaftar)) * 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
