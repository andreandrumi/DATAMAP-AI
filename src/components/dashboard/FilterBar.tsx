import React from 'react';
import { FilterState } from '../../types';
import { 
  Filter, 
  Search, 
  RotateCcw, 
  MapPin, 
  Building2, 
  BookOpen, 
  CheckCircle2, 
  Calendar,
  X
} from 'lucide-react';

interface FilterBarProps {
  filter: FilterState;
  onChangeFilter: (newFilter: FilterState) => void;
  availableCities: string[];
  availableAcademies: string[];
  availableThemes: string[];
  totalFiltered: number;
  totalAll: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filter,
  onChangeFilter,
  availableCities,
  availableAcademies,
  availableThemes,
  totalFiltered,
  totalAll
}) => {
  const handleReset = () => {
    onChangeFilter({
      province: 'All',
      city: 'All',
      academy: 'All',
      theme: 'All',
      status: 'All',
      gender: 'All',
      year: 'All',
      searchQuery: ''
    });
  };

  const hasActiveFilters = 
    filter.province !== 'All' ||
    filter.city !== 'All' ||
    filter.academy !== 'All' ||
    filter.theme !== 'All' ||
    filter.status !== 'All' ||
    (filter.gender && filter.gender !== 'All') ||
    filter.year !== 'All' ||
    filter.searchQuery.trim() !== '';

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-3">
      {/* Top Filter Controls */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={filter.searchQuery}
            onChange={(e) => onChangeFilter({ ...filter, searchQuery: e.target.value })}
            placeholder="Cari tema, akademi, pelatihan, kab/kota, atau kecamatan..."
            className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition"
          />
          {filter.searchQuery && (
            <button
              onClick={() => onChangeFilter({ ...filter, searchQuery: '' })}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Counter & Reset Button */}
        <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
          <div className="text-xs text-slate-300">
            Menampilkan <strong className="text-emerald-400 font-mono">{totalFiltered.toLocaleString()}</strong> dari{' '}
            <span className="text-slate-400 font-mono">{totalAll.toLocaleString()}</span> peserta
          </div>

          {hasActiveFilters && (
            <button
              onClick={handleReset}
              className="text-xs px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center gap-1.5 transition"
              title="Reset semua filter ke kondisi awal"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filter</span>
            </button>
          )}
        </div>
      </div>

      {/* Dropdown Filters Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2.5 pt-1">
        {/* Provinsi */}
        <div>
          <label className="text-[10px] text-slate-400 font-medium block mb-1">Provinsi</label>
          <select
            value={filter.province}
            onChange={(e) => onChangeFilter({ ...filter, province: e.target.value, city: 'All' })}
            className="w-full py-1.5 px-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-blue-500"
          >
            <option value="All">Semua Provinsi</option>
            <option value="Jawa Timur">Jawa Timur</option>
            <option value="Nusa Tenggara Barat">Nusa Tenggara Barat</option>
          </select>
        </div>

        {/* Kabupaten / Kota */}
        <div>
          <label className="text-[10px] text-slate-400 font-medium block mb-1">Kabupaten / Kota</label>
          <select
            value={filter.city}
            onChange={(e) => onChangeFilter({ ...filter, city: e.target.value })}
            className="w-full py-1.5 px-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-blue-500"
          >
            <option value="All">Semua Kab/Kota</option>
            {availableCities.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Akademi */}
        <div>
          <label className="text-[10px] text-slate-400 font-medium block mb-1">Akademi Pelatihan</label>
          <select
            value={filter.academy}
            onChange={(e) => onChangeFilter({ ...filter, academy: e.target.value })}
            className="w-full py-1.5 px-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-blue-500"
          >
            <option value="All">Semua Akademi</option>
            {availableAcademies.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>

        {/* Tema */}
        <div>
          <label className="text-[10px] text-slate-400 font-medium block mb-1">Tema Pelatihan</label>
          <select
            value={filter.theme}
            onChange={(e) => onChangeFilter({ ...filter, theme: e.target.value })}
            className="w-full py-1.5 px-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-blue-500"
          >
            <option value="All">Semua Tema</option>
            {availableThemes.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        {/* Status Peserta */}
        <div>
          <label className="text-[10px] text-slate-400 font-medium block mb-1">Status Kelulusan</label>
          <select
            value={filter.status}
            onChange={(e) => onChangeFilter({ ...filter, status: e.target.value })}
            className="w-full py-1.5 px-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-blue-500"
          >
            <option value="All">Semua Status</option>
            <option value="lulus">Lulus (Termasuk Lulus Pelatihan - Nilai / Alumni)</option>
            <option value="pembatalan">Pembatalan</option>
            <option value="tidak_lulus">Tidak Lulus</option>
            <option value="tidak_lulus_administrasi">Gagal Administrasi</option>
          </select>
        </div>

        {/* Jenis Kelamin */}
        <div>
          <label className="text-[10px] text-slate-400 font-medium block mb-1">Jenis Kelamin</label>
          <select
            value={filter.gender || 'All'}
            onChange={(e) => onChangeFilter({ ...filter, gender: e.target.value })}
            className="w-full py-1.5 px-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-blue-500"
          >
            <option value="All">Semua Gender</option>
            <option value="Laki-laki">Laki-laki</option>
            <option value="Perempuan">Perempuan</option>
          </select>
        </div>

        {/* Tahun Batch */}
        <div>
          <label className="text-[10px] text-slate-400 font-medium block mb-1">Tahun Batch</label>
          <select
            value={filter.year}
            onChange={(e) => onChangeFilter({ ...filter, year: e.target.value })}
            className="w-full py-1.5 px-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-blue-500"
          >
            <option value="All">Semua Tahun</option>
            <option value="2026">2026</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
          </select>
        </div>
      </div>
    </div>
  );
};
