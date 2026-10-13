import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Camera, 
  Upload, 
  Archive, 
  Sparkles, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  Info, 
  ArrowLeft, 
  Plus, 
  Trash2, 
  FileText,
  Save,
  Check
} from 'lucide-react';
import { useDashboard } from '@/contexts/DashboardContext';
import { scanReportDocument, ScanReportResponse, ScannedSubject } from '@/services/aiScannerService';
import { calcAPS, LVL } from '@/data/dashboardData';

interface ReportScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplied?: (marks: Record<string, number>, navigateToMatcher?: boolean) => void;
}

const VALID_SUBJECTS = [
  'English HL', 'English FAL', 
  'Afrikaans HL', 'Afrikaans FAL', 
  'isiZulu HL', 'isiZulu FAL', 
  'isiXhosa HL', 'isiXhosa FAL', 
  'Sepedi HL', 'Sepedi FAL', 
  'Sesotho HL', 'Sesotho FAL', 
  'Setswana HL', 'Setswana FAL', 
  'Mathematics', 'Mathematical Literacy', 'Technical Mathematics',
  'Life Sciences', 'Physical Sciences', 'Information Technology', 'Computer Applications Technology',
  'Accounting', 'Business Studies', 'Economics', 
  'Geography', 'History', 'Tourism', 'Consumer Studies', 
  'Life Orientation'
];

export const ReportScannerModal: React.FC<ReportScannerModalProps> = ({
  isOpen,
  onClose,
  onApplied
}) => {
  const { S, applyScannedResults, showToast } = useDashboard();

  type Step = 'SELECT_SOURCE' | 'SELECT_VAULT' | 'PROCESSING' | 'REVIEW';
  const [step, setStep] = useState<Step>('SELECT_SOURCE');
  
  // Image & file data
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);
  const [imageMimeType, setImageMimeType] = useState<string>('image/jpeg');
  const [documentFileName, setDocumentFileName] = useState<string>('Academic Report');
  
  // AI Response & editing state
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [scanResult, setScanResult] = useState<ScanReportResponse | null>(null);
  const [editableSubjects, setEditableSubjects] = useState<ScannedSubject[]>([]);
  const [saveToVault, setSaveToVault] = useState<boolean>(true);
  const [newSubjectToAdd, setNewSubjectToAdd] = useState<string>('');

  // Hidden file inputs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const resetScannerState = () => {
    setStep('SELECT_SOURCE');
    setImageDataUrl(null);
    setScanResult(null);
    setEditableSubjects([]);
    setErrorMessage(null);
    setNewSubjectToAdd('');
  };

  // Reset to initial source selection whenever modal opens
  useEffect(() => {
    if (isOpen) {
      resetScannerState();
    }
  }, [isOpen]);

  const handleClose = () => {
    resetScannerState();
    onClose();
  };

  if (!isOpen) return null;

  // File loading helper
  const handleFileChosen = (file: File) => {
    if (!file) return;
    setDocumentFileName(file.name.replace(/\.[^/.]+$/, ''));
    setImageMimeType(file.type || 'image/jpeg');

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setImageDataUrl(result);
      processImageWithAI(result, file.type || 'image/jpeg');
    };
    reader.readAsDataURL(file);
  };

  // Perform AI Scan
  const processImageWithAI = async (dataUrl: string, mime: string) => {
    setStep('PROCESSING');
    setLoading(true);
    setErrorMessage(null);

    try {
      const response = await scanReportDocument(dataUrl, mime);
      
      if (!response.success && response.error) {
        throw new Error(response.error);
      }

      setScanResult(response);
      setEditableSubjects(response.subjects || []);
      setStep('REVIEW');
    } catch (err: any) {
      console.error('AI Scan Error:', err);
      setErrorMessage(err.message || 'Unable to analyze academic report image. Please ensure the photo is clear and try again.');
      setStep('SELECT_SOURCE');
    } finally {
      setLoading(false);
    }
  };

  // Rescan current image
  const handleRescanCurrent = () => {
    if (imageDataUrl) {
      processImageWithAI(imageDataUrl, imageMimeType);
    } else {
      setStep('SELECT_SOURCE');
    }
  };

  // Calculate live APS preview from editable subjects
  const currentMarksMap = editableSubjects.reduce((acc, sub) => {
    if (sub.name) {
      acc[sub.name] = sub.mark || 0;
    }
    return acc;
  }, {} as Record<string, number>);

  const liveAps = calcAPS(currentMarksMap);

  // Apply results
  const handleApply = async (navigateToMatcher = false) => {
    try {
      const marksToSave = { ...currentMarksMap };
      const docPayload = saveToVault && imageDataUrl ? {
        name: scanResult?.documentType || documentFileName || 'Scanned Academic Report',
        url: imageDataUrl
      } : undefined;

      await applyScannedResults(marksToSave, docPayload);

      showToast(`Autofilled ${Object.keys(marksToSave).length} subjects • APS: ${liveAps}`);
      
      resetScannerState();
      if (onApplied) {
        onApplied(marksToSave, navigateToMatcher);
      }
      onClose();
    } catch (err: any) {
      console.error('Error applying scanned marks:', err);
      showToast('Failed to save scanned marks.');
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      // Explicitly preventing click outside dismissal
      onClick={(e) => e.stopPropagation()}
    >
      <div 
        className="bg-white border border-[#E4E0D4] rounded-3xl w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#10263D] via-[#1A3A5C] to-[#12293F] text-white px-5 py-4 flex items-center justify-between border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-[#C9A84C]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-['Playfair_Display'] font-bold text-lg text-white leading-tight">
                AI Academic Report & NSC Scanner
              </h3>
              <p className="text-[11px] text-[#B9CBDD]">
                Autofill subjects, APS score & verify tertiary qualifications
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-[#B9CBDD] hover:text-white flex items-center justify-center transition-colors"
            title="Close scanner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Hidden inputs */}
        <input 
          type="file" 
          ref={fileInputRef} 
          accept="image/*,application/pdf" 
          className="hidden" 
          onChange={(e) => {
            if (e.target.files?.[0]) handleFileChosen(e.target.files[0]);
          }} 
        />
        <input 
          type="file" 
          ref={cameraInputRef} 
          accept="image/*" 
          capture="environment" 
          className="hidden" 
          onChange={(e) => {
            if (e.target.files?.[0]) handleFileChosen(e.target.files[0]);
          }} 
        />

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto flex-1 font-['Inter']">
          {errorMessage && (
            <div className="mb-4 p-3.5 bg-red-50 border border-red-200 text-red-800 rounded-2xl text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <span className="font-bold block mb-0.5">Scanning Error</span>
                <span>{errorMessage}</span>
              </div>
            </div>
          )}

          {/* STEP 1: SOURCE SELECTION */}
          {step === 'SELECT_SOURCE' && (
            <div className="space-y-4 py-2">
              <div className="text-center max-w-md mx-auto mb-6">
                <p className="text-sm text-[#1A3A5C] font-semibold">
                  How would you like to provide your report or NSC statement?
                </p>
                <p className="text-xs text-[#6B7688] mt-1">
                  Our Google AI engine recognizes official South African NSC statements, matric certificates, and high school term report cards.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Option 1: Camera */}
                <button
                  type="button"
                  onClick={() => cameraInputRef.current?.click()}
                  className="p-5 rounded-2xl border-2 border-[#E4E0D4] hover:border-[#C9A84C] bg-[#F9F9F8] hover:bg-[#F6EFD9]/40 transition-all flex flex-col items-center text-center group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white border border-[#E4E0D4] group-hover:border-[#C9A84C] flex items-center justify-center text-[#1A3A5C] group-hover:text-[#C9A84C] mb-3 shadow-xs transition-transform group-hover:scale-105">
                    <Camera className="w-6 h-6" />
                  </div>
                  <span className="font-bold text-sm text-[#1A3A5C]">Snap Photo</span>
                  <span className="text-[11px] text-[#6B7688] mt-1">Take a live photo via mobile camera</span>
                </button>

                {/* Option 2: Upload File */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="p-5 rounded-2xl border-2 border-[#E4E0D4] hover:border-[#1A3A5C] bg-[#F9F9F8] hover:bg-[#E5EDF6]/40 transition-all flex flex-col items-center text-center group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white border border-[#E4E0D4] group-hover:border-[#1A3A5C] flex items-center justify-center text-[#1A3A5C] mb-3 shadow-xs transition-transform group-hover:scale-105">
                    <Upload className="w-6 h-6" />
                  </div>
                  <span className="font-bold text-sm text-[#1A3A5C]">Upload File</span>
                  <span className="text-[11px] text-[#6B7688] mt-1">Upload image or PDF from device</span>
                </button>

                {/* Option 3: Select from Vault */}
                <button
                  type="button"
                  onClick={() => setStep('SELECT_VAULT')}
                  className="p-5 rounded-2xl border-2 border-[#E4E0D4] hover:border-[#1E6B3C] bg-[#F9F9F8] hover:bg-[#E7F2EA]/40 transition-all flex flex-col items-center text-center group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white border border-[#E4E0D4] group-hover:border-[#1E6B3C] flex items-center justify-center text-[#1E6B3C] mb-3 shadow-xs transition-transform group-hover:scale-105">
                    <Archive className="w-6 h-6" />
                  </div>
                  <span className="font-bold text-sm text-[#1A3A5C]">From Vault</span>
                  <span className="text-[11px] text-[#6B7688] mt-1">Scan an existing file in your vault</span>
                </button>
              </div>

              <div className="mt-6 p-4 rounded-2xl bg-[#E5EDF6]/60 border border-[#B9CBDD]/50 text-xs text-[#1A3A5C] flex items-center gap-3">
                <Info className="w-5 h-5 text-[#1A3A5C] shrink-0" />
                <span>
                  <strong>Tip for clearest scan:</strong> Ensure good lighting and lay the document flat. For multi-term school reports, the AI will automatically extract your <strong>latest term</strong> marks.
                </span>
              </div>
            </div>
          )}

          {/* STEP: SELECT FROM VAULT */}
          {step === 'SELECT_VAULT' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <button 
                  onClick={() => setStep('SELECT_SOURCE')}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1A3A5C] hover:text-[#C9A84C]"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to source options
                </button>
                <span className="text-xs text-[#6B7688]">Academic Vault Records</span>
              </div>

              <div className="divide-y divide-[#E4E0D4] border border-[#E4E0D4] rounded-2xl overflow-hidden bg-white">
                {S.docs.length > 0 ? (
                  S.docs.map((d, idx) => (
                    <div key={idx} className="p-3.5 flex items-center justify-between hover:bg-[#F9F9F8] transition-colors">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${d.ok ? 'bg-[#E7F2EA] text-[#1E6B3C]' : 'bg-[#F1EFE7] text-[#B9B29C]'}`}>
                          <FileText className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-[#1A3A5C] truncate">{d.n}</p>
                          <p className="text-[11px] text-[#6B7688] truncate">{d.d}</p>
                        </div>
                      </div>

                      {d.url ? (
                        <button
                          onClick={() => {
                            setImageDataUrl(d.url);
                            setDocumentFileName(d.n);
                            processImageWithAI(d.url, 'image/jpeg');
                          }}
                          className="px-3.5 py-1.5 bg-[#1A3A5C] hover:bg-[#10263D] text-white rounded-xl text-xs font-bold transition-all shadow-xs shrink-0"
                        >
                          Scan This
                        </button>
                      ) : d.ok ? (
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="px-3 py-1.5 bg-white border border-[#E4E0D4] hover:border-[#1A3A5C] text-[#1A3A5C] rounded-xl text-xs font-bold transition-all shrink-0"
                        >
                          Select Image File
                        </button>
                      ) : (
                        <span className="text-xs text-[#8FA5BB] italic">Not uploaded</span>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center text-xs text-[#6B7688]">
                    No files found in your Academic Vault. Please upload a file from your device.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 2: PROCESSING / AI ANALYZING */}
          {step === 'PROCESSING' && (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
              <div className="relative w-24 h-24 rounded-3xl bg-gradient-to-tr from-[#10263D] to-[#1A3A5C] flex items-center justify-center text-[#C9A84C] shadow-lg">
                <Sparkles className="w-10 h-10 animate-pulse" />
                {/* Laser scan line effect */}
                <div className="absolute inset-x-2 top-0 h-1 bg-[#C9A84C] shadow-[0_0_12px_#C9A84C] animate-bounce" />
              </div>

              <div>
                <h4 className="font-['Playfair_Display'] font-bold text-lg text-[#1A3A5C]">
                  Analyzing Academic Document
                </h4>
                <p className="text-xs text-[#6B7688] max-w-sm mt-1">
                  Google Gemini Vision is reading subject names, detecting percentage marks, and isolating your latest term results...
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-bold text-[#A8862F] bg-[#F6EFD9] px-3.5 py-1.5 rounded-full">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Processing CAPS / NSC Format</span>
              </div>
            </div>
          )}

          {/* STEP 3: REVIEW & EDIT */}
          {step === 'REVIEW' && (
            <div className="space-y-4 animate-in fade-in">
              {/* Back to source picker shortcut */}
              <div className="flex items-center justify-between pb-0.5">
                <button
                  type="button"
                  onClick={() => setStep('SELECT_SOURCE')}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1A3A5C] hover:text-[#C9A84C] transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" /> Pick a different document / source
                </button>
                <button
                  type="button"
                  onClick={handleRescanCurrent}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8FA5BB] hover:text-[#1A3A5C] transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Re-scan image
                </button>
              </div>

              {/* Notice Banner: Latest Term Information */}
              <div className="p-3.5 rounded-2xl bg-[#E5EDF6] border border-[#B9CBDD] text-[#1A3A5C] flex items-start gap-3 shadow-xs">
                <Info className="w-5 h-5 text-[#1A3A5C] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-bold block text-sm">
                    {scanResult?.documentType || 'Academic Report Detected'}
                  </span>
                  <p className="mt-0.5 text-[#1A3A5C]/90">
                    {scanResult?.latestTermNotice || 'Marks have been extracted based on your latest term / final exam assessment.'}
                  </p>
                  {scanResult?.endorsement && (
                    <span className="inline-block mt-1 font-bold text-[11px] bg-white text-[#1E6B3C] border border-[#C6E0CE] px-2 py-0.5 rounded-full">
                      Detected Endorsement: {scanResult.endorsement}
                    </span>
                  )}
                </div>
              </div>

              {/* Extracted Subjects & Marks Table */}
              <div className="border border-[#E4E0D4] rounded-2xl overflow-hidden bg-white shadow-xs">
                <div className="bg-[#F9F9F8] px-4 py-2.5 border-b border-[#E4E0D4] flex items-center justify-between">
                  <div className="text-xs font-bold text-[#1A3A5C] uppercase tracking-wider">
                    Extracted Subjects ({editableSubjects.length})
                  </div>
                  <div className="text-xs font-bold text-[#1E6B3C]">
                    Calculated APS: <span className="text-sm font-black text-[#1A3A5C]">{liveAps}</span>
                  </div>
                </div>

                <div className="max-h-60 overflow-y-auto divide-y divide-[#E4E0D4]">
                  {editableSubjects.length > 0 ? (
                    editableSubjects.map((sub, i) => (
                      <div key={i} className="p-2.5 px-4 flex items-center justify-between gap-3 hover:bg-[#F9F9F8]/60 transition-colors">
                        <div className="flex-1 min-w-0">
                          <input 
                            value={sub.name}
                            onChange={(e) => {
                              const updated = [...editableSubjects];
                              updated[i].name = e.target.value;
                              setEditableSubjects(updated);
                            }}
                            className="w-full text-xs font-bold text-[#1A3A5C] bg-transparent outline-none border-b border-transparent focus:border-[#C9A84C]"
                          />
                          {sub.rawName && sub.rawName !== sub.name && (
                            <span className="text-[10px] text-[#8FA5BB] block truncate">
                              Detected as: "{sub.rawName}"
                            </span>
                          )}
                        </div>

                        {/* Percentage Mark Input */}
                        <div className="flex items-center gap-2 shrink-0">
                          <div className="flex items-center border border-[#E4E0D4] rounded-lg bg-white overflow-hidden focus-within:border-[#C9A84C]">
                            <input 
                              type="number"
                              min="0"
                              max="100"
                              value={sub.mark}
                              onChange={(e) => {
                                const val = Math.min(100, Math.max(0, parseInt(e.target.value) || 0));
                                const updated = [...editableSubjects];
                                updated[i].mark = val;
                                updated[i].level = LVL(val);
                                setEditableSubjects(updated);
                              }}
                              className="w-12 text-center text-xs font-bold text-[#1A3A5C] p-1 outline-none"
                            />
                            <span className="text-[11px] font-bold text-[#8FA5BB] pr-1.5">%</span>
                          </div>

                          <span className="text-[10.5px] font-bold text-[#6B7688] w-12 text-right">
                            LVL {LVL(sub.mark)}
                          </span>

                          <button 
                            onClick={() => {
                              setEditableSubjects(editableSubjects.filter((_, idx) => idx !== i));
                            }}
                            className="text-[#C0392B] p-1 hover:bg-red-50 rounded-lg transition-colors ml-1"
                            title="Remove subject"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-6 text-center text-xs text-[#6B7688] italic">
                      No subjects detected in this image. You can add subjects manually or try a rescan.
                    </div>
                  )}
                </div>

                {/* Add missed subject inline */}
                <div className="p-3 bg-[#F9F9F8] border-t border-[#E4E0D4] flex items-center gap-2">
                  <select 
                    value={newSubjectToAdd}
                    onChange={(e) => setNewSubjectToAdd(e.target.value)}
                    className="flex-1 text-xs font-semibold p-2 rounded-xl border border-[#E4E0D4] bg-white outline-none focus:border-[#C9A84C]"
                  >
                    <option value="">+ Add any missed subject...</option>
                    {VALID_SUBJECTS.filter(s => !editableSubjects.some(es => es.name === s)).map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <button
                    disabled={!newSubjectToAdd}
                    onClick={() => {
                      if (newSubjectToAdd) {
                        setEditableSubjects([...editableSubjects, { name: newSubjectToAdd, mark: 50, level: 4 }]);
                        setNewSubjectToAdd('');
                      }
                    }}
                    className="px-3 py-2 bg-[#1A3A5C] disabled:opacity-40 text-white rounded-xl text-xs font-bold transition-all shrink-0"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Save Image to Vault Checkbox (as requested by user) */}
              <div className="p-3 rounded-2xl bg-[#F9F9F8] border border-[#E4E0D4] flex items-center justify-between">
                <label className="flex items-center gap-2.5 cursor-pointer text-xs font-semibold text-[#1A3A5C]">
                  <input 
                    type="checkbox"
                    checked={saveToVault}
                    onChange={(e) => setSaveToVault(e.target.checked)}
                    className="w-4 h-4 rounded text-[#1A3A5C] focus:ring-0 cursor-pointer accent-[#1A3A5C]"
                  />
                  <span>Save this document image to my Academic Vault</span>
                </label>
                <span className="text-[10px] text-[#8FA5BB] font-medium">Safe & encrypted</span>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 px-5 bg-[#F9F9F8] border-t border-[#E4E0D4] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          {step === 'REVIEW' ? (
            <>
              <div className="w-full sm:w-auto flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setStep('SELECT_SOURCE')}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-[#E4E0D4] bg-white hover:bg-black/5 text-xs font-bold text-[#1A3A5C] transition-all"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Choose Another Source</span>
                </button>

                <button
                  type="button"
                  onClick={handleRescanCurrent}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-[#E4E0D4] bg-white hover:bg-black/5 text-xs font-bold text-[#1A3A5C] transition-all"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-[#8FA5BB]" />
                  <span>Rescan Image</span>
                </button>
              </div>

              <div className="w-full sm:w-auto flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleApply(false)}
                  className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl border border-[#E4E0D4] bg-white hover:border-[#1A3A5C] text-xs font-bold text-[#1A3A5C] transition-all"
                >
                  Apply & Edit Later
                </button>

                <button
                  type="button"
                  onClick={() => handleApply(true)}
                  className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#D9BC6B] to-[#C9A84C] hover:brightness-105 text-xs font-bold text-[#10263D] shadow-sm transition-all flex items-center justify-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Apply & See Qualifications →</span>
                </button>
              </div>
            </>
          ) : (
            <div className="w-full flex justify-end">
              <button
                type="button"
                onClick={handleClose}
                className="px-5 py-2.5 rounded-xl border border-[#E4E0D4] bg-white hover:bg-black/5 text-xs font-bold text-[#1A3A5C] transition-all"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
