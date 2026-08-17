"use client";

import React from "react";
import { CertificateData } from "@/types/certificate";
import { X, RotateCcw, Building2, FileText, User, PenTool, Info } from "lucide-react";

interface RemarriageFormProps {
  data: CertificateData;
  onChange: (updated: CertificateData) => void;
  onReset: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export function RemarriageForm({
  data,
  onChange,
  onReset,
  isOpen,
  onClose,
}: RemarriageFormProps) {
  if (!isOpen) return null;

  const updateUnion = (field: string, value: string) => {
    onChange({ ...data, union: { ...data.union, [field]: value } });
  };

  const updateMeta = (field: string, value: string) => {
    onChange({ ...data, meta: { ...data.meta, [field]: value } });
  };

  const updateApplicant = (field: string, value: string) => {
    onChange({ ...data, applicant: { ...data.applicant, [field]: value } });
  };

  const updateSignatory = (field: string, value: string) => {
    onChange({ ...data, signatory: { ...data.signatory, [field]: value } });
  };

  const inputClass = "px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-slate-100 font-solaiman outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/80 transition-colors";

  return (
    <aside className="no-print edit-drawer w-full sm:w-[420px] bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 shadow-2xl h-[calc(100vh-62px)] overflow-y-auto sticky top-[62px] z-[500] flex flex-col font-siliguri transition-colors duration-200">
      <div className="px-5 py-4 bg-slate-50 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center sticky top-0 z-10 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400">
            <PenTool className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 leading-none">
              পূনঃবিবাহ সনদের তথ্য
            </h3>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">লাইভ ডাটা এডিটর</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={onReset} className="flex items-center gap-1 text-xs px-2.5 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg border border-slate-300 dark:border-slate-700 transition-colors">
            <RotateCcw className="w-3.5 h-3.5" /> রিসেট
          </button>
          <button onClick={onClose} className="p-1.5 text-slate-500 hover:text-slate-900 dark:hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="p-5 flex flex-col gap-6 overflow-y-auto">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider pb-1 border-b border-slate-200 dark:border-slate-800">
            <Building2 className="w-4 h-4" /> পরিষদের তথ্য
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">ইউনিয়ন পরিষদ</label>
            <input type="text" value={data.union.up_name} onChange={(e) => updateUnion("up_name", e.target.value)} className={inputClass} />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider pb-1 border-b border-slate-200 dark:border-slate-800">
            <FileText className="w-4 h-4" /> সনদের বিবরণ
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">ক্রমিক নং</label>
              <input type="text" value={data.meta.serial_no} onChange={(e) => updateMeta("serial_no", e.target.value)} className={inputClass} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">তারিখ</label>
              <input type="text" value={data.meta.issue_date} onChange={(e) => updateMeta("issue_date", e.target.value)} className={inputClass} />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider pb-1 border-b border-slate-200 dark:border-slate-800">
            <User className="w-4 h-4" /> আবেদনকারীর তথ্য
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">নাম</label>
            <input type="text" value={data.applicant.person_name} onChange={(e) => updateApplicant("person_name", e.target.value)} className={inputClass} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">এনআইডি নং</label>
            <input type="text" value={data.applicant.nid_no} onChange={(e) => updateApplicant("nid_no", e.target.value)} className={inputClass} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">বর্তমান স্বামীর নাম</label>
            <input type="text" value={data.applicant.spouse_name || ""} onChange={(e) => updateApplicant("spouse_name", e.target.value)} className={inputClass} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-amber-600 dark:text-amber-400">পুনঃবিবাহ বিবরণ</label>
            <textarea value={data.remarriageReasonBn || ""} onChange={(e) => onChange({ ...data, remarriageReasonBn: e.target.value })} className={`${inputClass} h-24`} />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider pb-1 border-b border-slate-200 dark:border-slate-800">
            <Info className="w-4 h-4" /> স্বাক্ষরকারী
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">অনুমোদনকারী</label>
            <input type="text" value={data.signatory.signatory_name} onChange={(e) => updateSignatory("signatory_name", e.target.value)} className={inputClass} />
          </div>
        </div>
      </div>
    </aside>
  );
}
