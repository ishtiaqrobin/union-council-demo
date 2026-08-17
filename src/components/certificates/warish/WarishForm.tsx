"use client";

import React from "react";
import { CertificateData, HeirItem } from "@/types/certificate";
import { X, RotateCcw, Building2, FileText, User, MapPin, PenTool, Users, Plus, Trash2, Info } from "lucide-react";

interface WarishFormProps {
  data: CertificateData;
  onChange: (updated: CertificateData) => void;
  onReset: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export function WarishForm({
  data,
  onChange,
  onReset,
  isOpen,
  onClose,
}: WarishFormProps) {
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

  const handleHeirChange = (index: number, field: keyof HeirItem, value: string) => {
    if (!data.heirs) return;
    const updatedHeirs = [...data.heirs];
    updatedHeirs[index] = { ...updatedHeirs[index], [field]: value };
    onChange({ ...data, heirs: updatedHeirs });
  };

  const addHeir = () => {
    const currentHeirs = data.heirs || [];
    const newHeir: HeirItem = {
      id: String(Date.now()),
      name: "",
      relation: "",
      age_or_dob: "",
      nid_or_bc: "",
      comments: "জীবিত"
    };
    onChange({ ...data, heirs: [...currentHeirs, newHeir] });
  };

  const removeHeir = (index: number) => {
    if (!data.heirs) return;
    const updatedHeirs = data.heirs.filter((_, i) => i !== index);
    onChange({ ...data, heirs: updatedHeirs });
  };

  const inputClass = "px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-slate-100 font-solaiman outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/80 transition-colors";
  const smallInputClass = "px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-slate-100 font-solaiman outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/80 transition-colors";

  return (
    <aside className="no-print edit-drawer w-full sm:w-[420px] bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 shadow-2xl h-[calc(100vh-62px)] overflow-y-auto sticky top-[62px] z-[500] flex flex-col font-siliguri transition-colors duration-200">
      <div className="px-5 py-4 bg-slate-50 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center sticky top-0 z-10 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400">
            <PenTool className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 leading-none">
              ওয়ারিশ সনদের তথ্য
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
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider pb-1 border-b border-slate-200 dark:border-slate-800">
            <Building2 className="w-4 h-4" /> পরিষদের তথ্য
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">ইউনিয়ন পরিষদ</label>
            <input
              type="text"
              value={data.union.up_name}
              onChange={(e) => updateUnion("up_name", e.target.value)}
              className={inputClass}
            />
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">উপজেলা</label>
              <input
                type="text"
                value={data.union.upazila}
                onChange={(e) => updateUnion("upazila", e.target.value)}
                className={inputClass}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">জেলা</label>
              <input
                type="text"
                value={data.union.district}
                onChange={(e) => updateUnion("district", e.target.value)}
                className={inputClass}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider pb-1 border-b border-slate-200 dark:border-slate-800">
            <FileText className="w-4 h-4" /> সনদের বিবরণ
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">ক্রমিক নং</label>
              <input
                type="text"
                value={data.meta.serial_no}
                onChange={(e) => updateMeta("serial_no", e.target.value)}
                className={inputClass}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">তারিখ</label>
              <input
                type="text"
                value={data.meta.issue_date}
                onChange={(e) => updateMeta("issue_date", e.target.value)}
                className={inputClass}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider pb-1 border-b border-slate-200 dark:border-slate-800">
            <User className="w-4 h-4" /> মৃত ব্যক্তির তথ্য
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">মৃত ব্যক্তির নাম</label>
            <input
              type="text"
              value={data.applicant.person_name}
              onChange={(e) => updateApplicant("person_name", e.target.value)}
              className={inputClass}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">এনআইডি নং</label>
            <input
              type="text"
              value={data.applicant.nid_no}
              onChange={(e) => updateApplicant("nid_no", e.target.value)}
              className={inputClass}
            />
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">পিতার নাম</label>
              <input
                type="text"
                value={data.applicant.father_name}
                onChange={(e) => updateApplicant("father_name", e.target.value)}
                className={inputClass}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">মাতার নাম</label>
              <input
                type="text"
                value={data.applicant.mother_name}
                onChange={(e) => updateApplicant("mother_name", e.target.value)}
                className={inputClass}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between pb-1 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
              <Users className="w-4 h-4" /> ওয়ারিশগণের তালিকা ({data.heirs?.length || 0} জন)
            </div>
            <button onClick={addHeir} className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-500/10 px-2 py-1 rounded-lg hover:bg-emerald-500/20 transition-colors">
              <Plus className="w-3.5 h-3.5" /> যোগ করুন
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {data.heirs?.map((heir, idx) => (
              <div key={heir.id || idx} className="p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-600 dark:text-indigo-300">ওয়ারিশ #{idx + 1}</span>
                  <button onClick={() => removeHeir(idx)} className="text-rose-500 p-1 hover:bg-rose-500/10 rounded">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="নাম"
                    value={heir.name}
                    onChange={(e) => handleHeirChange(idx, "name", e.target.value)}
                    className={smallInputClass}
                  />
                  <input
                    type="text"
                    placeholder="সম্পর্ক"
                    value={heir.relation}
                    onChange={(e) => handleHeirChange(idx, "relation", e.target.value)}
                    className={smallInputClass}
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="বয়স"
                    value={heir.age_or_dob}
                    onChange={(e) => handleHeirChange(idx, "age_or_dob", e.target.value)}
                    className={smallInputClass}
                  />
                  <input
                    type="text"
                    placeholder="NID / জন্ম সনদ"
                    value={heir.nid_or_bc}
                    onChange={(e) => handleHeirChange(idx, "nid_or_bc", e.target.value)}
                    className={smallInputClass}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider pb-1 border-b border-slate-200 dark:border-slate-800">
            <Info className="w-4 h-4" /> স্বাক্ষরকারী
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">অনুমোদনকারী</label>
            <input
              type="text"
              value={data.signatory.signatory_name}
              onChange={(e) => updateSignatory("signatory_name", e.target.value)}
              className={inputClass}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">পদবি</label>
            <input
              type="text"
              value={data.signatory.signatory_role}
              onChange={(e) => updateSignatory("signatory_role", e.target.value)}
              className={inputClass}
            />
          </div>
        </div>
      </div>
    </aside>
  );
}
