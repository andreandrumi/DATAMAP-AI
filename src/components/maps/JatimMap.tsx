import React, { useState } from 'react';
import { RegionMetric } from '../../types';

interface JatimMapProps {
  regionMetrics: Record<string, RegionMetric>;
  selectedCity: string | null;
  onSelectCity: (cityName: string) => void;
  activeMetric: 'pendaftar' | 'lulusan' | 'tingkatKelulusan' | 'imdi' | 'priorityScore';
}

// Spatial placement coordinates for 38 Kabupaten/Kota in East Java (Mainland & Madura)
interface CityPin {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isMadura?: boolean;
}

const JATIM_CITIES: CityPin[] = [
  // Madura Island (North-East)
  { id: 'bangkalan', name: 'Kab. Bangkalan', x: 570, y: 75, width: 75, height: 42, isMadura: true },
  { id: 'sampang', name: 'Kab. Sampang', x: 655, y: 70, width: 68, height: 45, isMadura: true },
  { id: 'pamekasan', name: 'Kab. Pamekasan', x: 730, y: 75, width: 68, height: 45, isMadura: true },
  { id: 'sumenep', name: 'Kab. Sumenep', x: 805, y: 65, width: 95, height: 50, isMadura: true },

  // Surabaya & Greater Area (Gerbangkertosusila)
  { id: 'surabaya', name: 'Kota Surabaya', x: 550, y: 155, width: 72, height: 38 },
  { id: 'sidoarjo', name: 'Kab. Sidoarjo', x: 550, y: 200, width: 74, height: 40 },
  { id: 'gresik', name: 'Kab. Gresik', x: 490, y: 135, width: 70, height: 42 },

  // Pantura & West Inland
  { id: 'tuban', name: 'Kab. Tuban', x: 345, y: 95, width: 75, height: 45 },
  { id: 'lamongan', name: 'Kab. Lamongan', x: 425, y: 125, width: 72, height: 44 },
  { id: 'bojonegoro', name: 'Kab. Bojonegoro', x: 275, y: 130, width: 85, height: 46 },
  { id: 'ngawi', name: 'Kab. Ngawi', x: 195, y: 175, width: 78, height: 44 },
  { id: 'magetan', name: 'Kab. Magetan', x: 180, y: 225, width: 74, height: 40 },
  { id: 'madiun_kab', name: 'Kab. Madiun', x: 260, y: 205, width: 70, height: 42 },
  { id: 'madiun_kota', name: 'Kota Madiun', x: 235, y: 250, width: 64, height: 30 },
  { id: 'nganjuk', name: 'Kab. Nganjuk', x: 335, y: 205, width: 72, height: 44 },

  // Central & Mojokerto/Jombang
  { id: 'jombang', name: 'Kab. Jombang', x: 415, y: 205, width: 72, height: 44 },
  { id: 'mojokerto_kab', name: 'Kab. Mojokerto', x: 475, y: 190, width: 70, height: 42 },
  { id: 'mojokerto_kota', name: 'Kota Mojokerto', x: 485, y: 235, width: 62, height: 28 },

  // Kediri & Blitar & Mataraman
  { id: 'kediri_kab', name: 'Kab. Kediri', x: 355, y: 260, width: 72, height: 44 },
  { id: 'kediri_kota', name: 'Kota Kediri', x: 350, y: 310, width: 64, height: 30 },
  { id: 'tulungagung', name: 'Kab. Tulungagung', x: 330, y: 345, width: 76, height: 45 },
  { id: 'trenggalek', name: 'Kab. Trenggalek', x: 250, y: 335, width: 75, height: 45 },
  { id: 'ponorogo', name: 'Kab. Ponorogo', x: 190, y: 280, width: 75, height: 45 },
  { id: 'pacitan', name: 'Kab. Pacitan', x: 140, y: 340, width: 85, height: 48 },

  { id: 'blitar_kab', name: 'Kab. Blitar', x: 415, y: 340, width: 72, height: 45 },
  { id: 'blitar_kota', name: 'Kota Blitar', x: 420, y: 310, width: 62, height: 28 },

  // Malang Raya
  { id: 'batu_kota', name: 'Kota Batu', x: 455, y: 270, width: 64, height: 32 },
  { id: 'malang_kota', name: 'Kota Malang', x: 500, y: 295, width: 68, height: 34 },
  { id: 'malang_kab', name: 'Kab. Malang', x: 485, y: 345, width: 85, height: 50 },

  // Pasuruan & Probolinggo & Lumajang
  { id: 'pasuruan_kab', name: 'Kab. Pasuruan', x: 565, y: 250, width: 76, height: 44 },
  { id: 'pasuruan_kota', name: 'Kota Pasuruan', x: 595, y: 220, width: 65, height: 28 },
  { id: 'probolinggo_kab', name: 'Kab. Probolinggo', x: 650, y: 255, width: 80, height: 46 },
  { id: 'probolinggo_kota', name: 'Kota Probolinggo', x: 655, y: 215, width: 66, height: 28 },
  { id: 'lumajang', name: 'Kab. Lumajang', x: 595, y: 320, width: 76, height: 48 },

  // Tapal Kuda (East Extremity)
  { id: 'jember', name: 'Kab. Jember', x: 680, y: 325, width: 82, height: 48 },
  { id: 'bondowoso', name: 'Kab. Bondowoso', x: 740, y: 255, width: 76, height: 45 },
  { id: 'situbondo', name: 'Kab. Situbondo', x: 755, y: 195, width: 80, height: 42 },
  { id: 'banyuwangi', name: 'Kab. Banyuwangi', x: 810, y: 285, width: 95, height: 55 },
];

export const JatimMap: React.FC<JatimMapProps> = ({
  regionMetrics,
  selectedCity,
  onSelectCity,
  activeMetric
}) => {
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);

  // Compute color for each city based on active metric
  const getFillColor = (cityName: string) => {
    const data = regionMetrics[cityName];
    const isSelected = selectedCity === cityName;
    const isHovered = hoveredCity === cityName;

    if (isSelected) return '#3b82f6'; // Bright blue for selected

    if (!data) return '#e2e8f0';

    if (activeMetric === 'pendaftar') {
      const v = data.pendaftar;
      if (v > 150) return '#047857'; // Deep emerald
      if (v > 90) return '#10b981';
      if (v > 50) return '#34d399';
      if (v > 0) return '#a7f3d0';
      return '#f1f5f9';
    }

    if (activeMetric === 'lulusan') {
      const v = data.lulusan;
      if (v > 120) return '#0d9488'; // Deep teal
      if (v > 70) return '#14b8a6';
      if (v > 40) return '#5eead4';
      if (v > 0) return '#ccfbf1';
      return '#f1f5f9';
    }

    if (activeMetric === 'tingkatKelulusan') {
      const v = data.tingkatKelulusan;
      if (v >= 90) return '#15803d'; // Green
      if (v >= 80) return '#22c55e';
      if (v >= 70) return '#eab308'; // Amber
      if (v > 0) return '#f97316'; // Orange
      return '#e2e8f0';
    }

    if (activeMetric === 'imdi') {
      const v = data.imdi?.score || 0;
      if (v >= 55) return '#6366f1'; // Indigo
      if (v >= 50) return '#818cf8';
      if (v >= 43) return '#a5b4fc';
      if (v > 0) return '#c7d2fe';
      return '#f1f5f9';
    }

    if (activeMetric === 'priorityScore') {
      const v = data.priorityScore;
      if (v >= 65) return '#dc2626'; // Red high urgency
      if (v >= 50) return '#ea580c'; // Orange
      if (v >= 35) return '#facc15'; // Yellow
      return '#86efac'; // Green low urgency
    }

    return '#cbd5e1';
  };

  const hoveredData = hoveredCity ? regionMetrics[hoveredCity] : null;

  return (
    <div className="relative w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl overflow-hidden">
      {/* Map Control Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-4 border-b border-slate-800 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <h3 className="text-lg font-bold text-white tracking-wide">
              Peta Sebaran Pelatihan: Provinsi Jawa Timur (38 Kab/Kota)
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Klik salah satu wilayah untuk membuka laporan analitik detail, capaian akademi, dan rekomendasi AI berbobot IMDI.
          </p>
        </div>

        {/* Legend pills */}
        <div className="flex items-center gap-2 text-xs text-slate-300 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/60">
          <span className="text-slate-400 font-medium">Indikator:</span>
          {activeMetric === 'pendaftar' && (
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-emerald-300"></span> Rendah
              <span className="w-2.5 h-2.5 rounded bg-emerald-500"></span> Sedang
              <span className="w-2.5 h-2.5 rounded bg-emerald-800"></span> Tinggi (&gt;150)
            </span>
          )}
          {activeMetric === 'lulusan' && (
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-teal-200"></span> Sedikit
              <span className="w-2.5 h-2.5 rounded bg-teal-500"></span> Sedang
              <span className="w-2.5 h-2.5 rounded bg-teal-800"></span> Banyak (&gt;100)
            </span>
          )}
          {activeMetric === 'tingkatKelulusan' && (
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-orange-500"></span> &lt;70%
              <span className="w-2.5 h-2.5 rounded bg-yellow-500"></span> 70-80%
              <span className="w-2.5 h-2.5 rounded bg-green-600"></span> &ge;90%
            </span>
          )}
          {activeMetric === 'imdi' && (
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-indigo-200"></span> &lt;40
              <span className="w-2.5 h-2.5 rounded bg-indigo-400"></span> 40-50
              <span className="w-2.5 h-2.5 rounded bg-indigo-700"></span> &gt;55 (Sangat Tinggi)
            </span>
          )}
          {activeMetric === 'priorityScore' && (
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-green-400"></span> Terpenuhi
              <span className="w-2.5 h-2.5 rounded bg-yellow-400"></span> Sedang
              <span className="w-2.5 h-2.5 rounded bg-red-600"></span> Prioritas Intervensi
            </span>
          )}
        </div>
      </div>

      {/* SVG Canvas Map */}
      <div className="relative w-full aspect-[16/8] sm:aspect-[16/7.5] my-2 select-none">
        <svg
          viewBox="100 40 850 380"
          className="w-full h-full drop-shadow-md"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle regional boundaries background & Sea */}
          <rect x="100" y="40" width="850" height="380" fill="transparent" />
          
          {/* Decorative Sea lines */}
          <path
            d="M 100 130 Q 300 110 500 120 T 950 110"
            fill="none"
            stroke="#1e293b"
            strokeWidth="1.5"
            strokeDasharray="4,4"
          />
          <path
            d="M 100 395 Q 500 410 950 395"
            fill="none"
            stroke="#1e293b"
            strokeWidth="1.5"
            strokeDasharray="4,4"
          />

          {/* Region Label: Laut Jawa & Samudera Hindia */}
          <text x="540" y="60" fill="#475569" fontSize="12" fontWeight="600" letterSpacing="2">
            LAUT JAWA
          </text>
          <text x="700" y="60" fill="#38bdf8" fontSize="11" fontWeight="500">
            PULAU MADURA
          </text>
          <text x="500" y="415" fill="#475569" fontSize="12" fontWeight="600" letterSpacing="2">
            SAMUDERA HINDIA
          </text>
          <text x="910" y="270" fill="#475569" fontSize="10" fontWeight="600">
            SELAT BALI &rarr;
          </text>

          {/* Render All 38 City Nodes */}
          {JATIM_CITIES.map((c) => {
            const isHovered = hoveredCity === c.name;
            const isSelected = selectedCity === c.name;
            const data = regionMetrics[c.name];
            const fillColor = getFillColor(c.name);

            return (
              <g
                key={c.id}
                className="cursor-pointer transition-all duration-200"
                onMouseEnter={() => setHoveredCity(c.name)}
                onMouseLeave={() => setHoveredCity(null)}
                onClick={() => onSelectCity(c.name)}
              >
                {/* Node Shape */}
                <rect
                  x={c.x}
                  y={c.y}
                  width={c.width}
                  height={c.height}
                  rx="7"
                  fill={fillColor}
                  stroke={isSelected ? '#60a5fa' : isHovered ? '#f8fafc' : '#334155'}
                  strokeWidth={isSelected ? '3' : isHovered ? '2' : '1'}
                  className="transition-transform duration-150"
                  style={{
                    filter: isHovered || isSelected ? 'drop-shadow(0 4px 6px rgba(0,0,0,0.4))' : 'none',
                    transformOrigin: `${c.x + c.width / 2}px ${c.y + c.height / 2}px`
                  }}
                />

                {/* City Abbreviation or Name */}
                <text
                  x={c.x + c.width / 2}
                  y={c.y + c.height / 2 - 4}
                  textAnchor="middle"
                  fill={isHovered || isSelected ? '#ffffff' : '#0f172a'}
                  fontSize={c.width > 70 ? '9.5' : '8.5'}
                  fontWeight="700"
                  pointerEvents="none"
                >
                  {c.name.replace('Kab. ', '').replace('Kota ', 'K. ')}
                </text>

                {/* Metric Sub-label */}
                <text
                  x={c.x + c.width / 2}
                  y={c.y + c.height / 2 + 9}
                  textAnchor="middle"
                  fill={isHovered || isSelected ? '#e2e8f0' : '#1e293b'}
                  fontSize="8"
                  fontWeight="600"
                  pointerEvents="none"
                >
                  {activeMetric === 'pendaftar' && `${data ? data.pendaftar : 0} pst`}
                  {activeMetric === 'lulusan' && `${data ? data.lulusan : 0} lls`}
                  {activeMetric === 'tingkatKelulusan' && `${data ? data.tingkatKelulusan : 0}%`}
                  {activeMetric === 'imdi' && `IMDI ${data?.imdi?.score || '-'}`}
                  {activeMetric === 'priorityScore' && `Skor ${data?.priorityScore || '-'}`}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Floating Quick Tooltip */}
        {hoveredData && (
          <div className="absolute top-4 right-4 pointer-events-none bg-slate-950/90 backdrop-blur-md border border-slate-700/80 rounded-xl p-3 shadow-2xl text-xs text-slate-200 z-30 max-w-xs animate-in fade-in duration-150">
            <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-1.5 mb-2">
              <span className="font-bold text-sm text-white">{hoveredData.city}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 font-semibold">
                IMDI: {hoveredData.imdi?.score || 'N/A'}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[11px]">
              <div>
                <span className="text-slate-400">Total Pendaftar:</span>
                <span className="font-bold text-emerald-400 ml-1">{hoveredData.pendaftar}</span>
              </div>
              <div>
                <span className="text-slate-400">Lulusan:</span>
                <span className="font-bold text-teal-400 ml-1">{hoveredData.lulusan}</span>
              </div>
              <div>
                <span className="text-slate-400">Kelulusan:</span>
                <span className="font-bold text-amber-400 ml-1">{hoveredData.tingkatKelulusan}%</span>
              </div>
              <div>
                <span className="text-slate-400">Pembatalan:</span>
                <span className="font-bold text-rose-400 ml-1">{hoveredData.tingkatPembatalan}%</span>
              </div>
            </div>
            {hoveredData.topThemes.length > 0 && (
              <div className="mt-2 pt-1.5 border-t border-slate-800 text-[10px] text-slate-300">
                <span className="text-slate-400">Tema Terbanyak: </span>
                <span className="font-medium text-slate-100">{hoveredData.topThemes[0].name}</span>
              </div>
            )}
            <div className="mt-1 text-[10px] text-cyan-400 font-medium italic">
              Klik wilayah untuk membuka panel telaah lengkap
            </div>
          </div>
        )}
      </div>

      <div className="text-[11px] text-slate-400 flex items-center justify-between pt-2 border-t border-slate-800">
        <span>Provinsi Jawa Timur: 29 Kabupaten & 9 Kota</span>
        <span>Standardisasi Nama Wilayah: BPS Kemendagri 2026</span>
      </div>
    </div>
  );
};
