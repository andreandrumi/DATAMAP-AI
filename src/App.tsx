/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  ParticipantRecord, 
  RegionMetric, 
  FilterState, 
  ReconciliationReport, 
  AuditFinding 
} from './types';
import { 
  BENCHMARK_IMDI, 
  INITIAL_BENCHMARK_PARTICIPANTS, 
  INITIAL_AUDIT_FINDINGS 
} from './data/benchmarkData';
import { 
  aggregateMetricsByRegion, 
  STANDARD_COLUMNS 
} from './utils/dataProcessor';

import { KpiOverviewTab } from './components/dashboard/KpiOverviewTab';
import { JatimViewTab } from './components/dashboard/JatimViewTab';
import { NtbViewTab } from './components/dashboard/NtbViewTab';
import { DataAuditTab } from './components/dashboard/DataAuditTab';
import { UploadManagementTab } from './components/dashboard/UploadManagementTab';
import { FilterBar } from './components/dashboard/FilterBar';
import { ExecutiveExportModal } from './components/dashboard/ExecutiveExportModal';

import { 
  BarChart3, 
  Map as MapIcon, 
  Compass, 
  ShieldCheck, 
  Upload, 
  FileDown, 
  Sparkles, 
  Layers, 
  Database,
  Building,
  CheckCircle,
  Activity
} from 'lucide-react';

export default function App() {
  // Navigation active tab
  const [activeTab, setActiveTab] = useState<'kpi' | 'jatim' | 'ntb' | 'audit' | 'upload'>('kpi');

  // Master Participants State
  const [participants, setParticipants] = useState<ParticipantRecord[]>(INITIAL_BENCHMARK_PARTICIPANTS);

  // Reconciliation & Audit Report State
  const [auditReport, setAuditReport] = useState<ReconciliationReport>({
    totalFiles: 4,
    totalRowsReceived: INITIAL_BENCHMARK_PARTICIPANTS.length + 48,
    totalRowsValid: INITIAL_BENCHMARK_PARTICIPANTS.length,
    totalDuplicatesExcluded: 48,
    totalAnomaliesFixed: 64,
    totalPIIRedacted: INITIAL_BENCHMARK_PARTICIPANTS.length + 48,
    reconciliationRate: 100,
    columnMappingSummary: STANDARD_COLUMNS.map(c => ({
      columnName: c.name,
      detectedHeader: c.synonyms[0],
      status: c.excludedForPrivacy ? 'excluded_pdp' : 'mapped',
      matchConfidence: 0.98
    })),
    findings: INITIAL_AUDIT_FINDINGS
  });

  // Selected City on Map / Table
  const [selectedCity, setSelectedCity] = useState<string | null>('Kota Surabaya');

  // Export Modal Open State
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  // Multi-dimensional Filter State (FR-04)
  const [filter, setFilter] = useState<FilterState>({
    province: 'All',
    city: 'All',
    academy: 'All',
    theme: 'All',
    status: 'All',
    year: 'All',
    searchQuery: ''
  });

  // Handle uploaded files ingestion
  const handleIngestFiles = (
    newRecords: ParticipantRecord[],
    rowsReceived: number,
    duplicatesRemoved: number,
    anomaliesFixed: number,
    piiRedacted: number,
    findings: AuditFinding[],
    fileName: string
  ) => {
    // Merge new records, ensuring deduplication by registrationNumber
    const existingMap = new Map<string, ParticipantRecord>();
    for (const r of participants) {
      existingMap.set(r.registrationNumber, r);
    }
    for (const r of newRecords) {
      existingMap.set(r.registrationNumber, r);
    }

    const merged = Array.from(existingMap.values());
    setParticipants(merged);

    // Update reconciliation report
    setAuditReport(prev => ({
      ...prev,
      totalFiles: prev.totalFiles + 1,
      totalRowsReceived: prev.totalRowsReceived + rowsReceived,
      totalRowsValid: merged.length,
      totalDuplicatesExcluded: prev.totalDuplicatesExcluded + duplicatesRemoved,
      totalAnomaliesFixed: prev.totalAnomaliesFixed + anomaliesFixed,
      totalPIIRedacted: prev.totalPIIRedacted + piiRedacted,
      findings: [...findings, ...prev.findings]
    }));
  };

  // Reset to Benchmark Data
  const handleResetToBenchmark = () => {
    setParticipants(INITIAL_BENCHMARK_PARTICIPANTS);
    setAuditReport({
      totalFiles: 4,
      totalRowsReceived: INITIAL_BENCHMARK_PARTICIPANTS.length + 48,
      totalRowsValid: INITIAL_BENCHMARK_PARTICIPANTS.length,
      totalDuplicatesExcluded: 48,
      totalAnomaliesFixed: 64,
      totalPIIRedacted: INITIAL_BENCHMARK_PARTICIPANTS.length + 48,
      reconciliationRate: 100,
      columnMappingSummary: STANDARD_COLUMNS.map(c => ({
        columnName: c.name,
        detectedHeader: c.synonyms[0],
        status: c.excludedForPrivacy ? 'excluded_pdp' : 'mapped',
        matchConfidence: 0.98
      })),
      findings: INITIAL_AUDIT_FINDINGS
    });
    setSelectedCity('Kota Surabaya');
    setFilter({
      province: 'All',
      city: 'All',
      academy: 'All',
      theme: 'All',
      status: 'All',
      year: 'All',
      searchQuery: ''
    });
  };

  // Available Filter Options (derived from current dataset)
  const availableCities = useMemo(() => {
    let list = participants;
    if (filter.province !== 'All') {
      list = list.filter(p => p.province === filter.province);
    }
    const unique = Array.from(new Set(list.map(p => p.city))).sort();
    return unique;
  }, [participants, filter.province]);

  const availableAcademies = useMemo(() => {
    return Array.from(new Set(participants.map(p => p.academyName))).sort();
  }, [participants]);

  const availableThemes = useMemo(() => {
    return Array.from(new Set(participants.map(p => p.themeName))).sort();
  }, [participants]);

  // Filtered Participants (runs instantaneously < 50ms)
  const filteredParticipants = useMemo(() => {
    return participants.filter(p => {
      if (filter.province !== 'All' && p.province !== filter.province) return false;
      if (filter.city !== 'All' && p.city !== filter.city) return false;
      if (filter.academy !== 'All' && p.academyName !== filter.academy) return false;
      if (filter.theme !== 'All' && p.themeName !== filter.theme) return false;
      if (filter.status !== 'All' && p.status !== filter.status) return false;
      if (filter.year !== 'All' && String(p.batchYear) !== filter.year) return false;

      if (filter.searchQuery.trim()) {
        const query = filter.searchQuery.toLowerCase();
        const match = 
          p.city.toLowerCase().includes(query) ||
          p.themeName.toLowerCase().includes(query) ||
          p.academyName.toLowerCase().includes(query) ||
          p.trainingName.toLowerCase().includes(query) ||
          (p.district && p.district.toLowerCase().includes(query));
        if (!match) return false;
      }

      return true;
    });
  }, [participants, filter]);

  // Aggregated Regional Metrics (for maps & detail panels)
  const regionMetrics = useMemo(() => {
    return aggregateMetricsByRegion(filteredParticipants, BENCHMARK_IMDI);
  }, [filteredParticipants]);

  // Helper for single city filter
  const handleFilterByCity = (cityName: string) => {
    const reg = regionMetrics[cityName];
    setFilter(prev => ({
      ...prev,
      city: cityName,
      province: reg ? reg.province : prev.province
    }));
    setActiveTab('kpi');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-500 selection:text-white">
      {/* Top Navbar Header */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Brand & Badge */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-emerald-400 p-0.5 shadow-lg shadow-blue-500/20 flex items-center justify-center">
              <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                <Activity className="w-5 h-5 text-emerald-400" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-black text-white tracking-tight">
                  DATAMAP AI
                </h1>
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  MRKI System
                </span>
              </div>
              <p className="text-[11px] text-slate-400 truncate max-w-xs sm:max-w-md font-medium">
                Precision Mapping for Training Reach
              </p>
            </div>
          </div>

          {/* Quick Actions Header */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setIsExportModalOpen(true)}
              className="text-xs px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5 transition shadow"
              title="Ekspor laporan eksekutif atau unduh agregat Excel"
            >
              <FileDown className="w-3.5 h-3.5 text-blue-400" />
              <span className="hidden sm:inline">Laporan Eksekutif</span>
            </button>

            <button
              onClick={() => setActiveTab('upload')}
              className="text-xs px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold flex items-center gap-1.5 shadow-lg shadow-blue-600/30 transition"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Unggah Data</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation Menu */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1 sm:gap-2 overflow-x-auto scrollbar-none border-t border-slate-800/60 py-1.5 text-xs">
          <button
            onClick={() => setActiveTab('kpi')}
            className={`px-3 py-1.5 rounded-xl font-semibold transition flex items-center gap-2 shrink-0 ${
              activeTab === 'kpi'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>KPI dan Insight</span>
          </button>

          <button
            onClick={() => setActiveTab('jatim')}
            className={`px-3 py-1.5 rounded-xl font-semibold transition flex items-center gap-2 shrink-0 ${
              activeTab === 'jatim'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <MapIcon className="w-4 h-4" />
            <span>Peta Jawa Timur</span>
          </button>

          <button
            onClick={() => setActiveTab('ntb')}
            className={`px-3 py-1.5 rounded-xl font-semibold transition flex items-center gap-2 shrink-0 ${
              activeTab === 'ntb'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Peta NTB</span>
          </button>

          <button
            onClick={() => setActiveTab('audit')}
            className={`px-3 py-1.5 rounded-xl font-semibold transition flex items-center gap-2 shrink-0 ${
              activeTab === 'audit'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Pemeriksaan Mandiri &amp; UU PDP</span>
          </button>

          <button
            onClick={() => setActiveTab('upload')}
            className={`px-3 py-1.5 rounded-xl font-semibold transition flex items-center gap-2 shrink-0 ${
              activeTab === 'upload'
                ? 'bg-amber-600 text-white shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>Unggah &amp; Kelola File</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Global Multi-dimensional Filter Bar (FR-04) - always available */}
        <FilterBar
          filter={filter}
          onChangeFilter={setFilter}
          availableCities={availableCities}
          availableAcademies={availableAcademies}
          availableThemes={availableThemes}
          totalFiltered={filteredParticipants.length}
          totalAll={participants.length}
        />

        {/* Tab 1: KPI dan Insight */}
        {activeTab === 'kpi' && (
          <KpiOverviewTab
            filteredParticipants={filteredParticipants}
            regionMetrics={regionMetrics}
            onSelectCity={setSelectedCity}
            onNavigateToTab={setActiveTab}
          />
        )}

        {/* Tab 2: Peta Jawa Timur */}
        {activeTab === 'jatim' && (
          <JatimViewTab
            regionMetrics={regionMetrics}
            selectedCity={selectedCity}
            onSelectCity={setSelectedCity}
            onFilterByCity={handleFilterByCity}
          />
        )}

        {/* Tab 3: Peta Nusa Tenggara Barat */}
        {activeTab === 'ntb' && (
          <NtbViewTab
            regionMetrics={regionMetrics}
            selectedCity={selectedCity}
            onSelectCity={setSelectedCity}
            onFilterByCity={handleFilterByCity}
          />
        )}

        {/* Tab 4: Laporan Pemeriksaan Data Mandiri & UU PDP */}
        {activeTab === 'audit' && (
          <DataAuditTab
            auditReport={auditReport}
            onResetToBenchmark={handleResetToBenchmark}
          />
        )}

        {/* Tab 5: Unggah & Manajemen Data */}
        {activeTab === 'upload' && (
          <UploadManagementTab
            onIngestFiles={handleIngestFiles}
            onNavigateToTab={setActiveTab}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-6 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>DATAMAP AI &bull; Precision Mapping for Training Reach &bull; MRKI Monitoring &amp; Reporting System</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span>Kepatuhan UU PDP No. 27/2022</span>
            <span>&bull;</span>
            <span>Integrasi Indeks IMDI 2026</span>
          </div>
        </div>
      </footer>

      {/* Executive Report & Export Modal */}
      <ExecutiveExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        regionMetrics={regionMetrics}
        participants={filteredParticipants}
      />
    </div>
  );
}
