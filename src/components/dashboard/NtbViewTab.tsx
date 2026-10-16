import React, { useState } from 'react';
import { RegionMetric } from '../../types';
import { NtbMap } from '../maps/NtbMap';
import { RegionDetailPanel } from './RegionDetailPanel';
import { Layers, Sparkles, Target, BarChart2 } from 'lucide-react';

interface NtbViewTabProps {
  regionMetrics: Record<string, RegionMetric>;
  selectedCity: string | null;
  onSelectCity: (cityName: string) => void;
  onFilterByCity: (cityName: string) => void;
}

export const NtbViewTab: React.FC<NtbViewTabProps> = ({
  regionMetrics,
  selectedCity,
  onSelectCity,
  onFilterByCity
}) => {
  const [activeMetric, setActiveMetric] = useState<
    'pendaftar' | 'lulusan' | 'tingkatKelulusan' | 'imdi' | 'priorityScore'
  >('pendaftar');

  const ntbCities = Object.values(regionMetrics).filter(r => r.province === 'Nusa Tenggara Barat');
  const effectiveSelectedCity = 
    selectedCity && regionMetrics[selectedCity]?.province === 'Nusa Tenggara Barat'
      ? selectedCity
      : 'Kota Mataram';

  const selectedRegionData = regionMetrics[effectiveSelectedCity] || ntbCities[0] || null;

  return (
    <div className="space-y-4">
      {/* Metric Selector Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 sm:p-4 shadow-xl flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">
            Layer Choropleth Peta NTB:
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <button
            onClick={() => setActiveMetric('pendaftar')}
            className={`text-xs px-3 py-1.5 rounded-xl font-medium transition flex items-center gap-1.5 ${
              activeMetric === 'pendaftar'
                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
            }`}
          >
            <BarChart2 className="w-3.5 h-3.5" />
            <span>Pendaftar</span>
          </button>

          <button
            onClick={() => setActiveMetric('lulusan')}
            className={`text-xs px-3 py-1.5 rounded-xl font-medium transition flex items-center gap-1.5 ${
              activeMetric === 'lulusan'
                ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/20'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
            }`}
          >
            <span>Lulusan</span>
          </button>

          <button
            onClick={() => setActiveMetric('tingkatKelulusan')}
            className={`text-xs px-3 py-1.5 rounded-xl font-medium transition flex items-center gap-1.5 ${
              activeMetric === 'tingkatKelulusan'
                ? 'bg-green-600 text-white shadow-lg shadow-green-600/20'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
            }`}
          >
            <span>Tingkat Kelulusan (%)</span>
          </button>

          <button
            onClick={() => setActiveMetric('imdi')}
            className={`text-xs px-3 py-1.5 rounded-xl font-medium transition flex items-center gap-1.5 ${
              activeMetric === 'imdi'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
            }`}
          >
            <Target className="w-3.5 h-3.5" />
            <span>Indeks IMDI (0-100)</span>
          </button>

          <button
            onClick={() => setActiveMetric('priorityScore')}
            className={`text-xs px-3 py-1.5 rounded-xl font-medium transition flex items-center gap-1.5 ${
              activeMetric === 'priorityScore'
                ? 'bg-red-600 text-white shadow-lg shadow-red-600/20'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Prioritas Intervensi</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Interactive Map + Detail Panel */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        <div className="xl:col-span-7 space-y-4">
          <NtbMap
            regionMetrics={regionMetrics}
            selectedCity={effectiveSelectedCity}
            onSelectCity={onSelectCity}
            activeMetric={activeMetric}
          />
        </div>

        <div className="xl:col-span-5">
          <RegionDetailPanel
            region={selectedRegionData}
            onClose={() => {}}
            onFilterByCity={onFilterByCity}
          />
        </div>
      </div>
    </div>
  );
};
