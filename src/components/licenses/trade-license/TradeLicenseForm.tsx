"use client";

import React from "react";
import { TradeLicenseData } from "@/types/license";
import { X, RotateCcw, Building2, FileText, User, Briefcase, PenTool, Info, DollarSign } from "lucide-react";

interface TradeLicenseFormProps {
  data: TradeLicenseData;
  onChange: (updated: TradeLicenseData) => void;
  onReset: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export function TradeLicenseForm({
  data,
  onChange,
  onReset,
  isOpen,
  onClose,
}: TradeLicenseFormProps) {
  if (!isOpen) return null;

  const updateUnion = (field: string, value: string) => {
    onChange({ ...data, union: { ...data.union, [field]: value } });
  };

  const updateMeta = (field: string, value: string) => {
    onChange({ ...data, meta: { ...data.meta, [field]: value } });
  };

  const updateBusiness = (field: string, value: string) => {
    onChange({ ...data, business: { ...data.business, [field]: value } });
  };

  const updateOwner = (field: string, value: string) => {
    onChange({ ...data, owner: { ...data.owner, [field]: value } });
  };

  const updateFinancials = (field: string, value: string) => {
    onChange({ ...data, financials: { ...data.financials, [field]: value } });
  };

  const updateSignatory = (field: string, value: string) => {
    onChange({ ...data, signatory: { ...data.signatory, [field]: value } });
  };

  const inputClass = "px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-slate-100 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/80 transition-colors";

  return (
    <aside className="no-print edit-drawer w-full sm:w-[420px] bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 shadow-2xl h-[calc(100vh-62px)] overflow-y-auto sticky top-[62px] z-[500] flex flex-col font-siliguri transition-colors duration-200">
      <div className="px-5 py-4 bg-slate-50 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center sticky top-0 z-10 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-red-500/10 dark:bg-red-500/20 text-red-600 dark:text-red-400">
            <PenTool className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 leading-none">
              ট্রেড লাইসেন্স তথ্য এডিটর
            </h3>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">পোর্ট্রেট লাইসেন্স এডিটর</span>
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
        {/* Union Info */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-red-700 dark:text-red-400 uppercase tracking-wider pb-1 border-b border-slate-200 dark:border-slate-800">
            <Building2 className="w-4 h-4" /> পরিষদের তথ্য
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">ইউনিয়ন পরিষদ</label>
            <input type="text" value={data.union.up_name} onChange={(e) => updateUnion("up_name", e.target.value)} className={inputClass} />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">উপজেলা</label>
              <input type="text" value={data.union.upazila} onChange={(e) => updateUnion("upazila", e.target.value)} className={inputClass} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">জেলা</label>
              <input type="text" value={data.union.district} onChange={(e) => updateUnion("district", e.target.value)} className={inputClass} />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">অর্থ বছর</label>
            <input type="text" value={data.fiscalYearBn} onChange={(e) => onChange({ ...data, fiscalYearBn: e.target.value })} className={inputClass} />
          </div>
        </div>

        {/* License Meta */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider pb-1 border-b border-slate-200 dark:border-slate-800">
            <FileText className="w-4 h-4" /> লাইসেন্স মেটাডেটা
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">লাইসেন্স নং</label>
              <input type="text" value={data.meta.license_no} onChange={(e) => updateMeta("license_no", e.target.value)} className={inputClass} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">লাইসেন্স আইডি</label>
              <input type="text" value={data.meta.license_id} onChange={(e) => updateMeta("license_id", e.target.value)} className={inputClass} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">ইস্যুর তারিখ</label>
              <input type="text" value={data.meta.issue_date} onChange={(e) => updateMeta("issue_date", e.target.value)} className={inputClass} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">নবায়নের তারিখ</label>
              <input type="text" value={data.meta.renewal_date} onChange={(e) => updateMeta("renewal_date", e.target.value)} className={inputClass} />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">মেয়াদ উত্তীর্ণের তারিখ</label>
            <input type="text" value={data.meta.valid_until_date} onChange={(e) => updateMeta("valid_until_date", e.target.value)} className={inputClass} />
          </div>
        </div>

        {/* Business Info */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider pb-1 border-b border-slate-200 dark:border-slate-800">
            <Briefcase className="w-4 h-4" /> প্রতিষ্ঠানের বিবরণ
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">প্রতিষ্ঠানের নাম</label>
            <input type="text" value={data.business.institution_name} onChange={(e) => updateBusiness("institution_name", e.target.value)} className={inputClass} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">ব্যবসার ধরণ</label>
            <textarea value={data.business.business_type} onChange={(e) => updateBusiness("business_type", e.target.value)} className={`${inputClass} h-16`} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">ব্যবসার প্রকৃতি</label>
            <input type="text" value={data.business.business_nature} onChange={(e) => updateBusiness("business_nature", e.target.value)} className={inputClass} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">ব্যবসার স্থান</label>
            <input type="text" value={data.business.business_place} onChange={(e) => updateBusiness("business_place", e.target.value)} className={inputClass} />
          </div>
        </div>

        {/* Owner Info */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider pb-1 border-b border-slate-200 dark:border-slate-800">
            <User className="w-4 h-4" /> লাইসেন্সধারীর তথ্য
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">লাইসেন্সধারীর নাম</label>
            <input type="text" value={data.owner.name} onChange={(e) => updateOwner("name", e.target.value)} className={inputClass} />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">পিতার নাম</label>
              <input type="text" value={data.owner.father_name} onChange={(e) => updateOwner("father_name", e.target.value)} className={inputClass} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">মাতার নাম</label>
              <input type="text" value={data.owner.mother_name} onChange={(e) => updateOwner("mother_name", e.target.value)} className={inputClass} />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">স্বামী/স্ত্রীর নাম</label>
            <input type="text" value={data.owner.spouse_name || ""} onChange={(e) => updateOwner("spouse_name", e.target.value)} className={inputClass} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">স্থায়ী ঠিকানা</label>
            <input type="text" value={data.owner.permanent_address} onChange={(e) => updateOwner("permanent_address", e.target.value)} className={inputClass} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">বর্তমান ঠিকানা</label>
            <input type="text" value={data.owner.present_address} onChange={(e) => updateOwner("present_address", e.target.value)} className={inputClass} />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">এনআইডি/বিআর নং</label>
              <input type="text" value={data.owner.nid_or_bc} onChange={(e) => updateOwner("nid_or_bc", e.target.value)} className={inputClass} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">মোবাইল নং</label>
              <input type="text" value={data.owner.mobile_no} onChange={(e) => updateOwner("mobile_no", e.target.value)} className={inputClass} />
            </div>
          </div>
        </div>

        {/* Financial Breakdown */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider pb-1 border-b border-slate-200 dark:border-slate-800">
            <DollarSign className="w-4 h-4" /> আর্থিক বিবরণী (ফি ও কর)
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">লাইসেন্স/নবায়ন ফি</label>
              <input type="text" value={data.financials.license_fee} onChange={(e) => updateFinancials("license_fee", e.target.value)} className={inputClass} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">ভ্যাট (টাকা)</label>
              <input type="text" value={data.financials.vat} onChange={(e) => updateFinancials("vat", e.target.value)} className={inputClass} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">মোট টাকা</label>
              <input type="text" value={data.financials.total_amount} onChange={(e) => updateFinancials("total_amount", e.target.value)} className={inputClass} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">কথায়</label>
              <input type="text" value={data.financials.amount_in_words} onChange={(e) => updateFinancials("amount_in_words", e.target.value)} className={inputClass} />
            </div>
          </div>
        </div>

        {/* Signatory Info */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider pb-1 border-b border-slate-200 dark:border-slate-800">
            <Info className="w-4 h-4" /> স্বাক্ষরকারী
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">বাম স্বাক্ষরকারী (কর্মকর্তা)</label>
              <input type="text" value={data.signatory.left_name} onChange={(e) => updateSignatory("left_name", e.target.value)} className={inputClass} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">ডান স্বাক্ষরকারী (চেয়ারম্যান)</label>
              <input type="text" value={data.signatory.right_name} onChange={(e) => updateSignatory("right_name", e.target.value)} className={inputClass} />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
