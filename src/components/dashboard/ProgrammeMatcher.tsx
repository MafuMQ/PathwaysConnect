import React, { useState, useEffect, useMemo } from 'react';
import { 
  checkQualifications, 
  fetchProgrammeFilters, 
  ProgrammeMatch, 
  FilterOptions,
  NSCStatus
} from '@/services/programmeService';
import { Card, Eyebrow, Title, Sub, Btn } from './ui/DashboardUI';
import { 
  Search, 
  Filter, 
  CheckCircle2, 
  AlertCircle, 
  GraduationCap, 
  Building2, 
  MapPin, 
  ChevronDown, 
  ChevronUp, 
  ExternalLink, 
  Sparkles, 
  RefreshCw, 
  SlidersHorizontal,
  XCircle,
  HelpCircle,
  Award
} from 'lucide-react';

interface ProgrammeMatcherProps {
  marks: Record<string, number>;
  onNavigateToMarks?: () => void;
}

export const ProgrammeMatcher: React.FC<ProgrammeMatcherProps> = ({ marks, onNavigateToMarks }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [allMatches, setAllMatches] = useState<ProgrammeMatch[]>([]);
  const [nscStatus, setNscStatus] = useState<NSCStatus | null>(null);
  const [stats, setStats] = useState<{ student_aps: number; total_evaluated: number; qualified: number; near_miss: number }>({
    student_aps: 0,
    total_evaluated: 0,
    qualified: 0,
    near_miss: 0
  });

  const [filterOptions, setFilterOptions] = useState<FilterOptions>({ institutions: [], provinces: [] });
  
  // User filter state
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'QUALIFIED' | 'NEAR_MISS'>('QUALIFIED');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedInstitution, setSelectedInstitution] = useState<string>('');
  const [selectedProvince, setSelectedProvince] = useState<string>('');
  const [selectedNqfLevel, setSelectedNqfLevel] = useState<string>('');
  
  // Expanded card tracking
  const [expandedId, setExpandedId] = useState<number | null>(null);

  // Load initial filters
  useEffect(() => {
    fetchProgrammeFilters().then(opts => setFilterOptions(opts)).catch(() => {});
  }, []);

  // Run qualification evaluation whenever marks change
  const runEvaluation = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await checkQualifications(marks);
      setAllMatches(response.results);
      setNscStatus(response.nsc_status || null);
      setStats({
        student_aps: response.student_aps,
        total_evaluated: response.total_programmes_evaluated,
        qualified: response.qualified_count,
        near_miss: response.near_miss_count
      });
    } catch (err: any) {
      console.error('Qualification evaluation error:', err);
      setError(err.message || 'Unable to connect to tertiary qualification database.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    runEvaluation();
  }, [marks]);

  // Filtered results based on client-side controls
  const filteredProgrammes = useMemo(() => {
    return allMatches.filter(prog => {
      // Status filter
      if (statusFilter === 'QUALIFIED' && prog.status !== 'QUALIFIED') return false;
      if (statusFilter === 'NEAR_MISS' && prog.status !== 'NEAR_MISS') return false;

      // Institution filter
      if (selectedInstitution && prog.institution_name.toLowerCase() !== selectedInstitution.toLowerCase()) {
        return false;
      }

      // Province filter
      if (selectedProvince && prog.province && prog.province.toLowerCase() !== selectedProvince.toLowerCase()) {
        return false;
      }

      // NQF level filter
      if (selectedNqfLevel) {
        if (selectedNqfLevel === 'degree' && !(prog.nqf_level === 7 || prog.nqf_level === 8)) return false;
        if (selectedNqfLevel === 'diploma' && prog.nqf_level !== 6) return false;
        if (selectedNqfLevel === 'cert' && prog.nqf_level !== 5) return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = prog.programme_name.toLowerCase().includes(q);
        const matchInst = prog.institution_name.toLowerCase().includes(q);
        const matchFaculty = prog.faculty ? prog.faculty.toLowerCase().includes(q) : false;
        if (!matchName && !matchInst && !matchFaculty) return false;
      }

      return true;
    });
  }, [allMatches, statusFilter, selectedInstitution, selectedProvince, selectedNqfLevel, searchQuery]);

  const hasEnteredMarks = Object.keys(marks).length > 0;

  return (
    <div className="space-y-4 animate-in fade-in">
      {/* Hero Overview Header */}
      <div className="rounded-3xl bg-gradient-to-br from-[#10263D] via-[#1A3A5C] to-[#12293F] text-white p-5 md:p-6 shadow-xl relative overflow-hidden border border-[#C9A84C]/30">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-48 h-48 bg-[#C9A84C]/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#1E6B3C] text-white shadow-xs">
                <Sparkles className="w-3 h-3 text-[#D9BC6B]" /> Official PostgreSQL Database · RSA Tertiary
              </span>
              {nscStatus && (
                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                  nscStatus.endorsement === 'BACHELOR'
                    ? 'bg-emerald-500/25 text-emerald-200 border border-emerald-400/40'
                    : nscStatus.hasHomeLanguage
                    ? 'bg-blue-500/25 text-blue-200 border border-blue-400/40'
                    : 'bg-red-500/25 text-red-200 border border-red-400/40'
                }`}>
                  <Award className="w-3 h-3" />
                  {nscStatus.endorsementLabel}
                </span>
              )}
            </div>
            <h2 className="font-['Playfair_Display'] font-black text-2xl md:text-3xl text-white">
              Programme Qualification Engine
            </h2>
            <p className="text-xs md:text-sm text-[#B9CBDD] max-w-xl mt-1">
              Deterministic eligibility matching against official South African university admission criteria, compulsory prerequisite subjects, choice options, and points.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-3 text-center min-w-[90px]">
              <div className="font-['Playfair_Display'] font-black text-2xl text-[#C9A84C]">
                {stats.student_aps}
              </div>
              <div className="text-[9px] font-bold uppercase tracking-wider text-[#B9CBDD]">Your APS</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-3 text-center min-w-[100px]">
              <div className="font-['Playfair_Display'] font-black text-2xl text-emerald-400">
                {stats.qualified}
              </div>
              <div className="text-[9px] font-bold uppercase tracking-wider text-[#B9CBDD]">Direct Eligible</div>
            </div>
          </div>
        </div>

        {/* Quick Marks Bar */}
        <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 max-w-full">
            <span className="text-[#B9CBDD] font-bold text-[11px] shrink-0">Evaluated Marks:</span>
            {hasEnteredMarks ? (
              Object.entries(marks).map(([sub, score]) => (
                <span key={sub} className="bg-white/15 border border-white/20 rounded-full px-2.5 py-0.5 text-[11px] font-semibold shrink-0">
                  {sub}: <strong className="text-[#C9A84C]">{score}%</strong>
                </span>
              ))
            ) : (
              <span className="text-[#C9A84C] font-semibold italic">No subjects added yet. Add subjects to calculate qualifications.</span>
            )}
          </div>
          {onNavigateToMarks && (
            <button 
              onClick={onNavigateToMarks}
              className="text-[#C9A84C] hover:text-white font-bold text-xs inline-flex items-center gap-1 transition-colors underline"
            >
              Adjust marks in APS Calculator →
            </button>
          )}
        </div>
      </div>

      {/* Statutory Warning if No Home Language or Incomplete Package */}
      {nscStatus && !nscStatus.hasHomeLanguage && hasEnteredMarks && (
        <div className="rounded-2xl p-4 bg-red-50 border border-red-200 text-red-950 flex items-start gap-3 shadow-xs">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div className="text-xs space-y-1">
            <div className="font-bold text-sm text-red-950">
              Statutory NSC Prerequisite Warning: No Home Language (HL) Registered
            </div>
            <p className="text-red-900 leading-relaxed">
              Under South African Department of Basic Education policy, a National Senior Certificate <strong>cannot be awarded without an official Home Language</strong> passed at 40%+ (Level 3).
            </p>
            <p className="text-red-800">
              Because no Home Language is offered in this package, statutory <strong>Bachelor’s Degree Admission cannot be granted</strong> by any South African university, regardless of your APS points.
            </p>
            {onNavigateToMarks && (
              <button 
                onClick={onNavigateToMarks}
                className="mt-1 text-red-700 font-bold hover:underline inline-flex items-center gap-1"
              >
                Add an official Home Language (e.g. English HL, isiZulu HL, Afrikaans HL) →
              </button>
            )}
          </div>
        </div>
      )}

      {/* Filter and Search Toolbar */}
      <Card className="p-4 shadow-sm border-[#E4E0D4] space-y-3">
        {/* Top Filter Row: Search & Status Selector */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#8FA5BB] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by degree name, faculty, or field (e.g. Computer Science, Law, Nursing, Accounting)..."
              className="w-full pl-10 pr-4 py-2.5 bg-[#F9F9F8] border border-[#E4E0D4] rounded-xl text-sm font-semibold text-[#1A3A5C] outline-none focus:border-[#C9A84C] transition-colors"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <XCircle className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Status Tabs */}
          <div className="flex gap-1 bg-[#F1EFE7] p-1 rounded-xl self-start md:self-auto shrink-0">
            <button
              onClick={() => setStatusFilter('QUALIFIED')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                statusFilter === 'QUALIFIED'
                  ? 'bg-[#1E6B3C] text-white shadow-xs'
                  : 'text-[#6B7688] hover:text-[#1A3A5C]'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Eligible ({stats.qualified})</span>
            </button>
            <button
              onClick={() => setStatusFilter('NEAR_MISS')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                statusFilter === 'NEAR_MISS'
                  ? 'bg-[#B7791F] text-white shadow-xs'
                  : 'text-[#6B7688] hover:text-[#1A3A5C]'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>Reach / Near Miss ({stats.near_miss})</span>
            </button>
            <button
              onClick={() => setStatusFilter('ALL')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                statusFilter === 'ALL'
                  ? 'bg-[#1A3A5C] text-white shadow-xs'
                  : 'text-[#6B7688] hover:text-[#1A3A5C]'
              }`}
            >
              All Matches
            </button>
          </div>
        </div>

        {/* Dropdowns Row: Institution, Province, Qualification Tier */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
          <div>
            <label className="text-[10.5px] font-bold text-[#6B7688] uppercase tracking-wider block mb-1">Institution</label>
            <select
              value={selectedInstitution}
              onChange={e => setSelectedInstitution(e.target.value)}
              className="w-full p-2 bg-white border border-[#E4E0D4] rounded-lg text-xs font-semibold text-[#1A3A5C] outline-none focus:border-[#C9A84C]"
            >
              <option value="">All Universities & Colleges</option>
              {filterOptions.institutions.map(inst => (
                <option key={inst} value={inst}>{inst}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[10.5px] font-bold text-[#6B7688] uppercase tracking-wider block mb-1">Province</label>
            <select
              value={selectedProvince}
              onChange={e => setSelectedProvince(e.target.value)}
              className="w-full p-2 bg-white border border-[#E4E0D4] rounded-lg text-xs font-semibold text-[#1A3A5C] outline-none focus:border-[#C9A84C]"
            >
              <option value="">All Provinces</option>
              {filterOptions.provinces.map(prov => (
                <option key={prov} value={prov}>{prov}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[10.5px] font-bold text-[#6B7688] uppercase tracking-wider block mb-1">Qualification Level</label>
            <select
              value={selectedNqfLevel}
              onChange={e => setSelectedNqfLevel(e.target.value)}
              className="w-full p-2 bg-white border border-[#E4E0D4] rounded-lg text-xs font-semibold text-[#1A3A5C] outline-none focus:border-[#C9A84C]"
            >
              <option value="">All Qualification Tiers</option>
              <option value="degree">Bachelor's Degree (NQF 7 & 8)</option>
              <option value="diploma">National Diploma (NQF 6)</option>
              <option value="cert">Higher Certificate (NQF 5)</option>
            </select>
          </div>
        </div>

        {/* Active Filters Clear Button */}
        {(selectedInstitution || selectedProvince || selectedNqfLevel || searchQuery) && (
          <div className="flex items-center justify-between text-xs pt-2 border-t border-[#E4E0D4]">
            <span className="text-[#6B7688]">Showing <strong>{filteredProgrammes.length}</strong> matching programmes</span>
            <button
              onClick={() => {
                setSelectedInstitution('');
                setSelectedProvince('');
                setSelectedNqfLevel('');
                setSearchQuery('');
              }}
              className="text-[#A8862F] hover:text-[#1A3A5C] font-bold"
            >
              Reset all filters
            </button>
          </div>
        )}
      </Card>

      {/* Loading & Error States */}
      {loading && (
        <Card className="text-center py-12 space-y-3">
          <RefreshCw className="w-8 h-8 text-[#C9A84C] animate-spin mx-auto" />
          <h3 className="font-['Playfair_Display'] font-bold text-lg text-[#1A3A5C]">
            Analyzing Requirements in PostgreSQL...
          </h3>
          <p className="text-xs text-[#6B7688] max-w-md mx-auto">
            Cross-referencing your marks against admission criteria across South African universities and TVET colleges.
          </p>
        </Card>
      )}

      {error && !loading && (
        <Card className="border-red-300 bg-red-50/40 p-6 text-center space-y-2">
          <AlertCircle className="w-8 h-8 text-red-600 mx-auto" />
          <h3 className="font-['Playfair_Display'] font-bold text-lg text-red-900">Database Connection Notice</h3>
          <p className="text-xs text-red-700 max-w-md mx-auto">{error}</p>
          <div className="pt-2">
            <Btn size="sm" color="navy" onClick={runEvaluation}>
              Retry Query
            </Btn>
          </div>
        </Card>
      )}

      {/* Empty State */}
      {!loading && !error && filteredProgrammes.length === 0 && (
        <Card className="text-center py-12 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#F6EFD9] text-[#A8862F] flex items-center justify-center mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="font-['Playfair_Display'] font-bold text-lg text-[#1A3A5C]">No Matching Programmes Found</h3>
          <p className="text-xs text-[#6B7688] max-w-sm mx-auto">
            Try adjusting your search query, switching to the "Reach / Near Miss" tab, or resetting the institution filter.
          </p>
          <Btn 
            size="sm" 
            color="ghost" 
            onClick={() => {
              setSelectedInstitution('');
              setSelectedProvince('');
              setSelectedNqfLevel('');
              setSearchQuery('');
              setStatusFilter('ALL');
            }}
          >
            Clear Filters
          </Btn>
        </Card>
      )}

      {/* Programme Cards List */}
      {!loading && !error && filteredProgrammes.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs px-1 text-[#6B7688] font-bold">
            <span>Showing {filteredProgrammes.length} programmes</span>
            <span>Sorted by eligibility & institution</span>
          </div>

          {filteredProgrammes.map(prog => {
            const isExpanded = expandedId === prog.programme_id;
            const isQualified = prog.status === 'QUALIFIED';
            const isNearMiss = prog.status === 'NEAR_MISS';

            return (
              <Card 
                key={prog.programme_id} 
                className={`transition-all duration-200 border ${
                  isQualified 
                    ? 'hover:border-[#1E6B3C]/50 hover:shadow-md' 
                    : isNearMiss
                    ? 'hover:border-[#B7791F]/50 hover:shadow-md'
                    : 'opacity-85'
                }`}
              >
                {/* Header Row: Institution & Badges */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2 pb-2 border-b border-[#E4E0D4]">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-[#1A3A5C]/10 flex items-center justify-center text-[#1A3A5C] shrink-0 font-bold text-[10px]">
                      {prog.institution_name.slice(0, 2).toUpperCase()}
                    </div>
                    <span className="font-bold text-xs text-[#1A3A5C]">{prog.institution_name}</span>
                    {prog.province && (
                      <span className="text-[10px] bg-[#F1EFE7] text-[#6B7688] px-2 py-0.5 rounded-full font-semibold">
                        {prog.province}
                      </span>
                    )}
                  </div>

                  {/* Status Badge */}
                  <div>
                    {isQualified && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#E7F2EA] text-[#1E6B3C] border border-[#C6E0CE]">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Direct Eligible
                      </span>
                    )}
                    {isNearMiss && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#FBF1DC] text-[#B7791F] border border-[#E9D4AA]">
                        <AlertCircle className="w-3.5 h-3.5" /> Reach / Near Miss
                      </span>
                    )}
                    {!isQualified && !isNearMiss && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-gray-100 text-gray-600">
                        Prerequisites Not Met
                      </span>
                    )}
                  </div>
                </div>

                {/* Programme Title & Details */}
                <div className="mb-2">
                  <h4 className="font-['Playfair_Display'] font-bold text-base md:text-lg text-[#10263D] leading-tight">
                    {prog.programme_name}
                  </h4>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-xs text-[#6B7688]">
                    {prog.faculty && <span>{prog.faculty}</span>}
                    {prog.duration_years && (
                      <span>· {prog.duration_years} {prog.duration_years === 1 ? 'Year' : 'Years'} ({prog.study_mode || 'Full-time'})</span>
                    )}
                    {prog.nqf_level && (
                      <span>· NQF Level {prog.nqf_level}</span>
                    )}
                  </div>
                </div>

                {/* Score vs Requirement Quick Pill */}
                <div className="flex flex-wrap items-center justify-between gap-2 mt-3 pt-2 bg-[#F9F9F8] p-2.5 rounded-xl border border-[#E4E0D4]/70">
                  <div className="flex flex-wrap items-center gap-2">
                    {prog.min_aps ? (
                      <div className="text-xs font-semibold text-[#1A3A5C]">
                        Min APS: <strong className="text-[#C9A84C]">{prog.min_aps}</strong> (You have: <strong>{stats.student_aps}</strong>)
                      </div>
                    ) : (
                      <div className="text-xs text-[#6B7688]">Subject-based requirements</div>
                    )}

                    {/* Gap Preview for Near-Miss */}
                    {prog.gaps.length > 0 && isNearMiss && (
                      <span className="text-[11px] font-bold text-[#B7791F] bg-[#FBF1DC] px-2 py-0.5 rounded-md">
                        {prog.gaps[0]}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => setExpandedId(isExpanded ? null : prog.programme_id)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#1A3A5C] hover:text-[#C9A84C] transition-colors"
                  >
                    <span>{isExpanded ? 'Hide Criteria' : 'Inspect Requirements'}</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Expanded Inspection Drawer */}
                {isExpanded && (
                  <div className="mt-3 pt-3 border-t border-[#E4E0D4] space-y-3 animate-in fade-in">
                    <Eyebrow className="text-[11px]">Requirement Evaluation Checklist</Eyebrow>
                    
                    <div className="space-y-2">
                      {prog.checks.map((chk, i) => {
                        if (chk.type === 'CHOICE_GROUP') {
                          return (
                            <div key={i} className={`p-2.5 rounded-xl border text-xs ${chk.passed ? 'bg-[#E7F2EA]/50 border-[#C6E0CE]' : 'bg-[#FDF6E7] border-[#E9D4AA]'}`}>
                              <div className="flex items-center justify-between font-bold mb-1">
                                <span className="text-[#1A3A5C]">{chk.name}</span>
                                {chk.passed ? (
                                  <span className="text-[#1E6B3C] flex items-center gap-1">Option Met ✅</span>
                                ) : (
                                  <span className="text-[#B7791F] flex items-center gap-1">Either required ⚠️</span>
                                )}
                              </div>
                              <div className="space-y-1 pl-2 border-l-2 border-gray-300">
                                {chk.options?.map((opt, j) => (
                                  <div key={j} className="flex justify-between text-[11px] text-[#555]">
                                    <span>• {opt.subject} (Req: {opt.required})</span>
                                    <span>You: <strong>{opt.achieved}</strong> {opt.passed ? '✓' : ''}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        }

                        if (chk.type === 'ADDITIONAL_SELECTION' || chk.type === 'ENDORSEMENT') {
                          return (
                            <div key={i} className="p-2.5 rounded-xl bg-[#F6EFD9]/40 border border-[#C9A84C]/30 text-xs flex items-start gap-2">
                              <HelpCircle className="w-4 h-4 text-[#A8862F] shrink-0 mt-0.5" />
                              <div>
                                <b className="text-[#1A3A5C] block">{chk.name}</b>
                                <span className="text-[#6B7688] text-[11px]">{chk.description}</span>
                              </div>
                            </div>
                          );
                        }

                        // Standard APS or Compulsory Subject
                        return (
                          <div 
                            key={i} 
                            className={`p-2.5 rounded-xl border text-xs flex items-center justify-between ${
                              chk.passed 
                                ? 'bg-[#E7F2EA]/40 border-[#C6E0CE]' 
                                : 'bg-[#FDF2F0] border-red-200'
                            }`}
                          >
                            <div>
                              <div className="font-bold text-[#1A3A5C] flex items-center gap-1.5">
                                <span>{chk.name}</span>
                                <span className="text-[10px] text-[#6B7688] font-normal">(Req: {chk.required})</span>
                              </div>
                              {chk.gap && (
                                <span className="text-red-600 text-[10.5px] font-semibold mt-0.5 block">
                                  {chk.gap}
                                </span>
                              )}
                            </div>
                            <div className="text-right shrink-0">
                              <span className={`font-bold ${chk.passed ? 'text-[#1E6B3C]' : 'text-red-700'}`}>
                                {chk.achieved}
                              </span>
                              <span className="ml-1.5">{chk.passed ? '✅' : '❌'}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Institution Link */}
                    {prog.institution_website && (
                      <div className="pt-2 flex justify-end">
                        <a 
                          href={prog.institution_website.startsWith('http') ? prog.institution_website : `https://${prog.institution_website}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1A3A5C] hover:text-[#C9A84C] transition-colors p-1"
                        >
                          <span>Visit {prog.institution_name} Portal</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};
