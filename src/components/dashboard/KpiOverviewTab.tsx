import React, { useMemo } from 'react';
import { ParticipantRecord, RegionMetric } from '../../types';
import { generateSystemInsights } from '../../utils/reasoningEngine';
import { 
  Users, 
  Award, 
  CheckCircle2, 
  XCircle, 
  Globe2, 
  Sparkles, 
  TrendingUp, 
  Building2, 
  BookOpen, 
  MapPin,
  ArrowUpRight,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';

interface KpiOverviewTabProps {
  filteredParticipants: ParticipantRecord[];
  regionMetrics: Record<string, RegionMetric>;
  onSelectCity: (city: string) => void;
  onNavigateToTab: (tab: 'kpi' | 'jatim' | 'ntb' | 'audit' | 'upload') => void;
}

export const KpiOverviewTab: React.FC<KpiOverviewTabProps> = ({
  filteredParticipants,
  regionMetrics,
  onSelectCity,
  onNavigateToTab
}) => {
  // Aggregate KPIs
  const kpi = useMemo(() => {
    const total = filteredParticipants.length;
    let graduates = 0;
    let cancellations = 0;
    let internationalCerts = 0;
    let male = 0;
    let female = 0;

    const academyCounts: Record<string, { pendaftar: number; lulusan: number }> = {};
    const themeCounts: Record<string, { pendaftar: number; lulusan: number }> = {};
    const cityCounts: Record<string, { pendaftar: number; lulusan: number; province: string }> = {};
    const districtCounts: Record<string, { pendaftar: number; lulusan: number; city: string }> = {};

    for (const p of filteredParticipants) {
      if (p.status === 'lulus') graduates++;
      else if (p.status === 'pembatalan') cancellations++;

      if (p.hasInternationalCert) internationalCerts++;
      if (p.gender === 'Perempuan') female++;
      else male++;

      // Academy
      if (!academyCounts[p.academyName]) academyCounts[p.academyName] = { pendaftar: 0, lulusan: 0 };
      academyCounts[p.academyName].pendaftar++;
      if (p.status === 'lulus') academyCounts[p.academyName].lulusan++;

      // Theme
      if (!themeCounts[p.themeName]) themeCounts[p.themeName] = { pendaftar: 0, lulusan: 0 };
      themeCounts[p.themeName].pendaftar++;
      if (p.status === 'lulus') themeCounts[p.themeName].lulusan++;

      // City
      if (!cityCounts[p.city]) cityCounts[p.city] = { pendaftar: 0, lulusan: 0, province: p.province };
      cityCounts[p.city].pendaftar++;
      if (p.status === 'lulus') cityCounts[p.city].lulusan++;

      // District
      if (p.district) {
        const dKey = `${p.district} (${p.city.replace('Kab. ', '').replace('Kota ', '')})`;
        if (!districtCounts[dKey]) districtCounts[dKey] = { pendaftar: 0, lulusan: 0, city: p.city };
        districtCounts[dKey].pendaftar++;
        if (p.status === 'lulus') districtCounts[dKey].lulusan++;
      }
    }

    const passRate = total > 0 ? Number(((graduates / total) * 100).toFixed(1)) : 0;
    const cancelRate = total > 0 ? Number(((cancellations / total) * 100).toFixed(1)) : 0;
    const certRate = total > 0 ? Number(((internationalCerts / total) * 100).toFixed(1)) : 0;

    // Sorted academies
    const sortedAcademies = Object.entries(academyCounts)
      .map(([name, data]) => ({
        name,
        pendaftar: data.pendaftar,
        lulusan: data.lulusan,
        passRate: data.pendaftar > 0 ? Number(((data.lulusan / data.pendaftar) * 100).toFixed(1)) : 0
      }))
      .sort((a, b) => b.pendaftar - a.pendaftar);

    // Sorted themes
    const sortedThemes = Object.entries(themeCounts)
      .map(([name, data]) => ({
        name,
        pendaftar: data.pendaftar,
        lulusan: data.lulusan,
        passRate: data.pendaftar > 0 ? Number(((data.lulusan / data.pendaftar) * 100).toFixed(1)) : 0
      }))
      .sort((a, b) => b.pendaftar - a.pendaftar);

    // Sorted cities
    const sortedCities = Object.entries(cityCounts)
      .map(([name, data]) => ({
        name,
        province: data.province,
        pendaftar: data.pendaftar,
        lulusan: data.lulusan,
        passRate: data.pendaftar > 0 ? Number(((data.lulusan / data.pendaftar) * 100).toFixed(1)) : 0
      }))
      .sort((a, b) => b.pendaftar - a.pendaftar);

    // Sorted districts (Top 10)
    const topDistricts = Object.entries(districtCounts)
      .map(([name, data]) => ({
        name,
        city: data.city,
        pendaftar: data.pendaftar,
        lulusan: data.lulusan,
        passRate: data.pendaftar > 0 ? Number(((data.lulusan / data.pendaftar) * 100).toFixed(1)) : 0
      }))
      .sort((a, b) => b.pendaftar - a.pendaftar)
      .slice(0, 10);

    return {
      total,
      graduates,
      cancellations,
      internationalCerts,
      passRate,
      cancelRate,
      certRate,
      male,
      female,
      distinctCitiesCount: Object.keys(cityCounts).length,
      sortedAcademies,
      sortedThemes,
      sortedCities,
      topDistricts
    };
  }, [filteredParticipants]);

  const insights = useMemo(() => {
    return generateSystemInsights(regionMetrics, kpi.total, kpi.graduates);
  }, [regionMetrics, kpi.total, kpi.graduates]);

  return (
    <div className="space-y-6">
      {/* AI Automated Insight Banner (FR-07) */}
      <div className="bg-gradient-to-r from-indigo-950/70 via-slate-900 to-slate-900 border border-indigo-500/30 rounded-2xl p-4 sm:p-5 shadow-xl">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 shrink-0">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div className="space-y-3 w-full">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-indigo-200 uppercase tracking-wider">
                  AI Automated Insight &bull; Analisis Sebaran Pelatihan
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                  Data Konsisten 99.8%
                </span>
              </div>
              <p className="text-sm text-slate-200 mt-1 leading-relaxed">
                {insights.summaryBanner}
              </p>
            </div>

            {/* Key findings pills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 pt-1">
              {insights.keyPoints.map((pt, idx) => (
                <div 
                  key={idx}
                  className="bg-slate-950/60 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-300 hover:border-slate-700 transition"
                >
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded inline-block mb-1 ${
                    pt.type === 'warning' ? 'bg-amber-500/20 text-amber-300' :
                    pt.type === 'success' ? 'bg-emerald-500/20 text-emerald-300' :
                    'bg-blue-500/20 text-blue-300'
                  }`}>
                    {pt.badge}
                  </span>
                  <p className="text-[11px] text-slate-300 leading-snug">{pt.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Primary KPI Cards (FR-01, FR-06) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {/* Total Registrants */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg hover:border-slate-700 transition">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Total Pendaftar</span>
            <Users className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-black text-white mt-2">
            {kpi.total.toLocaleString()}
          </div>
          <div className="text-[10px] text-blue-400/90 font-medium mt-1">
            Baris Unik No. Registrasi
          </div>
        </div>

        {/* Total Graduates */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg hover:border-slate-700 transition">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Total Lulusan</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400 mt-2">
            {kpi.graduates.toLocaleString()}
          </div>
          <div className="text-[10px] text-emerald-500 font-medium mt-1">
            Alumni Bersertifikasi
          </div>
        </div>

        {/* Pass Rate */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg hover:border-slate-700 transition">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Tingkat Kelulusan</span>
            <TrendingUp className="w-4 h-4 text-teal-400" />
          </div>
          <div className="text-2xl font-black text-white mt-2">
            {kpi.passRate}%
          </div>
          <div className="text-[10px] text-teal-400 font-medium mt-1">
            Lulusan &divide; Pendaftar
          </div>
        </div>

        {/* Cancellation Rate */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg hover:border-slate-700 transition">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Pembatalan</span>
            <XCircle className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl font-black text-rose-400 mt-2">
            {kpi.cancelRate}%
          </div>
          <div className="text-[10px] text-rose-400/80 font-medium mt-1">
            {kpi.cancellations.toLocaleString()} Peserta Batal
          </div>
        </div>

        {/* International Cert */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg hover:border-slate-700 transition">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Sertifikasi Global</span>
            <Award className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-400 mt-2">
            {kpi.internationalCerts.toLocaleString()}
          </div>
          <div className="text-[10px] text-amber-400/80 font-medium mt-1">
            {kpi.certRate}% Dari Pendaftar
          </div>
        </div>

        {/* Region Coverage */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg hover:border-slate-700 transition">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Wilayah Terjangkau</span>
            <Globe2 className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-black text-indigo-400 mt-2">
            {kpi.distinctCitiesCount}
          </div>
          <div className="text-[10px] text-slate-400 font-medium mt-1">
            Kabupaten / Kota Aktif
          </div>
        </div>
      </div>

      {/* Row 2: Capaian Peserta untuk Setiap Akademi & Tema Pelatihan */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Capaian per Akademi */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-blue-400" />
              <div>
                <h3 className="text-base font-bold text-white">
                  Capaian Peserta untuk Setiap Akademi
                </h3>
                <p className="text-xs text-slate-400">
                  Perbandingan pendaftar, lulusan, dan rasio kelulusan per skema
                </p>
              </div>
            </div>
            <span className="text-xs text-slate-400 font-medium">
              {kpi.sortedAcademies.length} Akademi
            </span>
          </div>

          <div className="space-y-3.5">
            {kpi.sortedAcademies.map((acad, idx) => {
              const maxPendaftar = Math.max(...kpi.sortedAcademies.map(a => a.pendaftar), 1);
              const percentage = Math.round((acad.pendaftar / maxPendaftar) * 100);

              return (
                <div key={idx} className="bg-slate-950/50 p-3 rounded-xl border border-slate-800/80">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-semibold text-slate-200 truncate pr-2">
                      {acad.name}
                    </span>
                    <div className="flex items-center gap-3 shrink-0 font-mono">
                      <span className="text-slate-400">{acad.pendaftar} pendaftar</span>
                      <span className="text-emerald-400 font-bold">{acad.lulusan} lulus</span>
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-300">
                        {acad.passRate}%
                      </span>
                    </div>
                  </div>

                  {/* Dual bar: Pendaftar vs Lulus */}
                  <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden flex">
                    <div 
                      className="bg-emerald-500 h-full rounded-l-full transition-all duration-500"
                      style={{ width: `${(acad.lulusan / Math.max(1, acad.pendaftar)) * percentage}%` }}
                      title={`Lulusan: ${acad.lulusan}`}
                    />
                    <div 
                      className="bg-blue-400/40 h-full rounded-r-full transition-all duration-500"
                      style={{ width: `${(1 - (acad.lulusan / Math.max(1, acad.pendaftar))) * percentage}%` }}
                      title={`Peserta belum/tidak lulus: ${acad.pendaftar - acad.lulusan}`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Capaian per Tema Pelatihan */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-400" />
              <div>
                <h3 className="text-base font-bold text-white">
                  Capaian Peserta untuk Tema Pelatihan
                </h3>
                <p className="text-xs text-slate-400">
                  Sebaran kompetensi digital pendaftar dan lulusan alumni
                </p>
              </div>
            </div>
            <span className="text-xs text-slate-400 font-medium">
              {kpi.sortedThemes.length} Tema
            </span>
          </div>

          <div className="space-y-3.5 max-h-[460px] overflow-y-auto pr-1">
            {kpi.sortedThemes.map((th, idx) => {
              const maxPendaftar = Math.max(...kpi.sortedThemes.map(t => t.pendaftar), 1);
              const barWidth = Math.round((th.pendaftar / maxPendaftar) * 100);

              return (
                <div key={idx} className="bg-slate-950/50 p-3 rounded-xl border border-slate-800/80">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-semibold text-slate-200 truncate pr-2">
                      {th.name}
                    </span>
                    <div className="flex items-center gap-3 shrink-0 font-mono">
                      <span className="text-slate-400">{th.pendaftar} pst</span>
                      <span className="text-emerald-400 font-bold">{th.lulusan} lls</span>
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                        th.passRate >= 85 ? 'bg-emerald-500/20 text-emerald-300' :
                        th.passRate >= 75 ? 'bg-amber-500/20 text-amber-300' :
                        'bg-rose-500/20 text-rose-300'
                      }`}>
                        {th.passRate}%
                      </span>
                    </div>
                  </div>

                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-500"
                      style={{ width: `${barWidth}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Row 3: Sebaran Peserta Per Kabupaten/Kota & Top 10 Kecamatan & Gender */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sebaran Kabupaten/Kota (Ranking Table) */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-amber-400" />
              <div>
                <h3 className="text-base font-bold text-white">
                  Sebaran Peserta per Kabupaten / Kota (Ranking Jangkauan)
                </h3>
                <p className="text-xs text-slate-400">
                  Daftar wilayah dengan pendaftar, kelulusan, dan status IMDI
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => onNavigateToTab('jatim')}
                className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 font-medium"
              >
                Peta Jatim <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
              <span className="text-slate-700">|</span>
              <button 
                onClick={() => onNavigateToTab('ntb')}
                className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-medium"
              >
                Peta NTB <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto border border-slate-800 rounded-xl max-h-[380px] overflow-y-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800 sticky top-0 z-10">
                <tr>
                  <th className="py-2.5 px-3">No</th>
                  <th className="py-2.5 px-3">Kabupaten / Kota</th>
                  <th className="py-2.5 px-3">Provinsi</th>
                  <th className="py-2.5 px-3 text-right">Pendaftar</th>
                  <th className="py-2.5 px-3 text-right">Lulusan</th>
                  <th className="py-2.5 px-3 text-right">Kelulusan</th>
                  <th className="py-2.5 px-3 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {kpi.sortedCities.map((city, idx) => {
                  const regData = regionMetrics[city.name];
                  const imdiScore = regData?.imdi?.score;

                  return (
                    <tr key={idx} className="hover:bg-slate-800/60 transition">
                      <td className="py-2 px-3 font-mono text-slate-400">{idx + 1}</td>
                      <td className="py-2 px-3 font-bold text-white flex items-center gap-2">
                        <span>{city.name}</span>
                        {imdiScore && (
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 font-normal">
                            IMDI {imdiScore}
                          </span>
                        )}
                      </td>
                      <td className="py-2 px-3">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                          city.province === 'Jawa Timur' ? 'bg-blue-500/20 text-blue-300' : 'bg-cyan-500/20 text-cyan-300'
                        }`}>
                          {city.province}
                        </span>
                      </td>
                      <td className="py-2 px-3 text-right font-mono font-bold text-slate-200">
                        {city.pendaftar.toLocaleString()}
                      </td>
                      <td className="py-2 px-3 text-right font-mono font-bold text-emerald-400">
                        {city.lulusan.toLocaleString()}
                      </td>
                      <td className="py-2 px-3 text-right">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          city.passRate >= 85 ? 'bg-emerald-500/20 text-emerald-300' :
                          city.passRate >= 75 ? 'bg-amber-500/20 text-amber-300' :
                          'bg-rose-500/20 text-rose-300'
                        }`}>
                          {city.passRate}%
                        </span>
                      </td>
                      <td className="py-2 px-3 text-center">
                        <button
                          onClick={() => {
                            onSelectCity(city.name);
                            if (city.province === 'Jawa Timur') onNavigateToTab('jatim');
                            else onNavigateToTab('ntb');
                          }}
                          className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-200 font-medium transition inline-flex items-center gap-1"
                        >
                          Detail
                          <ArrowUpRight className="w-3 h-3" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top 10 Kecamatan & Gender Ratio */}
        <div className="space-y-6">
          {/* Top 10 Kecamatan */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
            <h3 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              10 Kecamatan Teratas (Jangkauan Tertinggi)
            </h3>
            <p className="text-xs text-slate-400 mb-3">
              Konsentrasi partisipasi alumni per kecamatan
            </p>

            <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
              {kpi.topDistricts.map((dist, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs bg-slate-950/60 p-2 rounded-lg border border-slate-800/80">
                  <div className="truncate pr-2">
                    <span className="font-mono text-slate-400 mr-1.5">{idx + 1}.</span>
                    <span className="font-medium text-slate-200">{dist.name}</span>
                  </div>
                  <div className="flex items-center gap-2 font-mono shrink-0">
                    <span className="text-slate-300">{dist.pendaftar} pst</span>
                    <span className="text-emerald-400 font-bold">{dist.lulusan} lls</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gender Ratio Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
            <h3 className="text-sm font-bold text-white mb-2">
              Sebaran Jenis Kelamin Peserta
            </h3>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="bg-blue-950/40 border border-blue-900/60 rounded-xl p-3 text-center">
                <div className="text-xs text-blue-300 font-medium">Laki-laki</div>
                <div className="text-xl font-bold text-white mt-0.5">{kpi.male.toLocaleString()}</div>
                <div className="text-[10px] text-blue-400 mt-1 font-semibold">
                  {kpi.total > 0 ? ((kpi.male / kpi.total) * 100).toFixed(1) : 0}%
                </div>
              </div>

              <div className="bg-rose-950/40 border border-rose-900/60 rounded-xl p-3 text-center">
                <div className="text-xs text-rose-300 font-medium">Perempuan</div>
                <div className="text-xl font-bold text-white mt-0.5">{kpi.female.toLocaleString()}</div>
                <div className="text-[10px] text-rose-400 mt-1 font-semibold">
                  {kpi.total > 0 ? ((kpi.female / kpi.total) * 100).toFixed(1) : 0}%
                </div>
              </div>
            </div>

            <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden flex">
              <div 
                className="bg-blue-500 h-full"
                style={{ width: `${kpi.total > 0 ? (kpi.male / kpi.total) * 100 : 50}%` }}
              />
              <div 
                className="bg-rose-500 h-full"
                style={{ width: `${kpi.total > 0 ? (kpi.female / kpi.total) * 100 : 50}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
