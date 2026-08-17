"use client";

import React from "react";
import { CertificateData } from "@/types/certificate";
import { X, RotateCcw, Building2, FileText, User, MapPin, PenTool, Info } from "lucide-react";

interface UnmarriedFormProps {
  data: CertificateData;
  onChange: (updated: CertificateData) => void;
  onReset: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export function UnmarriedForm({
  data,
  onChange,
  onReset,
  isOpen,
  onClose,
}: UnmarriedFormProps) {
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

  return (
    <aside className="no-print edit-drawer w-full sm:w-[420px] bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 shadow-2xl h-[calc(100vh-62px)] overflow-y-auto sticky top-[62px] z-[500] flex flex-col font-siliguri transition-colors duration-200">
      <div className="px-5 py-4 bg-slate-50 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center sticky top-0 z-10 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
            <PenTool className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 leading-none">
              অবিবাহিত সনদের তথ্য
            </h3>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">লাইভ ডাটা এডিটর</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onReset}
            className="flex items-center gap-1 text-xs px-2.5 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg border border-slate-300 dark:border-slate-700 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" /> রিসেট
          </button>
          <button onClick={onClose} className="p-1.5 text-slate-500 hover:text-slate-900 dark:hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="p-5 flex flex-col gap-6 overflow-y-auto">
        {/* Union Info */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider pb-1 border-b border-slate-200 dark:border-slate-800">
            <Building2 className="w-4 h-4" /> পরিষদের তথ্য
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold">ইউনিয়ন পরিষদ</label>
            <input
              type="text"
              value={data.union.up_name}
              onChange={(e) => updateUnion("up_name", e.target.value)}
              className="px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 rounded-lg text-sm"
            />
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold">উপজেলা</label>
              <input
                type="text"
                value={data.union.upazila}
                onChange={(e) => updateUnion("upazila", e.target.value)}
                className="px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 rounded-lg text-sm"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold">জেলা</label>
              <input
                type="text"
                value={data.union.district}
                onChange={(e) => updateUnion("district", e.target.value)}
                className="px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 rounded-lg text-sm"
              />
            </div>
          </div>
        </div>

        {/* Certificate Metadata */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider pb-1 border-b border-slate-200 dark:border-slate-800">
            <FileText className="w-4 h-4" /> সনদের বিবরণ
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold">ক্রমিক নং</label>
              <input
                type="text"
                value={data.meta.serial_no}
                onChange={(e) => updateMeta("serial_no", e.target.value)}
                className="px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 rounded-lg text-sm"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold">তারিখ</label>
              <input
                type="text"
                value={data.meta.issue_date}
                onChange={(e) => updateMeta("issue_date", e.target.value)}
                className="px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 rounded-lg text-sm"
              />
            </div>
          </div>
        </div>

        {/* Applicant Details */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider pb-1 border-b border-slate-200 dark:border-slate-800">
            <User className="w-4 h-4" /> আবেদনকারীর তথ্য
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold">নাম</label>
            <input
              type="text"
              value={data.applicant.person_name}
              onChange={(e) => updateApplicant("person_name", e.target.value)}
              className="px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 rounded-lg text-sm"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold">এনআইডি / জন্ম সনদ নং</label>
            <input
              type="text"
              value={data.applicant.nid_no}
              onChange={(e) => updateApplicant("nid_no", e.target.value)}
              className="px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 rounded-lg text-sm"
            />
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold">পিতার নাম</label>
              <input
                type="text"
                value={data.applicant.father_name}
                onChange={(e) => updateApplicant("father_name", e.target.value)}
                className="px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 rounded-lg text-sm"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold">মাতার নাম</label>
              <input
                type="text"
                value={data.applicant.mother_name}
                onChange={(e) => updateApplicant("mother_name", e.target.value)}
                className="px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 rounded-lg text-sm"
              />
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider pb-1 border-b border-slate-200 dark:border-slate-800">
            <MapPin className="w-4 h-4" /> ঠিকানা
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold">গ্রাম</label>
              <input
                type="text"
                value={data.applicant.village}
                onChange={(e) => updateApplicant("village", e.target.value)}
                className="px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 rounded-lg text-sm"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold">বাসা নং</label>
              <input
                type="text"
                value={data.applicant.house_no}
                onChange={(e) => updateApplicant("house_no", e.target.value)}
                className="px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 rounded-lg text-sm"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold">ওয়ার্ড নং</label>
              <input
                type="text"
                value={data.applicant.ward_no}
                onChange={(e) => updateApplicant("ward_no", e.target.value)}
                className="px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 rounded-lg text-sm"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold">ডাকঘর</label>
              <input
                type="text"
                value={data.applicant.post_office}
                onChange={(e) => updateApplicant("post_office", e.target.value)}
                className="px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 rounded-lg text-sm"
              />
            </div>
          </div>
        </div>

        {/* Signatory */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider pb-1 border-b border-slate-200 dark:border-slate-800">
            <Info className="w-4 h-4" /> স্বাক্ষরকারীর তথ্য
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold">অনুমোদনকারী</label>
            <input
              type="text"
              value={data.signatory.signatory_name}
              onChange={(e) => updateSignatory("signatory_name", e.target.value)}
              className="px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 rounded-lg text-sm"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold">পদবি</label>
            <input
              type="text"
              value={data.signatory.signatory_role}
              onChange={(e) => updateSignatory("signatory_role", e.target.value)}
              className="px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 rounded-lg text-sm"
            />
          </div>
        </div>
      </div>
    </aside>
  );
}
