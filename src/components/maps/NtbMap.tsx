import React, { useState } from 'react';
import { RegionMetric } from '../../types';

interface NtbMapProps {
  regionMetrics: Record<string, RegionMetric>;
  selectedCity: string | null;
  onSelectCity: (cityName: string) => void;
  activeMetric: 'pendaftar' | 'lulusan' | 'tingkatKelulusan' | 'imdi' | 'priorityScore';
}

interface CityPin {
  id: string;
  name: string;
  island: 'Lombok' | 'Sumbawa';
  x: number;
  y: number;
  width: number;
  height: number;
}

const NTB_CITIES: CityPin[] = [
  // Pulau Lombok (West side)
  { id: 'lombok_utara', name: 'Kab. Lombok Utara', island: 'Lombok', x: 190, y: 110, width: 85, height: 48 },
  { id: 'mataram', name: 'Kota Mataram', island: 'Lombok', x: 140, y: 175, width: 75, height: 42 },
  { id: 'lombok_barat', name: 'Kab. Lombok Barat', island: 'Lombok', x: 140, y: 235, width: 85, height: 50 },
  { id: 'lombok_tengah', name: 'Kab. Lombok Tengah', island: 'Lombok', x: 215, y: 220, width: 90, height: 52 },
  { id: 'lombok_timur', name: 'Kab. Lombok Timur', island: 'Lombok', x: 285, y: 165, width: 95, height: 54 },

  // Pulau Sumbawa (East side)
  { id: 'sumbawa_barat', name: 'Kab. Sumbawa Barat', island: 'Sumbawa', x: 440, y: 210, width: 100, height: 52 },
  { id: 'sumbawa', name: 'Kab. Sumbawa', island: 'Sumbawa', x: 530, y: 155, width: 105, height: 56 },
  { id: 'dompu', name: 'Kab. Dompu', island: 'Sumbawa', x: 670, y: 185, width: 90, height: 52 },
  { id: 'bima_kab', name: 'Kab. Bima', island: 'Sumbawa', x: 750, y: 220, width: 95, height: 54 },
  { id: 'bima_kota', name: 'Kota Bima', island: 'Sumbawa', x: 770, y: 155, width: 80, height: 44 },
];

export const NtbMap: React.FC<NtbMapProps> = ({
  regionMetrics,
  selectedCity,
  onSelectCity,
  activeMetric
}) => {
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);

  const getFillColor = (cityName: string) => {
    const data = regionMetrics[cityName];
    const isSelected = selectedCity === cityName;

    if (isSelected) return '#3b82f6';
    if (!data) return '#e2e8f0';

    if (activeMetric === 'pendaftar') {
      const v = data.pendaftar;
      if (v > 120) return '#047857';
      if (v > 70) return '#10b981';
      if (v > 40) return '#34d399';
      if (v > 0) return '#a7f3d0';
      return '#1e293b';
    }

    if (activeMetric === 'lulusan') {
      const v = data.lulusan;
      if (v > 90) return '#0d9488';
      if (v > 50) return '#14b8a6';
      if (v > 30) return '#5eead4';
      if (v > 0) return '#ccfbf1';
      return '#1e293b';
    }

    if (activeMetric === 'tingkatKelulusan') {
      const v = data.tingkatKelulusan;
      if (v >= 90) return '#15803d';
      if (v >= 80) return '#22c55e';
      if (v >= 70) return '#eab308';
      if (v > 0) return '#f97316';
      return '#1e293b';
    }

    if (activeMetric === 'imdi') {
      const v = data.imdi?.score || 0;
      if (v >= 52) return '#6366f1';
      if (v >= 45) return '#818cf8';
      if (v >= 40) return '#a5b4fc';
      return '#1e293b';
    }

    if (activeMetric === 'priorityScore') {
      if (data.pendaftar === 0) return '#1e293b';
      const v = data.priorityScore;
      if (v >= 65) return '#dc2626';
      if (v >= 50) return '#ea580c';
      if (v >= 35) return '#facc15';
      return '#86efac';
    }

    return '#1e293b';
  };

  const hoveredData = hoveredCity ? regionMetrics[hoveredCity] : null;

  return (
    <div className="relative w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl overflow-hidden">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-4 border-b border-slate-800 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></span>
            <h3 className="text-lg font-bold text-white tracking-wide">
              Peta Sebaran Pelatihan: Provinsi Nusa Tenggara Barat (10 Kab/Kota)
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Wilayah kerja gugus Pulau Lombok dan Pulau Sumbawa. Klik wilayah untuk telaah rekomendasi tematik berbasis angka.
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-2 text-xs text-slate-300 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/60">
          <span className="text-slate-400 font-medium">Indikator:</span>
          {activeMetric === 'pendaftar' && (
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-emerald-300"></span> Rendah
              <span className="w-2.5 h-2.5 rounded bg-emerald-500"></span> Sedang
              <span className="w-2.5 h-2.5 rounded bg-emerald-800"></span> Tinggi (&gt;100)
            </span>
          )}
          {activeMetric === 'lulusan' && (
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-teal-200"></span> Sedikit
              <span className="w-2.5 h-2.5 rounded bg-teal-500"></span> Sedang
              <span className="w-2.5 h-2.5 rounded bg-teal-800"></span> Banyak
            </span>
          )}
          {activeMetric === 'tingkatKelulusan' && (
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-orange-500"></span> &lt;70%
              <span className="w-2.5 h-2.5 rounded bg-yellow-500"></span> 70-85%
              <span className="w-2.5 h-2.5 rounded bg-green-600"></span> &ge;85%
            </span>
          )}
          {activeMetric === 'imdi' && (
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-indigo-200"></span> &lt;40
              <span className="w-2.5 h-2.5 rounded bg-indigo-400"></span> 40-48
              <span className="w-2.5 h-2.5 rounded bg-indigo-700"></span> &gt;50 (Tinggi)
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
          viewBox="100 60 800 280"
          className="w-full h-full drop-shadow-md"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle background sea & straits */}
          <rect x="100" y="60" width="800" height="280" fill="transparent" />

          {/* Island Water separators */}
          <path
            d="M 100 80 Q 400 70 900 80"
            fill="none"
            stroke="#1e293b"
            strokeWidth="1.5"
            strokeDasharray="4,4"
          />
          <path
            d="M 100 320 Q 400 330 900 320"
            fill="none"
            stroke="#1e293b"
            strokeWidth="1.5"
            strokeDasharray="4,4"
          />

          {/* Island Labels */}
          <g>
            <text x="210" y="85" fill="#38bdf8" fontSize="13" fontWeight="700" letterSpacing="1">
              GUGUS PULAU LOMBOK
            </text>
            <text x="580" y="85" fill="#38bdf8" fontSize="13" fontWeight="700" letterSpacing="1">
              GUGUS PULAU SUMBAWA
            </text>
            <text x="390" y="195" fill="#64748b" fontSize="10" fontWeight="600" textAnchor="middle">
              SELAT ALAS
            </text>
            <path
              d="M 390 130 L 390 260"
              stroke="#334155"
              strokeWidth="1"
              strokeDasharray="3,3"
            />
          </g>

          {/* Render All 10 NTB Cities */}
          {NTB_CITIES.map((c) => {
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
                <rect
                  x={c.x}
                  y={c.y}
                  width={c.width}
                  height={c.height}
                  rx="8"
                  fill={fillColor}
                  stroke={isSelected ? '#60a5fa' : isHovered ? '#f8fafc' : '#334155'}
                  strokeWidth={isSelected ? '3' : isHovered ? '2' : '1'}
                  style={{
                    filter: isHovered || isSelected ? 'drop-shadow(0 4px 6px rgba(0,0,0,0.4))' : 'none'
                  }}
                />

                <text
                  x={c.x + c.width / 2}
                  y={c.y + c.height / 2 - 4}
                  textAnchor="middle"
                  fill={isHovered || isSelected ? '#ffffff' : fillColor === '#1e293b' ? '#cbd5e1' : '#0f172a'}
                  fontSize="9.5"
                  fontWeight="700"
                  pointerEvents="none"
                >
                  {c.name.replace('Kab. ', '').replace('Kota ', 'Kota ')}
                </text>

                <text
                  x={c.x + c.width / 2}
                  y={c.y + c.height / 2 + 10}
                  textAnchor="middle"
                  fill={isHovered || isSelected ? '#e2e8f0' : fillColor === '#1e293b' ? '#64748b' : '#1e293b'}
                  fontSize="8.5"
                  fontWeight="600"
                  pointerEvents="none"
                >
                  {activeMetric === 'pendaftar' && `${data ? data.pendaftar : 0} pst`}
                  {activeMetric === 'lulusan' && `${data ? data.lulusan : 0} lls`}
                  {activeMetric === 'tingkatKelulusan' && `${data ? data.tingkatKelulusan : 0}%`}
                  {activeMetric === 'imdi' && `IMDI ${data?.imdi?.score || '-'}`}
                  {activeMetric === 'priorityScore' && (data && data.pendaftar > 0 ? `Skor ${data.priorityScore}` : '0 pst')}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Hover Tooltip */}
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
                <span className="text-slate-400">Pendaftar:</span>
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
            <div className="mt-2 text-[10px] text-cyan-400 font-medium italic">
              Klik wilayah untuk membuka panel rekomendasi
            </div>
          </div>
        )}
      </div>

      <div className="text-[11px] text-slate-400 flex items-center justify-between pt-2 border-t border-slate-800">
        <span>Provinsi NTB: 8 Kabupaten & 2 Kota</span>
        <span>Standardisasi Nama Wilayah: BPS Kemendagri 2026</span>
      </div>
    </div>
  );
};
